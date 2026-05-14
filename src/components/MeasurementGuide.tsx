import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { useLang } from "@/i18n/LangContext";

// ── Guide data ──────────────────────────────────────────────────────────────

interface Guide {
  titleEn: string; titleFr: string; titleEs: string;
  steps: { en: string; fr: string; es: string }[];
  tip: { en: string; fr: string; es: string };
  Diagram: () => JSX.Element;
}

const FIGURE_STROKE = "rgba(255,255,255,0.10)";
const GOLD = "#c9a96e";
const GOLD_DIM = "rgba(201,169,110,0.35)";

// Shared minimal body silhouette paths
function BodyBase() {
  return (
    <g stroke={FIGURE_STROKE} strokeWidth="1.2" fill="none">
      {/* Head */}
      <circle cx="90" cy="28" r="20" />
      {/* Neck */}
      <path d="M83,48 L81,64 M97,48 L99,64" />
      {/* Shoulders */}
      <path d="M81,64 L44,76 M99,64 L136,76" />
      {/* Arms */}
      <path d="M44,76 Q36,115 34,175" />
      <path d="M136,76 Q144,115 146,175" />
      {/* Torso */}
      <path d="M44,76 Q50,140 62,158 Q60,188 57,228 L57,238" />
      <path d="M136,76 Q130,140 118,158 Q120,188 123,228 L123,238" />
      {/* Hips & crotch */}
      <path d="M57,238 Q90,248 123,238" />
      {/* Legs */}
      <path d="M57,238 L60,360 M73,360 L70,238" />
      <path d="M123,238 L120,360 M107,360 L110,238" />
      {/* Feet base */}
      <path d="M60,360 L73,360 M107,360 L120,360" />
    </g>
  );
}

// Gold arc helper: draws a horizontal measurement indicator at a given Y
function HorizontalMeasure({ y, x1, x2, label }: { y: number; x1: number; x2: number; label?: string }) {
  const midX = (x1 + x2) / 2;
  return (
    <g stroke={GOLD} fill="none">
      {/* Main line */}
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth="1.5" />
      {/* End ticks */}
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} strokeWidth="1.2" />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} strokeWidth="1.2" />
      {/* Circumference arc above */}
      <ellipse cx={midX} cy={y} rx={(x2 - x1) / 2} ry={12} strokeDasharray="3,3" strokeWidth="1.2" opacity={0.5} />
      {label && (
        <text x={midX} y={y - 20} textAnchor="middle" fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">
          {label}
        </text>
      )}
    </g>
  );
}

function VerticalMeasure({ x, y1, y2, label }: { x: number; y1: number; y2: number; label?: string }) {
  const midY = (y1 + y2) / 2;
  return (
    <g stroke={GOLD} fill="none">
      <line x1={x} y1={y1} x2={x} y2={y2} strokeWidth="1.5" />
      <line x1={x - 5} y1={y1} x2={x + 5} y2={y1} strokeWidth="1.2" />
      <line x1={x - 5} y1={y2} x2={x + 5} y2={y2} strokeWidth="1.2" />
      {/* Arrow heads */}
      <path d={`M${x - 4},${y1 + 10} L${x},${y1} L${x + 4},${y1 + 10}`} strokeWidth="1.2" />
      <path d={`M${x - 4},${y2 - 10} L${x},${y2} L${x + 4},${y2 - 10}`} strokeWidth="1.2" />
      {label && (
        <text x={x + 10} y={midY + 4} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">
          {label}
        </text>
      )}
    </g>
  );
}

// ── Individual diagrams ──────────────────────────────────────────────────────

