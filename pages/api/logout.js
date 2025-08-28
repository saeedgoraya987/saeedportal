// Clears the auth cookie

const COOKIE_NAME = "usp_auth";

export default async function handler(req, res) {
  const isProd = process.env.NODE_ENV === "production";
  res.setHeader("Set-Cookie", [
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${
      isProd ? "Secure;" : ""
    }`
  ]);
  res.status(200).json({ ok: true });
}
