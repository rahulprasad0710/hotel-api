import express from "express";

import v1 from "./v1/index.js";

const router = express.Router();

router.get("/ping", (_req, res) => {
    res.send("pong!");
});
/**
 * @swagger
 * tags:
 *   name: Check Server
 *   description: Check if the API server is working.
 */

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Check if server is working ping.
 *     description: /Ping with get response as pont.
 *     tags: [Check Server]
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.use("/v1", v1);

export default router;
