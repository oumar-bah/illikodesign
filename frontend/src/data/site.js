// Contenu 100% français — Illiko Design

const imagePath = (name) => {
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("Image asset name must be a non-empty string");
  }
  return `${process.env.PUBLIC_URL || ""}/images/${name}`;
};

export const IMAGES = {
  hero: imagePath("hero.svg"),
  signs3d: imagePath("signs3d.svg"),
  vehicle: imagePath("vehicle.svg"),
  largeFormat: imagePath("large-format.svg"),
  apparel: imagePath("apparel.svg"),
  stationery: imagePath("stationery.svg"),
  goodies: imagePath("goodies.svg"),
  printer3d: imagePath("printer3d.svg"),
  acrylic: imagePath("acrylic.svg"),
  atelier: imagePath("atelier.svg"),
};

export const NAV_LINKS = [
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Pourquoi nous", href: "#pourquoi" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT = {
  phone: "+224 611 10 01 60",
  phoneHref: "tel:+224 611 10 01 60",
  whatsapp: "https://web.whatsapp.com/",
  email: "Designilliko.com",
  address: "Hamdanllaye- carrefour",
  hours: "Lun — Sam · 08h30 à 19h00",
  mapEmbed:
    "https://www.google.com/maps?q=Almadies+Dakar+Senegal&output=embed",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "TikTok", href: "https://tiktok.com", icon: "Music2" },
  ],
};

// 6 pôles d'expertise (bento) — chaque pôle regroupe des prestations
export const SERVICE_CATEGORIES = [
  {
    id: "enseignes",
    number: "01",
    icon: "Lightbulb",
    title: "Enseignes & Signalétique",
    image: IMAGES.signs3d,
    span: "lg:col-span-7",
    description:
      "Des enseignes qui captent le regard, de jour comme de nuit. Un savoir-faire lumineux au service de votre notoriété.",
    items: [
      "Enseignes lumineuses 3D",
      "Lettres boîtiers",
      "Enseignes en acrylique",
      "Signalétique intérieure et extérieure",
    ],
  },
  {
    id: "grand-format",
    number: "02",
    icon: "Printer",
    title: "Impression Grand Format",
    image: IMAGES.largeFormat,
    span: "lg:col-span-5",
    description:
      "Une précision colorimétrique irréprochable sur tous supports, du petit tirage à la très grande dimension.",
    items: [
      "Impression grand format",
      "Impression numérique",
      "Affiches",
      "Roll-up & X-Banners",
    ],
  },
  {
    id: "vehicules",
    number: "03",
    icon: "Car",
    title: "Marquage Véhicules",
    image: IMAGES.vehicle,
    span: "lg:col-span-5",
    description:
      "Transformez votre flotte en support de communication mobile, élégant et durable.",
    items: [
      "Habillage de véhicules",
      "Vitrophanie",
      "Film microperforé",
      "Stickers et autocollants",
    ],
  },
  {
    id: "textile",
    number: "04",
    icon: "Shirt",
    title: "Textile Personnalisé",
    image: IMAGES.apparel,
    span: "lg:col-span-7",
    description:
      "Habillez vos équipes et vos événements avec un textile premium, marqué avec exigence.",
    items: [
      "Impression sur T-shirts, polos & sweats",
      "Impression sur maillots",
      "Casquettes personnalisées",
      "Badges",
    ],
  },
  {
    id: "identite",
    number: "05",
    icon: "PenTool",
    title: "Création & Identité Visuelle",
    image: IMAGES.stationery,
    span: "lg:col-span-7",
    description:
      "Une identité forte et cohérente, pensée par nos graphistes pour marquer les esprits.",
    items: [
      "Création de logos",
      "Identité visuelle",
      "Conception graphique",
      "Flyers, brochures & cartes de visite",
      "Menus de restaurant",
    ],
  },
  {
    id: "goodies",
    number: "06",
    icon: "Gem",
    title: "Goodies & Fabrication",
    image: IMAGES.goodies,
    span: "lg:col-span-5",
    description:
      "Objets publicitaires et fabrication de précision pour prolonger votre marque dans le réel.",
    items: [
      "Mugs & objets publicitaires",
      "Packaging personnalisé",
      "Découpe laser & CNC",
      "Impression 3D professionnelle",
    ],
  },
];

// Liste complète des prestations (pour le devis + le ruban défilant)
export const ALL_SERVICES = [
  "Enseignes lumineuses 3D",
  "Lettres boîtiers",
  "Enseignes en acrylique",
  "Signalétique intérieure et extérieure",
  "Impression grand format",
  "Impression numérique",
  "Création de logos",
  "Identité visuelle",
  "Conception graphique",
  "Flyers",
  "Affiches",
  "Brochures",
  "Cartes de visite",
  "Menus de restaurant",
  "Stickers et autocollants",
  "Roll-up",
  "X-Banners",
  "Habillage de véhicules",
  "Vitrophanie",
  "Film microperforé",
  "Impression sur T-shirts",
  "Impression sur polos",
  "Impression sur sweats",
  "Impression sur maillots",
  "Casquettes personnalisées",
  "Mugs personnalisés",
  "Badges",
  "Objets publicitaires",
  "Packaging personnalisé",
  "Découpe laser",
  "Découpe CNC",
  "Impression 3D professionnelle",
];