const Diagrams: Record<string, () => JSX.Element> = {
  chest: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      {/* Highlight chest zone */}
      <path d="M44,76 Q50,140 62,158" stroke={GOLD_DIM} strokeWidth="1.5" fill="none" />
      <path d="M136,76 Q130,140 118,158" stroke={GOLD_DIM} strokeWidth="1.5" fill="none" />
      <HorizontalMeasure y={100} x1={48} x2={132} label="CHEST / BUST" />
    </svg>
  ),
  waist: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <HorizontalMeasure y={158} x1={62} x2={118} label="WAIST" />
    </svg>
  ),
  hips: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <HorizontalMeasure y={210} x1={54} x2={126} label="HIPS" />
    </svg>
  ),
  shoulder: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <g stroke={GOLD} fill="none">
        <line x1={44} y1={76} x2={136} y2={76} strokeWidth="2" />
        <line x1={44} y1={70} x2={44} y2={82} strokeWidth="1.5" />
        <line x1={136} y1={70} x2={136} y2={82} strokeWidth="1.5" />
        <text x={90} y={68} textAnchor="middle" fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">SHOULDER WIDTH</text>
      </g>
    </svg>
  ),
  height: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <VerticalMeasure x={22} y1={8} y2={360} label="" />
      <text x={10} y={185} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em" transform="rotate(-90 10 185)">HEIGHT</text>
    </svg>
  ),
  inseam: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <VerticalMeasure x={72} y1={238} y2={360} />
      <text x={82} y={300} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">INSEAM</text>
    </svg>
  ),
  neck: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <g stroke={GOLD} fill="none">
        <ellipse cx={90} cy={56} rx={14} ry={9} strokeDasharray="3,3" strokeWidth="1.5" />
        <ellipse cx={90} cy={56} rx={14} ry={9} strokeWidth="1.5" opacity={0.4} />
        <text x={90} y={44} textAnchor="middle" fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">NECK</text>
      </g>
    </svg>
  ),
  sleeveLength: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <g stroke={GOLD} fill="none">
        {/* Sleeve line from shoulder seam to wrist */}
        <line x1={44} y1={76} x2={34} y2={175} strokeWidth="2" />
        <circle cx={44} cy={76} r={3} fill={GOLD} />
        <circle cx={34} cy={175} r={3} fill={GOLD} />
        <text x={16} y={130} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em" transform="rotate(-15 16 130)">SLEEVE</text>
      </g>
    </svg>
  ),
  bicep: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <g stroke={GOLD} fill="none">
        <ellipse cx={38} cy={110} rx={10} ry={8} strokeDasharray="3,3" strokeWidth="1.5" transform="rotate(-10 38 110)" />
        <text x={14} y={106} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">BICEP</text>
      </g>
    </svg>
  ),
  wrist: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <g stroke={GOLD} fill="none">
        <ellipse cx={33} cy={170} rx={7} ry={5} strokeDasharray="3,3" strokeWidth="1.5" transform="rotate(-10 33 170)" />
        <text x={10} y={160} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em">WRIST</text>
      </g>
    </svg>
  ),
  backLength: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
      <VerticalMeasure x={158} y1={76} y2={228} />
      <text x={152} y={155} fontSize="9" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="0.05em" transform="rotate(90 152 155)">BACK LENGTH</text>
    </svg>
  ),
  default: () => (
    <svg viewBox="0 0 180 390" style={svgStyle}>
      <BodyBase />
    </svg>
  ),
};

const svgStyle: React.CSSProperties = {
  width: "100%", maxWidth: 160, margin: "0 auto", display: "block",
};

// ── Guide content ────────────────────────────────────────────────────────────

