import type { Context } from "https://edge.netlify.com";
import { connect } from "https://unpkg.com/@planetscale/database@^1.1";

export default async function handler() {
  const conn = connect({
    host: Deno.env.get("PLANETSCALE_HOST"),
    username: Deno.env.get("PLANETSCALE_USERNAME"),
    password: Deno.env.get("PLANETSCALE_PASSWORD"),
  });

  const response = await conn.execute("SELECT * FROM guests;", []);

  const guests = response.rows

  const json = JSON.stringify(guests);

  return new Response(json, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "access-control-allow-origin": "*",
    },
  });
}
