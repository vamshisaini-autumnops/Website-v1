import React, { useState } from "react";
import { CaptureVisual, ConnectVisual, UpdateVisual } from "./StageVisuals";

type Kind =
  | "arrow"
  | "document"
  | "box"
  | "link"
  | "check"
  | "store"
  | "close"
  | "menu";
function Icon({ kind, className = "" }: { kind: Kind; className?: string }) {
  const paths: Record<Kind, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </>
    ),
    document: (
      <>
        <path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h6" />
      </>
    ),
    box: (
      <>
        <path d="m12 3 9 5-9 5-9-5zM3 8v9l9 5 9-5V8M12 13v9M7 5.8l9 5" />
      </>
    ),
    link: (
      <>
        <path d="m10 14 4-4M8 16l-1 1a4.2 4.2 0 0 1-6-6l5-5a4.2 4.2 0 0 1 6 0M16 8l1-1a4.2 4.2 0 0 1 6 6l-5 5a4.2 4.2 0 0 1-6 0" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    store: (
      <>
        <path d="M4 10v11h16V10M3 10l2-7h14l2 7M3 10h18M9 21v-7h6v7" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  };
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}
function LogoBackgroundBlend() {
  return (
    <svg
      className="logo-filters"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="logo-paper-blend"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2 -2 -2 0 5.8"
            result="paperRemoved"
          />
          <feComposite in="paperRemoved" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
function Brand() {
  return (
    <a className="brand approved-brand" href="/" aria-label="Autumn Ops home">
      <span className="brand-emblem">
        <img
          style={{ filter: "url(#logo-paper-blend)" }}
          src="/autumn-ops-logo.png"
          alt=""
        />
      </span>
      <span className="approved-brand-name">Autumn Ops</span>
    </a>
  );
}
function Header({ page }: { page: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header wrap">
      <Brand />
      <button
        className="menu-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        <Icon kind={open ? "close" : "menu"} />
      </button>
      <nav
        id="navigation"
        className={open ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        <a aria-current={page === "home" ? "page" : undefined} href="/">
          Home
        </a>
        <a aria-current={page === "about" ? "page" : undefined} href="/about/">
          About us
        </a>
        <a className="nav-cta" href="/#workflow">
          Our approach <Icon kind="arrow" />
        </a>
      </nav>
    </header>
  );
}
function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a className={secondary ? "button secondary" : "button"} href={href}>
      {children}
      <Icon kind="arrow" />
    </a>
  );
}
const stages = [
  {
    label: "Capture",
    eyebrow: "01 / CAPTURE",
    title: "Start with the invoice.",
    text: "Upload a PDF or a clear photo. Keep the original document connected to the data it contains.",
    tag: "Invoice uploaded",
    status: "Ready for review",
  },
  {
    label: "Connect",
    eyebrow: "02 / CONNECT",
    title: "Put every detail in context.",
    text: "Organize invoice details by distributor and store, then match line items to the right products.",
    tag: "Products matched",
    status: "Linked to store",
  },
  {
    label: "Update",
    eyebrow: "03 / UPDATE",
    title: "See what changed.",
    text: "Review new products and purchase cost changes before applying updates to your product list.",
    tag: "Changes reviewed",
    status: "Update approved",
  },
];
function ProductVisual() {
  const [step, setStep] = useState(0);
  const previews = [
    {
      name: "Invoice capture",
      heading: "From paper to information.",
      icon: "document" as Kind,
      tag: "Invoice details captured",
      detail: "Original file preserved",
      status: "Ready to review",
    },
    {
      name: "Partner connections",
      heading: "Every partner, connected....",
      icon: "link" as Kind,
      tag: "Many-to-many connections",
      detail: "Each record stays with the right partners",
      status: "Records connected",
    },
    {
      name: "Product updates",
      heading: "Changes made visible.",
      icon: "box" as Kind,
      tag: "Product list updated",
      detail: "Purchase cost history preserved",
      status: "Updates applied",
    },
  ];
  const current = previews[step];
  return (
    <div className="visual-scene">
      <div className="scene-grid" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="workspace-frame">
        <div className="workspace">
          <div className="workspace-top">
            <span className="workspace-mark">
              a<span>o</span>
            </span>
            <span>{current.name}</span>
            <span className="sample-label">ILLUSTRATIVE PREVIEW</span>
          </div>
          <div
            className="workspace-body"
            id="workflow-preview"
            role="tabpanel"
            aria-labelledby={"visual-tab-" + step}
            tabIndex={0}
          >
            <div className="workspace-heading">
              <div>
                <span className="tiny-label">{stages[step].eyebrow}</span>
                <h3>{current.heading}</h3>
              </div>
              <span className="small-icon">
                <Icon kind={current.icon} />
              </span>
            </div>
            <div className="stage-visual" key={step}>
              {step === 0 ? (
                <CaptureVisual />
              ) : step === 1 ? (
                <ConnectVisual />
              ) : (
                <UpdateVisual />
              )}
            </div>
            <div className="workspace-status" aria-live="polite">
              <span className="check-circle">
                <Icon kind="check" />
              </span>
              <div>
                <strong>{current.tag}</strong>
                <small>{current.detail}</small>
              </div>
              <span className="status-pill">{current.status}</span>
            </div>
          </div>
        </div>
        <div className="floating-note">
          <span className="note-icon">
            <Icon kind={current.icon} />
          </span>
          <div>
            <strong>
              {step === 0
                ? "Capture once."
                : step === 1
                  ? "Many partners. One clear picture."
                  : "A product list that keeps up."}
            </strong>
            <small>
              {step === 0
                ? "From invoice to useful information."
                : step === 1
                  ? "Distributors ↔ Stores"
                  : "New products. Updated purchase costs."}
            </small>
          </div>
        </div>
      </div>
      <div className="visual-caption">
        <span className="caption-dot" /> Product concept · In development
      </div>
      <div
        className="visual-tabs"
        role="tablist"
        aria-label="Preview the invoice workflow"
      >
        {stages.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={i === step}
            aria-controls="workflow-preview"
            id={"visual-tab-" + i}
            tabIndex={step === i ? 0 : -1}
            onClick={() => setStep(i)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (step + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setStep(next);
                document.getElementById("visual-tab-" + next)?.focus();
              }
            }}
          >
            {String(i + 1).padStart(2, "0")} <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow infant-highlight">
            <span className="live-dot" /> CURRENTLY IN OUR INFANT PHASE
          </div>
          <h1>
            Less paperwork.
            <br />
            More <em>possibility.</em>
          </h1>
          <p className="hero-description">
            Your next chapter starts with clearer data. We’re building practical
            tools that turn everyday invoices into connected product
            information.
          </p>
          <div className="hero-actions">
            <Button href="#workflow">Explore our approach</Button>
            <a className="text-link" href="/about/">
              Meet Autumn Ops <Icon kind="arrow" />
            </a>
          </div>
          <div className="hero-footnote">
            <span className="footnote-line" />
            Built with independent stores and distributors in mind.
          </div>
        </div>
        <ProductVisual />
      </section>
      <div className="intro-strip">
        <div className="wrap">
          <p>
            Small business. <strong>Big everyday complexity.</strong>
          </p>
          <div>
            <span>Invoices</span>
            <i />
            <span>Products</span>
            <i />
            <span>Operations</span>
          </div>
        </div>
      </div>
      <GrowthJourney />
      <section className="focus-section wrap" id="focus">
        <div className="section-top">
          <div>
            <span className="eyebrow">WHAT WE’RE BUILDING</span>
            <h2>
              A little less manual.
              <br />A lot more connected.
            </h2>
          </div>
          <p>
            When information lives in paper invoices and disconnected lists,
            even a simple update becomes extra work. We’re starting there.
          </p>
        </div>
        <div className="focus-grid">
          {[
            {
              icon: "document" as Kind,
              num: "01",
              title: "Make invoices useful.",
              text: "Capture invoice details from scans, photos, and PDFs so important information can move beyond the page.",
              label: "INVOICE CAPTURE",
            },
            {
              icon: "link" as Kind,
              num: "02",
              title: "Keep the context.",
              text: "Connect each invoice to its distributor and receiving store, with the original document always close at hand.",
              label: "CONNECTED RECORDS",
            },
            {
              icon: "box" as Kind,
              num: "03",
              title: "Keep products current.",
              text: "Identify new products and purchase cost changes, with a review step before updating your product list.",
              label: "PRODUCT MANAGEMENT",
            },
          ].map((f) => (
            <article className="focus-card" key={f.num}>
              <div className="focus-card-top">
                <span className="feature-icon">
                  <Icon kind={f.icon} />
                </span>
                <span>{f.num}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="tiny-label">{f.label}</span>
            </article>
          ))}
        </div>
      </section>
      <Workflow />
      <section className="closing wrap">
        <div>
          <span className="eyebrow">OUR PURPOSE</span>
          <h2>
            Practical technology.
            <br />
            <em>Everyday impact.</em>
          </h2>
        </div>
        <div>
          <p>
            We believe better operations should be within reach for the
            businesses that keep our communities moving.
          </p>
          <Button href="/about/">Get to know Autumn Ops</Button>
        </div>
      </section>
    </>
  );
}
function GrowthJourney() {
  const phases = ["Infant", "Baby", "Toddler", "Teenage", "Adulthood"];
  return (
    <section className="growth-section wrap" aria-labelledby="growth-heading">
      <div className="growth-intro">
        <div>
          <span className="eyebrow">OUR GROWTH JOURNEY</span>
          <h2 id="growth-heading">
            We’re in our <em>infant phase.</em>
          </h2>
        </div>
        <p>
          Every journey starts somewhere. We’re developing our first prototype,
          with more chapters ahead as Autumn Ops grows.
        </p>
      </div>
      <ol className="growth-phases" aria-label="Autumn Ops growth phases">
        {phases.map((phase, i) => (
          <li
            key={phase}
            className={i === 0 ? "growth-phase current" : "growth-phase"}
            aria-current={i === 0 ? "step" : undefined}
          >
            <span className="phase-dot">
              {i === 0 ? <span /> : String(i + 1).padStart(2, "0")}
            </span>
            <strong>{phase}</strong>
            <span className="phase-state">
              {i === 0 ? "WE ARE HERE" : "AHEAD"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
function Workflow() {
  const [active, setActive] = useState(0);
  return (
    <section className="workflow-section" id="workflow">
      <div className="wrap workflow-layout">
        <div className="workflow-intro">
          <span className="eyebrow">THE APPROACH</span>
          <h2>
            One invoice.
            <br />A clearer picture.
          </h2>
          <p>
            A simple path from an everyday document to information you can
            actually use.
          </p>
          <div className="development-note">
            <span className="live-dot" /> Our first product is in development.
          </div>
        </div>
        <div className="workflow-steps">
          {stages.map((s, i) => (
            <div
              key={s.label}
              className={
                active === i ? "workflow-step active" : "workflow-step"
              }
            >
              <button
                aria-expanded={active === i}
                aria-controls={"step-panel-" + i}
                onClick={() => setActive(i)}
              >
                <span className="step-number">0{i + 1}</span>
                <span>{s.title}</span>
                <span className="step-toggle">{active === i ? "−" : "+"}</span>
              </button>
              <div id={"step-panel-" + i} hidden={active !== i}>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
          <p className="workflow-note">
            <Icon kind="check" /> A human review stays part of the process.
          </p>
        </div>
      </div>
    </section>
  );
}
function About() {
  return (
    <>
      <section className="about-hero wrap">
        <span className="eyebrow">ABOUT AUTUMN OPS</span>
        <h1>
          Built around the work
          <br />
          that happens <em>every day.</em>
        </h1>
        <div className="about-hero-bottom">
          <p>
            We’re building a simpler way for stores and distributors to turn
            everyday business information into useful, connected records.
          </p>
          <span className="about-signature">
            Rooted in Michigan.
            <br />
            <strong>Looking ahead.</strong>
          </span>
        </div>
      </section>
      <section className="about-story wrap">
        <div className="mission-art">
          <span className="tiny-label">THE AUTUMN OPS IDEA</span>
          <div className="art-ring ring-a" />
          <div className="art-ring ring-b" />
          <div className="art-leaf approved-art">
            <img
              style={{ filter: "url(#logo-paper-blend)" }}
              src="/autumn-ops-logo.png"
              alt="Autumn Ops logo: orange maple leaf with an A and integration link, above the company name"
            />
          </div>
          <p>
            A new season.
            <br />
            <em>A clearer way forward.</em>
          </p>
        </div>
        <div className="story-copy">
          <span className="eyebrow">WHY WE STARTED</span>
          <h2>
            Good businesses deserve
            <br />
            better everyday tools.
          </h2>
          <p>
            Running a store means keeping track of a lot: deliveries, invoices,
            products, and changing costs. Too often, the same information has to
            be entered, checked, and updated in several places.
          </p>
          <p>
            Autumn Ops was founded to help simplify that work. Our starting
            point is invoice automation: connecting the documents businesses
            already receive to the product information they need.
          </p>
          <p>
            Our goal is straightforward—make useful technology affordable,
            understandable, and practical for small and medium businesses.
          </p>
        </div>
      </section>
      <section className="values-section wrap">
        <div className="section-top">
          <div>
            <span className="eyebrow">HOW WE THINK</span>
            <h2>
              Keep it useful.
              <br />
              Keep it within reach.
            </h2>
          </div>
          <p>
            The principles guiding what we build, from the first prototype
            onward.
          </p>
        </div>
        <div className="values-grid">
          <article>
            <span>01 / PRACTICAL FIRST</span>
            <h3>Start with real work.</h3>
            <p>
              Focus on the everyday tasks that take time and create friction.
              Solve a clear problem before adding more features.
            </p>
          </article>
          <article>
            <span>02 / CLARITY BY DESIGN</span>
            <h3>Make changes understandable.</h3>
            <p>
              Keep source documents, show proposed updates, and give people the
              context they need to stay in control.
            </p>
          </article>
          <article>
            <span>03 / COST CONSCIOUS</span>
            <h3>Build for accessibility.</h3>
            <p>
              Choose efficient technology and keep affordability central to the
              product, so smaller businesses can participate.
            </p>
          </article>
        </div>
      </section>
      <section className="roadmap-section">
        <div className="wrap roadmap-layout">
          <div>
            <span className="eyebrow">WHERE WE’RE STARTING</span>
            <h2>
              A focused first step.
              <br />
              <em>Room to grow.</em>
            </h2>
          </div>
          <div className="roadmap-copy">
            <span className="roadmap-tag">
              <span className="live-dot" /> IN DEVELOPMENT
            </span>
            <h3>Invoice-to-product workflows.</h3>
            <p>
              Our initial prototype will focus on capturing invoices, organizing
              them by distributor and store, and helping users review product
              and purchase cost updates.
            </p>
            <p>
              We’ll build on that foundation as we learn from real business
              workflows.
            </p>
            <Button href="/#workflow" secondary>
              Explore the approach
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            A <span className="tagline-fresh">fresh</span> way to run your
            business.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/">Home</a>
          <a href="/about/">About us</a>
          <a href="/#workflow">Our approach</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 AUTUMN OPS L.L.C.</span>
        <span>Practical tools. Connected operations.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
export default function App({ page }: { page: "home" | "about" }) {
  return (
    <>
      <LogoBackgroundBlend />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header page={page} />
      <main id="main">{page === "home" ? <Home /> : <About />}</main>
      <Footer />
    </>
  );
}