const GUIDES: Record<string, Guide> = {
  chest: {
    titleEn: "Chest / Bust", titleFr: "Poitrine", titleEs: "Pecho / Busto",
    steps: [
      { en: "Stand upright, arms relaxed at your sides.", fr: "Tenez-vous droit, bras le long du corps.", es: "Párese erguido, brazos relajados." },
      { en: "Wrap the tape around the fullest part of your chest.", fr: "Enroulez le ruban autour de la partie la plus large de votre poitrine.", es: "Rodee la parte más ancha del pecho con la cinta." },
      { en: "Keep the tape parallel to the floor, snug but not tight.", fr: "Le ruban doit être parallèle au sol, ajusté sans comprimer.", es: "La cinta debe estar paralela al suelo, ajustada sin apretar." },
    ],
    tip: { en: "Breathe naturally — measure at the end of a gentle exhale.", fr: "Respirez naturellement — mesurez à la fin d'une légère expiration.", es: "Respire con naturalidad — mida al final de una espiración suave." },
    Diagram: Diagrams.chest,
  },
  waist: {
    titleEn: "Waist", titleFr: "Taille", titleEs: "Cintura",
    steps: [
      { en: "Locate your natural waistline — the narrowest part of your torso.", fr: "Repérez votre taille naturelle — la partie la plus étroite de votre torse.", es: "Ubique su cintura natural, la parte más estrecha del torso." },
      { en: "Wrap the tape at this point, keeping it parallel to the floor.", fr: "Enroulez le ruban à ce niveau, parallèle au sol.", es: "Rodee este punto con la cinta, paralela al suelo." },
      { en: "Do not suck in — measure your natural waist.", fr: "Ne rentrez pas le ventre — mesurez votre taille naturelle.", es: "No meta el abdomen — mida su cintura natural." },
    ],
    tip: { en: "Typically 2–3 cm above the navel and below the ribcage.", fr: "Généralement 2–3 cm au-dessus du nombril et en dessous des côtes.", es: "Generalmente 2–3 cm por encima del ombligo y bajo las costillas." },
    Diagram: Diagrams.waist,
  },
  hips: {
    titleEn: "Hips", titleFr: "Hanches", titleEs: "Caderas",
    steps: [
      { en: "Stand with your feet together.", fr: "Tenez-vous debout, pieds joints.", es: "Párese con los pies juntos." },
      { en: "Measure around the fullest part of your hips and seat.", fr: "Mesurez autour de la partie la plus large des hanches et des fesses.", es: "Mida alrededor de la parte más ancha de las caderas y glúteos." },
      { en: "Keep the tape parallel to the floor.", fr: "Gardez le ruban parallèle au sol.", es: "Mantenga la cinta paralela al suelo." },
    ],
    tip: { en: "Usually 18–23 cm below the natural waistline.", fr: "Généralement 18–23 cm en dessous de la taille naturelle.", es: "Generalmente 18–23 cm por debajo de la cintura natural." },
    Diagram: Diagrams.hips,
  },
  shoulder: {
    titleEn: "Shoulder Width", titleFr: "Largeur d'Épaules", titleEs: "Ancho de Hombros",
    steps: [
      { en: "Stand relaxed, looking straight ahead.", fr: "Tenez-vous détendu, regardez droit devant vous.", es: "Párese relajado, mirando al frente." },
      { en: "Measure from the tip of one shoulder to the tip of the other.", fr: "Mesurez de la pointe d'une épaule à l'autre.", es: "Mida de la punta de un hombro a la punta del otro." },
      { en: "The tape should lie flat across the upper back.", fr: "Le ruban doit être à plat sur le haut du dos.", es: "La cinta debe quedar plana sobre la parte superior de la espalda." },
    ],
    tip: { en: "Ask someone to help — this measurement is easiest with a second person.", fr: "Demandez à quelqu'un de vous aider — cette mesure est plus facile à deux.", es: "Pida ayuda — esta medida es más fácil con una segunda persona." },
    Diagram: Diagrams.shoulder,
  },
  height: {
    titleEn: "Height", titleFr: "Hauteur", titleEs: "Altura",
    steps: [
      { en: "Stand barefoot against a flat wall.", fr: "Tenez-vous pieds nus contre un mur plat.", es: "Párese descalzo contra una pared plana." },
      { en: "Stand straight with your heels touching the wall.", fr: "Tenez-vous droit, talons contre le mur.", es: "Párese derecho con los talones tocando la pared." },
      { en: "Mark the wall at the top of your head and measure from the floor.", fr: "Marquez le mur au sommet de la tête et mesurez depuis le sol.", es: "Marque la pared en la parte superior de la cabeza y mida desde el suelo." },
    ],
    tip: { en: "Measure in the morning — height can vary by up to 1 cm during the day.", fr: "Mesurez le matin — la taille peut varier jusqu'à 1 cm au cours de la journée.", es: "Mida por la mañana — la altura puede variar hasta 1 cm durante el día." },
    Diagram: Diagrams.height,
  },
  inseam: {
    titleEn: "Inseam", titleFr: "Entrejambe", titleEs: "Entrepierna",
    steps: [
      { en: "Stand upright with feet slightly apart.", fr: "Tenez-vous droit, pieds légèrement écartés.", es: "Párese erguido con los pies ligeramente separados." },
      { en: "Measure from the crotch seam to the bottom of the ankle.", fr: "Mesurez de la couture de l'entrejambe jusqu'à la cheville.", es: "Mida desde la costura de la entrepierna hasta el tobillo." },
      { en: "Keep the tape running straight down the inside of the leg.", fr: "Maintenez le ruban droit le long de l'intérieur de la jambe.", es: "Mantenga la cinta recta a lo largo de la parte interior de la pierna." },
    ],
    tip: { en: "Wear the shoes you intend to wear with the garment for best accuracy.", fr: "Portez les chaussures prévues avec le vêtement pour plus de précision.", es: "Use los zapatos previstos para la prenda para mayor precisión." },
    Diagram: Diagrams.inseam,
  },
  neck: {
    titleEn: "Neck", titleFr: "Cou", titleEs: "Cuello",
    steps: [
      { en: "Measure around the base of your neck where a collar sits.", fr: "Mesurez autour de la base du cou, là où repose un col.", es: "Mida alrededor de la base del cuello, donde descansa un cuello." },
      { en: "Keep two fingers between the tape and your neck for comfort ease.", fr: "Glissez deux doigts entre le ruban et votre cou pour l'aisance.", es: "Deje dos dedos entre la cinta y el cuello para comodidad." },
      { en: "Round up to the nearest half inch.", fr: "Arrondissez au demi-pouce supérieur.", es: "Redondee al medio pulgada superior." },
    ],
    tip: { en: "This determines collar size and the drape of the neckline.", fr: "Cela détermine la taille du col et le tombé de l'encolure.", es: "Esto determina el tamaño del cuello y la caída del escote." },
    Diagram: Diagrams.neck,
  },
  sleeveLength: {
    titleEn: "Sleeve Length", titleFr: "Longueur de Manche", titleEs: "Largo de Manga",
    steps: [
      { en: "Start at the center back of the neck at the base.", fr: "Commencez au centre du dos, à la base du cou.", es: "Comience en el centro de la espalda, en la base del cuello." },
      { en: "Measure across the shoulder to the elbow, then to the wrist.", fr: "Mesurez de l'épaule au coude, puis jusqu'au poignet.", es: "Mida desde el hombro hasta el codo, luego hasta la muñeca." },
      { en: "Keep your arm slightly bent for a natural measurement.", fr: "Gardez le bras légèrement plié pour une mesure naturelle.", es: "Mantenga el brazo ligeramente doblado para una medida natural." },
    ],
    tip: { en: "Bend your elbow at 90° when measuring for the most accurate result.", fr: "Pliez votre coude à 90° lors de la mesure pour plus de précision.", es: "Doble el codo a 90° al medir para mayor precisión." },
    Diagram: Diagrams.sleeveLength,
  },
  bicep: {
    titleEn: "Bicep", titleFr: "Biceps", titleEs: "Bíceps",
    steps: [
      { en: "Relax your arm at your side — do not flex.", fr: "Gardez le bras relâché le long du corps — ne fléchissez pas.", es: "Relaje el brazo al costado — no haga fuerza." },
      { en: "Measure around the fullest part of the upper arm.", fr: "Mesurez autour de la partie la plus large du bras.", es: "Mida alrededor de la parte más ancha del brazo superior." },
      { en: "Keep the tape snug but not compressing the muscle.", fr: "Le ruban doit être ajusté sans comprimer le muscle.", es: "La cinta debe estar ajustada sin comprimir el músculo." },
    ],
    tip: { en: "Crucial for fitted sleeves — determines mobility and comfort.", fr: "Essentiel pour les manches ajustées — détermine mobilité et confort.", es: "Crucial para mangas ajustadas — determina movilidad y comodidad." },
    Diagram: Diagrams.bicep,
  },
  wrist: {
    titleEn: "Wrist", titleFr: "Poignet", titleEs: "Muñeca",
    steps: [
      { en: "Measure around the wrist just above the wrist bone.", fr: "Mesurez autour du poignet juste au-dessus de l'os.", es: "Mida alrededor de la muñeca justo por encima del hueso." },
      { en: "Keep the tape comfortably snug.", fr: "Le ruban doit être confortablement ajusté.", es: "La cinta debe estar cómodamente ajustada." },
      { en: "This determines cuff width and button placement.", fr: "Cela détermine la largeur du poignet et le placement des boutons.", es: "Esto determina el ancho del puño y la colocación de los botones." },
    ],
    tip: { en: "Measure both wrists — dominant hand is often slightly larger.", fr: "Mesurez les deux poignets — la main dominante est souvent un peu plus grande.", es: "Mida ambas muñecas — la mano dominante suele ser ligeramente más grande." },
    Diagram: Diagrams.wrist,
  },
  backLength: {
    titleEn: "Back Length", titleFr: "Longueur de Dos", titleEs: "Largo de Espalda",
    steps: [
      { en: "Start at the prominent bone at the base of the neck (C7 vertebra).", fr: "Commencez à la vertèbre proéminente à la base du cou (C7).", es: "Comience en el hueso prominente de la base del cuello (vértebra C7)." },
      { en: "Measure straight down to your natural waistline.", fr: "Mesurez en ligne droite jusqu'à votre taille naturelle.", es: "Mida en línea recta hasta su cintura natural." },
      { en: "Keep your posture straight and natural.", fr: "Gardez une posture droite et naturelle.", es: "Mantenga una postura recta y natural." },
    ],
    tip: { en: "This is fundamental to shirt and jacket proportions.", fr: "C'est fondamental pour les proportions des chemises et vestes.", es: "Es fundamental para las proporciones de camisas y chaquetas." },
    Diagram: Diagrams.backLength,
  },
  calcHeight: {
    titleEn: "Height", titleFr: "Hauteur", titleEs: "Altura",
    steps: [
      { en: "Stand barefoot against a flat wall.", fr: "Tenez-vous pieds nus contre un mur plat.", es: "Párese descalzo contra una pared plana." },
      { en: "Stand straight with heels touching the wall.", fr: "Tenez-vous droit, talons contre le mur.", es: "Párese derecho con los talones tocando la pared." },
      { en: "Mark the wall at the top of your head, then measure from the floor.", fr: "Marquez le mur au sommet et mesurez depuis le sol.", es: "Marque la pared en la parte superior y mida desde el suelo." },
    ],
    tip: { en: "Measure in the morning for the most consistent result.", fr: "Mesurez le matin pour un résultat plus constant.", es: "Mida por la mañana para un resultado más consistente." },
    Diagram: Diagrams.height,
  },
};

