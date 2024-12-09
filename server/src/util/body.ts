import { RequestHandler } from "express";

export type Primitive = string | number | boolean | null;
export type Predicate<T> = (arg: T) => boolean;

export function body<K extends string>(body: Record<K, Predicate<Primitive>>): RequestHandler {
    return (req, res, next) => {
        for (const k of Object.keys(body) as K[]) {
            if (body[k](req.body[k])) continue;
            res.status(400).send({
                err: `validation failed: \`${k}\``,
                data: null
            });
            return;
        }
        return next();
    };
}

export const eq: (p: Primitive) => Predicate<Primitive> = (t) => (arg) => t === arg;
export const required: (t: string) => Predicate<Primitive> = (t) => (arg) => typeof arg === t;
export const not: (p: Predicate<Primitive>) => Predicate<Primitive> = (p) => (arg) => !p(arg);
export const or: (...ps: Predicate<Primitive>[]) => Predicate<Primitive> = (...ps) => (arg) => ps.map((p) => p(arg)).reduce((prev, curr) => prev || curr);
export const and: (...ps: Predicate<Primitive>[]) => Predicate<Primitive> = (...ps) => (arg) => ps.map((p) => p(arg)).reduce((prev, curr) => prev && curr);
export const optional: (t: string) => Predicate<Primitive> = (t) => or(required(t), eq(null));
