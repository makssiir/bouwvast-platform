import type { Page } from "../../App";
import Icon from "../Icon";
import { useLang } from "../../i18n/LangContext";
import { CONTACT } from "../../data/contact";
import { SectionLabel, H2 } from "../../pages/HomePage";

export default function ContactOptionsSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

  const options = [
    {
      icon: "whatsapp",
      title: "Direct advies nodig?",
      desc: "Start een live chat met een van onze specialisten voor een snelle inschatting.",
      cta: "Start de chat",
      action: () => {
        const quoteSection = document.getElementById("quote");
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: "smooth" });
        }
      },
      primary: false,
      color: "bg-brand/10 text-brand",
      iconColor: "var(--color-brand)"
    },
    {
      icon: "mail",
      title: "Een project bespreken?",
      desc: "Vul het formulier in. We sturen uw aanvraag naar de best passende vakman.",
      cta: "Vul het formulier in",
      action: () => {
        const quoteSection = document.getElementById("quote");
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: "smooth" });
        }
      },
      primary: true,
      color: "bg-dark text-white",
      iconColor: "white"
    }
  ];

  return (
    <section className="bg-canvas border-t border-border/60 py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <SectionLabel>Contact</SectionLabel>
          <H2>Hoe kunnen we u helpen?</H2>
          <p className="mt-6 text-base leading-relaxed text-muted font-body max-w-xl mx-auto">
            Kies de manier die het beste bij u past. Of u nu een snelle vraag heeft of een compleet project wilt bespreken, wij staan voor u klaar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((opt, i) => (
            <div 
              key={i}
              className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full animate-[fade-in-up_0.6s_ease-out_both] ${opt.primary ? 'border-dark shadow-xl shadow-dark/10 bg-white' : 'border-border/60 bg-card hover:border-brand/30'}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${opt.primary ? 'bg-dark' : opt.color.split(' ')[0]}`}>
                <Icon name={opt.icon} size={24} color={opt.iconColor} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold font-display text-dark mb-3">{opt.title}</h3>
              <p className="text-muted font-body text-sm leading-relaxed mb-8 flex-grow">
                {opt.desc}
              </p>
              
              <button 
                onClick={opt.action}
                className={`w-full py-4 rounded-xl font-bold font-body text-sm transition-all duration-300 ${opt.primary ? 'bg-brand text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20' : 'bg-transparent border border-border/80 text-dark hover:bg-dark hover:text-white hover:border-dark'}`}
              >
                {opt.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
