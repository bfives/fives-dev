/* ===========================================================
   Fives Dev — Blog / Insights
   Article data + search/filter/render logic
   =========================================================== */

/* ---------- Article data ---------- */
/* Note: images use Unsplash source URLs — swap for your own later.
   slug -> article.html?slug=... */
const PUBLISHER = { name: "Fives Dev" };

const CATEGORIES = [
  "All", "Education", "Careers", "Technology", "Business",
  "Opportunities", "Money", "Opinion", "Company News"
];

const ARTICLES = [
  {
    slug: "how-to-calculate-your-aps-score",
    title: "How to Calculate Your APS Score (and Why It Matters)",
    excerpt: "Your APS score decides which courses you can apply for. Here is the simple, plain-English way to work it out and what to do if yours is low.",
    category: "Education",
    tags: ["APS", "University", "Matric"],
    date: "2026-07-24",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "why-every-graduate-should-build-a-linkedin-profile",
    title: "Why Every Graduate Should Build a LinkedIn Profile",
    excerpt: "In 2026, recruiters check LinkedIn before they even read your CV. Here is how to set yours up properly in under an hour.",
    category: "Careers",
    tags: ["LinkedIn", "Graduates", "Job Search"],
    date: "2026-07-22",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "best-free-it-courses-in-2026",
    title: "Best Free IT Courses in 2026 (With Real Certificates)",
    excerpt: "Free courses from Cisco, Google and Microsoft that come with a certificate you can put on your CV, no hidden fees.",
    category: "Education",
    tags: ["Free Courses", "IT", "Certifications"],
    date: "2026-07-19",
    readingTime: 9,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "how-much-does-a-website-cost-in-south-africa",
    title: "How Much Does a Website Cost in South Africa?",
    excerpt: "From R3,000 starter sites to a full e-commerce builds. An honest breakdown of website prices for SA small businesses.",
    category: "Business",
    tags: ["Web Development", "Pricing", "Small Business"],
    date: "2026-07-17",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "the-graduate-employment-crisis",
    title: "The Graduate Employment Crisis: Why a Degree Is No Longer Enough",
    excerpt: "Thousands of South African graduates cannot find work. What is really going on and what students can do differently while still studying.",
    category: "Opinion",
    tags: ["Graduates", "Opinion", "Unemployment"],
    date: "2026-07-15",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "why-do-entry-level-jobs-require-experience",
    title: "Why Do Entry-Level Jobs Require Experience?",
    excerpt: "It is the great paradox of the SA job market. Here is why it happens, and three ways to get real experience before your first job.",
    category: "Opinion",
    tags: ["Careers", "Opinion", "Entry Level"],
    date: "2026-07-13",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "building-fives-dev-while-studying",
    title: "Building Fives Dev While Studying Full-Time",
    excerpt: "Why I started Fives Dev, what I learned in the first year, and what I would tell any student trying to build something on the side.",
    category: "Opinion",
    tags: ["Entrepreneurship", "Student Life", "Fives Dev"],
    date: "2026-07-10",
    readingTime: 9,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "how-ai-is-changing-student-careers",
    title: "How AI Is Changing Student Careers (And What Skills Still Matter)",
    excerpt: "AI will not take your job but someone using AI might. Here is how to future-proof yourself as a student in 2026.",
    category: "Technology",
    tags: ["AI", "Careers", "Future of Work"],
    date: "2026-07-08",
    readingTime: 9,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "how-to-build-an-ats-friendly-cv",
    title: "How to Build an ATS-Friendly CV That Actually Gets Read",
    excerpt: "Most CVs are rejected by software before a human sees them. Learn the exact layout, fonts and keywords that pass the scanners.",
    category: "Careers",
    tags: ["CV", "ATS", "Job Search"],
    date: "2026-07-05",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "top-internship-websites-south-africa",
    title: "Top Internship Websites for South African Students",
    excerpt: "Stop scrolling through ten different sites. These are the platforms that consistently list real internships in SA.",
    category: "Opportunities",
    tags: ["Internships", "Job Search", "Students"],
    date: "2026-07-03",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "student-budgeting-guide",
    title: "The Student Budgeting Guide That Actually Works",
    excerpt: "A simple three-account system that helps students survive the month without borrowing from friends by week two.",
    category: "Money",
    tags: ["Budgeting", "Students", "Finance"],
    date: "2026-07-01",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "university-vs-tvet",
    title: "Choosing Between University and TVET: The Honest Comparison",
    excerpt: "Neither one is better. Both work for different people. Here is how to figure out which path fits you.",
    category: "Education",
    tags: ["University", "TVET", "Careers"],
    date: "2026-06-28",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "nsfas-application-mistakes",
    title: "The 5 NSFAS Mistakes That Get Your Application Rejected",
    excerpt: "Most rejections happen for silly reasons. Fix these before you submit and you dramatically improve your chances.",
    category: "Education",
    tags: ["NSFAS", "Funding", "University"],
    date: "2026-06-25",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "how-to-write-a-cover-letter",
    title: "How to Write a Cover Letter That Doesn't Sound Like Everyone Else's",
    excerpt: "The tired template versus a cover letter recruiters actually finish reading with a real example inside.",
    category: "Careers",
    tags: ["Cover Letter", "Job Search"],
    date: "2026-06-22",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "side-hustles-for-students",
    title: "8 Realistic Side Hustles for South African Students",
    excerpt: "No get-rich-quick nonsense. Real ways students are earning R500 to R5,000 a month while studying.",
    category: "Money",
    tags: ["Side Hustles", "Students", "Freelancing"],
    date: "2026-06-19",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "cybersecurity-basics-for-students",
    title: "Cybersecurity Basics Every Student Should Know",
    excerpt: "Password managers, 2FA and phishing scams the five habits that will protect your accounts for the rest of your life.",
    category: "Technology",
    tags: ["Cybersecurity", "Students"],
    date: "2026-06-16",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "starting-a-small-business-in-sa",
    title: "Starting a Small Business in South Africa: The First 90 Days",
    excerpt: "Company registration, tax, banking and your first sale. A practical checklist for aspiring SA founders.",
    category: "Business",
    tags: ["Entrepreneurship", "Small Business"],
    date: "2026-06-13",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "learnerships-vs-internships",
    title: "Learnerships vs Internships: What's the Difference?",
    excerpt: "Both give you experience, but they are very different beasts. Here is which one is right for your stage.",
    category: "Opportunities",
    tags: ["Learnerships", "Internships"],
    date: "2026-06-10",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "programming-languages-to-learn-in-2026",
    title: "Which Programming Language Should You Learn in 2026?",
    excerpt: "Python, JavaScript, or something else? An honest guide for beginners based on what companies are actually hiring for.",
    category: "Technology",
    tags: ["Programming", "Web Development"],
    date: "2026-06-07",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "branding-basics-for-small-businesses",
    title: "Branding Basics for South African Small Businesses",
    excerpt: "A logo is not a brand. Here is how to build a brand that customers actually remember.",
    category: "Business",
    tags: ["Branding", "Marketing", "Small Business"],
    date: "2026-06-04",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "fives-dev-launches-past-papers-hub",
    title: "We Just Launched a Free NSC Past Papers Hub",
    excerpt: "One place to download matric past papers by year and subject. No signup, no ads, just PDFs.",
    category: "Company News",
    tags: ["Announcement", "Free Tools"],
    date: "2026-06-01",
    readingTime: 3,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=70&auto=format&fit=crop"
  },
  {
    slug: "freelancing-as-a-student",
    title: "Freelancing While You Study: A Beginner's Playbook",
    excerpt: "How to land your first R500 gig on Fiverr or Upwork without a fancy portfolio.",
    category: "Money",
    tags: ["Freelancing", "Students", "Side Hustles"],
    date: "2026-05-28",
    readingTime: 9,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=70&auto=format&fit=crop"
  }
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

function articleUrl(a){ return `article.html?slug=${encodeURIComponent(a.slug)}`; }

const OPINION_SLUGS = [
  "the-graduate-employment-crisis",
  "why-do-entry-level-jobs-require-experience",
  "building-fives-dev-while-studying"
];

function metaLine(a){
  const byline = OPINION_SLUGS.includes(a.slug)
    ? `<span>By <a href="author.html">Bayede Mthethwa</a></span><span class="dot">•</span>`
    : "";
  return `
    <div class="meta">
      ${byline}
      <time datetime="${a.date}">${formatDate(a.date)}</time>
      <span class="dot">•</span>
      <span>${a.readingTime} min read</span>
    </div>`;
}

/* ---------- Rendering ---------- */
function renderChips(container, onChange){
  container.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="chip${i === 0 ? " is-active" : ""}" data-cat="${c}" type="button">${c}</button>`
  ).join("");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    $$(".chip", container).forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    onChange(btn.dataset.cat);
  });
}

function renderCard(a){
  return `
    <article class="article-card">
      <a class="media" href="${articleUrl(a)}" aria-label="${a.title}">
        <img src="${a.image}" alt="${a.title}" loading="lazy">
      </a>
      <div class="body">
        <span class="cat-badge">${a.category}</span>
        <h3><a href="${articleUrl(a)}">${a.title}</a></h3>
        <p class="excerpt">${a.excerpt}</p>
        ${metaLine(a)}
        <a class="continue" href="${articleUrl(a)}">Continue reading</a>
      </div>
    </article>`;
}

function renderGrid(container, list, countEl){
  if (countEl) countEl.textContent = `${list.length} article${list.length === 1 ? "" : "s"}`;
  if (!list.length){
    container.innerHTML = `
      <div class="empty-state">
        <strong>No articles found</strong>
        Try a different search term or category.
      </div>`;
    return;
  }
  container.innerHTML = list.map(renderCard).join("");
}

/* ---------- Search + filter state ---------- */
function initBlogListing(){
  const searchEl = $("#blog-search");
  const clearBtn = $("#blog-search-clear");
  const chipsEl  = $("#blog-chips");
  const gridEl   = $("#blog-grid");
  const countEl  = $("#blog-count");
  if (!gridEl) return;

  let state = { query: "", category: "All" };

  const apply = () => {
    const q = state.query.trim().toLowerCase();
    const cat = state.category;
    const filtered = ARTICLES.filter(a => {
      const matchesCat = cat === "All" || a.category === cat;
      if (!q) return matchesCat;
      const hay = [
        a.title, a.excerpt, a.category,
        ...(a.tags || [])
      ].join(" ").toLowerCase();
      return matchesCat && hay.includes(q);
    });

    renderGrid(gridEl, filtered, countEl);
  };

  renderChips(chipsEl, (cat) => { state.category = cat; apply(); });

  searchEl.addEventListener("input", (e) => {
    state.query = e.target.value;
    searchEl.parentElement.classList.toggle("has-value", !!state.query);
    apply();
  });
  clearBtn.addEventListener("click", () => {
    searchEl.value = "";
    state.query = "";
    searchEl.parentElement.classList.remove("has-value");
    searchEl.focus();
    apply();
  });

  apply();
}

/* ---------- Article page ---------- */
function initArticlePage(){
  const root = $("#article-root");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const idx = ARTICLES.findIndex(a => a.slug === slug);
  const article = idx >= 0 ? ARTICLES[idx] : ARTICLES[0];

  const prev = ARTICLES[idx - 1];
  const next = ARTICLES[idx + 1];

  document.title = `${article.title} — Fives Dev Insights`;
  const desc = article.excerpt;
  const setMeta = (sel, val) => {
    let el = document.querySelector(sel);
    if (!el) {
      const m = sel.match(/\[(name|property)="([^"]+)"\]/);
      if (!m) return;
      el = document.createElement("meta");
      el.setAttribute(m[1], m[2]);
      document.head.appendChild(el);
    }
    el.setAttribute("content", val);
  };
  const articleCanonical = "https://fivesdev.co.za/article.html?slug=" + article.slug;
  const canonEl = document.querySelector('link[rel="canonical"]') || (() => {
    const l = document.createElement("link"); l.setAttribute("rel", "canonical"); document.head.appendChild(l); return l;
  })();
  canonEl.setAttribute("href", articleCanonical);
  setMeta('meta[property="og:url"]', articleCanonical);
  setMeta('meta[name="description"]', desc);
  setMeta('meta[property="og:title"]', article.title);
  setMeta('meta[property="og:description"]', desc);
  setMeta('meta[property="og:image"]', article.image);
  setMeta('meta[name="twitter:title"]', article.title);
  setMeta('meta[name="twitter:description"]', desc);
  setMeta('meta[name="twitter:image"]', article.image);

  // JSON-LD BlogPosting
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": desc,
    "image": article.image,
    "datePublished": article.date,
    "author": { "@type": "Organization", "name": PUBLISHER.name },
    "publisher": { "@type": "Organization", "name": PUBLISHER.name },
    "mainEntityOfPage": location.href
  };
  const ldEl = document.createElement("script");
  ldEl.type = "application/ld+json";
  ldEl.textContent = JSON.stringify(ld);
  document.head.appendChild(ldEl);

  // Content — unique per article, from js/blog-content.js
  const BODIES = (typeof ARTICLE_BODIES !== "undefined") ? ARTICLE_BODIES : {};
  const body = BODIES[article.slug] || `
    <p class="lede">${article.excerpt}</p>
    <h2 id="coming-soon">This one is still being written</h2>
    <p>The full article is on the way. In the meantime, have a look at the
    <a href="blog.html">latest Insights</a>.</p>
  `;

  // TOC is generated from the article's own h2 headings, so every page differs.
  const toc = [];
  const tocParser = document.createElement("div");
  tocParser.innerHTML = body;
  tocParser.querySelectorAll("h2").forEach((h, i) => {
    if (!h.id) h.id = "section-" + (i + 1);
    toc.push({ id: h.id, label: h.textContent.trim() });
  });
  const bodyHtml = tocParser.innerHTML;


  root.innerHTML = `
    <div class="reading-progress" id="reading-progress"></div>

    <section class="article-hero">
      <div class="wrap">
        <a href="blog.html" class="back-link">← Back to Insights</a>
        <span class="cat-badge">${article.category}</span>
        <h1>${article.title}</h1>
        ${metaLine(article)}
      </div>
    </section>

    <div class="article-cover">
      <img src="${article.image}" alt="${article.title}" loading="eager">
    </div>

    <section class="article-body-wrap">
      <div class="wrap">
        <div class="article-layout">
          <aside class="toc" aria-label="Table of contents">
            <h4>On this page</h4>
            ${toc.map(t => `<a href="#${t.id}">${t.label}</a>`).join("")}
          </aside>

          <div>
            <article class="article-content">
              ${bodyHtml}
            </article>

            <div class="share-bar" aria-label="Share this article">
              <span>Share</span>
              <button class="share-btn" data-share="twitter" aria-label="Share on Twitter">𝕏</button>
              <button class="share-btn" data-share="facebook" aria-label="Share on Facebook">f</button>
              <button class="share-btn" data-share="linkedin" aria-label="Share on LinkedIn">in</button>
              <button class="share-btn" data-share="whatsapp" aria-label="Share on WhatsApp">✆</button>
              <button class="share-btn" data-share="copy" aria-label="Copy link">🔗</button>
            </div>

            <div class="prev-next">
              ${prev ? `
                <a href="${articleUrl(prev)}" class="prev">
                  <div class="kicker">← Previous</div>
                  <div class="title">${prev.title}</div>
                </a>` : `<span></span>`}
              ${next ? `
                <a href="${articleUrl(next)}" class="next">
                  <div class="kicker">Next →</div>
                  <div class="title">${next.title}</div>
                </a>` : `<span></span>`}
            </div>

            <div class="newsletter">
              <h3>Get the next article in your inbox</h3>
              <p>One short email when we publish something new. No spam, unsubscribe anytime.</p>
              <form id="newsletter-form">
                <input type="email" id="newsletter-email" required placeholder="you@example.com" aria-label="Email address">
                <input type="text" id="newsletter-gotcha" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; opacity:0;">
                <button type="submit">Subscribe</button>
              </form>
              <p id="newsletter-msg" style="display:none; color:var(--primary-light); font-weight:600; margin-top:8px;">Thanks, you're on the list.</p>
            </div>

            <section class="comments" aria-label="Comments">
              <h3>Comments</h3>
              <p style="color:var(--muted); margin:0 0 12px;">Join the conversation, be respectful and constructive.</p>
              <input type="text" id="comment-name" placeholder="Your name (optional)" aria-label="Your name" style="width:100%; padding:10px 14px; border:1px solid var(--blog-line); border-radius:10px; font:400 15px/1.5 var(--font-sans); color:var(--text); background:var(--bg-soft); margin-bottom:10px;">
              <textarea placeholder="Share your thoughts..." aria-label="Write a comment"></textarea>
              <div class="comment-actions">
                <button class="btn btn-primary" type="button" id="post-comment">Post comment</button>
              </div>
              <ul class="comment-list" id="comment-list">
                <li style="padding:14px 0; color:var(--muted); font-size:14.5px;">Loading comments...</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="related-wrap">
      <div class="wrap">
        <h2>Related articles</h2>
        <div class="article-grid" id="related-grid"></div>
      </div>
    </section>
  `;

  // Related: same category, excluding current
  const related = ARTICLES.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3);
  const fallback = ARTICLES.filter(a => a.slug !== article.slug).slice(0, 3);
  $("#related-grid").innerHTML = (related.length ? related : fallback).map(renderCard).join("");

  // Reading progress
  const bar = $("#reading-progress");
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = `${Math.min(100, Math.max(0, scrolled * 100))}%`;
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Share buttons
  const shareUrl = encodeURIComponent(location.href);
  const shareText = encodeURIComponent(article.title);
  const urls = {
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`
  };
  $$(".share-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const kind = btn.dataset.share;
      if (kind === "copy"){
        try { await navigator.clipboard.writeText(location.href); btn.textContent = "✓"; setTimeout(()=>btn.textContent="🔗",1500); }
        catch { alert("Copy failed"); }
      } else {
        window.open(urls[kind], "_blank", "noopener,width=600,height=520");
      }
    });
  });

 // Newsletter signup (collects emails via Formspree, you send manually)
  const newsletterForm = $("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#newsletter-email").value.trim();
      if (!email) return;
      const gotcha = $("#newsletter-gotcha");
      if (gotcha && gotcha.value) return; // honeypot: silently drop bots
      const msg = $("#newsletter-msg");
      const submitBtn = newsletterForm.querySelector("button[type=submit]");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Subscribing…"; }
      fetch("https://formspree.io/f/xoeajdjq", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, source: "Fives Dev Insights newsletter" })
      })
        .then((res) => {
          if (!res.ok) throw new Error("Formspree error");
          newsletterForm.style.display = "none";
          msg.textContent = "Thanks, you're on the list.";
          msg.style.color = "var(--primary-light)";
          msg.style.display = "block";
        })
        .catch(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Subscribe"; }
          msg.textContent = "Sorry, that didn't go through. Please try again or email info@fivesdev.co.za.";
          msg.style.color = "#c0392b";
          msg.style.display = "block";
        });
    });
  }

  // Comments (real, persisted, live via Firebase)
  function escapeHtml(str){
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function timeAgo(date){
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + (hours === 1 ? " hour ago" : " hours ago");
    const days = Math.floor(hours / 24);
    return days + (days === 1 ? " day ago" : " days ago");
  }

  function renderCommentItem(c){
    const name = c.name || "Anonymous";
    const initial = name.trim().charAt(0).toUpperCase() || "A";
    const when = (c.timestamp && c.timestamp.toDate) ? timeAgo(c.timestamp.toDate()) : "just now";
    return `
      <li class="comment-item">
        <div class="comment-avatar">${initial}</div>
        <div>
          <div><span class="name">${escapeHtml(name)}</span><span class="when">${when}</span></div>
          <p>${escapeHtml(c.text)}</p>
        </div>
      </li>`;
  }

  function loadComments(slug){
    const list = $("#comment-list");
    if (!list || !window.db) return;
    db.collection("comments")
      .where("articleSlug", "==", slug)
      .get()
      .then((snapshot) => {
        if (snapshot.empty){
          list.innerHTML = `<li style="padding:14px 0; color:var(--muted); font-size:14.5px;">Be the first to comment.</li>`;
          return;
        }
        // Sorted in the browser so no Firestore composite index is required.
        const comments = snapshot.docs
          .map(doc => doc.data())
          .sort((a, b) => {
            const ta = (a.timestamp && a.timestamp.toMillis) ? a.timestamp.toMillis() : 0;
            const tb = (b.timestamp && b.timestamp.toMillis) ? b.timestamp.toMillis() : 0;
            return tb - ta;
          });
        list.innerHTML = comments.map(renderCommentItem).join("");
      })
      .catch((err) => {
        console.error("Could not load comments", err);
        list.innerHTML = `<li style="padding:14px 0; color:var(--muted); font-size:14.5px;">Comments couldn't be loaded right now.</li>`;
      });
  }

  loadComments(article.slug);

  $("#post-comment").addEventListener("click", () => {
    const ta = $(".comments textarea");
    const nameInput = $("#comment-name");
    const text = ta.value.trim();
    if (!text || !window.db) return;

    const btn = $("#post-comment");
    btn.disabled = true;
    btn.textContent = "Posting...";

    db.collection("comments").add({
      articleSlug: article.slug,
      name: (nameInput.value.trim() || "Anonymous").slice(0, 100),
      text: text.slice(0, 2000),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      ta.value = "";
      nameInput.value = "";
      loadComments(article.slug);
    }).catch((err) => {
      console.error("Could not post comment", err);
      alert("Sorry, your comment couldn't be posted. Please try again.");
    }).finally(() => {
      btn.disabled = false;
      btn.textContent = "Post comment";
    });
  });
}


/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initBlogListing();
  initArticlePage();
  const y = document.getElementById("fd-year");
  if (y) y.textContent = new Date().getFullYear();
});
