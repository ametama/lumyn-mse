import express from "express";
import YAML from "yaml";
import { readFileSync } from "node:fs";
import { api } from "./api";
import { PgDriver } from "./database/PgDriver";
import { User } from "./database/User";

async function main() {
    const cfg = YAML.parse(readFileSync("/etc/lumynmse.yml").toString());
    const db = await PgDriver(cfg.postgres);
    const app = express();
    app.use(express.json());
    app.use("/client", express.static("./client/dist"));
    app.get("/", (req, res) => {
        res.status(200).sendFile("./client/app.html", { root: process.cwd() });
    });
    app.use(async (req, res, next) => {
        const authHeader = req.header("Authorization");
        if (authHeader === undefined) {
            res.sendStatus(401);
            return;
        }
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer") {
            res.sendStatus(400);
            return;
        }
        let user: User;
        try {
            user = await db.session.authorize(token);
        } catch (e) {
            if (e === "token_invalid") {
                res.sendStatus(401);
                return;
            }
            res.sendStatus(500);
            return;
        }
        res.locals = { user };
        return next();
    });
    api(app, db);
    app.listen(cfg.port, () => console.log(`Listening on port ${cfg.port}!`));
}

main();
