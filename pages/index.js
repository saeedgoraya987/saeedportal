import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

const LOGO = "http://paksimdatabase.serv00.net/logo.jpeg";
const LOGOUT = "http://paksimdatabase.serv00.net/logout.png";

const TOOLS = [
  { label: "JAZZ DATABASE",  href: "http://paksimdatabase.serv00.net/data1.php" },
  { label: "SIM OWNERSHIP",  href: "http://paksimdatabase.serv00.net/data2.php" },
  { label: "NUMBER FINDER",  href: "http://paksimdatabase.serv00.net/data3.php" },
  { label: "NADRA FINDER",   href: "http://paksimdatabase.serv00.net/nadra.php" },
  { label: "FRANCHISE DATA", href: "http://paksimdatabase.serv00.net/franchise.php" },
  { label: "TELENOR DATA",   href: "http://paksimdatabase.serv00.net/telenor.php" },
  { label: "ZONG DATA",      href: "http://paksimdatabase.serv00.net/zong.php" },
  { label: "UFONE DATA",     href: "http://paksimdatabase.serv00.net/ufone.php" },
  { label: "SMS BOMBER",     href: "http://paksimdatabase.serv00.net/sms.php" },
  { label: "IP TO LOCATION", href: "http://paksimdatabase.serv00.net/ip.php" },
  { label: "IMAGE LOCATION", href: "http://paksimdatabase.serv00.net/image.php" },
  { label: "HTML EDITOR",    href: "http://paksimdatabase.serv00.net/html.php" }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // login form
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/session");
        const j = await r.json();
        setLoggedIn(!!j.loggedIn);
        setUser(j.user || null);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const canSubmit = useMemo(() => u.trim() && p.trim(), [u, p]);

  async function onLogin(e) {
    e?.preventDefault?.();
    setErr("");
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u.trim(), password: p })
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "Invalid username or password");
      const s = await fetch("/api/session").then((r) => r.json());
      setLoggedIn(!!s.loggedIn);
      setUser(s.user || null);
      setU(""); setP("");
    } catch (e2) {
      setErr(e2.message || "Login failed");
    }
  }

  async function onLogout() {
    try { await fetch("/api/logout"); } catch {}
    setLoggedIn(false);
    setUser(null);
  }

  return (
    <>
      <Head>
        <title>USMAN PORTAL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a
            href="https://shadowdatabase.site/api.php"
            className="brand"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LOGO} alt="logo" />
            <span>USMAN PORTAL</span>
          </a>
          <div className="header-actions">
            {loggedIn ? (
              <button
                onClick={onLogout}
                title="Logout"
                style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0 }}
              >
                <img src={LOGOUT} alt="logout" />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="page">
        <div className="card" style={{ maxWidth: loggedIn ? 1100 : 460, width: "100%" }}>
          {!loggedIn ? (
            <>
              <section className="hero" style={{ paddingBottom: 8 }}>
                <h1 className="title">Login</h1>
                <p className="subtitle">Enter your credentials to access the portal.</p>
              </section>

              <form onSubmit={onLogin} style={{ marginTop: 14 }}>
                <div style={{ display: "grid", gap: 12 }}>
                  <input
                    className="input"
                    placeholder="Username"
                    value={u}
                    onChange={(e) => setU(e.target.value)}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="username"
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      className="input"
                      placeholder="Password"
                      type={show ? "text" : "password"}
                      value={p}
                      onChange={(e) => setP(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(s => !s)}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 8,
                        border: 0,
                        background: "transparent",
                        fontWeight: 700,
                        cursor: "pointer",
                        color: "#64748b"
                      }}
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>

                  <button
                    className="button"
                    type="submit"
                    disabled={!canSubmit}
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg,#7c3aed,#3b82f6)",
                      boxShadow: "0 10px 24px rgba(67,56,202,.35)"
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              {err && (
                <div
                  className="alert"
                  style={{
                    marginTop: 14,
                    color: "#b91c1c",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    textAlign: "center",
                    fontWeight: 800
                  }}
                >
                  {err}
                </div>
              )}

              <div className="footer" style={{ marginTop: 16 }}>
                Tip: set <b>LOGIN_USER</b>, <b>LOGIN_PASS</b>, <b>AUTH_SECRET</b> in Vercel → Settings → Environment Variables, then redeploy.
                Defaults are <code>admin / 1234</code>.
              </div>
            </>
          ) : (
            <>
              <section className="hero">
                <h1 className="title">USMAN PORTAL</h1>
                <p className="subtitle">Welcome{user ? `, ${user}` : ""}! Clean, fast UI with 2-per-row buttons.</p>
              </section>

              <div className="alerts">
                <div className="alert">Welcome To Usman Portal</div>
                <div className="alert">TEAM : PakCyberExpert</div>
              </div>

              <section className="grid" aria-label="Tools">
                {TOOLS.map((t) => (
                  <a key={t.label} href={t.href} className="tile" target="_blank" rel="noopener noreferrer">
                    {t.label}
                  </a>
                ))}
              </section>

              <div className="links">
                <a className="link-pill" href="https://shadowsmmpanel.com/" target="_blank" rel="noopener noreferrer">
                  Social Media Marketing Panel
                </a>
                <a className="link-pill" href="https://chat.whatsapp.com/C6475XIZlTY6IchxPRIMkK" target="_blank" rel="noopener noreferrer">
                  Need Help — Contact on WhatsApp
                </a>
              </div>

              <div className="ribbon">Thanks For Using UsmanPakCyberExpert Portal...!</div>
              <div className="footer">© {new Date().getFullYear()} USMAN PORTAL</div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
