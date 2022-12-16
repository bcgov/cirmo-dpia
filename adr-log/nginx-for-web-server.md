# Using Nginx as Frontend serving (Web) server

- status: Accepted
- Proposers: Kushal Arora
- Deciders (war room chat members) - Adam Kroon, Anthony Shivakumar, Bing Gao, Brandon Bouchard, Kushal Arora
- Date of Proposal: Dec 05, 2022

Technical Story: [UTOPIA-565](https://apps.itsm.gov.bc.ca/jira/browse/UTOPIA-565)

## Context and Problem Statement

When the user refreshes the page, being on a the subpath of the application (and not the landing page), for instance - /ppq, then the app throws a 404 error.

## Considered Options

- [serve](https://www.npmjs.com/package/serve) -> leveraging existing tool serving the web distribution
- [Nginx](https://www.nginx.com/)

## Decision Outcome

Chose option: `Nginx`

Our existing solution, `serve` could also solve the problem statement by merely adding `-s` to the execution command, making it ready for routing the single page applications and redirect any subpaths to the distribution index.html.

The reason `Nginx` was chosen was because in addition to supporting 404s redirect to the index, this also provided a stable & much reliable long-term solution.

In addition, the team was also comfortable with a much versatile and highly configurable Nginx solution, versus the existing - a rather simple static server. The idea is to have a proven, resilient and extremely stable tool in place as we scale the application.

## Positive Consequences

- Fast, Future-proof, proven, highly secure and a configurable solution

## Negative Consequences

- None, except one time initial setup time for a multi-stage Docker container

## Additional Links

- https://stackoverflow.com/a/43557288
