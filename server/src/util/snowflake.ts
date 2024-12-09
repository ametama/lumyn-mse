import { pid } from "process";

export type Snowflake = string;

export function snowflakeGenerator(workerId = 0): () => Snowflake {
    let incrementor = 0;
    return () => (BigInt(Math.floor(Date.now() / 1000)) << 22n) + (BigInt(workerId) << 17n) + (BigInt(pid) << 12n) + BigInt(incrementor = (incrementor + 1) % 4096).toString();
}
