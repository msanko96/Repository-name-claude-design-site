// Content for the persona landing pages (/freelancer, /agency).
// RU + EN. Kept local (fast to iterate).
import type { Lang } from "../i18n/utils";

export type Persona = "freelancer" | "agency";

export interface FormField {
  name: string;
  placeholder: string;
  type: "text" | "email" | "url";
  required: boolean;
}

export interface PersonaContent {
  pill: string;
  title: string; // may contain inline HTML (<em class="acc">…</em>)
  sub: string; // may contain inline HTML
  cta: string;
  benefitsEyebrow: string;
  benefits: { icon: string; title: string; desc: string }[];
  price: {
    label: string;
    tagline: string;
    amount: string;
    per: string;
    note: string;
    features: string[];
    cta: string;
  };
  form: {
    heading: string;
    sub: string;
    fields: FormField[];
    submit: string;
    loading: string;
    done: string;
    error: string;
  };
}

const FREELANCER: Record<Lang, PersonaContent> = {
  ru: {
    pill: "Для фрилансеров на Upwork",
    title: 'Не упускай нужные проекты <em class="acc">на Upwork</em>',
    sub: "BEX следит за лентой Upwork, фильтрует вакансии под твой стек и присылает уведомление, когда появляется что-то <b>стоящее</b>.",
    cta: "Попробовать",
    benefitsEyebrow: "Что ты получаешь",
    benefits: [
      { icon: "🎯", title: "Скоринг под твой стек", desc: "Видишь только вакансии, которые реально стоит ответа." },
      { icon: "⚡", title: "Уведомление за секунды", desc: "Telegram-уведомление как только появилась подходящая вакансия." },
      { icon: "✍️", title: "Черновик уже готов", desc: "Cover letter под твою нишу. Редактируешь детали - не пишешь с нуля." },
    ],
    price: {
      label: "Фрилансер",
      tagline: "Меньше ручной работы - больше откликов туда, где это имеет смысл.",
      amount: "€20",
      per: "/месяц",
      note: "ежемесячная подписка · отмена в любой момент",
      features: [
        "10 фильтров вакансий",
        "Мгновенные уведомления в Telegram и на e-mail",
        "Безлимит уведомлений и генераций",
        "Готовый cover letter в течение 10 секунд после генерации",
        "Быстрая поддержка",
      ],
      cta: "Попробовать",
    },
    form: {
      heading: "Оставь заявку",
      sub: "Напишем, как настроить BEX под твой стек - обычно это занимает 10 минут.",
      fields: [
        { name: "name", placeholder: "Имя", type: "text", required: false },
        { name: "telegram", placeholder: "Ссылка на Telegram", type: "text", required: false },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "upwork", placeholder: "Ссылка на профиль Upwork", type: "text", required: false },
      ],
      submit: "Отправить",
      loading: "Отправляем…",
      done: "Заявка отправлена ✓",
      error: "Повторить",
    },
  },
  en: {
    pill: "For freelancers on Upwork",
    title: 'Never miss the right projects <em class="acc">on Upwork</em>',
    sub: "BEX watches the Upwork feed, filters jobs for your stack and pings you the moment something <b>worth it</b> shows up.",
    cta: "Try it",
    benefitsEyebrow: "What you get",
    benefits: [
      { icon: "🎯", title: "Scoring for your stack", desc: "See only the jobs actually worth replying to." },
      { icon: "⚡", title: "Alerts in seconds", desc: "A Telegram alert the moment a matching job is posted." },
      { icon: "✍️", title: "Draft already written", desc: "A cover letter for your niche. You edit the details - not write from scratch." },
    ],
    price: {
      label: "Freelancer",
      tagline: "Less manual work - more proposals where they actually matter.",
      amount: "€20",
      per: "/month",
      note: "monthly subscription · cancel anytime",
      features: [
        "10 job filters",
        "Instant alerts via Telegram and e-mail",
        "Unlimited alerts & generations",
        "Cover letter ready within 10 seconds of generation",
        "Fast support",
      ],
      cta: "Try it",
    },
    form: {
      heading: "Leave a request",
      sub: "We'll show how to set BEX up for your stack - usually takes 10 minutes.",
      fields: [
        { name: "name", placeholder: "Name", type: "text", required: false },
        { name: "telegram", placeholder: "Telegram link", type: "text", required: false },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "upwork", placeholder: "Upwork profile link", type: "text", required: false },
      ],
      submit: "Submit",
      loading: "Sending…",
      done: "Request sent ✓",
      error: "Try again",
    },
  },
};

