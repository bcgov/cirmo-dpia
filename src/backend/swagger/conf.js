const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Digital Privacy Impact Assessment API",
        version: "1",
        description: `## OpenAPI Specifiation for the following:
                      \n - available endpoints, endpoint operations and operation parameters (input and output)
                      \n - authentication methods to utilize this API
                      \n - contact information, license, terms of use and other information regarding the consumption of this API`,
      },
      tags: {},
      components: {},
    },
    apis: [
      `${__dirname}/../server.js`,
      `${__dirname}/../versions/v1/routes/healthcheck.js`,
    ],
  };

  const uiOptions = {
    customSiteTitle: "HWP Swagger Docs",
    customCss: `
    .topbar-wrapper img {content:url(https://www2.gov.bc.ca/StaticWebResources/static/gov3/images/gov_bc_logo.svg); width:190px; height:auto;}
    .swagger-ui .topbar { background-color: #234075; border-bottom: 2px solid #e3a82b; }`,
  };
  
  const specs = swaggerJsDoc(swaggerOptions);
  
  module.exports = { specs, uiOptions };
