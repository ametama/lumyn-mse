import { Client, ClientConfig } from "pg";
import { compare } from "bcrypt";
import { randomBytes } from "node:crypto";
import { snowflakeGenerator } from "../util/snowflake";
import { User } from "./User";

type Token = string;
export interface PgDriver {
    session: {
        login: (username: string, password: string) => Promise<Token>;
        authorize: (token: string) => Promise<User>;
    }
}

export async function PgDriver(cfg: ClientConfig): Promise<PgDriver> {
    const snowflake = snowflakeGenerator();
    const client = new Client(cfg);
    await client.connect();
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id bigint PRIMARY KEY,
            username varchar(36) UNIQUE NOT NULL,
            password_hash varchar(60)
        );
        CREATE TABLE IF NOT EXISTS sessions (
            id bigint PRIMARY KEY,
            user_id bigint REFERENCES users(id) ON DELETE CASCADE,
            token text NOT NULL
        );
    `);
    return {
        session: {
            login: async (username, password) => {
                const { rows } = await client.query<{ id: string, password_hash: string }>("SELECT id, password_hash FROM users WHERE username = $1::text;", [username]);
                if (rows.length === 0) throw "user_not_found";
                if (!(await compare(password, rows[0].password_hash))) throw "user_password_incorrect";
                const token = randomBytes(32).toString("base64");
                await client.query("INSERT INTO sessions VALUES ($1::bigint, $2::bigint, $3::text);", [snowflake(), rows[0].id, token]);
                return token;
            },
            authorize: async (token) => {
                const { rows } = await client.query<{ id: string, username: string }>("SELECT u.id AS id, u.username AS username FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = $1::text;", [token]);
                if (rows.length === 0) throw "token_invalid";
                return User(rows[0]);
            }
        }
    };
}
