import { useEffect, useState } from "react";

/*
  5-step onboarding demo, as a React island (no <script>, state via hooks).
  Renders the trigger button + the modal; styling is Tailwind utilities, same
  design tokens as the rest of the site. Bilingual via the `lang` prop.
*/

type Lang = "ru" | "en";

// niche ids + starter-keyword counts are language-independent; labels come from DICT
const NICHE_META = [
  { id: "ai-noco", kw: 6 },
  { id: "ai-llm", kw: 5 },
  { id: "web", kw: 8 },
  { id: "mobile", kw: 6 },
  { id: "backend", kw: 7 },
  { id: "shopify", kw: 5 },
  { id: "wp", kw: 4 },
  { id: "crm", kw: 5 },
];

// Starter keywords seeded into the input when a niche is picked. Tech terms -
// language-independent; counts match NICHE_META.kw.
const NICHE_KW: Record<string, string[]> = {
  "ai-noco": ["Zapier", "Make", "n8n", "Airtable", "no-code", "workflow automation"],
  "ai-llm": ["OpenAI", "LangChain", "RAG", "prompt engineering", "LLM"],
  "web": ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Vue", "REST API", "SaaS"],
  "mobile": ["React Native", "Flutter", "iOS", "Android", "Swift", "Kotlin"],
  "backend": ["Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL", "Redis", "microservices"],
  "shopify": ["Shopify", "Liquid", "ecommerce", "Shopify App", "theme development"],
  "wp": ["WordPress", "WooCommerce", "PHP", "Elementor"],
  "crm": ["Salesforce", "Apex", "CRM integration", "automation", "Lightning"],
};

