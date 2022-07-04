const express = require("express");

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/health:
 *    get:
 *      tags:
 *        - API
 *      summary: Returns "Application is healthy!" and a 200 response to be used by readiness and liveness probes
 *      responses:
 *        '200':
 *          description: Application is healthy!
 */

router.get("/api/v1/health", async (req, res) => res.status(200).send("Application is healthy!"));

module.exports = router;
