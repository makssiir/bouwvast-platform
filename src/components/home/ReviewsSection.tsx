import { useLang } from "../../i18n/LangContext"
import Icon from "../Icon"

export default function ReviewsSection() {
  const { t, lang } = useLang()

  const reviewsByLang: Record<string, { name: string; city: string; stars: number; text: string; date: string }[]> = {
    uk: [
      {
        name: "Євген Коваленко",
        city: "Амерсфорт",
        stars: 5,
        text: "Фантастичний ремонт нашої ванної кімнати. Все виконано чітко за графіком та в межах обумовленого бюджету. Комунікація була на найвищому рівні від першого дня до фінальної здачі.",
        date: "Жовтень 2025",
      },
      {
        name: "Олена Мельник",
        city: "Утрехт",
        stars: 5,
        text: "Замовляли вирівнювання стін, штукатурку та фарбування всього будинку. Ідеально рівний результат, чисте робоче місце щодня та чесна ціна без сюрпризів. Щиро рекомендую!",
        date: "Вересень 2025",
      },
      {
        name: "Дмитро Шевченко",
        city: "Гілверсум",
        stars: 5,
        text: "Виконали повний ремонт кухні з переплануванням. Бригада дуже професійна, допомогли обрати якісні матеріали та оптимізувати витрати. Результатом неймовірно задоволені.",
        date: "Листопад 2025",
      },
    ],
    en: [
      {
        name: "Jeroen van Dam",
        city: "Amersfoort",
        stars: 5,
        text: "Fantastic renovation of our bathroom. Everything delivered within schedule and budget. Clear communication from start to finish.",
        date: "October 2025",
      },
      {
        name: "Marloes Bakker",
        city: "Utrecht",
        stars: 5,
        text: "Had the whole house plastered and painted. Sleek finish, clean workplace and an honest price. Highly recommended!",
        date: "September 2025",
      },
      {
        name: "Peter de Vries",
        city: "Hilversum",
        stars: 5,
        text: "Completed full kitchen remodeling. The team was professional, suggested great solutions, and the end result is stunning.",
        date: "November 2025",
      },
    ],
    ru: [
      {
        name: "Евгений Коваленко",
        city: "Амерсфорт",
        stars: 5,
        text: "Фантастический ремонт ванной комнаты. Все выполнено в срок и в рамках оговоренного бюджета. Отличная коммуникация на каждом этапе.",
        date: "Октябрь 2025",
      },
      {
        name: "Елена Мельник",
        city: "Утрехт",
        stars: 5,
        text: "Штукатурка и покраска всего дома. Идеально ровные стены, чистота на объекте и честная цена без доплат. Рекомендую!",
        date: "Сентябрь 2025",
      },
      {
        name: "Дмитрий Шевченко",
        city: "Хилверсюм",
        stars: 5,
        text: "Полный ремонт кухни под ключ. Профессиональная бригада, отличное качество материалов и работ. Результатом очень довольны.",
        date: "Ноябрь 2025",
      },
    ],
    nl: [
      {
        name: "Jeroen van Dam",
        city: "Amersfoort",
        stars: 5,
        text: "Fantastische verbouwing van onze badkamer. Alles binnen de planning en budget opgeleverd. De communicatie was top van begin tot eind.",
        date: "Oktober 2025",
      },
      {
        name: "Marloes Bakker",
        city: "Utrecht",
        stars: 5,
        text: "Hele woning laten stucen en schilderen. Strak resultaat, schone werkplek en een eerlijke prijs. Absolute aanrader!",
        date: "September 2025",
      },
      {
        name: "Peter de Vries",
        city: "Hilversum",
        stars: 5,
        text: "Complete keukenrenovatie laten uitvoeren. Het team was professioneel, dacht mee over oplossingen en het eindresultaat is prachtig.",
        date: "November 2025",
      },
    ],
  }

  const reviews = reviewsByLang[lang] ?? reviewsByLang.uk

  const verifiedLabel =
    lang === "uk"
      ? "Понад 120 перевірених відгуків"
      : lang === "ru"
        ? "Более 120 проверенных отзывов"
        : lang === "en"
          ? "120+ verified reviews"
          : "120+ geverifieerde reviews"

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="center mb-12">
          <span className="eyebrow">{t("rev_label")}</span>
          <h2>{t("rev_title")}</h2>
          <p className="lead">{t("rev_sub")}</p>
          
          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex items-center gap-2 bg-[var(--card)] px-4 py-2 rounded-full border border-[var(--border)] shadow-sm">
              <span className="font-bold text-lg">4.9</span>
              <div className="flex gap-1 text-[#fbbf24]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--muted)]">/ 5.0</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--muted)] mt-2">
              <Icon name="check" size={16} color="#10b981" />
              <span>{verifiedLabel}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => {
            const initials = rev.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
            return (
              <div key={idx} className="card rounded-[18px] p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center font-bold text-lg">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-base m-0 font-bold">{rev.name}</h3>
                    <p className="text-sm text-[var(--muted)] m-0">{rev.city}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3 text-[#fbbf24]">
                  {[...Array(rev.stars)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 flex-grow">
                  "{rev.text}"
                </p>
                <div className="text-xs text-[var(--muted)] font-medium">
                  {rev.date}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