const DICT = {
  ru: {
    setup: "Демо настройки", close: "Закрыть", step: "ШАГ", of: "ИЗ 5", back: "Назад",
    niche: { "ai-noco": "AI-автоматизация / no-code", "ai-llm": "AI-агенты / LLM", "web": "Web / SaaS-разработка", "mobile": "Мобильная разработка", "backend": "Backend / облако", "shopify": "Shopify / ecommerce", "wp": "WordPress / CMS", "crm": "Salesforce / CRM" } as Record<string, string>,
    kwSuffix: (n: number) => "+" + n + " стартовых ключевых слов",
    countries: ["Индия", "Пакистан", "Бангладеш", "Нигерия", "Кения", "Филиппины", "Египет"],
    stepNames: ["Ниша и ключевые слова", "Минимальный бюджет", "Фильтры по клиенту", "Исключить страны", "Описание профиля"],
    doneName: "Настройка завершена",
    removeAria: "Удалить", addAria: "Добавить",
    s1: { h: "Выберите нишу и ключевые слова", sub: "Задайте отправную точку и точные запросы, которые мы будем отслеживать", kwLabel: "Ключевые слова для поиска", kwPh: "напр. React, Node.js, UI/UX…" },
    s2: { h: "Установите минимальный бюджет", sub: "Отфильтруйте проекты со ставками ниже тех, что вы готовы принять", hourly: "Мин. в час ($)", fixed: "Мин. фикс ($)", info: "Фикс-проекты $500–$1 999 обычно дают достаточно простора для качественных откликов" },
    s3: {
      h: "Фильтры по клиенту", sub: "Получайте джобы только от клиентов, которым стоит откликаться", payLabel: "Оплата", ratLabel: "Рейтинг клиента", spentLabel: "Всего потрачено клиентом",
      pay: [{ v: "verified", label: "Только Verified" }, { v: "any", label: "Любая" }],
      rating: [{ v: "3", label: "3+ звезды" }, { v: "4", label: "4+ звезды" }, { v: "any", label: "Любой" }],
      spent: [{ v: "1000", label: "$1 000+" }, { v: "5000", label: "$5 000+" }, { v: "10000", label: "$10 000+" }, { v: "any", label: "Любая" }],
    },
    s4: { h: "Исключите страны", sub: "Уберите локации клиентов, которые обычно тратят ваши Connects впустую", summaryHead: "Выбрано стран: ", empty: "Пока ничего не выбрано" },
    s5: { h: "Описание профиля", sub: "Вставьте текущее описание вашего профиля с Upwork - на его основе бот будет генерировать cover letters", label: "Описание профиля с Upwork", ph: "Senior React developer with 6+ years building SaaS dashboards and design systems…", toggle: "Присылать письма о новых подходящих проектах" },
    success: { h: "Готово! Настройка завершена", sub: "Ответчик включён. Мы начнём находить подходящие проекты и готовить отклики прямо сейчас." },
    next: "Далее", finish: "Завершить и включить ответчик",
  },
  en: {
    setup: "Demo setup", close: "Close", step: "STEP", of: "OF 5", back: "Back",
    niche: { "ai-noco": "AI automation / no-code", "ai-llm": "AI agents / LLM", "web": "Web / SaaS development", "mobile": "Mobile development", "backend": "Backend / cloud", "shopify": "Shopify / ecommerce", "wp": "WordPress / CMS", "crm": "Salesforce / CRM" } as Record<string, string>,
    kwSuffix: (n: number) => "+" + n + " starter keywords",
    countries: ["India", "Pakistan", "Bangladesh", "Nigeria", "Kenya", "Philippines", "Egypt"],
    stepNames: ["Niche & keywords", "Minimum budget", "Client filters", "Exclude countries", "Profile description"],
    doneName: "Setup complete",
    removeAria: "Remove", addAria: "Add",
    s1: { h: "Choose your niche and keywords", sub: "Set a starting point and the exact queries we'll track", kwLabel: "Search keywords", kwPh: "e.g. React, Node.js, UI/UX…" },
    s2: { h: "Set your minimum budget", sub: "Filter out projects below the rates you're willing to accept", hourly: "Min. hourly ($)", fixed: "Min. fixed ($)", info: "Fixed projects $500–$1,999 usually leave enough room for quality proposals" },
    s3: {
      h: "Client filters", sub: "Get jobs only from clients worth applying to", payLabel: "Payment", ratLabel: "Client rating", spentLabel: "Total client spend",
      pay: [{ v: "verified", label: "Verified only" }, { v: "any", label: "Any" }],
      rating: [{ v: "3", label: "3+ stars" }, { v: "4", label: "4+ stars" }, { v: "any", label: "Any" }],
      spent: [{ v: "1000", label: "$1,000+" }, { v: "5000", label: "$5,000+" }, { v: "10000", label: "$10,000+" }, { v: "any", label: "Any" }],
    },
    s4: { h: "Exclude countries", sub: "Remove client locations that usually waste your Connects", summaryHead: "Countries selected: ", empty: "Nothing selected yet" },
    s5: { h: "Profile description", sub: "Paste your current Upwork profile description - the bot will use it to generate cover letters", label: "Upwork profile description", ph: "Senior React developer with 6+ years building SaaS dashboards and design systems…", toggle: "Email me about new matching projects" },
    success: { h: "Done! Setup complete", sub: "The responder is on. We'll start finding matching projects and preparing proposals right now." },
    next: "Next", finish: "Finish and enable the responder",
  },
};

