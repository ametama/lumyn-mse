import { Express, Router } from "express";
import { login } from "./login";
import { PgDriver } from "../database/PgDriver";

export function api(app: Express, db: PgDriver) {
    const apiApplets = [login];
    const apiRouter = Router();
    apiApplets.forEach((applet) => applet(apiRouter, db));
    app.use("/api", apiRouter);
}
