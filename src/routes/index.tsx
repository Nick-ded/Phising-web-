import { createFileRoute } from "@tanstack/react-router";
import shieldImg from "@/assets/shield.jpg";
import threatImg from "@/assets/threat-vis.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-surface text-zinc-100 font-sans selection:bg-brand/30 antialiased relative overflow-hidden min-h-screen">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scan-line w-full h-24 opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-zinc-900/50 bg-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-brand/10 ring-1 ring-brand/20 rounded flex items-center justify-center">
              <div className="size-2.5 bg-brand rounded-full" />
            </div>
            <span className="font-mono font-medium tracking-tight text-zinc-100">PhishGuard</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hidden sm:inline text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Threat Intelligence
            </a>
            <a
              href="/PhishGuard-v18.zip"
              download="PhishGuard-v18.zip"
              className="bg-brand text-zinc-950 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ring-1 ring-brand/50 hover:brightness-110 transition-all"
            >
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add to Browser
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-[800px] relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20 mb-8">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-brand">
                System Status: Active
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-balance mb-6 max-w-[20ch]">
              Intercept threats before they reach your browser.
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-[48ch] text-pretty mb-10">
              An autonomous security layer that monitors every URL, identifying credential theft attempts in milliseconds through neural link analysis.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/PhishGuard-v18.zip"
                download="PhishGuard-v18.zip"
                className="bg-brand text-zinc-950 h-11 px-6 inline-flex items-center rounded-md font-medium ring-1 ring-brand/50 hover:brightness-105 transition-all"
              >
                Install Extension
              </a>
              <div className="flex items-center gap-3 px-4 py-2 rounded-md border border-zinc-800 bg-zinc-900/30 font-mono text-xs text-zinc-500">
                <span className="text-brand">$</span> phishguard --scan-active
              </div>
            </div>
          </div>
        </div>

        {/* Decorative shield */}
        <div className="absolute right-[-10%] top-20 hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-brand/5 blur-[120px] rounded-full" />
            <div className="relative w-[600px] aspect-square bg-zinc-900/40 rounded-full ring-1 ring-zinc-800/50 overflow-hidden">
              <div className="absolute inset-0 shield-pulse" />
              <img
                src={shieldImg}
                alt="Holographic security shield visualization"
                width={1024}
                height={1024}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-zinc-950 border-y border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              ["4.2M+", "Links Scanned"],
              ["128ms", "Avg Latency"],
              ["99.8%", "Detection Rate"],
              ["0.00kb", "Data Exported"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-mono text-zinc-100">{v}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl font-semibold leading-tight text-balance mb-4 max-w-[30ch]">
              Advanced link intelligence.
            </h2>
            <p className="text-zinc-500 max-w-[56ch] text-pretty">
              Hardware-accelerated analysis that identifies patterns in malicious infrastructure before they are reported to central databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-time URL Scanning",
                desc: "Evaluates redirects and destination content in a secure sandbox before your browser even begins to load the DOM.",
                d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z",
                d2: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
              },
              {
                title: "Safe Browsing Shield",
                desc: "Intercepts known malware distributors and blocks access to identified C2 servers instantly, preventing payload execution.",
                d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
              },
              {
                title: "Zero Data Collection",
                desc: "Local-first processing ensures your browsing history never leaves your device. All intelligence is downloaded to the edge.",
                d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-xl bg-zinc-900/20 ring-1 ring-zinc-800/50 hover:ring-brand/30 transition-all"
              >
                <div className="size-10 rounded-lg bg-zinc-900 flex items-center justify-center mb-6 ring-1 ring-zinc-800">
                  <svg className="size-4 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.d} />
                    {f.d2 && <path strokeLinecap="round" strokeLinejoin="round" d={f.d2} />}
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-3">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed text-pretty">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 border-t border-zinc-900/50 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-12">The Interception Layer</h2>
              <div className="space-y-12">
                {[
                  ["01", "Hooking the Request", "Every link clicked is routed through our local inspection engine before the browser creates a network request."],
                  ["02", "Neural Verification", "Links are analyzed for visual similarity to banking portals and credential-harvesting patterns using on-device models."],
                  ["03", "Instant Mitigation", "If a threat is detected, the browser session is isolated and the user is redirected to a safety alert."],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-6">
                    <div className="font-mono text-zinc-700 text-sm mt-1">{n}</div>
                    <div>
                      <h4 className="font-medium text-zinc-100 mb-2">{t}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed max-w-[40ch]">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={threatImg}
              alt="Browser displaying PhishGuard phishing warning"
              width={800}
              height={1000}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover bg-zinc-900 rounded-xl ring-1 ring-zinc-800/50"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 pt-20 pb-12 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="size-5 bg-brand/10 ring-1 ring-brand/20 rounded flex items-center justify-center">
                  <div className="size-2 bg-brand rounded-full" />
                </div>
                <span className="font-mono font-medium text-sm text-zinc-100">PhishGuard</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-[30ch]">
                Advanced perimeter security for the modern browser. Open-source and privacy-focused.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-500 hover:text-brand transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-brand transition-colors">Threat Reports</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-brand transition-colors">Security API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-500 hover:text-brand transition-colors">Changelog</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-brand transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-brand transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-mono text-zinc-600">© 2026 PHISHGUARD SECURE SYSTEMS. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-4">
              <span className="size-2 rounded-full bg-brand/20" />
              <span className="text-[10px] font-mono text-zinc-500">v4.8.2-STABLE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
