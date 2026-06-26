// AUTO-GENERATED from the legacy scripts/i18n.js dictionary.
// Each key maps to { en, ru }; values may contain inline HTML.
export type Lang = "ru" | "en";

type Entry = { en: string; ru?: string };

export const T: Record<string, Entry> = {
    // f4.chip.low / f4.chip.high are redefined later (Low / High) - keep those.
    "f4.chip.mid":  { en: "mid",  ru: "mid"  },
    "f4.chip.won":  { en: "won",  ru: "won"  },

    // --- f.04 CRM mock cards ---
    "f4.crm.c1.t": { en: "Logo refresh for cafe brand",          ru: "Логотип для кофейни" },
    "f4.crm.c1.m": { en: "$300 · fixed",                          ru: "$300 · фикс" },
    "f4.crm.c2.t": { en: "Webflow site for B2B SaaS",             ru: "Webflow-сайт для B2B SaaS" },
    "f4.crm.c2.m": { en: "$4,200 · fixed",                        ru: "$4 200 · фикс" },
    "f4.crm.c3.t": { en: "Senior React engineer · analytics SaaS", ru: "Senior React-инженер · analytics SaaS" },
    "f4.crm.c3.m": { en: "$12,000 · fixed",                       ru: "$12 000 · фикс" },
    "f4.crm.c4.t": { en: "Stripe billing dashboard · TypeScript", ru: "Stripe billing dashboard · TypeScript" },
    "f4.crm.c4.m": { en: "$15,000 · signed",                      ru: "$15 000 · подписан" },
    "f4.crm.c5.t": { en: "Next.js + Supabase platform",           ru: "Next.js + Supabase платформа" },
    "f4.crm.c5.m": { en: "$9,000 · signed",                       ru: "$9 000 · подписан" },

    // --- Page meta ---
    "page.title": {
      en: "BEX - System for attracting projects on Upwork",
      ru: "BEX - Система привлечения проектов на Upwork"
    },

    // --- Header ---
    "nav.experts":  { en: "Built by Experts", ru: "Команда экспертов" },
    "nav.features": { en: "Features",         ru: "Возможности" },
    "nav.why":      { en: "Why BEX",          ru: "Зачем BEX" },
    "nav.who":      { en: "Who",              ru: "Для кого" },
    "nav.demo":     { en: "Get a demo",       ru: "Посмотреть демо" },
    "nav.forAgencies":    { en: "For agencies",    ru: "Для агентств" },
    "nav.forFreelancers": { en: "For freelancers", ru: "Для фрилансеров" },
    "nav.persona.freelancer": { en: "Freelancer", ru: "Фрилансер" },
    "nav.persona.agency":     { en: "Agency",     ru: "Агентство" },

    // --- Hero ---
    "hero.meta.system": { en: "00 / System",       ru: "00 / Система" },
    "hero.meta.engine": { en: "Upwork lead engine", ru: "Инструмент поиска проектов на Upwork" },
    "hero.meta.live":   { en: "LIVE",              ru: "LIVE" },
    "hero.title": {
      en: "System for<br/>attracting <em class=\"acc\">projects</em>",
      ru: "Система для<br/>привлечения <em class=\"acc\">проектов</em>"
    },
    "hero.sub": {
      en: "BEX is a platform that accelerates lead generation on Upwork - scoring, filtering and drafting proposals so your team reviews only the jobs worth replying to.",
      ru: "BEX - это платформа, которая ускоряет лидогенерацию на Upwork: оценивает, фильтрует и генерирует отклики, чтобы ваша команда работала только с действительно стоящими проектами."
    },
    "hero.cta.demo": { en: "Get a demo",      ru: "Посмотреть демо" },
    "hero.cta.how":  { en: "See how it works", ru: "Посмотреть как это работает" },

    "hero.scanner.status": { en: "scanning upwork.com/feed",            ru: "сканирую upwork.com/feed" },
    "hero.scanner.noise":  { en: "// incoming · raw feed",              ru: "// входящее · сырая лента" },
    "hero.scanner.signal": { en: "// matched · high score",             ru: "// совпало · высокий балл" },
    "hero.filter":         { en: "BEX · filter",                        ru: "BEX · фильтр" },

    "hero.orbit.status":   { en: "1,284 jobs · 14 matched · live",      ru: "1 284 проекта · 14 совпали · live" },
    "hero.orbit.legend.match": { en: "matched → core",                  ru: "совпало → ядро" },
    "hero.orbit.legend.noise": { en: "noise → ejected",                 ru: "шум → отброшено" },
    "hero.core.label": { en: "BEX",    ru: "BEX" },
    "hero.core.sub":   { en: "filter", ru: "фильтр" },

    "hero.feed.status":  { en: "live · 278 jobs / 24h · 14 sending",    ru: "live · 278 проектов / 24ч · 14 в отклике" },
    "hero.lane.matched": { en: "// matched",   ru: "// совпало" },
    "hero.lane.raw":     { en: "// raw feed",  ru: "// сырая лента" },
    "hero.lane.rejected":{ en: "// rejected",  ru: "// отброшено" },

    "hero.stream.status": { en: "live · 1,284 jobs/day", ru: "live · 1 284 проекта/день" },

    // --- 01 Trust ---
    "trust.idx":    { en: "01 / Built by experts", ru: "01 / Команда экспертов" },
    "trust.title":  {
      en: "Why trust <em class=\"acc\">our platform?</em>",
      ru: "Почему нам можно <em class=\"acc\">доверять</em>"
    },
    "trust.s1.label": { en: "years of experience in lead generation", ru: "лет опыта в лидогенерации" },
    "trust.s2.label": { en: "earned by our clients",                  ru: "заработано нашими клиентами" },
    "trust.s3.label": { en: "proposals sent on Upwork",               ru: "откликов отправлено на Upwork" },
    "trust.s4.label": { en: "countries - clients all over the world", ru: "стран - клиенты по всему миру" },
    "trust.desc": {
      en: "Since 2008 we've generated leads on Upwork and know how to get a steady stream of relevant projects across niches. Now we've packaged this expertise into a powerful automation platform.",
      ru: "С 2008 года мы работаем с Upwork: сначала выстроили стабильный поток проектов и лидов для себя, а затем начали помогать другим компаниям. Этот опыт лёг в основу нашей автоматизированной платформы."
    },
    "trust.voices.head": { en: "// agencies and teams that run Upwork through BEX", ru: "// отзывы агентств и команд, которые работают с Upwork через BEX" },
    "trust.v1.q": {
      en: "We stopped refreshing the feed at 3am. BEX scores jobs faster than a human can read them - same first-reply advantage, without a night shift.",
      ru: "Благодаря гибким фильтрам мы быстрее находим подходящие проекты и не тратим время на нерелевантные заявки."
    },
    "trust.v1.who":  { en: "Pavel Lappo", ru: "Pavel Lappo" },
    "trust.v1.role": { en: "Lead-gen manager", ru: "Руководитель по лидогенерации" },
    "trust.v2.q": {
      en: "Scoring built on 50k real proposals isn't a gimmick. Our reply rate jumped from 6% to 18% in the first month - and we stopped wasting Connects on junk.",
      ru: "Мы ведём несколько Upwork-направлений одновременно, и раньше было сложно держать всё под контролем. С BEX стало гораздо проще отслеживать проекты, распределять заявки и понимать, что реально приносит результат."
    },
    "trust.v2.who":  { en: "Pavel Lautsevich", ru: "Pavel Lautsevich" },
    "trust.v2.role": { en: "Co-founder, LOVATA", ru: "Сооснователь, LOVATA" },
    "trust.v3.q": {
      en: "I replaced a full-time lead-gen manager with BEX plus a junior who reviews the shortlist. Pipeline is cleaner, cheaper, and I can see every thread in one place.",
      ru: "Раньше у нас были отдельные менеджеры по лидогенерации, но после перехода на BEX необходимость в этом практически исчезла."
    },
    "trust.v3.who":  { en: "Dmitry V.", ru: "Дмитрий Волков" },
    "trust.v3.role": { en: "Owner, design studio", ru: "Владелец дизайн-студии" },

    // --- 02 Features ---
    "feat.idx":   { en: "02 / Core features", ru: "02 / Основные возможности" },
    "feat.title": {
      en: "Four modules that <em class=\"acc\">run the funnel</em>",
      ru: "Четыре модуля, которые<br/><em class=\"acc\">ведут воронку</em>"
    },

    // f.01 Scoring
    "f1.title": { en: "Custom Job Scoring & Filtering", ru: "Умная оценка и фильтрация проектов" },
    "f1.lead": {
      en: "A scoring system built on 15+ years of lead-gen and 50,000+ real proposals. Our algorithms evaluate projects against actual agency results - so you only review jobs worth your time.",
      ru: "Система скоринга на основе 15+ лет опыта и 50 000+ реальных откликов. Оценивает проекты по реальным результатам - вы видите только те, на которые стоит откликаться."
    },
    "f1.viz.head":   { en: "// job_scoring · live", ru: "// скоринг · live" },
    "f1.viz.headR":  { en: "4 / 278 today",         ru: "4 / 278 сегодня" },
    "f1.row1.title": { en: "[$4k+] Senior React developer for B2B analytics dashboard", ru: "[$4k+] Senior React-разработчик для B2B аналитической панели" },
    "f1.row2.title": { en: "Webflow → Next.js migration for SaaS marketing site",        ru: "Миграция Webflow → Next.js для SaaS-сайта" },
    "f1.row3.title": { en: "Node.js REST API for subscription billing platform",         ru: "Node.js REST API для платформы подписочного биллинга" },
    "f1.row4.title": { en: "Simple WordPress landing page, quick turnaround",            ru: "Простой WordPress-лендинг, быстрый дедлайн" },
    "f1.r1.price":   { en: "$4k · Fixed",   ru: "$4k · Фикс" },
    "f1.r2.price":   { en: "$6k · Fixed",   ru: "$6k · Фикс" },
    "f1.r3.price":   { en: "$75/hr · Hourly", ru: "$75/час · Почасово" },
    "f1.r4.price":   { en: "$500 · Fixed",  ru: "$500 · Фикс" },
    "f1.ago.3h":     { en: "3h ago",  ru: "3ч назад" },
    "f1.ago.2h":     { en: "2h ago",  ru: "2ч назад" },
    "f1.ago.1d":     { en: "1d ago",  ru: "1д назад" },
    "f1.ago.2d":     { en: "2d ago",  ru: "2д назад" },
    "f1.geo.au":     { en: "Australia",     ru: "Австралия" },
    "f1.geo.us":     { en: "United States", ru: "США" },
    "f1.geo.uk":     { en: "UK",            ru: "Великобритания" },
    "f1.geo.ca":     { en: "Canada",        ru: "Канада" },
    "f1.prop.7":     { en: "7 proposals",  ru: "7 откликов" },
    "f1.prop.4":     { en: "4 proposals",  ru: "4 отклика" },
    "f1.prop.8":     { en: "8 proposals",  ru: "8 откликов" },
    "f1.prop.22":    { en: "22 proposals", ru: "22 отклика" },

    "f1.fd.inputs": { en: "// inputs the model reads", ru: "// что учитывает модель" },
    "f1.fd.li1":    {
      en: "<b>budget shape</b> - fixed vs hourly, rate band, total payout history",
      ru: "<b>бюджет</b> - фикс или почасовая, диапазон ставок, история выплат"
    },
    "f1.fd.li2":    {
      en: "<b>client signal</b> - hire rate, $ spent, repeat-hire ratio, verified pay",
      ru: "<b>сигнал клиента</b> - hire rate, потраченный бюджет, повторные наймы, подтверждённые платежи"
    },
    "f1.fd.li3":    {
      en: "<b>posting text</b> - tech stack match, scope clarity, red-flag phrases",
      ru: "<b>текст вакансии</b> - подходит ли стек, насколько всё понятно, есть ли «красные флаги»"
    },
    "f1.fd.li4":    {
      en: "<b>your profile fit</b> - niche, past wins, response speed",
      ru: "<b>профиль</b> - совпадение по нише, опыт и скорость отклика"
    },
    "f1.fd.action": { en: "// scoring in action", ru: "// скоринг в действии" },
    "f1.fd.skip":   { en: "skip",     ru: "пропустить" },
    "f1.fd.review": { en: "review",   ru: "проверить" },
    "f1.fd.apply":  { en: "apply",    ru: "откликнуться" },
    "f1.fd.skipDesc":   { en: "low-budget, vague, no verified pay", ru: "низкий бюджет, размыто, без верификации" },
    "f1.fd.reviewDesc": { en: "on-niche but signal mixed",          ru: "по нише, но сигнал смешанный" },
    "f1.fd.applyDesc":  { en: "high-fit, priority notification",    ru: "высокое совпадение, приоритетный алерт" },
    "f1.fd.tunable": { en: "// tunable per team", ru: "// настраивается под команду" },
    "f1.fd.p1": { en: "min budget",        ru: "мин. бюджет" },
    "f1.fd.p2": { en: "preferred niches",  ru: "предпочитаемые ниши" },
    "f1.fd.p3": { en: "exclude regions",   ru: "исключить регионы" },
    "f1.fd.p4": { en: "must-have keywords",ru: "ключевые слова" },
    "f1.fd.p5": { en: "client spend ≥ $",  ru: "клиент потратил ≥ $" },

    // f.02 Notifications
    "f2.title": { en: "Email Notification Center", ru: "Центр email-уведомлений" },
    "f2.lead": {
      en: "Speed beats everything on Upwork. Stop refreshing the feed - get an email the moment a high-scoring job matching your preferences is posted, and apply while it's still fresh.",
      ru: "Скорость решает. Получайте уведомления о лучших проектах и откликайтесь сразу, без постоянного обновления ленты."
    },
    "f2.viz.head":  { en: "// notifications · 4 new", ru: "// уведомления · 4 новых" },
    "f2.viz.headR": { en: "live", ru: "live" },
    "f2.today":     { en: "today", ru: "сегодня" },
    "f2.yesterday": { en: "yesterday", ru: "вчера" },
    "f2.n1.subj": { en: "New match · score 94",          ru: "Новое совпадение · скор 94" },
    "f2.n1.desc": { en: "High-fit job posted - <a>Senior React engineer, SaaS analytics</a>", ru: "Опубликован подходящий проект - <a>Senior React engineer, SaaS analytics</a>" },
    "f2.n2.subj": { en: "Proposal successfully sent",     ru: "Отклик успешно отправлен" },
    "f2.n2.desc": { en: "Proposal submitted for <a>Senior React Developer - B2B SaaS Dashboard</a>", ru: "Отклик отправлен на <a>Senior React Developer - B2B SaaS Dashboard</a>" },
    "f2.n3.subj": { en: "Bot error · session expired",    ru: "Ошибка бота · сессия истекла" },
    "f2.n3.desc": { en: "Automation paused - re-authenticate your Upwork account", ru: "Автоматизация на паузе - пройдите авторизацию заново" },
    "f2.n4.subj": { en: "Sending failed · job not found", ru: "Не удалось отправить · вакансия не найдена" },
    "f2.n4.desc": { en: "Listing no longer exists - <a>UX Designer for Mobile App Redesign</a>", ru: "Объявление удалено - <a>UX Designer for Mobile App Redesign</a>" },

    "f2.fd.how":   { en: "// how it works", ru: "// как это работает" },
    "f2.fd.s1":    { en: "<b>New job posted</b> on Upwork matching your filters",     ru: "<b>Появился проект</b> на Upwork по вашим фильтрам" },
    "f2.fd.s2":    { en: "<b>Scored</b> against your team's threshold (e.g. ≥ 75)",   ru: "<b>Оценивается</b> по порогу команды (напр. ≥ 75)" },
    "f2.fd.s3":    { en: "<b>Email fires</b> within ~60 seconds of posting",          ru: "<b>Уходит email</b> в течение ~60 секунд" },
    "f2.fd.s4":    { en: "<b>One-click</b> opens the pre-drafted proposal",           ru: "<b>В один клик</b> открывается готовый черновик" },
    "f2.fd.ch":    { en: "// delivery channels", ru: "// каналы доставки" },
    "f2.fd.email":    { en: "Email",    ru: "Email" },
    "f2.fd.emailD":   { en: "per match · digest · daily summary", ru: "на каждое совпадение · дайджест · ежедневная сводка" },
    "f2.fd.slack":    { en: "Slack",    ru: "Slack" },
    "f2.fd.slackD":   { en: "#leads channel · thread per job", ru: "канал #leads · тред под проект" },
    "f2.fd.tg":       { en: "Telegram", ru: "Telegram" },
    "f2.fd.tgD":      { en: "direct to ops manager", ru: "напрямую ops-менеджеру" },
    "f2.fd.wh":       { en: "Webhook",  ru: "Webhook" },
    "f2.fd.whD":      { en: "route into your own CRM", ru: "в вашу CRM" },
    "f2.fd.note": {
      en: "Median time-to-apply drops from <b>47 min</b> to <b>4 min</b> - speed is the single biggest predictor of replies on Upwork.",
      ru: "Медианное время до отклика падает с <b>47 мин</b> до <b>4 мин</b> - скорость сильнее всего влияет на ответы на Upwork."
    },

    // f.03 Cover letters
    "f3.title": { en: "Partly Automated Cover Letters", ru: "Частично автоматизированные отклики" },
    "f3.lead": {
      en: "Work with proven templates and smart automation that drafts personalized proposals from your experience. Keep cover-letter quality high while dramatically cutting the time to apply.",
      ru: "Система помогает быстро собрать персонализированный отклик на основе вашего опыта. Вы полностью контролируете результат - редактируете и отправляете сами."
    },
    "f3.viz.head": { en: "cover letter", ru: "сопроводительное" },
    "f3.viz.gen":  { en: "Generate",     ru: "Сгенерировать" },
    "f3.viz.tpl":  { en: "› template: saas_onboarding.md", ru: "› шаблон: saas_onboarding.md" },
    "f3.viz.unsaved": { en: "draft · unsaved", ru: "черновик · не сохранён" },

    "f3.fd.lib": { en: "// the template library", ru: "// библиотека шаблонов" },
    "f3.fd.tpl1.d": { en: "for $5k–20k product builds", ru: "для продуктовых проектов $5k–20k" },
    "f3.fd.tpl2.d": { en: "ETL / analytics / dashboarding", ru: "ETL / аналитика / дашборды" },
    "f3.fd.tpl3.d": { en: "storefront & checkout rebuilds", ru: "витрина и чекаут под Shopify" },
    "f3.fd.tpl4.d": { en: "LLM / RAG / agent work", ru: "LLM / RAG / агенты" },
    "f3.fd.tpl5.d": { en: "your team can add their own", ru: "команда может добавить свои" },
    "f3.fd.tpl5.b": { en: "+ custom", ru: "+ свой шаблон" },

    "f3.fd.pulls": { en: "// what the draft pulls in", ru: "// что подтягивается в черновик" },
    "f3.fd.t1": { en: "client name",         ru: "имя клиента" },
    "f3.fd.t2": { en: "their stack",         ru: "их стек" },
    "f3.fd.t3": { en: "your closest case",   ru: "ваш ближайший кейс" },
    "f3.fd.t4": { en: "budget framing",      ru: "формулировка бюджета" },
    "f3.fd.t5": { en: "3 clarifying Qs",     ru: "3 уточняющих вопроса" },
    "f3.fd.t6": { en: "call-to-action",      ru: "call-to-action" },
    "f3.fd.note": {
      en: "You stay in the loop - the system drafts, <b>you edit & send</b>. Replies are yours, not a bot's.",
      ru: "Вы остаётесь в процессе - система черновит, <b>вы правите и отправляете</b>. Ответы ваши, не ботские."
    },

    // f.04 CRM
    "f4.title": { en: "Built-in CRM & Message Center",  ru: "Встроенный CRM и центр сообщений" },
    "f4.soon":  { en: "Soon", ru: "Скоро" },
    "f4.lead": {
      en: "One central dashboard for every lead - status, chat history, next steps. Manage communication right inside the platform, without spreadsheets or tab-juggling.",
      ru: "Вся работа с лидами собрана в одном месте - от первого контакта до следующих шагов."
    },
    "f4.viz.head":  { en: "// pipeline", ru: "// воронка" },
    "f4.viz.headR": { en: "$84k closed", ru: "$84k закрыто" },
    "f4.col.mql":   { en: "MQL", ru: "MQL" },
    "f4.col.won":   { en: "Won", ru: "Закрыто" },
    "f4.col.qual":  { en: "Qualification", ru: "Квалификация" },
    "f4.col.sql":   { en: "SQL", ru: "SQL" },

    "f4.chip.low":  { en: "Low",    ru: "Низкий" },
    "f4.chip.med":  { en: "Medium", ru: "Средний" },
    "f4.chip.high": { en: "High",   ru: "Высокий" },
    "f4.chip.inv":  { en: "Invitation", ru: "Приглашение" },
    "f4.chip.prop": { en: "Proposal",   ru: "Отклик" },
    "f4.card1.t":   { en: "React Native Partner Needed for Mobile", ru: "Нужен партнёр по React Native для мобильного" },
    "f4.card2.t":   { en: "DevOps Engineer for Wav2Lip Deployment", ru: "DevOps-инженер для деплоя Wav2Lip" },
    "f4.team":      { en: "Izdat Team", ru: "Команда Izdat" },

    "f4.fd.stages": { en: "// pipeline stages", ru: "// стадии воронки" },
    "f4.fd.s1": { en: "<b>new</b> - matched & scored, awaiting proposal", ru: "<b>new</b> - совпало и оценено, ждёт отклика" },
    "f4.fd.s2": { en: "<b>replied</b> - proposal sent, awaiting client",  ru: "<b>replied</b> - отклик отправлен, ждём клиента" },
    "f4.fd.s3": { en: "<b>call</b> - intro call scheduled or completed",  ru: "<b>call</b> - созвон назначен или прошёл" },
    "f4.fd.s4": { en: "<b>contract</b> - offer sent, in negotiation",     ru: "<b>contract</b> - оффер отправлен, переговоры" },
    "f4.fd.s5": { en: "<b>won</b> - signed & active",                     ru: "<b>won</b> - подписали и в работе" },
    "f4.fd.one": { en: "// what you get in one place", ru: "// что вы получаете в одном месте" },
    "f4.fd.inbox":   { en: "Unified inbox", ru: "Единый inbox" },
    "f4.fd.inboxD":  { en: "every Upwork thread, searchable", ru: "все треды Upwork, с поиском" },
    "f4.fd.assign":  { en: "Assignees & notes", ru: "Ответственные и заметки" },
    "f4.fd.assignD": { en: "hand off leads across the team", ru: "передача лидов по команде" },
    "f4.fd.timer":   { en: "Follow-up timers", ru: "Таймеры follow-up" },
    "f4.fd.timerD":  { en: "nudges if no reply in 48h", ru: "напоминания, если нет ответа 48ч" },
    "f4.fd.tags":    { en: "Win/loss tags", ru: "Win/loss теги" },
    "f4.fd.tagsD":   { en: "feeds back into the scoring model", ru: "уходят обратно в модель скоринга" },
    "f4.fd.note": {
      en: "<b>Shipping Q2</b> - early-access list open. Message us to join.",
      ru: "<b>Релиз во II квартале</b> - открыт early-access. Напишите нам, чтобы попасть."
    },

    // 03 Inside
    "in.idx":   { en: "03 / Inside the platform", ru: "03 / Внутри платформы" },
    "in.title": {
      en: "Every job, <em class=\"acc\">pre-scored</em> -<br/>with the proposal already drafted",
      ru: "Каждый проект уже <em class=\"acc\">оценен</em> -<br/>и отклик к нему подготовлен"
    },
    "in.A.lab": { en: "A · Signal at a glance", ru: "A · Основная информация сразу" },
    "in.A.p":   {
      en: "Payment verified, hire rate, total spent, reviews - the signal columns that used to take 30 seconds to read, now sit above the fold.",
      ru: "Всё, что важно для оценки проекта, видно сразу."
    },
    "in.B.lab": { en: "B · Proposals, ranked", ru: "B · Скоринг откликов" },
    "in.B.p":   {
      en: "BEX surfaces which of your team members has the best match for the job - with a clear score per offer.",
      ru: "Выбираете, кто из команды лучше всего подходит под проект - и отправляете наиболее релевантный отклик."
    },
    "in.C.lab": { en: "C · Draft in one click", ru: "C · Черновик в один клик" },
    "in.C.p":   {
      en: "Cover letter is pre-generated from the template that matches this niche. You edit the specifics, not the boilerplate.",
      ru: "Сопроводительное собирается из шаблона под нишу. Вы правите конкретику, а не шаблонную часть."
    },
    "in.D.lab": { en: "D · Publish without leaving", ru: "D · Публикация без переключения" },
    "in.D.p":   {
      en: "Duration, price, Connects - everything the Upwork response form needs, inside one focused window.",
      ru: "Длительность, цена, Connects - всё, что требует форма Upwork, в одном окне."
    },

    // ui-mock
    "um.title.price": { en: "[$250]", ru: "[$250]" },
    "um.title.text":  { en: "NetSuite auto-sync deletes all tags - Expensify", ru: "NetSuite auto-sync удаляет теги - Expensify" },
    "um.cat":         { en: "Mobile Development", ru: "Мобильная разработка" },
    "um.posted":      { en: "📅 Posted 04.03.2026, 15:39", ru: "📅 Опубликовано 04.03.2026, 15:39" },
    "um.us":          { en: "United States", ru: "США" },
    "um.member":      { en: "Member since Nov 16, 2020", ru: "На Upwork с 16 ноября 2020" },
    "um.reviews":     { en: "(15 reviews)", ru: "(15 отзывов)" },
    "um.payVer":      { en: "Verified", ru: "Подтверждено" },
    "um.payLab":      { en: "Payment", ru: "Платежи" },
    "um.phoneVer":    { en: "Verified", ru: "Подтверждено" },
    "um.phoneLab":    { en: "Phone",    ru: "Телефон" },
    "um.avg":         { en: "Avg. Hourly Rate", ru: "Средняя ставка/час" },
    "um.open":        { en: "Open Jobs", ru: "Открытых вакансий" },
    "um.posted2":     { en: "Jobs Posted", ru: "Размещено вакансий" },
    "um.hireRate":    { en: "Hire Rate", ru: "Hire Rate" },
    "um.spent":       { en: "Total Spent", ru: "Всего потрачено" },
    "um.body": {
      en: "We use Expensify for expense management and NetSuite as our ERP. Recently, after enabling NetSuite's native auto-sync feature, we noticed that all custom tags in Expensify are being deleted during each sync cycle.",
      ru: "Мы используем Expensify для расходов и NetSuite в качестве ERP. После включения нативной auto-sync функции NetSuite заметили, что все кастомные теги в Expensify удаляются при каждом цикле синхронизации."
    },
    "um.more":        { en: "Read more →", ru: "Читать дальше →" },
    "um.most":        { en: "MOST RELEVANT OFFER", ru: "САМЫЙ РЕЛЕВАНТНЫЙ ОТКЛИК" },
    "um.o1.tag":      { en: "Full Stack Development", ru: "Full Stack разработка" },
    "um.o2.tag":      { en: "React / TypeScript",     ru: "React / TypeScript" },
    "um.o3.tag":      { en: "Mobile Development",     ru: "Мобильная разработка" },
    "um.other":       { en: "› Other offers",         ru: "› Другие отклики" },
    "um.replyAs":     { en: "REPLY AS", ru: "ОТВЕЧАЕТ" },
    "um.replyOpt":    { en: "Sergey Galuza - IZDAT Agency (210 connects)", ru: "Сергей Галуза - IZDAT Agency (210 connects)" },
    "um.cover":       { en: "COVER LETTER", ru: "СОПРОВОДИТЕЛЬНОЕ" },
    "um.gen":         { en: "Generate", ru: "Сгенерировать" },
    "um.tpl":         { en: "› template: saas_integration.md", ru: "› шаблон: saas_integration.md" },
    "um.cover.body": {
      en: "Hi - I reviewed your posting about the <em>NetSuite ↔ Expensify auto-sync</em> issue. We shipped a similar integration for a fintech last quarter (2-week fix, $1.8k). Quick note on the likely root cause...",
      ru: "Здравствуйте! Посмотрел ваш проект про проблему <em>NetSuite ↔ Expensify auto-sync</em>. В прошлом квартале мы делали похожую интеграцию для финтеха (2 недели, $1,8k). Коротко - вероятная причина..."
    },
    "um.duration":    { en: "DURATION", ru: "СРОК" },
    "um.dur.opt":     { en: "1 to 3 months", ru: "1–3 месяца" },
    "um.fixed":       { en: "FIXED PRICE", ru: "ФИКС-ЦЕНА" },
    "um.cancel":      { en: "Cancel", ru: "Отмена" },
    "um.publish":     { en: "✓ Publish", ru: "✓ Опубликовать" },
    "um.connects":    { en: "14 connects will be used", ru: "Будет потрачено 14 connects" },

    // 04 Why
    "why.idx":   { en: "04 / Why use BEX", ru: "04 / Зачем использовать BEX" },
    "why.title": {
      en: "From <em class=\"acc-bad\">disjointed work</em><br/>to a <em class=\"acc\">predictable flow</em>",
      ru: "От <em class=\"acc-bad\">разрозненной работы</em><br/>к <em class=\"acc\">понятному процессу</em>"
    },
    "why.before.lab": { en: "// before · chaos", ru: "// до · хаос" },
    "why.b1": { en: "manual refreshing, missed jobs",  ru: "вручную обновляете ленту, пропускаете проекты" },
    "why.b2": { en: "VPN juggling, random blocks",     ru: "VPN, блокировки и постоянные переключения" },
    "why.b3": { en: "copy-paste proposals",            ru: "копипаст откликов" },
    "why.b4": { en: "no structure, no handoff",        ru: "нет структуры и передачи задач" },
    "why.after.lab": { en: "// with BEX · order", ru: "// с BEX · порядок" },
    "why.a1": { en: "a tool that works regardless of blocks or VPNs", ru: "работает стабильно, независимо от VPN и блокировок" },
    "why.a2": { en: "one system: search → scoring → proposal",        ru: "один процесс: поиск → оценка → отклик" },
    "why.a3": { en: "less manual work, more responses",               ru: "меньше ручной работы, больше ответов" },
    "why.a4": { en: "scale the flow without scaling the team",        ru: "можно масштабировать поток без расширения команды" },

    // 05 Audience
    "aud.idx":   { en: "05 / Who is this for", ru: "05 / Для кого это" },
    "aud.title": {
      en: "Teams that do lead-gen <em class=\"acc\">themselves</em>",
      ru: "Команды, которые сами занимаются <em class=\"acc\">лидогенерацией</em>"
    },
    "aud.target.lab": { en: "target", ru: "цель" },
    "aud.target.p": {
      en: "Agencies and in-house teams who want to own the lead-gen process on Upwork, but spend less hours doing it.",
      ru: "Агентствам и in-house командам, которые хотят сами вести лидогенерацию на Upwork и тратить на неё меньше времени."
    },
    "aud.fit": { en: "online", ru: "online" },
    "aud.p1.role": { en: "Founder / Agency Lead", ru: "Founder / Agency Lead" },
    "aud.p1.size": { en: "10–25 people · React / Node / SaaS", ru: "10–25 человек · React / Node / SaaS" },
    "aud.p1.q": {
      en: "I don't want to hire a separate lead-gen manager. I want a steady stream of jobs and the team only sees the ones worth replying to.",
      ru: "Нет смысла держать отдельного лидгена ради постоянного мониторинга Upwork. Хочется, чтобы система сама находила релевантные проекты, а команда подключалась только там, где есть шанс на сделку."
    },
    "aud.p1.n1": { en: "one feed of relevant projects", ru: "единый поток подходящих проектов" },
    "aud.p1.n2": { en: "filter by budget and stack",              ru: "фильтр по бюджету и стеку" },
    "aud.p1.n3": { en: "outreach reporting",                       ru: "аналитика по откликам и конверсии" },

    "aud.p2.role": { en: "Operations Manager", ru: "Operations Manager" },
    "aud.p2.size": { en: "product team · 8–15 people", ru: "product team · 8–15 человек" },
    "aud.p2.q": {
      en: "Our manager used to spend 4 hours a day in Upwork tabs. Now we pay for a tool, not for «refresh the feed».",
      ru: "Раньше менеджеры вручную мониторили Upwork и тратили часы на отсев проектов. Сейчас команда работает только с уже подходящими заявками и быстрее выходит на созвоны."
    },
    "aud.p2.n1": { en: "less manual work", ru: "меньше ручной работы" },
    "aud.p2.n2": { en: "one queue, not 12 tabs",     ru: "единая очередь вместо вкладок" },
    "aud.p2.n3": { en: "ops visibility for leads",   ru: "прозрачность по всем откликам" },

    "aud.p3.role": { en: "Independent Studio", ru: "Independent Studio" },
    "aud.p3.size": { en: "webflow · design · niche dev", ru: "webflow · design · niche dev" },
    "aud.p3.q": {
      en: "I can't be first to reply on my own - and on Upwork that's everything. I need a tool that just says «this one's yours, write back».",
      ru: "Когда команда маленькая, невозможно постоянно сидеть в ленте Upwork. Нужен инструмент, который сам показывает релевантные проекты и помогает отвечать быстрее других."
    },
    "aud.p3.n1": { en: "scoring tuned to your stack", ru: "скоринг проектов под ваш стек" },
    "aud.p3.n2": { en: "30-sec proposal template",     ru: "шаблоны откликов за 30 секунд" },
    "aud.p3.n3": { en: "never miss fresh jobs",        ru: "не пропускать свежие проекты" },

    // --- Audience: real testimonials (replaces the persona cards) ---
    "aud.t1.who":  { en: "Yana Kishko", ru: "Yana Kishko" },
    "aud.t1.role": { en: "Head of Production", ru: "Руководитель продакшена" },
    "aud.t1.q": {
      en: "I can't be first to reply on my own - and on Upwork that's everything. I need a tool that just says «this one's yours, write back».",
      ru: "Когда команда маленькая, невозможно постоянно сидеть в ленте Upwork. Нужен инструмент, который сам показывает релевантные проекты и помогает отвечать быстрее других."
    },
    "aud.t2.who":  { en: "Natallia Remarchuk", ru: "Natallia Remarchuk" },
    "aud.t2.role": { en: "Freelancer", ru: "Фрилансер" },
    "aud.t2.q": {
      en: "I'm a freelancer. The platform made applying to relevant projects much quicker for me - with BEX I do it far faster.",
      ru: "Я фрилансер. Платформа упростила для меня время на отклик на релевантный проект. С BEX я это делаю намного быстрее."
    },
    "aud.req.lab": { en: "requirement", ru: "требование" },
    "aud.req.p": {
      en: "An active Upwork account is required to use the platform.",
      ru: "Нужен активный аккаунт Upwork."
    },

    // 06 CTA
    "cta.eyebrow": { en: "contact us · 06", ru: "свяжитесь с нами · 06" },
    "cta.title": {
      en: "Want to build a <em class=\"acc\">stable sales channel</em> on Upwork?",
      ru: "Хотите построить <em class=\"acc\">стабильный канал продаж</em> через Upwork?"
    },
    "cta.lead": {
      en: "Leave a request - we'll show a demo of the platform and walk you through a real funnel in under 20 minutes.",
      ru: "Оставьте заявку - покажем, как это работает, на реальном примере."
    },
    "cta.email.ph": { en: "you@company.com", ru: "you@company.com" },
    "cta.btn":         { en: "Request a demo", ru: "Запросить демо" },
    "cta.btn.loading": { en: "Sending…",       ru: "Отправляем…" },
    "cta.btn.done":    { en: "Requested ✓",    ru: "Заявка отправлена ✓" },
    "cta.btn.error":   { en: "Try again",      ru: "Повторить" },

    // Footer
    "foot.brand":   { en: "BEX/01 - system for attracting projects", ru: "BEX/01 - система привлечения проектов" },
    "foot.privacy": { en: "Privacy", ru: "Конфиденциальность" },
    "foot.terms":   { en: "Terms",   ru: "Условия" },
    "foot.build":   { en: "build 2026.04 · cool-blue", ru: "сборка 2026.04 · cool-blue" },

    // --- Entry / gateway page (/start) ---
    "entry.meta":  { en: "00 / Entry", ru: "00 / Вход" },
    "entry.sub": {
      en: "System for attracting projects on Upwork",
      ru: "Система по привлечению проектов на Upwork"
    },
    "entry.freelancer":     { en: "I'm a freelancer", ru: "Я фрилансер" },
    "entry.freelancer.hint":{ en: "Explore the site",  ru: "Узнать о продукте" },
    "entry.agency":         { en: "Agency",            ru: "Агентство" },
    "entry.agency.hint":    { en: "Go to the platform", ru: "Перейти на платформу" },
    "entry.page.title": {
      en: "BEX - Choose how you work",
      ru: "BEX - Выберите, как вы работаете"
    },

    // --- Persona page hero viz (scoring + notification cards) ---
    "pp.viz.scoreLabel":  { en: "Job scoring · LIVE",  ru: "Скоринг вакансий · LIVE" },
    "pp.viz.scoreBadge":  { en: "4 match today",       ru: "4 подходят сегодня" },
    "pp.viz.row1.meta":   { en: "$4,000 · fixed · 🇦🇺 · 3h ago", ru: "$4 000 · фикс · 🇦🇺 · 3ч назад" },
    "pp.viz.row2.meta":   { en: "$6,000 · fixed · 🇺🇸 · 2h ago", ru: "$6 000 · фикс · 🇺🇸 · 2ч назад" },
    "pp.viz.row3.meta":   { en: "$500 · fixed · 🇨🇦 · 1d ago",   ru: "$500 · фикс · 🇨🇦 · 1д назад" },
    "pp.viz.notifLabel":  { en: "Notifications",       ru: "Уведомления" },
    "pp.viz.notifBadge":  { en: "2 new",               ru: "2 новых" },
    "pp.viz.notifTitle":  { en: "Cover letter draft ready", ru: "Черновик отклика готов" },

    // --- Freelancer onboarding demo CTA ---
    "pp.onboard.cta":     { en: "Start onboarding", ru: "Начать онбординг" }
  };

