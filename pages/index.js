import Head from "next/head";

// external assets (your originals)
const LOGO = "http://paksimdatabase.serv00.net/logo.jpeg";
const LOGOUT = "http://paksimdatabase.serv00.net/logout.png";

// navigation items (label + href)
const TOOLS = [
  { label: "JAZZ DATABASE",     href: "http://paksimdatabase.serv00.net/data1.php" },
  { label: "SIM OWNERSHIP",     href: "http://paksimdatabase.serv00.net/data2.php" },
  { label: "NUMBER FINDER",     href: "http://paksimdatabase.serv00.net/data3.php" },
  { label: "NADRA FINDER",      href: "http://paksimdatabase.serv00.net/nadra.php" },
  { label: "FRANCHISE DATA",    href: "http://paksimdatabase.serv00.net/franchise.php" },
  { label: "TELENOR DATA",      href: "http://paksimdatabase.serv00.net/telenor.php" },
  { label: "ZONG DATA",         href: "http://paksimdatabase.serv00.net/zong.php" },
  { label: "UFONE DATA",        href: "http://paksimdatabase.serv00.net/ufone.php" },
  { label: "SMS BOMBER",        href: "http://paksimdatabase.serv00.net/sms.php" },
  { label: "IP TO LOCATION",    href: "http://paksimdatabase.serv00.net/ip.php" },
  { label: "IMAGE LOCATION",    href: "http://paksimdatabase.serv00.net/image.php" },
  { label: "HTML EDITOR",       href: "http://paksimdatabase.serv00.net/html.php" },
];

export default function Home() {
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
            <a
              href="https://shadowdatabase.site/api.php"
              title="Logout"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LOGOUT} alt="logout" />
            </a>
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="page">
        <div className="card">
          {/* Hero */}
          <section className="hero">
            <h1 className="title">USMAN PORTAL</h1>
            <p className="subtitle">Welcome to a cleaner, faster UI.</p>
          </section>

          {/* Alerts */}
          <div className="alerts">
            <div className="alert">Welcome To Usman Portal</div>
            <div className="alert">TEAM : PakCyberExpert</div>
          </div>

          {/* Tools Grid */}
          <section className="grid" aria-label="Tools">
            {TOOLS.map((t) => (
              <a
                key={t.label}
                href={t.href}
                className="tile"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.label}
              </a>
            ))}
          </section>

          {/* Promo links */}
          <div className="links">
            <a
              className="link-pill"
              href="https://shadowsmmpanel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Social Media Marketing Panel
            </a>
            <a
              className="link-pill"
              href="https://chat.whatsapp.com/C6475XIZlTY6IchxPRIMkK"
              target="_blank"
              rel="noopener noreferrer"
            >
              Need Help — Contact on WhatsApp
            </a>
          </div>

          {/* Marquee replacement */}
          <div className="ribbon">
            Thanks For Using UsmanPakCyberExpert Portal...!
          </div>

          <div className="footer">© {new Date().getFullYear()} USMAN PORTAL</div>
        </div>
      </main>
    </>
  );
}
