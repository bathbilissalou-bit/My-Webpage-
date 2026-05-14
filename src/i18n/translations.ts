export type Lang = "en" | "fr" | "es";

type Tr = { en: string; fr: string; es: string };
const s = (en: string, fr: string, es: string): Tr => ({ en, fr, es });

export const t = {
  nav: {
    home:        s("Home",         "Accueil",    "Inicio"),
    about:       s("About",        "À Propos",   "Nosotros"),
    collection:  s("Collection",   "Collection", "Colección"),
    lookbook:    s("Lookbook",     "Lookbook",   "Lookbook"),
    process:     s("Process",      "Processus",  "Proceso"),
    surMesure:   s("Sur-Mesure",   "Sur-Mesure", "A Medida"),
    measurements:s("Measurements", "Mensurations","Medidas"),
    contact:     s("Contact",      "Contact",    "Contacto"),
    beginCommission: s(
      "Begin Your Commission",
      "Commencer Ma Commande",
      "Iniciar Mi Encargo"
    ),
  },

  hero: {
    eyebrow: s(
      "African Fashion · Exceptional Craftsmanship",
      "Mode Africaine · Artisanat d'Exception",
      "Moda Africana · Artesanía de Excepción"
    ),
    sub: s("Bespoke Creations", "Créations Sur-Mesure", "Creaciones a Medida"),
    body: s(
      "Handcrafted garments, shoes and accessories celebrating African cultural identity. Made for those who wear their story with pride.",
      "Vêtements, chaussures et accessoires artisanaux célébrant l'identité culturelle africaine. Pour ceux qui portent leur histoire avec fierté.",
      "Prendas, zapatos y accesorios artesanales que celebran la identidad cultural africana. Para quienes llevan su historia con orgullo."
    ),
    cta1:   s("Discover the Collection", "Découvrir la Collection",  "Descubrir la Colección"),
    cta2:   s("Order Sur-Mesure",        "Commander Sur-Mesure",     "Pedir a Medida"),
    scroll: s("Scroll",                  "Défiler",                  "Desplazar"),
  },

  about: {
    label: s("Our Story",    "Notre Histoire",  "Nuestra Historia"),
    title: s(
      "A Peaceful Haven, Rooted in African Excellence",
      "Un Havre Paisible, Ancré dans l'Excellence Africaine",
      "Un Refugio Tranquilo, Arraigado en la Excelencia Africana"
    ),
    p1: s(
      "Founded by Bath Bilissalou, from the Republic of Congo to New York, HavrePlacide was born from a passion for African heritage and a vision of fashion rooted in culture, elegance, and identity.",
      "Fondée par Bath Bilissalou, de la République du Congo à New York, HavrePlacide est née d'une passion pour l'héritage africain et d'une vision de la mode ancrée dans la culture, l'élégance et l'identité.",
      "Fundada por Bath Bilissalou, de la República del Congo a Nueva York, HavrePlacide nació de una pasión por el patrimonio africano y una visión de la moda arraigada en la cultura, la elegancia y la identidad."
    ),
    p2: s(
      "Each piece is handcrafted with intention for those who see fashion as a reflection of who they are. Rooted in tradition and shaped for today, every creation tells a story worth wearing.",
      "Chaque pièce est confectionnée à la main avec intention, pour ceux qui voient la mode comme le reflet de qui ils sont. Ancrée dans la tradition et façonnée pour aujourd'hui, chaque création raconte une histoire qui mérite d'être portée.",
      "Cada pieza se confecciona a mano con intención, para quienes ven la moda como un reflejo de quiénes son. Arraigada en la tradición y diseñada para hoy, cada creación cuenta una historia digna de llevar."
    ),
    statFounded:  s("Founded",       "Fondée",          "Fundada"),
    statPieces:   s("Pieces Made",   "Pièces Créées",   "Piezas Creadas"),
    statClients:  s("Happy Clients", "Clients Satisfaits","Clientes Felices"),
    cta:          s("See How We Work","Découvrir Notre Processus","Ver Cómo Trabajamos"),
    artisan:      s("Artisan",        "Artisan",          "Artesano"),
    artisanQuote: s(
      "Made by hand. Worn with pride.",
      "Fait à la main. Porté avec fierté.",
      "Hecho a mano. Llevado con orgullo."
    ),
  },

  shop: {
    label:   s("The Collection", "La Collection", "La Colección"),
    title:   s("Shop",           "Boutique",      "Tienda"),
    btnShop:      s("Shop Now",           "Voir",                       "Ver"),
    configureBtn: s("Customize This Look","Personnaliser ce Look",      "Personalizar este Look"),
    cta:     s(
      "Request Custom Piece",
      "Commander une Pièce Sur-Mesure",
      "Solicitar una Pieza a Medida"
    ),
    products: [
      {
        name: s("Tunique Bleu Marine", "Tunique Bleu Marine", "Túnica Azul Marino"),
        desc: s(
          "Handcrafted in super 220 fabric. Deep navy with signature embroidered pocket detail. Structured, sharp, and unmistakably HavrePlacide.",
          "Confectionnée en tissu super 220. Bleu marine profond avec détail brodé signature sur la poche. Structurée, nette et incontestablement HavrePlacide.",
          "Confeccionada en tela super 220. Azul marino profundo con detalle bordado característico en el bolsillo. Estructurada, nítida e inconfundiblemente HavrePlacide."
        ),
        price: "$350 – $400",
      },
      {
        name: s("Tunique Gris Lin", "Tunique Gris Lin", "Túnica Gris Lino"),
        desc: s(
          "Super 100 fabric in soft grey with hand-stitched ornamental patterns. Lightweight, refined, and built to move with you through every occasion.",
          "Tissu super 100 dans un gris doux, avec motifs ornementaux cousus à la main. Légère, raffinée et conçue pour vous accompagner en toute occasion.",
          "Tela super 100 en gris suave con patrones ornamentales cosidos a mano. Ligera, refinada y diseñada para acompañarte en cada ocasión."
        ),
        price: "$350 – $400",
      },
      {
        name: s("Tunique Grège", "Tunique Grège", "Túnica Greige"),
        desc: s(
          "Crafted in super 220, our finest grade. Twin floral-embroidered chest pockets and a polished cufflink finish. Subtle luxury in every thread.",
          "Confectionnée en super 220, notre qualité la plus fine. Double poche poitrine brodée de motifs floraux et finition boutons de manchette. Un luxe subtil dans chaque fil.",
          "Confeccionada en super 220, nuestra mejor calidad. Doble bolsillo bordado con motivos florales y acabado de gemelos pulidos. Lujo sutil en cada hilo."
        ),
        price: "$350 – $400",
      },
    ],
  },

  lookbook: {
    label:    s("Editorial",           "Éditorial",         "Editorial"),
    title:    s("Lookbook",            "Lookbook",          "Lookbook"),
    season:   s("Spring / Summer 2025","Printemps / Été 2025","Primavera / Verano 2025"),
    looks: [
      { title: s("His & Hers Collection","Collection Lui & Elle","Colección Él & Ella") },
      { title: s("Spring Editorial",   "Éditorial Printemps","Editorial Primavera") },
      { title: s("Relaxed Tailoring",    "Tailleur Décontracté", "Sastrería Relajada") },
      { title: s("Craftsmanship Detail", "Détail Artisanal",     "Detalle Artesanal") },
      { title: s("Signature Finish",     "Finition Signature",   "Acabado Signature") },
    ],
  },

  process: {
    label: s("How It Works",         "Comment ça marche",  "Cómo Funciona"),
    title: s("The Sur-Mesure Process","Le Processus Sur-Mesure","El Proceso a Medida"),
    cta:   s("Start My Measurements", "Commencer Mes Mensurations","Comenzar Mis Medidas"),
    steps: [
      {
        title: s("Choose Your Style",       "Choisir Votre Style",          "Elegir Su Estilo"),
        desc:  s(
          "Browse our African-inspired silhouettes: tuniques, 3-pièces, leather sneakers, and accessories. Tell us what speaks to you, and we'll guide the rest.",
          "Parcourez nos silhouettes d'inspiration africaine : tuniques, 3-pièces, baskets en cuir et accessoires. Dites-nous ce qui vous parle, nous vous guidons pour le reste.",
          "Explore nuestras siluetas de inspiración africana: túnicas, 3 piezas, zapatillas de cuero y accesorios. Díganos qué le atrae y le guiaremos en el resto."
        ),
      },
      {
        title: s("Share Your Measurements", "Partager Vos Mesures",          "Compartir Sus Medidas"),
        desc:  s(
          "Use our AI-powered measurement tool or submit your dimensions directly. Every measure is captured so your piece fits like it was born for your body.",
          "Utilisez notre outil de mensuration par IA ou envoyez vos mesures directement. Chaque dimension est enregistrée pour que votre pièce soit faite pour votre corps.",
          "Use nuestra herramienta de medición con IA o envíe sus dimensiones directamente. Cada medida es registrada para que su pieza encaje como si hubiera nacido para su cuerpo."
        ),
      },
      {
        title: s("Select Your Fabric",      "Choisir Votre Tissu",           "Seleccionar Su Tela"),
        desc:  s(
          "Choose from super 100 or super 220 grade fabrics. Fine materials selected for quality, drape, and durability, rooted in African textile tradition.",
          "Choisissez parmi les tissus super 100 ou super 220. Des matières sélectionnées pour leur qualité, leur tombé et leur durabilité, ancrées dans la tradition textile africaine.",
          "Elija entre telas de grado super 100 o super 220. Materiales finos seleccionados por su calidad, caída y durabilidad, enraizados en la tradición textil africana."
        ),
      },
      {
        title: s("We Craft Your Piece",     "Nous Confectionnons Votre Pièce","Confeccionamos Su Pieza"),
        desc:  s(
          "Every piece is handmade by skilled artisans. Stitched with care, shaped with precision, finished with the time it takes to get it right.",
          "Chaque pièce est fabriquée à la main par des artisans qualifiés. Cousue avec soin, façonnée avec précision, finalisée avec le temps qu'il faut pour bien faire.",
          "Cada pieza es confeccionada a mano por artesanos expertos. Cosida con cuidado, moldeada con precisión, terminada con el tiempo necesario para hacerlo bien."
        ),
      },
      {
        title: s("Delivered to You",        "Livrée Chez Vous",              "Entregada en Su Puerta"),
        desc:  s(
          "Your commission ships directly to your door, elegantly packaged. A one-of-a-kind creation, ready to wear and built to last a lifetime.",
          "Votre commande est livrée directement à votre porte, élégamment emballée. Une création unique en son genre, prête à porter et faite pour durer toute une vie.",
          "Su encargo llega directamente a su puerta, elegantemente empaquetado. Una creación única en su género, lista para usar y construida para durar toda una vida."
        ),
      },
    ],
  },

  whyCustom: {
    label: s("Why Sur-Mesure",     "Pourquoi le Sur-Mesure", "Por Qué a Medida"),
    title: s("Why Choose Custom?", "Pourquoi Choisir le Sur-Mesure ?","¿Por Qué Elegir a Medida?"),
    sub: s(
      "Ready-to-wear was never designed with you in mind. Sur-mesure is the opposite: every choice, every cut, every thread made for you specifically.",
      "Le prêt-à-porter n'a jamais été conçu pour vous. Le sur-mesure, c'est tout le contraire : chaque choix, chaque coupe, chaque fil pensé spécialement pour vous.",
      "La ropa de confección nunca fue diseñada pensando en usted. Lo hecho a medida es todo lo contrario: cada elección, cada corte, cada hilo hecho específicamente para usted."
    ),
    cta: s("Begin Your Commission","Commencer Ma Commande","Iniciar Mi Encargo"),
    benefits: [
      {
        title:    s("Coupe Parfaite",   "Coupe Parfaite",    "Corte Perfecto"),
        subtitle: s("Perfect Fit",      "Ajustement Parfait", "Ajuste Perfecto"),
        desc:     s(
          "Every piece is measured, cut, and tailored precisely to your body. No approximations, no compromises. A garment that moves with you, built for your proportions alone.",
          "Chaque pièce est mesurée, coupée et ajustée précisément à votre corps. Sans approximations ni compromis. Un vêtement qui vous suit, conçu pour vos seules proportions.",
          "Cada pieza se mide, corta y confecciona con precisión para su cuerpo. Sin aproximaciones ni compromisos. Una prenda que se mueve con usted, hecha solo para sus proporciones."
        ),
      },
      {
        title:    s("Matières Premiums", "Matières Premiums",  "Materiales Premium"),
        subtitle: s("Premium Materials", "Matières d'Exception","Materiales de Excepción"),
        desc:     s(
          "We work exclusively with super 100 and super 220 fabrics. Fine, durable materials selected for their quality, drape, and longevity. Sourced with care, crafted with intention.",
          "Nous travaillons exclusivement avec des tissus super 100 et super 220. Des matières fines et durables sélectionnées pour leur qualité, leur tombé et leur longévité. Sourcées avec soin, confectionnées avec intention.",
          "Trabajamos exclusivamente con telas super 100 y super 220. Materiales finos y duraderos seleccionados por su calidad, caída y longevidad. Obtenidos con cuidado, confeccionados con intención."
        ),
      },
      {
        title:    s("Pièce Unique", "Pièce Unique",    "Pieza Única"),
        subtitle: s("One of a Kind","Une Seule au Monde","Una en el Mundo"),
        desc:     s(
          "Each HavrePlacide piece is handcrafted one at a time. Your creation exists nowhere else in the world, as singular as your identity and made to last a lifetime.",
          "Chaque pièce HavrePlacide est confectionnée à la main, une à la fois. Votre création n'existe nulle part ailleurs dans le monde, aussi singulière que votre identité et faite pour durer toute une vie.",
          "Cada pieza HavrePlacide se confecciona a mano, una a la vez. Su creación no existe en ningún otro lugar del mundo, tan singular como su identidad y hecha para durar toda una vida."
        ),
      },
    ],
  },

  measurements: {
    label:    s("Perfect Fit",    "Coupe Parfaite",   "Ajuste Perfecto"),
    title:    s("Get Measured",   "Prise de Mesures", "Tomar Medidas"),
    sub:      s(
      "Upload a photo and our AI will estimate your body measurements for a perfect fit, or use our size calculator below.",
      "Téléchargez une photo et notre IA estimera vos mensurations pour une coupe parfaite, ou utilisez notre calculateur de taille ci-dessous.",
      "Suba una foto y nuestra IA estimará sus medidas corporales para un ajuste perfecto, o use nuestro calculador de talla a continuación."
    ),
    steps: [
      {
        num: "01",
        title: s("Prepare",    "Préparez-vous", "Prepárese"),
        desc:  s(
          "Wear fitted clothing and stand straight in good lighting.",
          "Portez des vêtements ajustés et tenez-vous droit dans un bon éclairage.",
          "Use ropa ajustada y párese recto con buena iluminación."
        ),
      },
      {
        num: "02",
        title: s("Capture",    "Photographiez", "Fotografíe"),
        desc:  s(
          "Upload a clear front-facing photo showing your full body.",
          "Téléchargez une photo nette de face montrant votre corps entier.",
          "Suba una foto nítida de frente que muestre su cuerpo completo."
        ),
      },
      {
        num: "03",
        title: s("Receive",    "Recevez",       "Reciba"),
        desc:  s(
          "Get your estimated measurements instantly from our AI.",
          "Recevez instantanément vos mensurations estimées par notre IA.",
          "Obtenga sus medidas estimadas al instante gracias a nuestra IA."
        ),
      },
    ],
    aiTitle:       s("AI Photo Analysis",       "Analyse Photo par IA",          "Análisis de Foto con IA"),
    namePH:        s("Your Name",               "Votre Nom",                     "Su Nombre"),
    emailPH:       s("Your Email",              "Votre Email",                   "Su Email"),
    uploadLabel:   s("Upload Photo",            "Télécharger une Photo",         "Subir Foto"),
    notesPH:       s(
      "Additional notes (height, weight, fit preferences)...",
      "Notes supplémentaires (taille, poids, préférences de coupe)...",
      "Notas adicionales (altura, peso, preferencias de corte)..."
    ),
    uploadGallery: s("Photo Library",           "Galerie Photo",                 "Galería"),
    uploadCamera:  s("Take Photo",              "Prendre une Photo",             "Tomar Foto"),
    uploadHint:    s(
      "Supports JPG, PNG, HEIC (iPhone). Image is compressed automatically.",
      "Formats JPG, PNG, HEIC (iPhone). L'image est compressée automatiquement.",
      "Formatos JPG, PNG, HEIC (iPhone). La imagen se comprime automáticamente."
    ),
    analyzeBtn:    s("Analyze Measurements",    "Analyser les Mensurations",     "Analizar Medidas"),
    analyzingBtn:  s("Analyzing...",            "Analyse en cours...",           "Analizando..."),
    resultTitle:   s("Your Measurements",       "Vos Mensurations",              "Sus Medidas"),
    chest:         s("Chest",   "Poitrine",  "Pecho"),
    waist:         s("Waist",   "Taille",    "Cintura"),
    hips:          s("Hips",    "Hanches",   "Caderas"),
    inseam:        s("Inseam",  "Entrejambe","Entrepierna"),
    shoulder:      s("Shoulder","Épaules",   "Hombros"),
    height:        s("Height",  "Hauteur",   "Altura"),
    recSize:       s("Recommended Size","Taille Recommandée","Talla Recomendada"),
    notes:         s("Notes",   "Notes",     "Notas"),
    confidence:    s("Confidence","Fiabilité","Fiabilidad"),
    calcTitle:     s("Size Calculator",         "Calculateur de Taille",         "Calculador de Talla"),
    calcSub:       s(
      "Already know your measurements? Enter them below for an instant size recommendation.",
      "Vous connaissez déjà vos mesures ? Saisissez-les ci-dessous pour une recommandation de taille instantanée.",
      "¿Ya conoce sus medidas? Ingréselas abajo para una recomendación de talla instantánea."
    ),
    chestPH:           s("Chest / Bust (in)",    "Poitrine (po)",         "Pecho / Busto (pulg)"),
    waistPH:           s("Waist (in)",           "Taille (po)",           "Cintura (pulg)"),
    hipsPH:            s("Hips (in)",            "Hanches (po)",          "Caderas (pulg)"),
    shoulderWidthPH:   s("Shoulder Width (in)",  "Largeur Épaules (po)",  "Ancho Hombros (pulg)"),
    neckPH:            s("Neck (in)",            "Cou (po)",              "Cuello (pulg)"),
    sleeveLengthPH:    s("Sleeve Length (in)",   "Longueur Manche (po)",  "Largo Manga (pulg)"),
    bicepPH:           s("Bicep (in)",           "Biceps (po)",           "Bíceps (pulg)"),
    wristPH:           s("Wrist (in)",           "Poignet (po)",          "Muñeca (pulg)"),
    backLengthPH:      s("Back Length (in)",     "Longueur Dos (po)",     "Largo Espalda (pulg)"),
    inseamCalcPH:      s("Inseam (in)",          "Entrejambe (po)",       "Entrepierna (pulg)"),
    heightPH:          s("Height (in)",          "Hauteur (po)",          "Altura (pulg)"),
    calcNamePH:        s("Your Name",            "Votre Nom",             "Su Nombre"),
    calcEmailPH:       s("Your Email (optional)","Votre Email (optionnel)","Su Email (opcional)"),
    fitDefault:        s("Select Fit Style",     "Choisir la Coupe",      "Seleccionar Corte"),
    fitSlim:           s("Slim Fit",             "Coupe Slim",            "Corte Slim"),
    fitRegular:        s("Regular Fit",          "Coupe Régulière",       "Corte Regular"),
    fitLoose:          s("Loose Fit",            "Coupe Ample",           "Corte Holgado"),
    calcBtn:           s("Submit Measurements",  "Envoyer les Mesures",   "Enviar Medidas"),
    calcResultTitle:   s("Your Size",            "Votre Taille",          "Su Talla"),
    calcSuccess:       s(
      "Measurements received. We will be in touch within 24 hours.",
      "Mesures reçues. Nous vous contacterons sous 24 heures.",
      "Medidas recibidas. Nos pondremos en contacto en menos de 24 horas."
    ),
    calcError:     s(
      "Please fill in Chest / Bust, Waist, and Height at minimum.",
      "Veuillez renseigner au minimum la Poitrine, la Taille et la Hauteur.",
      "Por favor, complete al menos Pecho / Busto, Cintura y Altura."
    ),
    uploadError:   s(
      "Please upload a photo to analyze.",
      "Veuillez télécharger une photo à analyser.",
      "Por favor, suba una foto para analizar."
    ),
    genericError:  s(
      "Something went wrong.",
      "Une erreur est survenue.",
      "Algo salió mal."
    ),
    comingSoon: s(
      "Photo analysis is coming soon. Please enter your measurements manually for now.",
      "L'analyse photo arrive bientôt. Veuillez saisir vos mensurations manuellement pour le moment.",
      "El análisis de fotos llega pronto. Por favor, ingrese sus medidas manualmente por ahora."
    ),
  },

  contact: {
    label:         s("Get In Touch",   "Prendre Contact",    "Ponerse en Contacto"),
    title:         s("Contact Us",     "Contactez-Nous",     "Contáctenos"),
    sub:           s(
      "Ready to order a custom piece, or have questions about our collection? We'd love to hear from you.",
      "Prêt à commander une pièce sur-mesure, ou des questions sur notre collection ? Nous serions ravis de vous entendre.",
      "¿Listo para encargar una pieza a medida o tiene preguntas sobre nuestra colección? Nos encantaría escucharle."
    ),
    quote:         s(
      "\"Every garment is a conversation between tradition and the present moment.\"",
      "« Chaque vêtement est une conversation entre la tradition et le moment présent. »",
      "«Cada prenda es una conversación entre la tradición y el momento presente.»"
    ),
    emailLabel:    s("Email",         "Email",        "Email"),
    phoneLabel:    s("Phone",         "Téléphone",    "Teléfono"),
    igLabel:       s("Instagram",     "Instagram",    "Instagram"),
    fbLabel:       s("Facebook",      "Facebook",     "Facebook"),
    ttLabel:       s("TikTok",        "TikTok",       "TikTok"),
    locationLabel: s("Location",      "Localisation",  "Ubicación"),
    locationValue: s("New York, USA", "New York, États-Unis", "Nueva York, Estados Unidos"),
    responseLabel: s("Response Time", "Délai de Réponse","Tiempo de Respuesta"),
    responseValue: s("Within 24 hours","Sous 24 heures","En menos de 24 horas"),
    namePH:        s("Your Name",     "Votre Nom",    "Su Nombre"),
    emailPH:       s("Your Email",    "Votre Email",  "Su Email"),
    subjDefault:   s("Select Subject","Choisir un Sujet","Seleccionar Asunto"),
    subjCustom:    s("Custom Order",  "Commande Sur-Mesure","Pedido a Medida"),
    subjSizing:    s("Sizing Question","Question de Taille","Pregunta de Talla"),
    subjGeneral:   s("General Inquiry","Renseignement Général","Consulta General"),
    subjCollab:    s("Collaboration", "Collaboration","Colaboración"),
    messagePH:     s("Your message...","Votre message...","Su mensaje..."),
    sendBtn:       s("Send Message",  "Envoyer le Message","Enviar Mensaje"),
    sendingBtn:    s("Sending...",    "Envoi en cours...","Enviando..."),
    successTitle:  s("Thank you",     "Merci",        "Gracias"),
    successMsg:    s(
      "Your message has been received. We'll be in touch within 24 hours.",
      "Votre message a bien été reçu. Nous vous répondrons dans les 24 heures.",
      "Su mensaje ha sido recibido. Nos pondremos en contacto en menos de 24 horas."
    ),
    errorMsg:      s(
      "Something went wrong. Please try again.",
      "Une erreur est survenue. Veuillez réessayer.",
      "Algo salió mal. Por favor, inténtelo de nuevo."
    ),
  },

  configurator: {
    headerLabel:      s("Customize This Look",        "Personnaliser ce Look",           "Personalizar este Look"),
    colorTitle:       s("Select Color",               "Choisir la Couleur",              "Seleccionar Color"),
    fabricTitle:      s("Select Fabric",              "Choisir le Tissu",                "Seleccionar Tejido"),
    designTitle:      s("Design Style",               "Style de Création",               "Estilo de Diseño"),
    fitTitle:         s("Fit Preference",             "Préférence de Coupe",             "Preferencia de Corte"),
    notesTitle:       s("Custom Notes",               "Notes Personnalisées",            "Notas Personalizadas"),
    notesPH:          s(
      "Special requests, inspirations, cultural details...",
      "Demandes spéciales, inspirations, détails culturels...",
      "Solicitudes especiales, inspiraciones, detalles culturales..."
    ),
    contactTitle:     s("Your Details",              "Vos Coordonnées",                 "Sus Datos"),
    namePH:           s("Your Name",                 "Votre Nom",                       "Su Nombre"),
    emailPH:          s("Your Email",                "Votre Email",                     "Su Email"),
    appointmentPH:    s(
      "Appointment preference — share your available dates/times for a fitting consultation...",
      "Préférence de rendez-vous — partagez vos disponibilités pour une consultation...",
      "Preferencia de cita — indique sus fechas/horarios disponibles para una consulta..."
    ),
    requirementNote:  s(
      "Measurements will be confirmed at your fitting appointment. A member of our team will be in touch within 24 hours to schedule.",
      "Les mesures seront confirmées lors de votre rendez-vous de fitting. Un membre de notre équipe vous contactera sous 24h pour planifier.",
      "Las medidas se confirmarán en su cita de fitting. Un miembro de nuestro equipo se pondrá en contacto en menos de 24 horas."
    ),
    measurementsTitle: s("Your Measurements",        "Vos Mensurations",                "Sus Medidas"),
    measurementsHint:  s(
      "Chest / Bust and Height are required. All measurements in inches.",
      "Poitrine et Hauteur sont obligatoires. Toutes les mesures en pouces.",
      "Pecho / Busto y Altura son obligatorios. Todas las medidas en pulgadas."
    ),
    mChest:    s("Chest / Bust (in) *", "Poitrine (po) *",     "Pecho / Busto (pulg) *"),
    mWaist:    s("Waist (in)",          "Taille (po)",         "Cintura (pulg)"),
    mHips:     s("Hips (in)",           "Hanches (po)",        "Caderas (pulg)"),
    mHeight:   s("Height (in) *",       "Hauteur (po) *",      "Altura (pulg) *"),
    mShoulder: s("Shoulder (in)",       "Épaules (po)",        "Hombros (pulg)"),
    mInseam:   s("Inseam (in)",         "Entrejambe (po)",     "Entrepierna (pulg)"),
    errorMeasurements: s(
      "Please complete your measurements before submitting your commission request.",
      "Veuillez compléter vos mensurations avant de soumettre votre demande.",
      "Por favor, complete sus medidas antes de enviar su solicitud de comisión."
    ),
    errorAppointment: s(
      "Please select or request an appointment before submitting.",
      "Veuillez sélectionner ou demander un rendez-vous avant de soumettre.",
      "Por favor, seleccione o solicite una cita antes de enviar."
    ),
    errorContact: s(
      "Please provide your name and email address.",
      "Veuillez indiquer votre nom et adresse email.",
      "Por favor, proporcione su nombre y dirección de email."
    ),
    summaryTitle:        s("Your Selection",        "Votre Sélection",          "Su Selección"),
    summaryColor:        s("Color",                 "Couleur",                  "Color"),
    summaryFabric:       s("Fabric",                "Tissu",                    "Tejido"),
    summaryDesign:       s("Design",                "Style",                    "Diseño"),
    summaryFit:          s("Fit",                   "Coupe",                    "Corte"),
    summaryMeasurements: s("Measurements",          "Mensurations",             "Medidas"),
    summaryMeasurementsOk: s("Provided",            "Fournies",                 "Provistas"),
    summaryAppointment:  s("Appointment",           "Rendez-vous",              "Cita"),
    summaryAppointmentOk: s("Requested",            "Demandé",                  "Solicitada"),
    summaryNone:         s("Not selected",          "Non sélectionné",          "No seleccionado"),
    ctaHint:          s(
      "Complete measurements and appointment to submit your commission request.",
      "Complétez vos mesures et rendez-vous pour soumettre votre demande.",
      "Complete sus medidas y cita para enviar su solicitud de comisión."
    ),
    submitBtn:        s("Request This Piece",        "Demander cette Pièce",            "Solicitar esta Pieza"),
    submittingBtn:    s("Submitting...",             "Envoi en cours...",               "Enviando..."),
    successTitle:     s("Commission Request Received","Demande de Commission Reçue",   "Solicitud de Comisión Recibida"),
    successMsg:       s(
      "Thank you. We have received your commission request and will be in touch within 24 hours to discuss your piece and schedule your fitting.",
      "Merci. Nous avons bien reçu votre demande et vous contacterons sous 24 heures pour discuter de votre pièce et planifier votre fitting.",
      "Gracias. Hemos recibido su solicitud y nos pondremos en contacto en menos de 24 horas para hablar de su pieza y programar su fitting."
    ),
    closeBtn:         s("Close",                    "Fermer",                          "Cerrar"),
  },

  footer: {
    tagline: s(
      "A brand that resonates with your style. Crafting timeless pieces for those who wear their story.",
      "Une marque qui résonne avec votre style. Des pièces intemporelles pour ceux qui portent leur histoire.",
      "Una marca que resuena con su estilo. Piezas atemporales para quienes llevan su historia."
    ),
    navTitle:       s("Navigate",   "Navigation",  "Navegación"),
    servicesTitle:  s("Services",   "Services",    "Servicios"),
    connectTitle:   s("Connect",    "Contact",     "Conectar"),
    home:           s("Home",       "Accueil",     "Inicio"),
    about:          s("About",      "À Propos",    "Nosotros"),
    collection:     s("Collection", "Collection",  "Colección"),
    lookbook:       s("Lookbook",   "Lookbook",    "Lookbook"),
    process:        s("Process",    "Processus",   "Proceso"),
    contact:        s("Contact",    "Contact",     "Contacto"),
    custom:         s("Custom Orders",    "Commandes Sur-Mesure","Pedidos a Medida"),
    alterations:    s("Alterations",      "Retouches",           "Retoques"),
    consultations:  s("Consultations",    "Consultations",       "Consultas"),
    styling:        s("Styling",          "Stylisme",            "Estilismo"),
    emailUs:        s("Email Us",         "Nous Écrire",         "Escríbanos"),
    copyright:      s(
      "© 2024 HavrePlacide LLC. All rights reserved.",
      "© 2024 HavrePlacide LLC. Tous droits réservés.",
      "© 2024 HavrePlacide LLC. Todos los derechos reservados."
    ),
    wearYourStory:  s("Wear Your Story.","Portez Votre Histoire.","Lleva Tu Historia."),
  },

  atelier: {
    badge:  s("Sur-Mesure Atelier",  "Atelier Sur-Mesure",   "Taller a Medida"),
    title:  s("Begin Your Commission","Commencer Votre Commande","Iniciar Su Encargo"),
    sub:    s(
      "Six curated steps to your perfect piece.",
      "Six étapes soigneusement conçues vers votre pièce parfaite.",
      "Seis pasos cuidadosamente diseñados hacia su pieza perfecta."
    ),
    stepLabels: [
      s("Category",     "Catégorie",     "Categoría"),
      s("Style",        "Style",         "Estilo"),
      s("Details",      "Détails",       "Detalles"),
      s("Fabric",       "Tissu",         "Tela"),
      s("Measurements", "Mensurations",  "Medidas"),
      s("Review",       "Récapitulatif", "Resumen"),
    ],
    catTitle: s(
      "What are you commissioning?",
      "Que souhaitez-vous commander ?",
      "¿Qué desea encargar?"
    ),
    catLabels: [
      s("Tunique",          "Tunique",         "Túnica"),
      s("3-Pièces",         "3-Pièces",        "3 Piezas"),
      s("Leather Sneakers", "Baskets en Cuir", "Zapatillas de Cuero"),
      s("Accessories",      "Accessoires",     "Accesorios"),
    ],
    catDescs: [
      s(
        "Signature African tunic, handcrafted to your silhouette.",
        "Tunique africaine signature, confectionnée à votre silhouette.",
        "Túnica africana signature, confeccionada a su silueta."
      ),
      s(
        "Complete three-piece suit in super 220 fabric.",
        "Costume trois-pièces complet en tissu super 220.",
        "Traje de tres piezas completo en tela super 220."
      ),
      s(
        "Hand-finished leather sneakers, built to your foot.",
        "Baskets en cuir finies à la main, faites à vos mesures.",
        "Zapatillas de cuero terminadas a mano, a la medida de su pie."
      ),
      s(
        "Belts, pocket squares, and curated finishing pieces.",
        "Ceintures, pochettes et pièces de finition soignées.",
        "Cinturones, pañuelos y piezas de acabado seleccionadas."
      ),
    ],
    styleTitle: s(
      "Select your base style",
      "Choisissez votre style de base",
      "Seleccione su estilo base"
    ),
    filterAll:     s("All",     "Tous",     "Todos"),
    filterNew:     s("New",     "Nouveau",  "Nuevo"),
    filterClassic: s("Classic", "Classique","Clásico"),
    detailsTitle:  s(
      "Personalize your piece",
      "Personnalisez votre pièce",
      "Personalice su pieza"
    ),
    collarLabel: s("Collar Style",   "Style de Col",         "Estilo de Cuello"),
    collars: [
      s("Round Neck",  "Col Rond",     "Cuello Redondo"),
      s("V-Neck",      "Col V",        "Cuello V"),
      s("Mandarin",    "Col Mao",      "Cuello Mao"),
      s("Band Collar", "Col Officier", "Cuello Banda"),
    ],
    sleeveLabel: s("Sleeve Length",  "Longueur des Manches", "Largo de Manga"),
    sleeves: [
      s("Short",       "Courtes", "Corta"),
      s("3/4 Length",  "3/4",     "3/4"),
      s("Full Length", "Longues", "Larga"),
    ],
    fitLabel: s("Fit",               "Coupe",                "Corte"),
    fits: [
      s("Slim",    "Slim",      "Slim"),
      s("Regular", "Régulière", "Regular"),
      s("Relaxed", "Ample",     "Holgada"),
    ],
    embLabel: s("Embroidery",        "Broderie",             "Bordado"),
    embs: [
      s("None",   "Aucune", "Sin bordado"),
      s("Subtle", "Subtile","Sutil"),
      s("Ornate", "Ornée",  "Ornamentado"),
    ],
    notesLabel: s("Special Requests","Demandes Spéciales",   "Solicitudes Especiales"),
    notesPH: s(
      "Describe any specific details, inspirations, or customizations...",
      "Décrivez vos détails spécifiques, inspirations ou personnalisations...",
      "Describa detalles específicos, inspiraciones o personalizaciones..."
    ),
    fabricTitle: s(
      "Choose your fabric grade",
      "Choisissez votre qualité de tissu",
      "Elija la calidad de su tela"
    ),
    fabricSub: s(
      "Each grade is selected for its hand feel, drape, and longevity.",
      "Chaque qualité est sélectionnée pour son toucher, son tombé et sa longévité.",
      "Cada calidad se selecciona por su tacto, caída y longevidad."
    ),
    fabric100Badge: s("Standard Excellence","Excellence Standard", "Excelencia Estándar"),
    fabric100Label: s("Super 100",          "Super 100",           "Super 100"),
    fabric100Desc: s(
      "Refined and breathable. Structured for everyday distinction.",
      "Raffiné et respirant. Structuré pour la distinction au quotidien.",
      "Refinado y transpirable. Estructurado para la distinción diaria."
    ),
    fabric220Badge: s("Finest Grade",       "Qualité Supérieure",  "Calidad Superior"),
    fabric220Label: s("Super 220",          "Super 220",           "Super 220"),
    fabric220Desc: s(
      "Featherlight with an immaculate drape. Reserved for exceptional occasions.",
      "Légèreté absolue et tombé impeccable. Réservé aux occasions d'exception.",
      "Ligereza absoluta y caída impecable. Reservado para ocasiones excepcionales."
    ),
    colorLabel: s("Color", "Couleur", "Color"),
    colorNames: [
      s("Navy",     "Marine",     "Marino"),
      s("Charcoal", "Anthracite", "Antracita"),
      s("Ivory",    "Ivoire",     "Marfil"),
      s("Sage",     "Sauge",      "Salvia"),
      s("Gold",     "Or",         "Dorado"),
      s("Noir",     "Noir",       "Negro"),
    ],
    measTitle: s("Your measurements",      "Vos mensurations",             "Sus medidas"),
    measSub: s(
      "Enter your measurements in inches. Required fields are marked.",
      "Saisissez vos mesures en pouces. Les champs obligatoires sont indiqués.",
      "Ingrese sus medidas en pulgadas. Los campos requeridos están marcados."
    ),
    aiLink: s(
      "Use AI measurement tool instead",
      "Utiliser l'outil de mensuration IA",
      "Usar herramienta de medición IA"
    ),
    fieldChest:    s("Chest (in)",   "Poitrine (po)",   "Pecho (pu)"),
    fieldWaist:    s("Waist (in)",   "Taille (po)",     "Cintura (pu)"),
    fieldHips:     s("Hips (in)",    "Hanches (po)",    "Caderas (pu)"),
    fieldHeight:   s("Height (in)",  "Hauteur (po)",    "Altura (pu)"),
    fieldInseam:   s("Inseam (in)",  "Entrejambe (po)", "Entrepierna (pu)"),
    fieldShoulder: s("Shoulder (in)","Épaules (po)",    "Hombros (pu)"),
    reviewTitle: s(
      "Review your commission",
      "Récapitulatif de votre commande",
      "Resumen de su encargo"
    ),
    reviewSub: s(
      "Confirm your selections. We will be in touch within 24 hours.",
      "Confirmez vos choix. Nous vous contacterons dans les 24 heures.",
      "Confirme sus selecciones. Nos pondremos en contacto en 24 horas."
    ),
    namePH:        s("Your full name",     "Votre nom complet",    "Su nombre completo"),
    emailPH:       s("Your email",         "Votre email",          "Su email"),
    submitBtn:     s("Submit Commission",  "Soumettre la Commande","Enviar Encargo"),
    submittingBtn: s("Submitting...",      "Envoi en cours...",    "Enviando..."),
    successTitle:  s("Commission Received","Commande Reçue",       "Encargo Recibido"),
    successMsg: s(
      "Thank you. We will review your commission and be in touch within 24 hours to confirm the details.",
      "Merci. Nous examinerons votre commande et vous contacterons dans les 24 heures pour confirmer les détails.",
      "Gracias. Revisaremos su encargo y nos pondremos en contacto en 24 horas para confirmar los detalles."
    ),
    back:   s("Back",  "Retour", "Volver"),
    next:   s("Next",  "Suivant","Siguiente"),
    stepOf: s("Step",  "Étape", "Paso"),
    of:     s("of",    "sur",   "de"),
  },
};
