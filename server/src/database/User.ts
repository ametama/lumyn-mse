import { Snowflake } from "../util/snowflake";

export interface User {
    id: Snowflake;
    username: string;
}

export function User({ id, username }: { id: string, username: string }): User {
    return { id, username };
}