// Fall back for unmapped keys
function getGuide(key: string): Guide {
  return GUIDES[key] ?? { ...GUIDES.chest, Diagram: Diagrams.default };
}

// ── Context ──────────────────────────────────────────────────────────────────

interface GuideCtx { open: (key: string) => void }
const Ctx = createContext<GuideCtx>({ open: () => {} });
export function useMeasurementGuide() { return useContext(Ctx); }

export function MeasurementGuideProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState<string | null>(null);
  const open = useCallback((k: string) => setKey(k), []);
  const close = useCallback(() => setKey(null), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {key && <GuideModal guideKey={key} onClose={close} />}
    </Ctx.Provider>
  );
}

// ── Help button ──────────────────────────────────────────────────────────────

export function HelpIcon({ measurementKey }: { measurementKey: string }) {
  const { open } = useMeasurementGuide();
  return (
    <button
      type="button"
      onClick={e => { e.preventDefault(); e.stopPropagation(); open(measurementKey); }}
      title="How to measure"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 18, height: 18, borderRadius: "50%",
        border: "1px solid var(--gold)", background: "transparent",
        color: "var(--gold)", fontSize: "0.6rem", fontFamily: "Georgia, serif",
        cursor: "pointer", flexShrink: 0,
        transition: "background 0.2s, color 0.2s",
        verticalAlign: "middle", marginLeft: 6,
        lineHeight: 1,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
    >
      ?
    </button>
  );
}

