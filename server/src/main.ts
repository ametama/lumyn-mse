import express from "express";
import YAML from "yaml";
import { readFileSync } from "node:fs";
import { api } from "./api";
import { PgDriver } from "./database/PgDriver";

async function main() {
    const cfg = YAML.parse(readFileSync("/etc/lumynmse.yml").toString());
    const db = await PgDriver(cfg.postgres);
    const app = express();
    app.use(express.json());
    api(app, db);
    app.listen(cfg.port, () => console.log(`Listening on port ${cfg.port}!`));
}

main();
