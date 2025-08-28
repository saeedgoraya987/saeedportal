import crypto from "crypto";

const COOKIE_NAME = "usp_auth";

function verify(signed, secret) {
  if (!signed || !signed.includes(".")) return null;
  const [val, sig] = signed.split(".");
  const expected = crypto.createHmac("sha256", secret).update(val).digest("hex");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    return JSON.parse(Buffer.from(val, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const SECRET = process.env.AUTH_SECRET || "change-me-please";
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const signed = match ? match[1] : null;
  const session = verify(signed, SECRET);
  if (!session) return res.status(200).json({ ok: false, loggedIn: false });

  return res.status(200).json({ ok: true, loggedIn: true, user: session.u || null });
}
