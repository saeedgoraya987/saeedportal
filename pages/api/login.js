// Server-side login: checks credentials and sets an HttpOnly cookie

import crypto from "crypto";

const COOKIE_NAME = "usp_auth";

function sign(value, secret) {
  const sig = crypto.createHmac("sha256", secret).update(value).digest("hex");
  return `${value}.${sig}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { username, password } = req.body || {};
  const USER = process.env.LOGIN_USER || "admin";
  const PASS = process.env.LOGIN_PASS || "1234";
  const SECRET = process.env.AUTH_SECRET || "change-me-please";

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "Missing credentials" });
  }

  if (username !== USER || password !== PASS) {
    return res.status(401).json({ ok: false, error: "Invalid username or password" });
  }

  // Minimal session payload
  const payload = JSON.stringify({ u: username, iat: Date.now() });
  const signed = sign(Buffer.from(payload).toString("base64"), SECRET);

  const isProd = process.env.NODE_ENV === "production";
  const maxAge = 60 * 60 * 12; // 12h

  res.setHeader("Set-Cookie", [
    `${COOKIE_NAME}=${signed}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; ${
      isProd ? "Secure;" : ""
    }`
  ]);

  return res.status(200).json({ ok: true });
}
