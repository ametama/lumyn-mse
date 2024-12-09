import { Router } from "express";
import { body, required } from "../util/body";
import { PgDriver } from "../database/PgDriver";

export function login(api: Router, db: PgDriver) {
    api.get("/login", body({
        "username": required("string"),
        "password": required("string")
    }), async (req, res) => {
        let token;
        try {
            token = await db.session.login(req.body.username, req.body.password);
        } catch (e) {
            if (e === "user_not_found") {
                res.sendStatus(401);
                return;
            }
            res.sendStatus(500);
            return;
        }
        res.status(200).send({
            err: null,
            data: token
        });
    });
}
