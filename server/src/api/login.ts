import { Router } from "express";
import { body, required } from "../util/body";
import { PgDriver } from "../database/PgDriver";

export function login(api: Router, db: PgDriver) {
    api.get("/login", body({
        "username": required("string"),
        "password": required("string")
    }), async (req, res) => {
        const token = await db.session.login(req.body.username, req.body.password);
        res.status(200).send({
            err: null,
            data: token
        });
    });
}
