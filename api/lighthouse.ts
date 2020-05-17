import { NowRequest, NowResponse } from "@now/node";
import {
  puppeteer,
  args,
  defaultViewport,
  executablePath,
} from "chrome-aws-lambda";
import lighthouse from "lighthouse";
import logger from "lighthouse-logger";

const flags = { logLevel: "info", output: "json" };
logger.setLevel(flags.logLevel);

const getBrowser = async () => {
  return puppeteer.launch({
    args: args,
    defaultViewport: defaultViewport,
    executablePath: await executablePath,
    headless: true,
  });
};

export default async (req: NowRequest, res: NowResponse) => {
  const url = req.query.url;

  console.log(`Starting request for URL :: ${url}`);

  const browser = await getBrowser();
  const endpoint = browser.wsEndpoint();
  const port = endpoint.split(":")[2].split("/")[0];

  console.log(`Endpoint :: ${endpoint}`);
  console.log(`Port :: ${port}`);
  console.log("Starting test run...");

  const config = {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["performance"],
    },
  };
  const results = await lighthouse(url, { ...flags, port }, config);

  console.log("Test run complete!");

  await browser.close();

  res.setHeader("x-now-region", process.env.NOW_REGION);

  // Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Cache response for 60 seconds
  res.setHeader("Cache-Control", "s-maxage=60");

  return res.status(200).end(results.report);
};
