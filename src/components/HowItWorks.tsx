import { useLang } from "@/i18n/LangContext";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

const s = (en: string, fr: string, es: string) => ({ en, fr, es });

const CONTENT = {
  label:    s("Your Journey", "Votre Parcours", "Su Recorrido"),
  title:    s("How It Works", "Comment Ça Fonctionne", "Cómo Funciona"),
  subtitle: s(
    "Five carefully considered steps — from first inspiration to final creation.",
    "Cinq étapes soigneusement pensées — de la première inspiration à la création finale.",
    "Cinco pasos cuidadosamente considerados — desde la primera inspiración hasta la creación final."
  ),
  steps: [
    {
      num: "01",
      icon: "◈",
      title:  s("Choose Your Design", "Choisissez Votre Design", "Elija Su Diseño"),
      desc:   s(
        "Browse our curated design options — Classic, Royal, Embroidered, Wedding and more. Each style is crafted to express a distinct identity.",
        "Parcourez nos options de design — Classique, Royal, Brodé, Mariage et plus. Chaque style exprime une identité distincte.",
        "Explore nuestras opciones de diseño — Clásico, Real, Bordado, Boda y más. Cada estilo expresa una identidad única."
      ),
      hint: s("Shop → Customize This Look", "Boutique → Personnaliser", "Tienda → Personalizar"),
    },
    {
      num: "02",
      icon: "◻",
      title:  s("Customize Colors & Style", "Personnalisez Couleurs & Style", "Personalice Colores y Estilo"),
      desc:   s(
        "Select your color, fabric grade, fit preference, and personal notes. Our configurator gives you full creative control.",
        "Choisissez couleur, qualité du tissu, coupe et notes personnelles. Notre configurateur vous donne le contrôle créatif.",
        "Elija color, calidad de tela, preferencia de corte y notas personales. Nuestro configurador le da control creativo total."
      ),
      hint: s("Shop → Configure Product", "Boutique → Configurer", "Tienda → Configurar"),
    },
    {
      num: "03",
      icon: "✦",
      title:  s("Submit Your Measurements", "Soumettez Vos Mesures", "Envíe Sus Medidas"),
      desc:   s(
        "Enter your precise measurements in the commission form, or use our AI Photo Analysis for a guided reading from a photo.",
        "Saisissez vos mesures précises dans le formulaire, ou utilisez notre Analyse Photo IA pour une lecture guidée.",
        "Ingrese sus medidas precisas en el formulario, o use nuestro Análisis Fotográfico IA para una lectura guiada."
      ),
      hint: s("Measurements section", "Section Mesures", "Sección de Medidas"),
    },
    {
      num: "04",
      icon: "◆",
      title:  s("Book Your Appointment", "Réservez Votre Rendez-vous", "Reserve Su Cita"),
      desc:   s(
        "Request an in-person or virtual fitting appointment. We confirm your time and review your commission details together.",
        "Demandez un rendez-vous d'essayage en personne ou virtuel. Nous confirmons votre heure et révisons votre commande ensemble.",
        "Solicite una cita de prueba en persona o virtual. Confirmamos su horario y revisamos su pedido juntos."
      ),
      hint: s("Commission form → Appointment", "Formulaire → Rendez-vous", "Formulario → Cita"),
    },
    {
      num: "05",
      icon: "❋",
      title:  s("Tailoring & Delivery", "Confection & Livraison", "Confección y Entrega"),
      desc:   s(
        "Your garment is hand-crafted to your exact specifications. We deliver or arrange final fitting, ensuring perfection in every stitch.",
        "Votre vêtement est confectionné à vos spécifications exactes. Livraison ou dernier essayage — perfection à chaque point.",
        "Su prenda es confeccionada según sus especificaciones. Entrega o última prueba — perfección en cada puntada."
      ),
      hint: s("7–21 business days", "7–21 jours ouvrables", "7–21 días hábiles"),
    },
  ],
};

export function HowItWorks() {
  const { lang } = useLang();
  const stepsRef = useStaggerReveal<HTMLDivElement>(120);

  return (
    <section id="how-it-works">
      <div className="section-inner">
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">{CONTENT.label[lang]}</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>{CONTENT.title[lang]}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px 0 28px" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            {CONTENT.subtitle[lang]}
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="hiw-steps">
          {CONTENT.steps.map((step, i) => (
            <div key={step.num} className="hiw-step reveal">
              {/* Connector line */}
              {i < CONTENT.steps.length - 1 && (
                <div className="hiw-connector" />
              )}

              {/* Step number + icon */}
              <div className="hiw-step-header">
                <div className="hiw-num serif">{step.num}</div>
                <div className="hiw-icon">{step.icon}</div>
              </div>

              {/* Content */}
              <div className="hiw-step-body">
                <h3 className="hiw-step-title">{step.title[lang]}</h3>
                <p className="hiw-step-desc">{step.desc[lang]}</p>
                <div className="hiw-step-hint">
                  <div style={{ width: 16, height: 1, background: "var(--gold)", flexShrink: 0 }} />
                  <span>{step.hint[lang]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <a href="#shop" className="btn-primary">
            {lang === "fr" ? "Commencer Votre Commission" : lang === "es" ? "Comenzar Su Comisión" : "Begin Your Commission"}
          </a>
        </div>
      </div>

      <style>{`
        #how-it-works {
          background: var(--bg-2);
          padding: 120px 40px;
          position: relative;
          overflow: hidden;
        }
        .hiw-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          position: relative;
        }
        .hiw-step {
          position: relative;
          padding: 0 24px;
          text-align: center;
          transition: transform 0.35s ease;
        }
        .hiw-step:hover { transform: translateY(-6px); }
        .hiw-step:first-child { padding-left: 0; }
        .hiw-step:last-child { padding-right: 0; }

        /* Horizontal connector between steps */
        .hiw-connector {
          position: absolute;
          top: 32px;
          right: -1px;
          width: 48px;
          height: 1px;
          background: linear-gradient(to right, var(--gold), rgba(201,169,110,0.2));
          z-index: 1;
        }

        .hiw-step-header {
          position: relative;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .hiw-num {
          font-size: 3.5rem;
          font-weight: 300;
          color: rgba(201,169,110,0.18);
          line-height: 1;
          letter-spacing: -0.02em;
          transition: color 0.35s;
        }
        .hiw-step:hover .hiw-num { color: rgba(201,169,110,0.45); }
        .hiw-icon {
          font-size: 1.4rem;
          color: var(--gold);
          margin-top: -12px;
          line-height: 1;
        }

        .hiw-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 300;
          font-style: italic;
          color: var(--text);
          margin-bottom: 14px;
          line-height: 1.3;
        }
        .hiw-step-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .hiw-step-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.7;
        }

        @media (max-width: 1024px) {
          .hiw-steps { grid-template-columns: repeat(3, 1fr); gap: 48px 0; }
          .hiw-connector { display: none; }
          .hiw-step { padding: 0 16px; }
        }
        @media (max-width: 640px) {
          #how-it-works { padding: 80px 24px; }
          .hiw-steps { grid-template-columns: 1fr; gap: 48px; }
          .hiw-step { text-align: left; padding: 0; }
          .hiw-step-header { flex-direction: row; align-items: center; gap: 16px; margin-bottom: 16px; }
          .hiw-num { font-size: 2.5rem; }
          .hiw-icon { margin-top: 0; }
          .hiw-step-hint { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}
