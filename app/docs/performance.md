---
title: Performance
description: Open, reproducible, real-world metrics for the performance of aws-lite and other AWS SDKs
next: contributing
---
# Performance

Performance is one of the tent poles of `aws-lite`. We take it seriously because we want your applications to be as fast possible.

As such, we regularly test and publish open, reproducible, real-world metrics for every key aspect of performance, comparing `aws-lite` to AWS's own `aws-sdk` (v2) and `@aws-sdk` (v3). Learn more and view source at the [`aws-lite` performance project on GitHub](https://github.com/architect/aws-lite-performance/).

All metrics are published below (or [skip straight to the wrap-up](#time-to-respond%2C-not-including-coldstart)).


## Methodology

In addition to publishing our source, [raw data](#latest-data), and final results, we believe it's important to share the details of our performance testing methodology, too. [Learn more here](https://github.com/architect/aws-lite-performance/#methodology).

---

**Stats last updated:** <!-- last_published -->


## Coldstart latency

Coldstart latency measures the impact of each SDK on AWS Lambda coldstarts – the pre-initialization phase where your code payload is loaded into the Lambda micro VM.

In these stats we expect to see lower values for either very small code payloads (such as `aws-lite`), or scenarios where we are using the AWS SDK included in the Lambda image (e.g. `@aws-sdk` v3 raw in `nodejs20.x`). Coldstart latency increases as code payload sizes increase; this is most clearly observed with bundled SDKs.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Coldstart latency" srcset="/_public/coldstart-dark.png">
  <img alt="Benchmark statistics - Coldstart latency" src="/_public/coldstart.png">
</picture>

<!-- stats_coldstart -->


## Initialization latency

Initialization latency measures the impact of each SDK on the [initialization phase of the Lambda lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html#runtimes-lifecycle), including static analysis and execution of any code outside the scope of the Lambda handler.

Here we expect to see relatively similar values, as the performance benchmark has almost no static code or init-time execution.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Initialization latency" srcset="/_public/init-dark.png">
  <img alt="Benchmark statistics - Initialization latency" src="/_public/init.png">
</picture>

<!-- stats_init -->



## Import / require

Here we measure the impact of importing / requiring each SDK. Ideally, all import / require operations should be sub-100ms to ensure fast responses in customer hot-paths.

It is important to note that import / require times are tied to individual services. In this benchmark, only the DynamoDB service client is imported. In real world use your business logic may rely on multiple AWS services – each of which necessitating additional imports, thereby compounding overall response latency.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Import / require" srcset="/_public/import-dep-dark.png">
  <img alt="Benchmark statistics - Import / require" src="/_public/import-dep.png">
</picture>

<!-- stats_importDep -->



## Instantiate a client

Here we measure the impact of instantiating a new SDK client – a necessary step before making any service API calls. Ideally all operations should be sub-50ms to ensure fast responses in customer hot-paths.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Instantiate a client" srcset="/_public/instantiate-dark.png">
  <img alt="Benchmark statistics - Instantiate a client" src="/_public/instantiate.png">
</picture>

<!-- stats_instantiate -->



## DynamoDB - read one 100KB row

Here we measure the latency associated with reading a single 100KB row from DynamoDB, and parsing and returning results. All reads are identical across SDKs.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - DynamoDB - read one 100KB row" srcset="/_public/read-dark.png">
  <img alt="Benchmark statistics - DynamoDB - read one 100KB row" src="/_public/read.png">
</picture>

<!-- stats_read -->



## DynamoDB - write one 100KB row

Here we measure the latency associated with writing a single 100KB row into DynamoDB. All writes are identical across SDKs.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - DynamoDB - write one 100KB row" srcset="/_public/write-dark.png">
  <img alt="Benchmark statistics - DynamoDB - write one 100KB row" src="/_public/write.png">
</picture>

<!-- stats_write -->



## Peak memory consumption over Lambda baseline

Peak memory consumption measures each SDK's peak memory usage throughout the above four steps (import / require, instantiation, read, and write).

To make it easier to assess the memory impact of each SDK, the graph is presented as a value over (thus, not including) the Lambda Node.js baseline. Baseline memory consumption would be expected to include Node.js itself, Lambda bootstrap processes, etc. The memory baseline used always corresponds to the equivalent peak memory of the control test (e.g. `aws-lite` peak memory p95 - control peak memory p95 = peak memory over baseline p95).

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Peak memory consumption over Lambda baseline" srcset="/_public/memory-dark.png">
  <img alt="Benchmark statistics - Peak memory consumption over Lambda baseline" src="/_public/memory.png">
</picture>

<!-- stats_memory -->



## Time to respond, not including coldstart

Time to respond measures the total execution time of each SDK, not including [coldstart](#coldstart-latency) or [initialization](#initialization-latency). In real-world usage, Lambda coldstarts are usually less common than warm invocations, so this metric illustrates the most common case for most applications. Ideally all times should be sub-1000ms to ensure fast responses in customer hot-paths.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Time to respond, not including coldstart" srcset="/_public/execution-time-dark.png">
  <img alt="Benchmark statistics - Time to respond, not including coldstart" src="/_public/execution-time.png">
</picture>

<!-- stats_executionTime -->



## Total time to respond, including coldstart

Total time to respond measures the total execution time of each SDK, including [coldstart](#coldstart-latency) or [initialization](#initialization-latency). In real-world usage, this metric represents a normalized "worst case" response time. Ideally all times should be sub-1000ms to ensure fast responses in customer hot-paths.

<picture>
  <source media="(prefers-color-scheme: dark)" alt="Benchmark statistics - Total time to respond, including coldstart" srcset="/_public/total-time-dark.png">
  <img alt="Benchmark statistics - Total time to respond, including coldstart" src="/_public/total-time.png">
</picture>

<!-- stats_totalTime -->

---

## Latest data

If you'd like to dig deeper, here's the data from the latest performance run:

- [Raw, unparsed results](https://performanceproduction-assetsbucket-1xqwku8953q8m.s3.us-west-2.amazonaws.com/latest-results.json)
- [Parsed results](https://performanceproduction-assetsbucket-1xqwku8953q8m.s3.us-west-2.amazonaws.com/latest-results-parsed.json)