// ---- Tailwind class strings (same tokens as the rest of the site) ----
const cls = {
  cta: "w-full h-[50px] rounded-pill bg-accent text-white font-semibold text-[15px] cursor-pointer transition-transform duration-150 hover:-translate-y-px",
  overlay: "fixed inset-0 z-[1000] grid place-items-center p-6 bg-[color-mix(in_oklch,#05070d_72%,transparent)] backdrop-blur-[6px] motion-safe:animate-demo-fade",
  modal: "relative w-full max-w-[600px] max-h-[calc(100vh-48px)] flex flex-col bg-bg-elev border border-line-soft rounded-[18px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)] overflow-hidden motion-safe:animate-demo-pop",
  close: "absolute top-4 right-4 max-[560px]:top-3 max-[560px]:right-3 w-[34px] h-[34px] rounded-full border border-line-soft bg-surface text-text-dim text-[20px] leading-none cursor-pointer grid place-items-center z-[2] transition-all duration-fast hover:text-text hover:border-text hover:rotate-90",
  head: "px-8 max-[560px]:px-5 pt-[30px] pb-5 shrink-0",
  stepMeta: "flex flex-col gap-1.5 mb-4",
  stepLabel: "mono-label text-accent-2 tracking-[0.16em]",
  stepName: "text-[13px] text-text-mute",
  progress: "h-1 rounded-pill bg-surface-2 overflow-hidden",
  progressBar: "block h-full rounded-pill bg-gradient-to-r from-accent to-accent-2 motion-safe:transition-[width] duration-[450ms] ease-out",
  body: "px-8 max-[560px]:px-5 pt-1 pb-2 overflow-y-auto flex-1",
  foot: "flex justify-between gap-3 px-8 max-[560px]:px-5 pt-[18px] pb-7 max-[560px]:pb-[22px] shrink-0",
  btnBase: "h-[46px] px-6 rounded-pill font-mono text-[13px] tracking-[0.03em] uppercase cursor-pointer transition-[transform,box-shadow,background] duration-fast border-0",
  btnGhost: "bg-transparent text-text-dim shadow-[inset_0_0_0_1px_var(--line)] hover:text-text hover:shadow-[inset_0_0_0_1px_var(--text)] disabled:opacity-40 disabled:cursor-not-allowed",
  btnPrimary: "bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_0_0_1px_var(--accent-dim),0_10px_26px_-10px_var(--accent-glow)] ml-auto hover:-translate-y-px hover:shadow-[0_0_0_1px_var(--accent),0_18px_36px_-12px_var(--accent-glow)] disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-[0_0_0_1px_var(--accent-dim)]",
  h: "text-[clamp(22px,3vw,28px)] font-semibold tracking-[-0.02em] leading-[1.15] mt-0 mb-2 text-text",
  sub: "text-[15px] leading-[1.5] text-text-dim mt-0 mb-[22px] max-w-[46ch]",
  field: "mb-[18px]",
  fieldLabel: "block text-[13px] text-text-dim mb-[7px]",
  input: "w-full h-[46px] px-4 border border-line rounded-[11px] bg-surface text-text text-[14px] font-sans outline-none transition-[border-color] duration-fast focus:border-accent placeholder:text-text-mute",
  textarea: "h-auto min-h-[130px] px-4 py-3 leading-[1.5] resize-y",
  counter: "absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-text-mute pointer-events-none",
  chipGrid: "grid grid-cols-2 max-[560px]:grid-cols-1 gap-2.5 mb-[18px]",
  chip: "flex flex-col gap-[3px] px-3.5 py-3 border rounded-[12px] cursor-pointer text-left transition-[border-color,background] duration-fast",
  chipOff: "border-line bg-surface hover:border-accent-dim",
  chipSel: "border-accent bg-[color-mix(in_oklch,var(--accent)_14%,var(--surface))]",
  chipName: "text-[14px] font-medium text-text",
  chipSub: "text-[11.5px] text-text-mute",
  kwRow: "flex gap-2 items-stretch",
  inputWrap: "relative flex-1",
  addBtn: "w-[46px] shrink-0 border border-line rounded-[11px] bg-surface text-accent text-[22px] leading-none cursor-pointer transition-[border-color,background] duration-fast hover:border-accent hover:bg-[color-mix(in_oklch,var(--accent)_12%,var(--surface))]",
  tags: "flex flex-wrap gap-2 mt-3.5",
  tag: "inline-flex items-center gap-[7px] pl-3 pr-2 py-1.5 rounded-pill bg-[color-mix(in_oklch,var(--accent)_14%,var(--surface))] border border-accent-dim text-text text-[13px]",
  tagBtn: "w-4 h-4 rounded-full border-0 bg-[color-mix(in_oklch,var(--accent)_28%,transparent)] text-text text-[13px] cursor-pointer inline-flex items-center justify-center leading-none p-0 shrink-0 hover:bg-accent hover:text-white",
  row2: "grid grid-cols-2 max-[560px]:grid-cols-1 gap-3",
  info: "flex gap-2.5 px-3.5 py-3 rounded-[12px] bg-[color-mix(in_oklch,var(--accent)_9%,var(--surface))] border border-[color-mix(in_oklch,var(--accent)_22%,transparent)] text-text-dim text-[13px] leading-[1.45] mb-[18px] before:content-['i'] before:shrink-0 before:w-[18px] before:h-[18px] before:rounded-full before:bg-accent before:text-white before:font-mono before:text-[11px] before:font-semibold before:grid before:place-items-center before:mt-px",
  seg: "flex gap-2 flex-wrap",
  segBtn: "flex-1 min-w-fit px-3.5 py-[11px] border rounded-[11px] text-[13px] font-sans cursor-pointer whitespace-nowrap transition-[border-color,background,color] duration-fast",
  segOff: "border-line bg-surface text-text-dim hover:border-accent-dim",
  segActive: "border-accent bg-[color-mix(in_oklch,var(--accent)_16%,var(--surface))] text-text",
  pills: "flex flex-wrap gap-2 mb-[18px]",
  pill: "px-3.5 py-2 border rounded-pill text-[13px] cursor-pointer transition-[border-color,background,color] duration-fast",
  pillOff: "border-line bg-surface text-text-dim hover:border-accent-dim",
  pillSel: "border-[color-mix(in_oklch,var(--fv-red)_70%,transparent)] bg-[color-mix(in_oklch,var(--fv-red)_20%,transparent)] text-text",
  summary: "border border-line rounded-[12px] bg-surface px-3.5 py-3 mt-1.5",
  summaryHead: "text-[13px] text-text-dim mb-2.5",
  summaryTags: "flex flex-wrap gap-[7px]",
  summaryEmpty: "text-[13px] text-text-mute",
  tagRed: "inline-flex items-center gap-[7px] pl-3 pr-2 py-1.5 rounded-pill bg-[color-mix(in_oklch,var(--fv-red)_18%,transparent)] border border-[color-mix(in_oklch,var(--fv-red)_55%,transparent)] text-text text-[13px]",
  tagRedBtn: "w-4 h-4 rounded-full border-0 bg-[color-mix(in_oklch,var(--fv-red)_30%,transparent)] text-text text-[13px] cursor-pointer inline-flex items-center justify-center leading-none p-0 shrink-0 hover:bg-fv-red hover:text-white",
  toggle: "flex items-start gap-[13px] py-3.5 cursor-pointer",
  trackBase: "shrink-0 w-[42px] h-6 rounded-pill border relative transition-[background,border-color] duration-fast mt-px after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-[18px] after:h-[18px] after:rounded-full after:transition-[transform,background] after:duration-fast",
  trackOff: "bg-surface-2 border-line after:bg-text-mute",
  trackOn: "bg-accent border-accent after:bg-white after:[transform:translateX(18px)]",
  toggleText: "flex flex-col gap-[3px]",
  toggleTitle: "text-[14px] text-text",
  success: "text-center pt-[30px] pb-3",
  successMark: "w-16 h-16 mx-auto mb-[22px] rounded-full bg-[color-mix(in_oklch,var(--accent)_16%,var(--surface))] border border-accent-dim grid place-items-center text-accent text-[30px] motion-safe:animate-[demoPop_0.4s_var(--ease-out)_0.1s_both]",
  successH: "text-[clamp(22px,3vw,28px)] font-semibold tracking-[-0.02em] leading-[1.15] mt-0 mb-2.5 text-text",
  successSub: "text-[15px] leading-[1.5] text-text-dim mt-0 mb-1.5 mx-auto max-w-[46ch]",
};