// ⚠️ DRAFT - adjust agency copy, price and form fields once finalized.
const AGENCY: Record<Lang, PersonaContent> = {
  ru: {
    pill: "Для агентств на Upwork",
    title: 'Преврати Upwork в <em class="acc">стабильный канал</em> продаж',
    sub: "BEX ведёт лидогенерацию за команду: оценивает вакансии, распределяет их между специалистами и собирает все отклики в одном месте.",
    cta: "Получить демо",
    benefitsEyebrow: "Что получает команда",
    benefits: [
      { icon: "🎯", title: "Скоринг под ниши команды", desc: "Поток только релевантных вакансий под ваши направления." },
      { icon: "🧑‍🤝‍🧑", title: "Распределение лидов", desc: "Назначайте отклики специалистам и не теряйте заявки." },
      { icon: "📊", title: "Аналитика по откликам", desc: "Прозрачность по воронке: отклики, ответы, конверсия." },
    ],
    price: {
      label: "Агентство",
      tagline: "Командная лидогенерация без отдельного лидген-менеджера.",
      amount: "По запросу",
      per: "",
      note: "цена зависит от размера команды · напишите нам",
      features: [
        "Несколько профилей и направлений",
        "Распределение лидов по команде",
        "Единый inbox по всем тредам Upwork",
        "Аналитика и отчётность",
        "AI-черновики и квалификация",
        "Командные шаблоны откликов",
        "Приоритетная поддержка",
        "Онбординг команды",
      ],
      cta: "Получить демо",
    },
    form: {
      heading: "Оставь заявку",
      sub: "Покажем, как BEX закрывает лидогенерацию для команды - демо за 20 минут.",
      fields: [
        { name: "name", placeholder: "Имя", type: "text", required: true },
        { name: "company", placeholder: "Название агентства", type: "text", required: false },
        { name: "website", placeholder: "Сайт или профиль на Upwork", type: "text", required: false },
        { name: "telegram", placeholder: "Ссылка на Telegram", type: "text", required: false },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "team_size", placeholder: "Размер команды", type: "text", required: false },
      ],
      submit: "Отправить",
      loading: "Отправляем…",
      done: "Заявка отправлена ✓",
      error: "Повторить",
    },
  },
  en: {
    pill: "For agencies on Upwork",
    title: 'Turn Upwork into a <em class="acc">steady sales channel</em>',
    sub: "BEX runs lead-gen for your team: scores jobs, routes them between specialists and keeps every thread in one place.",
    cta: "Get a demo",
    benefitsEyebrow: "What the team gets",
    benefits: [
      { icon: "🎯", title: "Scoring for your niches", desc: "A feed of only relevant jobs for your team's focus." },
      { icon: "🧑‍🤝‍🧑", title: "Lead routing", desc: "Assign proposals to specialists and never drop a lead." },
      { icon: "📊", title: "Outreach analytics", desc: "Funnel visibility: proposals, replies, conversion." },
    ],
    price: {
      label: "Agency",
      tagline: "Team lead-gen without a dedicated lead-gen manager.",
      amount: "Custom",
      per: "",
      note: "priced by team size · contact us",
      features: [
        "Multiple profiles & focus areas",
        "Lead routing across the team",
        "Unified inbox for all Upwork threads",
        "Analytics & reporting",
        "AI drafts & qualification",
        "Team proposal templates",
        "Priority support",
        "Team onboarding",
      ],
      cta: "Get a demo",
    },
    form: {
      heading: "Leave a request",
      sub: "We'll show how BEX runs lead-gen for a team - a 20-minute demo.",
      fields: [
        { name: "name", placeholder: "Name", type: "text", required: true },
        { name: "company", placeholder: "Agency name", type: "text", required: false },
        { name: "website", placeholder: "Website or Upwork profile", type: "text", required: false },
        { name: "telegram", placeholder: "Telegram link", type: "text", required: false },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "team_size", placeholder: "Team size", type: "text", required: false },
      ],
      submit: "Submit",
      loading: "Sending…",
      done: "Request sent ✓",
      error: "Try again",
    },
  },
};

export function getPersona(persona: Persona, lang: Lang): PersonaContent {
  return (persona === "agency" ? AGENCY : FREELANCER)[lang];
}