// ── Guide modal ──────────────────────────────────────────────────────────────

function GuideModal({ guideKey, onClose }: { guideKey: string; onClose: () => void }) {
  const { lang } = useLang();
  const guide = getGuide(guideKey);
  const title = lang === "fr" ? guide.titleFr : lang === "es" ? guide.titleEs : guide.titleEn;
  const tip   = guide.tip[lang];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Escape") onClose(); };

  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKey}
      autoFocus
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(4,4,4,0.96)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          width: "100%", maxWidth: 560,
          maxHeight: "92vh",
          overflowY: "auto",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid var(--border)" }}>
          <div>
            <div style={{ fontSize: "0.52rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
              {lang === "fr" ? "Guide de Mesure" : lang === "es" ? "Guía de Medición" : "Measurement Guide"}
            </div>
            <div className="serif" style={{ fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)" }}>{title}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", width: 36, height: 36, cursor: "pointer", fontSize: "1rem", fontFamily: "inherit", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", gap: 0, flex: 1 }}>
          {/* Diagram */}
          <div style={{ width: 180, flexShrink: 0, padding: "28px 20px", borderRight: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
            <guide.Diagram />
          </div>

          {/* Instructions */}
          <div style={{ flex: 1, padding: "28px 28px" }}>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
              {lang === "fr" ? "Instructions" : lang === "es" ? "Instrucciones" : "Instructions"}
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {guide.steps.map((step, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span className="serif" style={{ fontSize: "1.1rem", color: "var(--gold)", fontWeight: 300, fontStyle: "italic", flexShrink: 0, lineHeight: 1.2, marginTop: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
                    {step[lang]}
                  </span>
                </li>
              ))}
            </ol>

            {/* Tip */}
            <div style={{ marginTop: 24, padding: "14px 16px", borderLeft: "2px solid var(--gold)", background: "var(--bg-2)" }}>
              <div style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>
                {lang === "fr" ? "Conseil" : lang === "es" ? "Consejo" : "Pro Tip"}
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.7, margin: 0 }}>{tip}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 28px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {lang === "fr" ? "Appuyez sur ESC pour fermer" : lang === "es" ? "Presione ESC para cerrar" : "Press ESC to close"}
          </p>
        </div>
      </div>
    </div>
  );
}