interface Props {
  /** Active locale - drives all modal copy. */
  lang?: Lang;
  /** Trigger-button label (passed from Astro i18n). */
  ctaLabel: string;
}

const TOTAL = 5;

const DemoOnboarding = ({ lang = "ru", ctaLabel }: Props) => {
  const L = DICT[lang === "en" ? "en" : "ru"];

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [finished, setFinished] = useState(false);
  const [niche, setNiche] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [kwInput, setKwInput] = useState("");
  const [minHourly, setMinHourly] = useState("");
  const [minFixed, setMinFixed] = useState("");
  const [filters, setFilters] = useState<{ payment: string; rating: string; spent: string }>({ payment: "", rating: "", spent: "" });
  const [countries, setCountries] = useState<string[]>([]);
  const [profileDesc, setProfileDesc] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(false);

  const openModal = () => {
    setStep(1); setFinished(false); setNiche(null); setKeywords([]); setKwInput("");
    setMinHourly(""); setMinFixed(""); setFilters({ payment: "", rating: "", spent: "" });
    setCountries([]); setProfileDesc(""); setNotifyEmail(false);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  // Body scroll lock + Escape-to-close while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleNiche = (id: string) => {
    if (niche === id) {
      setNiche(null);
      setKeywords((kw) => kw.filter((k) => !(NICHE_KW[id] || []).includes(k)));
    } else {
      setKeywords((kw) => {
        const cleaned = niche ? kw.filter((k) => !(NICHE_KW[niche] || []).includes(k)) : kw;
        const add = (NICHE_KW[id] || []).filter((k) => !cleaned.includes(k));
        return [...cleaned, ...add];
      });
      setNiche(id);
    }
  };
  const addKw = () => {
    const v = kwInput.trim();
    if (v) { setKeywords((k) => [...k, v]); setKwInput(""); }
  };
  const toggleCountry = (c: string) =>
    setCountries((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  const canNext = !(step === TOTAL && profileDesc.trim().length === 0);
  const next = () => {
    if (finished) { closeModal(); return; }
    if (step < TOTAL) setStep((s) => s + 1);
    else setFinished(true);
  };
  const back = () => { if (step > 1) setStep((s) => s - 1); };

  const progress = finished ? 100 : (step / TOTAL) * 100;
  const stepName = finished ? L.doneName : L.stepNames[step - 1];
  const nextLabel = finished ? L.close : step === TOTAL ? L.finish : L.next;
  const backVisible = !finished && step > 1;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className={cls.h}>{L.s1.h}</h2>
            <p className={cls.sub}>{L.s1.sub}</p>
            <div className={cls.chipGrid}>
              {NICHE_META.map((n) => (
                <button key={n.id} type="button" onClick={() => toggleNiche(n.id)} className={`${cls.chip} ${niche === n.id ? cls.chipSel : cls.chipOff}`}>
                  <span className={cls.chipName}>{L.niche[n.id]}</span>
                  <span className={cls.chipSub}>{L.kwSuffix(n.kw)}</span>
                </button>
              ))}
            </div>
            <div className={cls.field}>
              <label className={cls.fieldLabel}>{L.s1.kwLabel}</label>
              <div className={cls.kwRow}>
                <div className={cls.inputWrap}>
                  <input
                    className={cls.input}
                    value={kwInput}
                    maxLength={40}
                    placeholder={L.s1.kwPh}
                    onChange={(e) => setKwInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addKw(); } }}
                  />
                  <span className={cls.counter}>{kwInput.length}/40</span>
                </div>
                <button type="button" className={cls.addBtn} aria-label={L.addAria} onClick={addKw}>+</button>
              </div>
              <div className={cls.tags}>
                {keywords.map((k, i) => (
                  <span key={k + i} className={cls.tag}>
                    {k}
                    <button type="button" className={cls.tagBtn} aria-label={L.removeAria} onClick={() => setKeywords((arr) => arr.filter((_, idx) => idx !== i))}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className={cls.h}>{L.s2.h}</h2>
            <p className={cls.sub}>{L.s2.sub}</p>
            <div className={cls.row2}>
              <div className={cls.field}>
                <label className={cls.fieldLabel}>{L.s2.hourly}</label>
                <input className={cls.input} inputMode="numeric" placeholder="40" value={minHourly} onChange={(e) => setMinHourly(e.target.value)} />
              </div>
              <div className={cls.field}>
                <label className={cls.fieldLabel}>{L.s2.fixed}</label>
                <input className={cls.input} inputMode="numeric" placeholder="500" value={minFixed} onChange={(e) => setMinFixed(e.target.value)} />
              </div>
            </div>
            <div className={cls.info}>{L.s2.info}</div>
          </>
        );
      case 3: {
        const seg = (group: "payment" | "rating" | "spent", opts: { v: string; label: string }[]) => (
          <div className={cls.seg}>
            {opts.map((o) => (
              <button key={o.v} type="button" onClick={() => setFilters((f) => ({ ...f, [group]: o.v }))} className={`${cls.segBtn} ${filters[group] === o.v ? cls.segActive : cls.segOff}`}>{o.label}</button>
            ))}
          </div>
        );
        return (
          <>
            <h2 className={cls.h}>{L.s3.h}</h2>
            <p className={cls.sub}>{L.s3.sub}</p>
            <div className={cls.field}>
              <label className={cls.fieldLabel}>{L.s3.payLabel}</label>
              {seg("payment", L.s3.pay)}
            </div>
            <div className={cls.field}>
              <label className={cls.fieldLabel}>{L.s3.ratLabel}</label>
              {seg("rating", L.s3.rating)}
            </div>
            <div className={cls.field}>
              <label className={cls.fieldLabel}>{L.s3.spentLabel}</label>
              {seg("spent", L.s3.spent)}
            </div>
          </>
        );
      }
      case 4:
        return (
          <>
            <h2 className={cls.h}>{L.s4.h}</h2>
            <p className={cls.sub}>{L.s4.sub}</p>
            <div className={cls.pills}>
              {L.countries.map((c) => (
                <button key={c} type="button" onClick={() => toggleCountry(c)} className={`${cls.pill} ${countries.includes(c) ? cls.pillSel : cls.pillOff}`}>{c}</button>
              ))}
            </div>
            <div className={cls.summary}>
              <div className={cls.summaryHead}>{L.s4.summaryHead}<b className="text-text font-semibold">{countries.length}</b></div>
              <div className={cls.summaryTags}>
                {countries.length ? countries.map((c) => (
                  <span key={c} className={cls.tagRed}>
                    {c}
                    <button type="button" className={cls.tagRedBtn} aria-label={L.removeAria} onClick={() => toggleCountry(c)}>×</button>
                  </span>
                )) : <span className={cls.summaryEmpty}>{L.s4.empty}</span>}
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className={cls.h}>{L.s5.h}</h2>
            <p className={cls.sub}>{L.s5.sub}</p>
            <div className={cls.field}>
              <label className={cls.fieldLabel}>{L.s5.label}</label>
              <textarea className={`${cls.input} ${cls.textarea}`} rows={6} placeholder={L.s5.ph} value={profileDesc} onChange={(e) => setProfileDesc(e.target.value)} />
            </div>
            <div className={cls.toggle} onClick={() => setNotifyEmail((v) => !v)}>
              <span className={`${cls.trackBase} ${notifyEmail ? cls.trackOn : cls.trackOff}`} />
              <span className={cls.toggleText}>
                <span className={cls.toggleTitle}>{L.s5.toggle}</span>
              </span>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <button type="button" className={cls.cta} onClick={openModal}>{ctaLabel}</button>

      {open && (
        <div className={cls.overlay} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div role="dialog" aria-modal="true" aria-label={L.setup} className={cls.modal}>
            <button type="button" className={cls.close} aria-label={L.close} onClick={closeModal}>×</button>

            <div className={cls.head}>
              <div className={cls.stepMeta}>
                <span className={cls.stepLabel}>{L.step} {finished ? 5 : step} {L.of}</span>
                <span className={cls.stepName}>{stepName}</span>
              </div>
              <div className={cls.progress}>
                <i className={cls.progressBar} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className={cls.body}>
              {finished ? (
                <div className={cls.success}>
                  <div className={cls.successMark}>✓</div>
                  <h2 className={cls.successH}>{L.success.h}</h2>
                  <p className={cls.successSub}>{L.success.sub}</p>
                </div>
              ) : renderStep()}
            </div>

            <div className={cls.foot}>
              <button type="button" className={`${cls.btnBase} ${cls.btnGhost}`} onClick={back} disabled={step === 1} style={{ visibility: backVisible ? "visible" : "hidden" }}>{L.back}</button>
              <button type="button" className={`${cls.btnBase} ${cls.btnPrimary}`} onClick={next} disabled={!canNext}>{nextLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoOnboarding;