// Keys that always render the EN value regardless of locale - these are
// pieces of the *platform UI* shown in mockups that must stay English.
export const KEEP_EN = new Set<string>([
    // f.01 - job listing cards (real Upwork postings)
    "f1.viz.head","f1.viz.headR",
    "f1.row1.title","f1.row2.title","f1.row3.title","f1.row4.title",
    "f1.r1.price","f1.r2.price","f1.r3.price","f1.r4.price",
    "f1.ago.3h","f1.ago.2h","f1.ago.1d","f1.ago.2d",
    "f1.geo.au","f1.geo.us","f1.geo.uk","f1.geo.ca",
    "f1.prop.7","f1.prop.4","f1.prop.8","f1.prop.22",
    // f.02 - notifications
    "f2.viz.head","f2.viz.headR","f2.today","f2.yesterday",
    "f2.n1.subj","f2.n1.desc","f2.n2.subj","f2.n2.desc",
    "f2.n3.subj","f2.n3.desc","f2.n4.subj","f2.n4.desc",
    // f.03 - cover-letter editor chrome
    "f3.viz.head","f3.viz.gen","f3.viz.tpl","f3.viz.unsaved",
    // f.04 - CRM pipeline board
    "f4.viz.head","f4.viz.headR",
    "f4.col.mql","f4.col.won","f4.col.qual","f4.col.sql",
    "f4.chip.low","f4.chip.med","f4.chip.high",
    "f4.chip.inv","f4.chip.prop",
    "f4.card1.t","f4.card2.t","f4.team",
    // 03 Inside the platform - the ui-mock
    "um.title.text","um.cat","um.posted",
    "um.us","um.member","um.reviews",
    "um.payLab","um.payVer","um.phoneLab","um.phoneVer",
    "um.avg","um.open","um.posted2","um.hireRate","um.spent",
    "um.body","um.more","um.most",
    "um.o1.tag","um.o2.tag","um.o3.tag","um.other",
    "um.replyAs","um.replyOpt",
    "um.cover","um.gen","um.tpl","um.cover.body",
    "um.duration","um.dur.opt","um.fixed",
    "um.cancel","um.publish","um.connects",
  ]);
