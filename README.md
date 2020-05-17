# Lighthouse Lambda

PoC for serverless website performance testing. 

The easiest way to get this up and running is with [Vercel](https://vercel.com). The lambda can be deployed to each [Vercel region](https://vercel.com/docs/v2/edge-network/regions#routing) (the origins) to run the test from 15+ different locations around the world. Get started by using the deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/jpbow/lighthouse-lambda)

## Usage

Deploy to production in each region using the command `now --regions REGION_ID --prod`

Once deployed, make `GET` requests each API endpoint like so:

```
https://deployment-url.now.sh/api/lighthouse?url=https://example.com
```

After about 10 seconds you should see a result like the following:

```
{
  "userAgent": "Mozilla/5.0 ...",
  "environment": {
    "networkUserAgent": "Mozilla/5.0 ko) ...",
    "hostUserAgent": "Mozilla/5.0 ...",
    "benchmarkIndex": 100
  },
  "lighthouseVersion": "5.6.0",
  "fetchTime": "2020-05-17T14:40:20.832Z",
  "requestedUrl": "https://example.com/",
  "finalUrl": "https://example.com/",
  "runWarnings": [],
  "audits": {
    "first-contentful-paint": {
      "id": "first-contentful-paint",
      "title": "First Contentful Paint",
      "description": "First Contentful Paint marks...",
      "score": 1,
      "scoreDisplayMode": "numeric",
      "numericValue": 807.65,
      "displayValue": "0.8Â s"
    },
    ...
```

Then the results can be aggregated for an overall score.

For more detailed information about how the Lighthouse test works, see the [Lighthouse repo](https://github.com/GoogleChrome/lighthouse).
