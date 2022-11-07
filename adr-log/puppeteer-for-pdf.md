# Using Puppeteer for PDF creation

* Status: Accepted
* Proposers: Kushal Arora
* Deciders (Meeting attendees): Adam Kroon, Will Sonnex, Bing Gao, Brandon Bouchard, Kushal Arora
* Date of Proposal: 2022-10-24

Technical Story: [UTOPIA-273](https://apps.itsm.gov.bc.ca/jira/browse/UTOPIA-273)

## Context and Problem Statement

When the user submits a PPQ form, the app should provide an ability to export the filled information and the result to the pdf format. Check the above story for more information.

## Considered Options

* [PDFKit](https://www.npmjs.com/package/pdfkit) -> Have built in methods to create PDF documents and works well for static pdf builders, however it does not support ability to render html or markdowns
* [jsPDF](https://www.npmjs.com/package/jspdf) ->  Did not work for rendering HTML content on Node
* [html2canvas](https://www.npmjs.com/package/html2canvas) -> Frontend library
* [wkhtmltopdf](https://www.npmjs.com/package/wkhtmltopdf) -> Application failure when trying to run
* [PhantomJS](https://www.npmjs.com/package/phantomjs) -> Deprecated
* [PDFjs](https://www.npmjs.com/package/pdfjs) -> Primarily a frontend library
* [Puppeteer](https://www.npmjs.com/package/puppeteer) -> Headless chrome implementation - ideal for automated testing and pdf generation

## Decision Outcome

Chosen option: `Puppeteer`, because it suffices the need of creating PDF while taking into account the dynamic inputs from user forms as markdown. In addition to it, below are other considerations:
- It supports html as input 
- It support markdowns
- Not deprecated
- No audit vulnerabilities
- Can be used with `pug`, a template engine - to keep pdf template highly extendable
- Can be used with `marked`, a Markdown parser - to support parsing of our stored markdown data

Considering all the parameters, even though with a little overhead of setting it up on Docker, Puppeteer comes out to be our best solution.

## Positive Consequences

* Extendable solution - Template-ized for usage in other parts of the application as well
* We can continue to define PDF content using HTML, which the development team is comfortable writing

## Negative Consequences

* One time setup overhead combined with Docker user permissions complications
* Overhead of running additional packages in every docker API deployment containers scaled horizontally

## Solution to Negative Consequences

The puppeteer pdf generation code should be moved away as it's own microservice and limiting the scaling as only needed by the download functionality(ies).

## Links

* https://www.npmjs.com/package/puppeteer
* https://www.bannerbear.com/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/
* https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/