export const PORTFOLIO = [
  { title: "Enseigne joaillerie", tag: "Enseigne 3D", image: IMAGES.signs3d, span: "row-span-2" },
  { title: "Habillage flotte", tag: "Marquage véhicule", image: IMAGES.vehicle, span: "" },
  { title: "Papeterie de luxe", tag: "Identité visuelle", image: IMAGES.stationery, span: "" },
  { title: "Plaque acrylique", tag: "Signalétique", image: IMAGES.acrylic, span: "row-span-2" },
  { title: "Collection textile", tag: "Textile", image: IMAGES.apparel, span: "" },
  { title: "Coffret goodies", tag: "Objets publicitaires", image: IMAGES.goodies, span: "" },
  { title: "Tirage grand format", tag: "Impression", image: IMAGES.largeFormat, span: "" },
  { title: "Prototype imprimé", tag: "Impression 3D", image: IMAGES.printer3d, span: "" },
];

export const STATS = [
  { value: 12, suffix: " ans", label: "d'expertise reconnue" },
  { value: 850, suffix: "+", label: "clients accompagnés" },
  { value: 6200, suffix: "+", label: "projets livrés" },
  { value: 100, suffix: "%", label: "qualité premium" },
];

export const WHY_US = [
  {
    icon: "Gem",
    title: "Finitions haute couture",
    text: "Chaque détail est maîtrisé : matières nobles, dorure, découpe nette et contrôle qualité systématique.",
  },
  {
    icon: "Timer",
    title: "Délais tenus",
    text: "Une organisation d'atelier rigoureuse pour livrer vite, sans jamais transiger sur l'excellence.",
  },
  {
    icon: "Palette",
    title: "Conseil créatif",
    text: "Nos graphistes vous accompagnent de l'idée à la réalisation pour une identité qui vous ressemble.",
  },
  {
    icon: "ShieldCheck",
    title: "Technologie de pointe",
    text: "Machines grand format, découpe laser/CNC et impression 3D professionnelle sous un même toit.",
  },
];

export const TESTIMONIALS = [
  { name: "Aminata Diallo", role: "Directrice, Maison Baobab", quote: "Un rendu à couper le souffle. Notre enseigne attire tous les regards du quartier." },
  { name: "Karim Benali", role: "Fondateur, Studio Nova", quote: "Précision, élégance et délais respectés. Illiko Design est devenu notre partenaire exclusif." },
  { name: "Sophie Traoré", role: "Responsable marketing, Groupe Élan", quote: "Le marquage de notre flotte a transformé notre visibilité. Un travail d'orfèvre." },
  { name: "David Mensah", role: "Restaurateur, Le Comptoir d'Or", quote: "Menus, signalétique, cartes de visite : une cohérence parfaite et un luxe assumé." },
  { name: "Fatou Ndiaye", role: "CEO, Atelier Lumière", quote: "Des goodies premium qui ont marqué nos invités. Service irréprochable du début à la fin." },
  { name: "Julien Robert", role: "Directeur artistique", quote: "Enfin un imprimeur qui comprend l'exigence d'une direction artistique. Chapeau." },
];

export const FAQ = [
  {
    q: "Quels sont vos délais de réalisation ?",
    a: "Selon la prestation, comptez 48 à 72h pour l'imprimerie courante (cartes, flyers, roll-up) et 5 à 10 jours ouvrés pour les enseignes lumineuses et le marquage véhicule. Un service express est disponible sur demande.",
  },
  {
    q: "Proposez-vous la création graphique complète ?",
    a: "Oui. Notre studio prend en charge la création de logo, l'identité visuelle et la conception graphique, ou adapte vos fichiers existants pour une impression parfaite.",
  },
  {
    q: "Quels formats de fichiers acceptez-vous ?",
    a: "Nous acceptons les fichiers PDF, AI, EPS, PSD, PNG et JPG en haute résolution. En cas de doute, envoyez-nous votre fichier via le formulaire de devis, nous le vérifions gratuitement.",
  },
  {
    q: "Assurez-vous la pose et l'installation ?",
    a: "Absolument. Nos équipes assurent la pose des enseignes, de la signalétique, de la vitrophanie et du marquage véhicule dans les règles de l'art.",
  },
  {
    q: "Travaillez-vous avec les professionnels et les particuliers ?",
    a: "Oui, nous accompagnons aussi bien les entreprises, restaurants et enseignes commerciales que les particuliers pour des projets sur mesure.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Remplissez le formulaire « Demande de devis » en décrivant votre projet et en joignant vos fichiers. Vous recevez une proposition détaillée sous 24h.",
  },
];
