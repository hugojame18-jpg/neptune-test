/* Nébule — script commun à toutes les pages */

const MARQUE = "Nébule";
const EMAIL_CONTACT = "contact@nebule-vape.fr"; // à remplacer
const EMAIL_PRO = "pro@nebule-vape.fr";          // à remplacer

const CATEGORIES = {
  "lion-king": { nom: "Lion King", court: "Lion King", desc: "Format compact, indicateur de batterie et saveurs fruitées." },
  "falcon": { nom: "Falcon", court: "Falcon", desc: "Falcon, Falcon Bar et Falcon-X : rapaces illustrés, une couleur par saveur." },
  "mega-box": { nom: "Mega Box", court: "Mega Box", desc: "Mega Box et Mega Box Pro : boîtiers métal, façades gravées." },
  "ecran": { nom: "Écran intelligent", court: "Écran", desc: "Écrans animés et modes de puissance." },
  "reservoir": { nom: "Réservoir visible", court: "Réservoir", desc: "Réservoir apparent et illustrations animales." },
  "kits-pods": { nom: "Kits pods rechargeables", court: "Kits pods", desc: "Pods remplissables, batterie rechargeable et flacons fournis." },
  "shisha": { nom: "Shisha (DTL)", court: "Shisha", desc: "Tirage direct, grande contenance et airflow réglable." },
  "alien": { nom: "Alien", court: "Alien", desc: "Personnages illustrés, format 10 000 bouffées." },
  "mystere": { nom: "Mystère", court: "Mystère", desc: "Une puff surprise à petit prix." },
  "e-liquides": { nom: "E-liquides", court: "E-liquides", desc: "Flacons de 10 et 50 ml, saveurs fruitées." },
};

// Valeur affichée en surligné tant que l'info fournisseur n'est pas renseignée.
const A_CONFIRMER = "À confirmer";
// Liens affiliés
const AFFILIATE_URL_999 = "https://t.trklinkx.com/click?pid=4784&offer_id=13179&sub3=PULU";
const AFFILIATE_URL_2 = "https://t.trklinkx.com/click?pid=4784&offer_id=10936&sub3=PULU2";

// infos : sub ID ajoutés au lien (ex. { sub9: "Marie", sub11: "marie@mail.com" })
function lienAffilie(prix, infos = {}) {
  const url = new URL(Number(prix) === 2 ? AFFILIATE_URL_2 : AFFILIATE_URL_999);
  Object.entries(infos).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
  return url.toString();
}

function redirigerAffilie(prix, infos) {
  window.location.href = lienAffilie(prix, infos);
}

// Pays livrés (pas la France ni la Belgique) : code envoyé en sub16, indicatif téléphone
const PAYS = [
  ["CH", "Suisse", "+41"], ["LU", "Luxembourg", "+352"], ["DE", "Allemagne", "+49"], ["AT", "Autriche", "+43"],
  ["NL", "Pays-Bas", "+31"], ["ES", "Espagne", "+34"], ["PT", "Portugal", "+351"], ["IT", "Italie", "+39"],
  ["IE", "Irlande", "+353"], ["GB", "Royaume-Uni", "+44"],
];
// Fiche technique commune : à compléter produit par produit avec les données JNR.
const specsDeBase = (extra = {}) => ({ "Nombre de bouffées": A_CONFIRMER, "Nicotine": A_CONFIRMER, "Contenance": A_CONFIRMER, "Batterie": A_CONFIRMER, ...extra });

// Prix : puffs jetables 9,99 € (drapeau puff: true), e-liquides 2 €, puff mystère 2 €. Kits rechargeables 9,99 €. Offre : 1 puff achetée = 1 puff offerte (voir calculOffre).
const PRODUITS = [
  {
    // Tirée au hasard parmi les produits marqués puff: true (liste affichée sur la fiche)
    id: "puff-mystere", nom: "Puff mystère", cat: "mystere", art: "prefilled", couleur: "#8b5cf6",
    prix: 2, badge: "Surprise", nouveau: true, phare: true, mystere: true,
    resume: "Une puff JNR choisie au hasard parmi toute notre gamme de puffs. Le modèle et la saveur sont une surprise.",
    image: "img/puff-mystere.webp",
    specs: { "Modèle": "Surprise, parmi nos puffs jetables", "Saveur": "Surprise", "Nicotine": "Celle du modèle reçu, indiquée sur l'emballage", "Choix du modèle": "Impossible, c'est le principe" },
    contenu: ["1 puff JNR jetable, modèle et saveur tirés au hasard"],
  },
  {
    id: "lion-king", nom: "JNR Lion King", cat: "lion-king", art: "prefilled", couleur: "#3f8cff",
    prix: 9.99, puff: true, badge: "Meilleure vente", phare: true,
    resume: "Puff compacte au design lion : 42 ml de liquide, jusqu'à 42 000 bouffées et indicateur de batterie.",
    varLabel: "Saveur",
    variantes: {
      "Strawberry Watermelon Ice": "img/lion-king-strawberry-watermelon.webp",
      "Blue Razz Cherry": "img/lion-king-blue-razz-cherry.webp",
      "Hawaii": "img/lion-king-hawaii.webp",
    },
    // Source : jnrvapor.com/product/lion-king
    specs: { "Nombre de bouffées": "Jusqu'à 42 000", "Nicotine": "2 %", "Contenance": "42 ml", "Batterie": "850 mAh, rechargeable USB-C", "Résistance": "Double mesh", "Écran": "Indicateur de batterie" },
    contenu: ["1 cigarette électronique jetable JNR Lion King"],
  },
  {
    id: "falcon", nom: "JNR Falcon", cat: "falcon", art: "prefilled", couleur: "#ff7a2e",
    prix: 9.99, puff: true, badge: "Design illustré", phare: true,
    resume: "Habillage rapace illustré, une couleur par saveur.",
    varLabel: "Saveur",
    variantes: {
      "Watermelon Mango Peach": "img/falcon-watermelon-mango-peach.webp",
      "Blue Razz Ice": "img/falcon-blue-razz-ice.webp",
      "Blackberry Red Raspberry": "img/falcon-blackberry-raspberry.webp",
      "Pineapple Mango Orange": "img/falcon-pineapple-mango.webp",
    },
    // Source : jnrvapor.com/product/falcon (modèle Falcon 16K, même visuel)
    specs: { "Nombre de bouffées": "Jusqu'à 16 000", "Nicotine": "2 %", "Contenance": "22 ml", "Batterie": "850 mAh, rechargeable", "Résistance": "Double mesh 1,0 Ω" },
    contenu: ["1 cigarette électronique jetable JNR Falcon"],
  },
  {
    id: "falcon-bar", nom: "JNR Falcon Bar", cat: "falcon", art: "pod-screen", couleur: "#7c4dff",
    prix: 9.99, puff: true, badge: "Nouveau", nouveau: true, phare: true,
    resume: "Guerrier rapace en armure illustré, une couleur par saveur, écran avec niveau de liquide et de batterie.",
    varLabel: "Saveur",
    // Correspondance couleur → saveur : tableau officiel JNR (jnrvapor.com/product/falcon-bar)
    variantes: {
      "Blue Razz Cherry": "img/falcon-bar-bleu.webp",
      "Kiwi Watermelon Ice": "img/falcon-bar-vert.webp",
      "Passion Fruit Kiwi": "img/falcon-bar-orange.webp",
    },
    specs: { "Nombre de bouffées": "Jusqu'à 48 000", "Nicotine": "2 %", "Contenance": "45 ml", "Batterie": "1 000 mAh, rechargeable USB-C", "Écran": "Niveau de liquide et de batterie" },
    contenu: ["1 cigarette électronique jetable JNR Falcon Bar"],
  },
  {
    // Identifié sur jnrvapor.com/product/falcon-x (saveur imprimée sur chaque visuel)
    id: "falcon-x", nom: "JNR Falcon-X", cat: "falcon", art: "pod-screen", couleur: "#27c4c0",
    prix: 9.99, puff: true, badge: "Écran couleur", phare: false,
    resume: "Illustration rapace, grand écran couleur avec pourcentage et indicateurs.",
    varLabel: "Saveur",
    variantes: {
      "Blueberry Raspberry Cherry": "img/jnr-ecran-blueberry-raspberry-cherry.webp",
      "Kiwi Watermelon Ice": "img/jnr-ecran-kiwi-watermelon-ice.webp",
      "Blue Razz Ice": "img/jnr-ecran-blue-razz-ice.webp",
      "Strawberry Watermelon Ice": "img/jnr-ecran-strawberry-watermelon-ice.webp",
    },
    // Source : jnrvapor.com/product/falcon-x (18K)
    specs: { "Nombre de bouffées": "Jusqu'à 18 000", "Nicotine": "2 %", "Contenance": "24 ml", "Batterie": "950 mAh, rechargeable USB-C", "Résistance": "Double mesh 0,6 Ω", "Écran": "Couleur, pourcentage affiché" },
    contenu: ["1 cigarette électronique jetable JNR"],
  },
  {
    id: "mega-box-pro", nom: "JNR Mega Box Pro", cat: "mega-box", art: "box", couleur: "#d9b347",
    prix: 9.99, puff: true, badge: "Nouveau", nouveau: true, phare: true,
    resume: "Boîtier à façade métal gravée d'un aigle : une finition par saveur, écran avec deux modes.",
    varLabel: "Saveur",
    // Couleur façade + tranche comparée au tableau officiel des 20 saveurs (jnrvapor.com/product/mega-box-pro).
    // Les deux versions argent à tranche bleue se ressemblent beaucoup : à vérifier sur le produit reçu.
    variantes: {
      "Blue Razz Ice": "img/mega-box-pro-silver-blue.webp",
      "Love 66": "img/mega-box-pro-graphite.webp",
      "Mixed Berry": "img/mega-box-pro-gold.webp",
      "Blue Razz Cherry": "img/mega-box-pro-silver.webp",
      "Passion Fruit Kiwi": "img/mega-box-pro-bronze.webp",
    },
    specs: { "Nombre de bouffées": "Jusqu'à 50 000", "Nicotine": "2 %", "Contenance": "32 ml", "Batterie": "850 mAh, rechargeable USB-C", "Résistance": "Double mesh 1,2 Ω", "Écran": "Niveau de liquide et de batterie" },
    contenu: ["1 cigarette électronique jetable JNR Mega Box Pro"],
  },
  {
    id: "mega-box", nom: "JNR Mega Box", cat: "mega-box", art: "box", couleur: "#e0b84a",
    prix: 9.99, puff: true, phare: false,
    resume: "Boîtier métal 30 ml à façade gravée, double résistance mesh. La saveur est inscrite au dos.",
    varLabel: "Saveur",
    // Visuels officiels JNR : la façade gravée est l'avant, la face unie avec le nom de la saveur est le dos.
    // Façade or = dos Strawberry Banana ; façade or à tranche bleue = Strawberry Raspberry Ice (dos dégradé jaune/bleu).
    variantes: {
      "Strawberry Banana": "img/mega-box-or-grave.webp",
      "Strawberry Raspberry Ice": "img/mega-box-bleu-grave.webp",
      "Green Apple Peach Pear": "img/mega-box-green-apple-peach-pear.webp",
      "Façade gravée rose": "img/mega-box-rose-grave.webp",
    },
    specs: { "Nombre de bouffées": "Jusqu'à 25 000", "Nicotine": "Réglable", "Contenance": "30 ml", "Batterie": "850 mAh, rechargeable USB-C", "Résistance": "Double mesh, double cœur", "Saveur de la façade rose": A_CONFIRMER },
    contenu: ["1 cigarette électronique jetable JNR Mega Box"],
  },
  {
    id: "blazt", nom: "JNR Blazt", cat: "ecran", art: "pod-screen", couleur: "#62b4ff",
    prix: 9.99, puff: true, badge: "Écran couleur", phare: true,
    resume: "Grand écran couleur animé, modes Boost et Regular, bouton Set.",
    image: "img/blazt.webp",
    // Source : jnrvapor.com/product/blazt-44000
    specs: { "Nombre de bouffées": "Jusqu'à 44 000", "Nicotine": "2 %", "Contenance": "20 ml", "Batterie": "850 mAh, rechargeable USB-C", "Résistance": "Double mesh", "Écran": "Batterie et niveau de liquide", "Modes": "Boost / Regular", "Airflow": "Réglable" },
    contenu: ["1 cigarette électronique jetable JNR Blazt"],
  },
  {
    id: "bykux", nom: "JNR Bykux", cat: "ecran", art: "pod-screen", couleur: "#2f6bff",
    prix: 9.99, puff: true, phare: true,
    resume: "Coque semi-transparente, écran caché et modes Boost / Regular, jusqu'à 59 000 bouffées.",
    image: "img/bykux.webp",
    // Source : jnrvapor.com/product/bykux-59k — le taux de nicotine n'y est pas indiqué
    specs: { "Nombre de bouffées": "Jusqu'à 59 000", "Nicotine": A_CONFIRMER, "Contenance": "28 ml", "Batterie": "1 000 mAh, rechargeable", "Résistance": "Double mesh parallèle 1,2 Ω", "Écran": "Batterie et niveau de liquide", "Modes": "Boost / Regular" },
    contenu: ["1 cigarette électronique jetable JNR Bykux"],
  },
  {
    // Identifié : JNR HexaFuse 6-in-1 120K (jnrvapor.com/product/hexafuse-6in1-120k)
    id: "hexafuse", nom: "JNR HexaFuse 6-in-1", cat: "ecran", art: "prefilled", couleur: "#9b5cff",
    prix: 9.99, puff: true, phare: true,
    resume: "Six réservoirs de saveur dans un seul appareil, écran intelligent, jusqu'à 120 000 bouffées.",
    image: "img/jnr-octopus.webp",
    specs: { "Nombre de bouffées": "Jusqu'à 120 000", "Nicotine": "2 %", "Contenance": "6 × 10 ml", "Batterie": "800 mAh, rechargeable USB-C", "Résistance": "Mesh 1,0 Ω", "Écran": "Écran intelligent", "Saveurs visibles sur ce modèle": "Blueberry Ice, Black Dragon Ice, Hawaii" },
    contenu: ["1 cigarette électronique jetable JNR HexaFuse 6-in-1"],
  },
  {
    // Identifié : JNR ZPluse 42K+ (jnrvapor.com/product/zpluse-42k), double saveur : appareil + 2 flacons de 10 ml
    id: "zpluse", nom: "JNR ZPluse 42K+", cat: "reservoir", art: "pod-screen", couleur: "#ff5a36",
    prix: 9.99, badge: "Double saveur", nouveau: true, phare: false,
    resume: "Réservoir apparent rechargeable par le haut, livré avec 2 flacons de 10 ml. Un animal par duo de saveurs.",
    varLabel: "Saveur",
    variantes: {
      "Mixed Berries (loup)": "img/jnr-reservoir-loup.webp",
      "Mango Passion Fruit (tigre)": "img/jnr-reservoir-tigre.webp",
      "Mixed Berries / Peach Berry (gorille)": "img/jnr-reservoir-gorille.webp",
    },
    specs: { "Nombre de bouffées": "Jusqu'à 42 000", "Nicotine": "2 %", "Contenance": "Réservoir + 2 flacons de 10 ml", "Résistance": "Double mesh 0,6 Ω", "Batterie": "1 000 mAh, rechargeable USB-C", "Réservoir": "Apparent, remplissage par le haut", "E-liquides fournis": "Loup : Mixed Berries · Tigre : Watermelon Mango Peach · Gorille : Peach Berry" },
    contenu: ["1 cigarette électronique JNR ZPluse", "2 flacons d'e-liquide de 10 ml"],
  },
  {
    // Identifié : JNR ShishaSip 35K (jnrvapor.com/product/shishasip)
    id: "shishasip", nom: "JNR ShishaSip 35K", cat: "shisha", art: "pod-screen", couleur: "#7cc4f2",
    prix: 9.99, badge: "Nouveau", nouveau: true, phare: false,
    resume: "Kit à deux pods préremplis remplaçables, tirage direct (DTL), cordon et capuchon de protection.",
    varLabel: "Couleur",
    variantes: { "Bleu clair": "img/jnr-cordon-bleu.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 35 000", "Nicotine": "6 mg/ml", "Contenance": "2 pods préremplis de 10 ml, remplaçables", "Batterie": "1 050 mAh, rechargeable USB-C", "Résistance": "Mesh 0,6 Ω, tirage direct (DTL)", "Écran": "Batterie et niveau de liquide", "Airflow": "Réglable", "Accessoires": "Cordon et capuchon de protection", "Saveurs": A_CONFIRMER },
    contenu: ["1 kit JNR ShishaSip 35K", "Pods préremplis", "1 cordon"],
  },
  {
    id: "cigusto-50ml", nom: "Cigusto", cat: "e-liquides", art: "bottle", couleur: "#e8318f",
    prix: 2, badge: "Fruités", phare: false,
    resume: "E-liquide fruité en flacon de 50 ml : fruits rouges, cerise, framboise ou pêche.",
    varLabel: "Saveur",
    variantes: {
      "Fruits rouges": "img/cigusto-fruits-rouges.webp",
      "Cerise": "img/cigusto-cerise.webp",
      "Framboise": "img/cigusto-framboise.webp",
      "Pêche": "img/cigusto-peche.webp",
    },
    // Source : cigusto.com (gamme Cigusto Classic 50 ml)
    specs: { "Contenance": "50 ml", "Nicotine": "0 mg (à booster)", "Ratio PG/VG": "50/50", "Fabrication": "France" },
    contenu: ["1 flacon d'e-liquide Cigusto 50 ml"],
  },
  {
    id: "fruiteo-exotique", nom: "Fruitéo Exotique", cat: "e-liquides", art: "bottle", couleur: "#9ccc2e",
    prix: 2, phare: false,
    resume: "E-liquide exotique : curuba, combava et coriandre.",
    image: "img/fruiteo-exotique.webp",
    // Source : cigusto.com (Fruitéo Exotique 50 ml)
    specs: { "Contenance": "50 ml", "Nicotine": "0 mg (à booster)", "Ratio PG/VG": "50/50", "Fabrication": "France" },
    contenu: ["1 flacon d'e-liquide Fruitéo Exotique"],
  },
  {
    // Source : jnrvapor.com/product/jnr-e-liquid ; saveurs lues sur les étiquettes des photos
    id: "jnr-eliquide-10ml", nom: "JNR E-liquide 10 ml", cat: "e-liquides", art: "bottle", couleur: "#2f7df6",
    prix: 2, badge: "Sel de nicotine", phare: false,
    resume: "E-liquide aux sels de nicotine en flacon de 10 ml, compatible avec les kits JNR remplissables.",
    varLabel: "Saveur",
    variantes: {
      "Fruits rouges (Mixed Berries)": "img/jnr-eliquide-fruits-rouges-10ml.webp",
      "Pastèque gomme à mâcher": "img/jnr-eliquide-pasteque-bubblegum-10ml.webp",
      "Blue Razz Cherry": "img/jnr-eliquide-blue-razz-cherry-10ml.webp",
      "Strawberry Kiwi Ice": "img/jnr-eliquide-strawberry-kiwi-ice-10ml.webp",
    },
    specs: { "Contenance": "10 ml", "Nicotine": "Sels de nicotine 20 mg/ml", "Ratio PG/VG": "Équilibré", "Flacon": "PET avec bouchon sécurité enfant" },
    contenu: ["1 flacon d'e-liquide JNR 10 ml"],
  },
  /* ---------- Kits pods rechargeables ---------- */
  {
    // Source : jnrvapor.com/product/aerox (la version verte est masquée sur la photo fournie)
    id: "aerox", nom: "JNR AeroX Pod", cat: "kits-pods", art: "box", couleur: "#2f7df6",
    prix: 9.99, badge: "Rechargeable", nouveau: true, phare: true,
    resume: "Pod remplissable par le côté, liquide visible, airflow réglable et écran de batterie.",
    varLabel: "Couleur",
    variantes: { "Bleu": "img/aerox-bleu.webp", "Rouge": "img/aerox-rouge.webp", "Violet": "img/aerox-violet.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 32 000 (avec 2 recharges)", "Nicotine": "20 mg/ml (flacons fournis)", "Batterie": "850 mAh, rechargeable USB-C", "Résistance": "Double mesh", "Remplissage": "Par le côté, liquide visible", "Écran": "Niveau de batterie", "Airflow": "Réglable" },
    contenu: ["1 kit JNR AeroX Pod", "2 flacons d'e-liquide de 10 ml"],
  },
  {
    // Source : jnrvapor.com/product/stellarc-fr
    id: "stellarc", nom: "JNR Stellarc Pod", cat: "kits-pods", art: "box", couleur: "#8b5cf6",
    prix: 9.99, badge: "Écran incurvé", phare: false,
    resume: "Pod prérempli de 2 ml et réservoir de 10 ml remplaçable, écran incurvé animé.",
    varLabel: "Couleur",
    variantes: { "Violet (Strawberry Kiwi Ice)": "img/stellarc-violet.webp", "Rose": "img/stellarc-rose.webp", "Turquoise (Blue Razz Ice)": "img/stellarc-turquoise.webp" },
    specs: { "Nombre de bouffées": "Plus de 50 000", "Nicotine": "2 %", "Contenance": "Pod prérempli 2 ml + réservoir 10 ml remplaçable", "Batterie": "1 200 mAh, rechargeable USB-C", "Résistance": "Double mesh", "Écran": "Incurvé, animé" },
    contenu: ["1 kit JNR Stellarc Pod", "3 flacons d'e-liquide de 10 ml"],
  },
  {
    // Source : jnrvapor.com/product/falcon-mini-20k
    id: "falcon-mini", nom: "JNR Falcon Mini Pod", cat: "kits-pods", art: "pod", couleur: "#e8590c",
    prix: 9.99, phare: false,
    resume: "Pod remplissable et remplaçable au design rapace, affichage du liquide et de la batterie.",
    varLabel: "Illustration",
    variantes: { "Aigle bleu": "img/falcon-mini-aigle-bleu.webp", "Oiseau sur fond rouge": "img/falcon-mini-oiseau-rouge.webp", "Hibou": "img/falcon-mini-hibou.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 20 000", "Nicotine": "2 %", "Contenance": "Pod remplissable + flacon de 10 ml fourni", "Batterie": "900 mAh, rechargeable USB-C", "Résistance": "Mesh 0,6 Ω", "Écran": "Niveau de liquide et de batterie" },
    contenu: ["1 kit JNR Falcon Mini Pod", "1 flacon d'e-liquide de 10 ml"],
  },
  {
    // Nom provisoire : même pod que la Falcon Mini, écran de puissance ; modèle non trouvé sur jnrvapor.com
    id: "pod-rapace-25w", nom: "JNR Pod rapace 25 W", cat: "kits-pods", art: "pod", couleur: "#c026d3",
    prix: 9.99, phare: false,
    resume: "Pod à illustration de rapace avec écran latéral indiquant la puissance et la résistance.",
    varLabel: "Illustration",
    variantes: { "Bleu": "img/pod-rapace-bleu.webp", "Multicolore": "img/pod-rapace-multicolore.webp", "Violet": "img/pod-rapace-violet.webp" },
    specs: { "Nombre de bouffées": A_CONFIRMER, "Nicotine": A_CONFIRMER, "Contenance": A_CONFIRMER, "Batterie": A_CONFIRMER, "Écran": "Puissance (25 W) et résistance (0,5 Ω)" },
    contenu: ["1 kit pod JNR"],
  },
  {
    // Source : jnrvapor.com/product/lila-kiss-46k (Lila Kiss⁺, version remplissable)
    id: "lila-kiss-plus", nom: "JNR Lila Kiss⁺ 46K", cat: "kits-pods", art: "prefilled", couleur: "#f97316",
    prix: 9.99, badge: "Lumière RGB", phare: true,
    resume: "Forme galet ergonomique, niveau de liquide visible, lumière RGB et 2 flacons de 10 ml fournis.",
    varLabel: "Couleur",
    variantes: { "Bleu": "img/lila-kiss-plus-bleu.webp", "Rose et bleu": "img/lila-kiss-plus-rose-bleu.webp", "Orange": "img/lila-kiss-plus-orange.webp", "Argent": "img/lila-kiss-plus-argent.webp" },
    specs: { "Nombre de bouffées": "Plus de 46 000", "Nicotine": "2 %", "Contenance": "Remplissable + 2 flacons de 10 ml", "Batterie": "1 000 mAh, rechargeable USB-C", "Résistance": "Double mesh 0,6 Ω", "Écran": "Niveau de batterie", "Design": "Anti-fuite, lumière RGB" },
    contenu: ["1 kit JNR Lila Kiss⁺", "2 flacons d'e-liquide de 10 ml"],
  },
  {
    // Nom provisoire : modèle non trouvé sur jnrvapor.com (écran tactile « NIPLO Tech Inside »)
    id: "pod-ecran-tactile", nom: "JNR Pod écran tactile", cat: "kits-pods", art: "pod-screen", couleur: "#f472b6",
    prix: 9.99, badge: "Écran tactile", nouveau: true, phare: false,
    resume: "Pod rechargeable avec grand écran tactile couleur, livré avec e-liquide Pastèque gomme à mâcher.",
    varLabel: "Couleur",
    variantes: { "Rose": "img/jnr-ecran-tactile-rose.webp", "Graphite": "img/jnr-ecran-tactile-graphite.webp", "Argent": "img/jnr-ecran-tactile-argent.webp" },
    specs: { "Nombre de bouffées": A_CONFIRMER, "Nicotine": A_CONFIRMER, "Contenance": "Pod remplissable + 2 flacons de 10 ml", "Batterie": A_CONFIRMER, "Écran": "Tactile, couleur" },
    contenu: ["1 kit pod JNR", "2 flacons d'e-liquide Pastèque gomme à mâcher 10 ml"],
  },
  /* ---------- Puffs ---------- */
  {
    // Source : jnrvapor.com/product/falcon-pro (nicotine non indiquée)
    id: "falcon-pro", nom: "JNR Falcon Pro", cat: "falcon", art: "pod-screen", couleur: "#dc2626",
    prix: 9.99, puff: true, phare: false,
    resume: "Paysages de montagne et rapace en vol, écran intelligent et 30 ml de liquide.",
    varLabel: "Modèle",
    variantes: { "Bleu (Blue Razz Cherry)": "img/falcon-pro-bleu.webp", "Argent": "img/falcon-pro-argent.webp", "Rouge": "img/falcon-pro-rouge.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 28 000", "Nicotine": A_CONFIRMER, "Contenance": "30 ml", "Batterie": "950 mAh, rechargeable", "Résistance": "Double mesh", "Écran": "Écran intelligent" },
    contenu: ["1 cigarette électronique jetable JNR Falcon Pro"],
  },
  {
    // Source : jnrvapor.com/product/quads-4in1
    id: "quads", nom: "JNR Quads 4-in-1", cat: "ecran", art: "pod-screen", couleur: "#38bdf8",
    prix: 9.99, puff: true, badge: "4 saveurs", phare: false,
    resume: "Quatre réservoirs de 15 ml et embout rotatif pour changer de saveur, écran intelligent.",
    varLabel: "Saveur",
    variantes: { "Blue Razz Cherry": "img/quads-blue-razz-cherry.webp", "Triple Melon": "img/quads-triple-melon.webp", "Mixed Berry": "img/quads-mixed-berry.webp", "Blue Razz Ice": "img/quads-blue-razz-ice.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 120 000", "Nicotine": "2 %", "Contenance": "4 × 15 ml", "Batterie": "1 000 mAh, rechargeable USB-C", "Résistance": "Quadruple mesh", "Écran": "Écran intelligent", "Embout": "Rotatif" },
    contenu: ["1 cigarette électronique jetable JNR Quads 4-in-1"],
  },
  {
    // Source : jnrvapor.com/product/shisha-ultra ; saveurs rose et bleue illisibles sur la photo
    id: "shisha-ultra", nom: "JNR Shisha Ultra 45K", cat: "shisha", art: "pen", couleur: "#7c3aed",
    prix: 9.99, puff: true, badge: "Tirage direct", phare: false,
    resume: "Puff à tirage direct au revêtement façon cuir, triple résistance et airflow réglable.",
    varLabel: "Couleur",
    variantes: { "Violet (Summer Peaches)": "img/shisha-ultra-violet.webp", "Turquoise (Lemon Mint)": "img/shisha-ultra-turquoise.webp", "Rose": "img/shisha-ultra-rose.webp", "Bleu": "img/shisha-ultra-bleu.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 45 000", "Nicotine": "2 %", "Contenance": "40 ml", "Batterie": "1 100 mAh, rechargeable", "Résistance": "Triple mesh", "Écran": "Batterie et niveau de liquide", "Airflow": "Réglable" },
    contenu: ["1 cigarette électronique jetable JNR Shisha Ultra"],
  },
  {
    // Source : jnrvapor.com/product/alien (nicotine non indiquée)
    id: "alien", nom: "JNR Alien 10K", cat: "alien", art: "pen", couleur: "#16a34a",
    prix: 9.99, puff: true, phare: false,
    resume: "Personnages extraterrestres illustrés, lumière RGB et 20 ml de liquide.",
    varLabel: "Saveur",
    variantes: { "Blueberry Kiwi": "img/alien-blueberry-kiwi.webp", "Iron Brew": "img/alien-iron-brew.webp", "Blueberry Bubble Gum": "img/alien-blueberry-bubble-gum.webp", "Blueberry Sour Raspberry": "img/alien-blueberry-sour-raspberry.webp" },
    specs: { "Nombre de bouffées": "Jusqu'à 10 000", "Nicotine": A_CONFIRMER, "Contenance": "20 ml", "Batterie": "850 mAh, rechargeable USB-C", "Résistance": "Mesh 1,2 Ω", "Lumière": "RGB" },
    contenu: ["1 cigarette électronique jetable JNR Alien"],
  },
];

/* ---------- Utilitaires ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const produit = (id) => PRODUITS.find((p) => p.id === id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
};

/* ---------- Icônes ---------- */
const ICO = {
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8c-2-3-6-3-6-1s3 1 6 1c3 0 6 1 6-1s-4-2-6 1z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  caret: '<svg class="caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 3.5 3 3 3-3"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 5 7 7-7 7"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M2 6h11v10H2zM13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="m8 12 3 3 5-6"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.6-1-2.6-2.6-2.8C17 5 12 5 12 5s-5 0-7.4.4C3 5.6 2.2 6.6 2 8.2 1.8 9.4 1.8 12 1.8 12s0 2.6.2 3.8c.2 1.6 1 2.6 2.6 2.8C7 19 12 19 12 19s5 0 7.4-.4c1.6-.2 2.4-1.2 2.6-2.8.2-1.2.2-3.8.2-3.8s0-2.6-.2-3.8zM10 15V9l5.2 3z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M8 7h7M8 11h7"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 1-5-5L13 2z"/><path d="M3 21l6-6"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15z"/><path d="M5 19 13 11"/></svg>',
};

const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#27c4c0"/><stop offset="1" stop-color="#0b7f80"/></linearGradient></defs>
  <rect width="40" height="40" rx="11" fill="url(#lg)"/>
  <path d="M11 26c-2.2 0-4-1.7-4-3.9 0-2 1.5-3.6 3.4-3.9C11.1 14.6 14.2 12 18 12c3.2 0 5.9 1.9 7 4.7.5-.1 1-.2 1.5-.2 3 0 5.5 2.4 5.5 5.3S29.5 26 26.5 26z" fill="#fff"/>
</svg>`;

/* ---------- Illustrations produits (SVG maison) ---------- */
function art(type, c = "#18a6a6", a = "#26324a", uid = Math.random().toString(36).slice(2, 7)) {
  const g = `<defs>
    <linearGradient id="b${uid}" x1="0" x2="1"><stop offset="0" stop-color="${c}"/><stop offset=".55" stop-color="${shade(c, 18)}"/><stop offset="1" stop-color="${shade(c, -22)}"/></linearGradient>
    <linearGradient id="s${uid}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>`;
  const B = `url(#b${uid})`, S = `url(#s${uid})`;
  switch (type) {
    case "pod": return `<svg viewBox="0 0 120 260" aria-hidden="true">${g}
      <rect x="44" y="6" width="32" height="30" rx="10" fill="${a}"/>
      <rect x="30" y="30" width="60" height="62" rx="12" fill="#1c2432" opacity=".9"/>
      <rect x="38" y="42" width="44" height="40" rx="8" fill="${c}" opacity=".45"/>
      <rect x="38" y="60" width="44" height="22" rx="6" fill="${c}" opacity=".85"/>
      <rect x="26" y="88" width="68" height="166" rx="20" fill="${B}"/>
      <rect x="40" y="96" width="14" height="150" rx="7" fill="${S}"/>
      <circle cx="60" cy="226" r="4" fill="#fff" opacity=".85"/></svg>`;
    case "pod-screen": return `<svg viewBox="0 0 130 260" aria-hidden="true">${g}
      <rect x="48" y="6" width="34" height="28" rx="10" fill="${a}"/>
      <rect x="32" y="28" width="66" height="60" rx="12" fill="#1c2432" opacity=".92"/>
      <rect x="40" y="56" width="50" height="24" rx="6" fill="${a}" opacity=".85"/>
      <rect x="28" y="84" width="74" height="170" rx="22" fill="${B}"/>
      <rect x="42" y="112" width="46" height="34" rx="6" fill="#0a0f19"/>
      <rect x="48" y="120" width="22" height="6" rx="3" fill="${a}"/><rect x="48" y="132" width="32" height="5" rx="2.5" fill="#fff" opacity=".6"/>
      <rect x="38" y="160" width="12" height="84" rx="6" fill="${S}"/>
      <rect x="48" y="96" width="34" height="6" rx="3" fill="#0a0f19" opacity=".5"/></svg>`;
    case "pen": return `<svg viewBox="0 0 80 280" aria-hidden="true">${g}
      <rect x="28" y="4" width="24" height="30" rx="8" fill="${a}"/>
      <rect x="22" y="28" width="36" height="66" rx="8" fill="#1c2432" opacity=".9"/>
      <rect x="28" y="52" width="24" height="36" rx="5" fill="${a}" opacity=".7"/>
      <rect x="20" y="90" width="40" height="184" rx="14" fill="${B}"/>
      <rect x="28" y="100" width="8" height="164" rx="4" fill="${S}"/>
      <circle cx="40" cy="250" r="3" fill="${a}" opacity=".8"/></svg>`;
    case "prefilled": return `<svg viewBox="0 0 120 260" aria-hidden="true">${g}
      <path d="M44 8h32l6 30H38z" fill="${a}"/>
      <rect x="32" y="34" width="56" height="64" rx="10" fill="${a}" opacity=".95"/>
      <rect x="40" y="46" width="40" height="42" rx="6" fill="#fff" opacity=".35"/>
      <rect x="40" y="64" width="40" height="24" rx="5" fill="#fff" opacity=".55"/>
      <rect x="28" y="94" width="64" height="160" rx="18" fill="${B}"/>
      <rect x="40" y="102" width="12" height="144" rx="6" fill="${S}"/>
      <rect x="48" y="226" width="24" height="4" rx="2" fill="${a}" opacity=".8"/></svg>`;
    case "box": return `<svg viewBox="0 0 170 260" aria-hidden="true">${g}
      <rect x="68" y="4" width="34" height="18" rx="6" fill="#1a1d23"/>
      <rect x="58" y="20" width="54" height="16" rx="4" fill="#a8b2c1"/>
      <rect x="60" y="36" width="50" height="64" rx="8" fill="${a}" opacity=".35"/>
      <rect x="60" y="62" width="50" height="38" rx="6" fill="${a}" opacity=".75"/>
      <rect x="56" y="98" width="58" height="12" rx="3" fill="#a8b2c1"/>
      <rect x="20" y="108" width="130" height="146" rx="18" fill="${B}"/>
      <rect x="40" y="128" width="54" height="40" rx="6" fill="#0a0f19"/>
      <rect x="47" y="136" width="26" height="7" rx="3" fill="${a}"/><rect x="47" y="150" width="38" height="5" rx="2.5" fill="#fff" opacity=".55"/>
      <rect x="110" y="130" width="22" height="46" rx="11" fill="#0a0f19" opacity=".45"/>
      <rect x="44" y="186" width="18" height="8" rx="4" fill="#0a0f19" opacity=".5"/><rect x="70" y="186" width="18" height="8" rx="4" fill="#0a0f19" opacity=".5"/>
      <rect x="28" y="116" width="14" height="130" rx="7" fill="${S}"/></svg>`;
    case "box-mini": return `<svg viewBox="0 0 150 240" aria-hidden="true">${g}
      <rect x="58" y="6" width="34" height="20" rx="7" fill="#1a1d23"/>
      <rect x="50" y="24" width="50" height="70" rx="10" fill="#1c2432" opacity=".9"/>
      <rect x="57" y="54" width="36" height="32" rx="6" fill="${a}" opacity=".7"/>
      <rect x="24" y="92" width="102" height="140" rx="26" fill="${B}"/>
      <circle cx="75" cy="146" r="18" fill="#0a0f19" opacity=".35"/><circle cx="75" cy="146" r="9" fill="${a}" opacity=".9"/>
      <rect x="62" y="196" width="26" height="6" rx="3" fill="#0a0f19" opacity=".45"/>
      <rect x="34" y="102" width="14" height="120" rx="7" fill="${S}"/></svg>`;
    case "bottle": return `<svg viewBox="0 0 120 260" aria-hidden="true">${g}
      <path d="M52 8h16v26H52z" fill="#fff" stroke="#c5ccd8" stroke-width="2"/>
      <rect x="40" y="30" width="40" height="34" rx="6" fill="#1a1d23"/>
      <path d="M44 62h32l10 22v156a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14V84z" fill="#f3f6fa" stroke="#d7dde7" stroke-width="2"/>
      <rect x="34" y="112" width="52" height="102" fill="${c}"/>
      <rect x="42" y="130" width="36" height="6" rx="3" fill="#fff" opacity=".9"/>
      <rect x="42" y="144" width="26" height="5" rx="2.5" fill="#fff" opacity=".65"/>
      <text x="60" y="190" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="16" fill="#fff">10 ml</text>
      <rect x="40" y="90" width="8" height="150" rx="4" fill="#fff" opacity=".6"/></svg>`;
    case "pack": return `<svg viewBox="0 0 200 220" aria-hidden="true">${g}
      ${[0, 1, 2].map((i) => `<g transform="translate(${22 + i * 54} ${i === 1 ? 10 : 30})">
        <rect x="14" y="0" width="28" height="28" rx="9" fill="${a}"/>
        <rect x="2" y="24" width="52" height="150" rx="12" fill="#1c2432" opacity=".92"/>
        <rect x="10" y="44" width="36" height="116" rx="8" fill="${c}" opacity=".45"/>
        <rect x="10" y="96" width="36" height="64" rx="8" fill="${c}" opacity=".9"/>
        <rect x="14" y="50" width="6" height="104" rx="3" fill="#fff" opacity=".35"/></g>`).join("")}</svg>`;
    case "coils": return `<svg viewBox="0 0 200 220" aria-hidden="true">${g}
      ${[0, 1, 2, 3, 4].map((i) => `<g transform="translate(${14 + i * 36} ${i % 2 ? 40 : 60})">
        <rect x="4" y="0" width="24" height="14" rx="3" fill="#a8b2c1"/>
        <rect x="0" y="12" width="32" height="110" rx="6" fill="${B}"/>
        <rect x="8" y="30" width="16" height="30" rx="3" fill="#0a0f19" opacity=".35"/>
        <rect x="6" y="122" width="20" height="16" rx="3" fill="#6d7788"/></g>`).join("")}</svg>`;
    case "cloud": return `<svg viewBox="0 0 300 220" aria-hidden="true">
      <defs><linearGradient id="cl${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#bfe9e7" stop-opacity=".7"/></linearGradient></defs>
      <path d="M70 170c-28 0-50-21-50-47 0-24 18-44 42-47 8-34 38-58 74-58 32 0 60 20 70 49 5-1 10-2 16-2 33 0 58 26 58 56 0 27-22 49-50 49z" fill="url(#cl${uid})"/>
      <circle cx="110" cy="200" r="8" fill="#fff" opacity=".5"/><circle cx="150" cy="208" r="5" fill="#fff" opacity=".35"/></svg>`;
    default: return "";
  }
}
function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (pct / 100) * (pct > 0 ? 255 - v : v))));
  return "#" + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
// Photo produit si `image` est renseigné (ex. "img/lion-king.webp"), sinon illustration SVG.
// Si le fichier est absent, l'<img> est remplacée par le SVG.
// Texte sans accents ni majuscules, pour comparer les recherches
const norm = (t) => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const correspond = (p, q) => {
  if (!q) return true;
  const texte = norm([p.nom, CATEGORIES[p.cat].nom, p.resume, ...(p.variantes ? Object.keys(p.variantes) : [])].join(" "));
  return norm(q).split(/\s+/).filter(Boolean).every((mot) => texte.includes(mot));
};
const lienProduit = (p, v) => `produit.html?id=${p.id}${v ? "&v=" + encodeURIComponent(v) : ""}`;

const imageProduit = (p, variante) => (p.variantes && (p.variantes[variante] || Object.values(p.variantes)[0])) || p.image;
const artProduit = (p, variante) => {
  const svg = art(p.art, p.couleur, "#26324a");
  const src = imageProduit(p, variante);
  if (!src) return svg;
  return `<img class="photo" src="${esc(src)}" alt="${esc(p.nom + (variante ? " – " + variante : ""))}" loading="lazy" onerror="this.outerHTML=this.nextElementSibling.innerHTML"><template>${svg}</template>`;
};

/* ---------- En-tête / pied de page ---------- */
function renderHeader() {
  const page = document.body.dataset.page;
  const cats = Object.entries(CATEGORIES).map(([k, c]) => `<li><a href="produits.html?cat=${k}">${c.nom}</a></li>`).join("");
  $("#header").outerHTML = `
  <div class="warning-bar"><strong>Vente interdite aux mineurs.</strong> Ce produit contient de la nicotine, substance à forte dépendance. Son utilisation par les non-fumeurs n'est pas recommandée.</div>
  <a class="promo-bar" href="produits.html?offre=puffs">${ICO.gift}<span><strong>${OFFRE_TEXTE}</strong> · ajoute 2 puffs, la 2e est gratuite</span></a>
  <header class="site-header">
    <div class="wrap header-inner">
      <button class="icon-btn burger" id="burger" aria-label="Ouvrir le menu">${ICO.menu}</button>
      <a class="logo" href="index.html">${LOGO}<span>${MARQUE}</span></a>
      <nav class="main-nav" id="nav" aria-label="Navigation principale">
        <ul>
          <li><a href="index.html" class="${page === "accueil" ? "active" : ""}">Accueil</a></li>
          <li class="has-sub"><button type="button" class="${page === "produits" ? "active" : ""}">Produits ${ICO.caret}</button>
            <ul class="submenu"><li><a href="produits.html">Tous les produits</a></li>${cats}</ul></li>
          <li class="has-sub"><button type="button" class="${page === "faq" ? "active" : ""}">À propos ${ICO.caret}</button>
            <ul class="submenu"><li><a href="index.html#a-propos">Qui sommes-nous</a></li><li><a href="faq.html">FAQ</a></li><li><a href="index.html#reglementation">Réglementation</a></li></ul></li>
          <li><a href="produits.html?cat=e-liquides">E-liquides</a></li>
          <li><a href="professionnels.html" class="${page === "pro" ? "active" : ""}">Professionnels</a></li>
          <li><a href="index.html#actualites">Actualités</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="search-btn" aria-label="Rechercher (touche /)">${ICO.search}</button>
        <button class="icon-btn" id="cart-btn" aria-label="Ouvrir le panier">${ICO.cart}<span class="cart-count" id="cart-count" hidden>0</span></button>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  const cats = Object.entries(CATEGORIES).map(([k, c]) => `<li><a href="produits.html?cat=${k}">${c.nom}</a></li>`).join("");
  $("#footer").outerHTML = `
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <a class="logo" href="index.html">${LOGO}<span>${MARQUE}</span></a>
        <p>Revendeur de cigarettes électroniques JNR. Pas de livraison en France ni en Belgique, où les puffs jetables sont interdites.</p>
        <div class="contact-line">${ICO.mail}<a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></div>
        <div class="contact-line">${ICO.clock}<span>Service client du lundi au vendredi, 9 h – 18 h</span></div>
        <div class="contact-line">${ICO.pin}<span class="todo">Pays à préciser</span></div>
        <div class="socials">
          <a href="#" aria-label="Instagram">${ICO.insta}</a><a href="#" aria-label="Facebook">${ICO.fb}</a><a href="#" aria-label="YouTube">${ICO.yt}</a>
        </div>
      </div>
      <div><h4>Liens rapides</h4><ul>
        <li><a href="index.html#a-propos">Qui sommes-nous</a></li><li><a href="faq.html">FAQ</a></li>
        <li><a href="professionnels.html">Espace professionnels</a></li><li><a href="index.html#actualites">Actualités</a></li>
        <li><a href="index.html#reglementation">Réglementation</a></li></ul></div>
      <div><h4>Produits</h4><ul>${cats}</ul></div>
      <div><h4>Informations</h4><ul>
        <li><a href="mentions-legales.html">Mentions légales</a></li>
        <li><a href="mentions-legales.html#cgv">Conditions générales de vente</a></li>
        <li><a href="mentions-legales.html#livraison">Livraison & retours</a></li>
        <li><a href="mentions-legales.html#confidentialite">Confidentialité & cookies</a></li></ul></div>
    </div>
    <div class="wrap footer-legal">
      <span>© ${new Date().getFullYear()} ${MARQUE}. Tous droits réservés.</span>
      <span>Vente réservée aux personnes majeures. Âge vérifié à la livraison.</span>
    </div>
    <div class="footer-warning">Ce produit contient de la nicotine, substance à forte dépendance. Son utilisation par les non-fumeurs n'est pas recommandée.</div>
  </footer>
  <div class="drawer-bg" id="drawer-bg"></div>
  <aside class="drawer" id="drawer" aria-label="Panier">
    <div class="drawer-head"><h3>Mon panier</h3><button class="icon-btn" id="drawer-close" aria-label="Fermer le panier">${ICO.close}</button></div>
    <div class="drawer-items" id="drawer-items"></div>
    <div class="drawer-foot" id="drawer-foot"></div>
  </aside>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

/* ---------- Vérification d'âge ---------- */
function ageGate() {
  if (store.get("nebule-majeur", false)) return;
  const el = document.createElement("div");
  el.className = "age-gate";
  el.innerHTML = `<div class="age-box" role="dialog" aria-modal="true" aria-labelledby="age-t">
    <div class="logo">${LOGO}<span>${MARQUE}</span></div>
    <h2 id="age-t">Avez-vous 18 ans ou plus ?</h2>
    <p>Ce site propose des produits contenant de la nicotine. Leur vente est interdite aux mineurs.</p>
    <div class="age-actions">
      <button class="btn" id="age-yes">Oui, j'ai 18 ans ou plus</button>
      <button class="btn ghost" id="age-no">Non</button>
    </div>
    <p class="age-denied" id="age-denied" hidden>Désolé, l'accès à ce site est réservé aux personnes majeures.</p>
    <small>En entrant sur ce site, vous certifiez être majeur·e.</small>
  </div>`;
  document.body.append(el);
  document.body.classList.add("locked");
  $("#age-yes").addEventListener("click", () => { store.set("nebule-majeur", true); el.remove(); document.body.classList.remove("locked"); });
  $("#age-no").addEventListener("click", () => { $("#age-denied").hidden = false; $(".age-actions").hidden = true; });
}

/* ---------- Navigation mobile ---------- */
function initNav() {
  const body = document.body;
  $("#burger").addEventListener("click", () => body.classList.toggle("nav-open"));
  $$(".has-sub > button").forEach((b) => b.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 880px)").matches) b.parentElement.classList.toggle("open");
  }));
  $$(".main-nav a").forEach((a) => a.addEventListener("click", () => body.classList.remove("nav-open")));
}

/* ---------- Panier (local, en attente du paiement) ---------- */
// On écarte les articles dont le produit n’existe plus dans le catalogue
let panier = store.get("nebule-panier", []).filter((l) => l && produit(l.id));
const cle = (l) => [l.id, l.variante].join("|");

/* Offre « 1 puff achetée = 1 puff offerte » : sur les produits puff: true (hors puff mystère),
   une puff sur deux est offerte, en commençant par les moins chères. */
const OFFRE_TEXTE = "1 puff achetée = 1 puff offerte au choix";
function calculOffre() {
  const unites = [];
  panier.forEach((l) => { const p = produit(l.id); if (p?.puff) for (let k = 0; k < l.qte; k++) unites.push(p.prix); });
  unites.sort((a, b) => a - b);
  const gratuites = Math.floor(unites.length / 2);
  const remise = unites.slice(0, gratuites).reduce((t, x) => t + x, 0);
  return { puffs: unites.length, gratuites, remise, aChoisir: unites.length % 2 === 1 };
}

function ajouterAuPanier(id, choix = {}) {
  const p = produit(id);
  const ligne = { id, variante: choix.variante || (p.variantes ? Object.keys(p.variantes)[0] : ""), qte: 1 };
  const exist = panier.find((l) => cle(l) === cle(ligne));
  if (exist) exist.qte += choix.qte || 1; else panier.push({ ...ligne, qte: choix.qte || 1 });
  sauverPanier();
  toast(p.puff && calculOffre().aChoisir ? `${p.nom} ajouté : choisis ta 2e puff, elle est offerte !` : `${p.nom} ajouté au panier`);
}
function sauverPanier() { store.set("nebule-panier", panier); renderPanier(); document.dispatchEvent(new Event("panier")); }
// Un seul lien possible : 9,99 € dès qu'un article à 9,99 € est dans le panier, sinon 2 €
const prixPanier = () => (panier.some((l) => produit(l.id)?.prix !== 2) ? 9.99 : 2);

function renderPanier() {
  const n = panier.reduce((s, l) => s + l.qte, 0);
  const badge = $("#cart-count");
  badge.textContent = n; badge.hidden = n === 0;
  const items = $("#drawer-items"), foot = $("#drawer-foot");
  if (!n) {
    items.innerHTML = `<div class="drawer-empty"><p>Votre panier est vide.</p><a class="btn small" href="produits.html">Voir les produits</a></div>`;
    foot.innerHTML = ""; return;
  }
  items.innerHTML = panier.map((l, i) => {
    const p = produit(l.id); if (!p) return "";
    const opts = l.variante || "";
    return `<div class="line">
      <div class="line-media">${artProduit(p, l.variante)}</div>
      <div><div class="line-title">${esc(p.nom)}</div><div class="line-opt">${esc(opts)}</div>
        <div class="qty"><button data-q="-1" data-i="${i}" aria-label="Diminuer">−</button><span>${l.qte}</span><button data-q="1" data-i="${i}" aria-label="Augmenter">+</button></div></div>
      <div><div class="line-price">${euro(p.prix * l.qte)}</div><button class="remove" data-r="${i}">Retirer</button></div>
    </div>`;
  }).join("");
  const offre = calculOffre();
  if (offre.puffs) {
    items.innerHTML += offre.aChoisir
      ? `<div class="offre-panier a-choisir">${ICO.gift}<div><b>Ta puff offerte t'attend</b><span>Ajoute une 2e puff de ton choix, elle est gratuite.</span><a class="btn small" href="produits.html?offre=puffs">Choisir ma puff offerte</a></div></div>`
      : `<div class="offre-panier">${ICO.gift}<div><b>${offre.gratuites} puff${offre.gratuites > 1 ? "s" : ""} offerte${offre.gratuites > 1 ? "s" : ""}</b><span>Offre « ${OFFRE_TEXTE} » appliquée. Hors puff mystère.</span></div></div>`;
  }
  const sousTotal = panier.reduce((s, l) => s + (produit(l.id)?.prix || 0) * l.qte, 0);
  const total = sousTotal - offre.remise;
  foot.innerHTML = `${offre.remise ? `<div class="sous-total"><span>Sous-total</span><span>${euro(sousTotal)}</span></div>
    <div class="sous-total remise"><span>1 achetée = 1 offerte</span><span>−${euro(offre.remise)}</span></div>` : ""}
    <div class="total"><span>Total</span><span>${euro(total)}</span></div>
    <small>Frais de livraison calculés à l'étape suivante. Vérification de l'âge à la commande.</small>
    <button class="btn" id="checkout">Passer commande</button>`;
  $("#checkout").addEventListener("click", () => { location.href = "livraison.html"; });
}

function choisirPastille(sw) {
  const card = sw.closest(".card"), p = produit(card.dataset.id), v = sw.dataset.swatch;
  $$(".swatch", card).forEach((x) => x.classList.toggle("is-active", x === sw));
  const img = $(".card-media .photo", card);
  if (img) img.src = imageProduit(p, v);
  $$("a.card-media, .card-title a", card).forEach((a) => { a.href = lienProduit(p, v); });
  const lbl = $(".card-variant", card); if (lbl) lbl.textContent = v;
  $("[data-add]", card).dataset.v = v;
}
document.addEventListener("click", (e) => { const sw = e.target.closest("[data-swatch]"); if (sw) choisirPastille(sw); });
document.addEventListener("pointerover", (e) => {
  const sw = e.target.closest("[data-swatch]");
  if (sw && e.pointerType === "mouse") choisirPastille(sw);
});

function initPanier() {
  const open = () => document.body.classList.add("drawer-open");
  const close = () => document.body.classList.remove("drawer-open", "nav-open");
  $("#cart-btn").addEventListener("click", open);
  $("#drawer-close").addEventListener("click", close);
  $("#drawer-bg").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  $("#drawer-items").addEventListener("click", (e) => {
    const q = e.target.closest("[data-q]"), r = e.target.closest("[data-r]");
    if (q) { const l = panier[+q.dataset.i]; l.qte += +q.dataset.q; if (l.qte < 1) panier.splice(+q.dataset.i, 1); sauverPanier(); }
    if (r) { panier.splice(+r.dataset.r, 1); sauverPanier(); }
  });
  document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]");
    if (!b) return;
    e.preventDefault();
    if (!produit(b.dataset.add)) return;
    ajouterAuPanier(b.dataset.add, { variante: b.dataset.v });
    volVersPanier($(".card-media .photo, .card-media svg", b.closest(".card") || document.body));
  });
  renderPanier();
}

/* Une copie de la photo « vole » jusqu'à l'icône panier */
function volVersPanier(source) {
  const cible = $("#cart-btn");
  if (!source || !cible || !source.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const a = source.getBoundingClientRect(), b = cible.getBoundingClientRect();
  if (!a.width) return;
  const clone = source.cloneNode(true);
  Object.assign(clone.style, { position: "fixed", left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", margin: 0, zIndex: 400, pointerEvents: "none", objectFit: "contain", animation: "none" });
  document.body.append(clone);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
  clone.animate([
    { transform: "translate(0,0) scale(1)", opacity: 1 },
    { transform: `translate(${dx * .6}px, ${dy * .6 - 80}px) scale(.45)`, opacity: .9, offset: .6 },
    { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: .2 },
  ], { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" }).onfinish = () => {
    clone.remove();
    cible.animate([{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], { duration: 350 });
  };
}

/* ---------- Recherche instantanée ---------- */
function initRecherche() {
  const el = document.createElement("div");
  el.className = "search"; el.hidden = true;
  el.innerHTML = `<div class="search-bg" data-close></div>
    <div class="search-box" role="dialog" aria-modal="true" aria-label="Recherche">
      <div class="search-field">${ICO.search}<input type="search" id="search-input" placeholder="Modèle, goût, gamme…" autocomplete="off"><kbd>Échap</kbd></div>
      <div class="search-results" id="search-results"></div>
    </div>`;
  document.body.append(el);
  const input = $("#search-input", el), res = $("#search-results", el);
  let actif = 0;

  const suggestions = `<div class="search-hint">Suggestions</div><div class="search-tags">${["Lion King", "Falcon", "Mega Box", "Cerise", "Blue Razz", "E-liquide"].map((t) => `<button type="button" data-q="${t}">${t}</button>`).join("")}</div>`;
  const rendre = () => {
    const q = input.value.trim();
    if (!q) { res.innerHTML = suggestions; return; }
    // Une ligne par variante qui correspond (ou par produit si le mot-clé ne vise pas une variante)
    const lignes = [];
    PRODUITS.filter((p) => correspond(p, q)).forEach((p) => {
      const vs = p.variantes ? Object.keys(p.variantes).filter((v) => norm(v).includes(norm(q))) : [];
      if (vs.length) vs.forEach((v) => lignes.push({ p, v })); else lignes.push({ p, v: "" });
    });
    actif = 0;
    res.innerHTML = lignes.length
      ? lignes.slice(0, 8).map(({ p, v }, i) => `<a class="search-item ${i === 0 ? "is-active" : ""}" href="${lienProduit(p, v)}">
          <span class="search-thumb">${artProduit(p, v)}</span>
          <span class="search-txt"><b>${esc(p.nom)}</b><small>${esc(v || CATEGORIES[p.cat].nom)}</small></span>
          <span class="search-price">${euro(p.prix)}</span></a>`).join("") +
        `<a class="search-all" href="produits.html?q=${encodeURIComponent(q)}">Voir les ${lignes.length} résultat${lignes.length > 1 ? "s" : ""} dans le catalogue →</a>`
      : `<div class="search-empty">Aucun résultat pour « ${esc(q)} ».</div>`;
  };
  const ouvrir = () => { el.hidden = false; document.body.classList.add("locked"); rendre(); requestAnimationFrame(() => input.focus()); };
  const fermer = () => { el.hidden = true; document.body.classList.remove("locked"); };

  $("#search-btn").addEventListener("click", ouvrir);
  input.addEventListener("input", rendre);
  el.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) fermer();
    const t = e.target.closest("[data-q]"); if (t) { input.value = t.dataset.q; rendre(); input.focus(); }
  });
  document.addEventListener("keydown", (e) => {
    const champ = /input|textarea|select/i.test(document.activeElement?.tagName || "");
    if ((e.key === "/" && !champ) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); ouvrir(); return; }
    if (el.hidden) return;
    const items = $$(".search-item", res);
    if (e.key === "Escape") fermer();
    else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && items.length) {
      e.preventDefault();
      actif = (actif + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((x, i) => x.classList.toggle("is-active", i === actif));
      items[actif].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && items[actif]) { e.preventDefault(); location.href = items[actif].href; }
  });
}

let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- Composants ---------- */
function carteProduit(p) {
  const chips = [p.mystere && `${PRODUITS.filter((x) => x.puff).length} modèles possibles`, p.mystere && "Saveur surprise", p.cat === "e-liquides" && p.specs["Contenance"] !== A_CONFIRMER && p.specs["Contenance"], p.variantes && `${Object.keys(p.variantes).length} ${({ Finition: "finitions", Couleur: "couleurs", Illustration: "illustrations", Modèle: "modèles" })[p.varLabel] || "saveurs"}`, p.specs["Écran"], p.specs["Modes"]]
    .filter(Boolean).slice(0, 2).map((x) => `<li>${esc(x)}</li>`).join("");
  const vs = p.variantes ? Object.keys(p.variantes) : [];
  const v0 = vs[0] || "";
  const pastilles = vs.length > 1
    ? `<div class="swatches" role="group" aria-label="${esc(p.varLabel)}">${vs.slice(0, 6).map((v, i) => `<button type="button" class="swatch ${i === 0 ? "is-active" : ""}" data-swatch="${esc(v)}" title="${esc(v)}" aria-label="${esc(v)}"><img src="${esc(p.variantes[v])}" alt="" loading="lazy"></button>`).join("")}${vs.length > 6 ? `<a class="swatch-more" href="${lienProduit(p)}">+${vs.length - 6}</a>` : ""}</div>`
    : "";
  return `<article class="card" style="--pc:${p.couleur}" data-id="${p.id}">
    <a class="card-media" href="${lienProduit(p, v0)}" aria-label="${esc(p.nom)}">
      ${p.badge ? `<span class="badge ${p.nouveau ? "new" : ""}">${esc(p.badge)}</span>` : ""}${p.puff ? `<span class="badge-offre">${ICO.gift}1 achetée = 1 offerte</span>` : ""}${artProduit(p, v0)}</a>
    ${pastilles}
    <div class="card-body">
      <div class="card-cat">${CATEGORIES[p.cat].court}</div>
      <h3 class="card-title"><a href="${lienProduit(p, v0)}">${esc(p.nom)}</a></h3>
      ${vs.length > 1 ? `<div class="card-variant">${esc(v0)}</div>` : ""}
      <p class="card-desc">${esc(p.resume)}</p>
      ${chips ? `<ul class="chips">${chips}</ul>` : ""}
      <div class="card-foot"><span class="price">${euro(p.prix)}</span>
        <button class="btn small" data-add="${p.id}" data-v="${esc(v0)}">Acheter</button>
    </div></article>`;
}

/* ---------- Page d'accueil ---------- */
function initAccueil() {
  // Carrousel
  const slides = $$(".slide"), dots = $(".slider-ctrl");
  if (slides.length) {
    let i = 0, timer;
    slides.forEach((s) => { const v = $(".slide-visual", s); const p = produit(v.dataset.p); v.innerHTML = `<div class="ring"></div><div class="ring r2"></div><div class="float">${artProduit(p, v.dataset.v)}</div>`; });
    // Parallaxe 3D du produit selon la souris
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => {
      if (!fineMotion()) return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $$(".slide-visual .float").forEach((f) => { f.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`; });
    });
    hero.addEventListener("pointerleave", () => $$(".slide-visual .float").forEach((f) => { f.style.transform = ""; }));
    dots.innerHTML = slides.map((_, k) => `<button class="dot" aria-label="Diapositive ${k + 1}"></button>`).join("");
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      $$(".dot").forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
    $$(".dot").forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
    $(".arrow.prev").addEventListener("click", () => { go(i - 1); auto(); });
    $(".arrow.next").addEventListener("click", () => { go(i + 1); auto(); });
    go(0); auto();
  }
  // Produits phares
  $("#phares").innerHTML = PRODUITS.filter((p) => p.phare).slice(0, 6).map(carteProduit).join("");
  const liquides = PRODUITS.filter((p) => p.cat === "e-liquides");
  $("#eliquides").innerHTML = liquides.map(carteProduit).join("");
  $("#gouts").innerHTML = liquides.flatMap((p) =>
    p.variantes
      ? Object.keys(p.variantes).map((v) => `<a class="gout" href="produit.html?id=${p.id}&v=${encodeURIComponent(v)}" style="--gc:${p.couleur}"><b>${esc(v)}</b><span>${esc(p.nom)}</span></a>`)
      : [`<a class="gout" href="produit.html?id=${p.id}" style="--gc:${p.couleur}"><b>${esc(p.nom.replace(/^(JNR|Fruitéo) /, ""))}</b><span>${esc(p.nom.split(" ")[0])}</span></a>`]
  ).join("");
  // Catégories
  $("#categories").innerHTML = Object.entries(CATEGORIES).map(([k, c]) => {
    const p = PRODUITS.find((x) => x.cat === k);
    return `<a class="cat-tile" href="produits.html?cat=${k}" style="--tc:${p.couleur}80"><h3>${c.nom}</h3><p>${c.desc}</p>
      <span class="more">Découvrir ${ICO.arrowR.replace("<svg", '<svg width="14" height="14"')}</span><div class="art">${artProduit(p)}</div></a>`;
  }).join("");
  // Chiffres calculés depuis le catalogue
  $("#nb-produits").textContent = PRODUITS.length;
  $("#nb-variantes").textContent = PRODUITS.reduce((s, p) => s + (p.variantes ? Object.keys(p.variantes).length : 1), 0);
  // Onglets À propos
  $$(".tab-btn").forEach((b) => b.addEventListener("click", () => {
    $$(".tab-btn").forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-selected", x === b); });
    $$(".tab-panel").forEach((p) => { p.hidden = p.id !== b.dataset.tab; });
  }));
  initNewsletter();
}

function initNewsletter() {
  const f = $("#nl-form"); if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    $("#nl-msg").textContent = "Merci ! Votre inscription est bien prise en compte.";
    f.reset();
  });
}

/* ---------- Page catalogue ---------- */
function initCatalogue() {
  const params = new URLSearchParams(location.search);
  let cat = CATEGORIES[params.get("cat")] ? params.get("cat") : "tous";
  let q = params.get("q") || "", tri = "pertinence";
  let offre = params.get("offre") === "puffs";
  const champ = $("#q"), selTri = $("#tri");
  champ.value = q;
  const filtres = $("#filtres"), grille = $("#grille"), compte = $("#compte");
  filtres.innerHTML = `<button class="filter" data-cat="tous">Tous</button>` +
    Object.entries(CATEGORIES).map(([k, c]) => `<button class="filter" data-cat="${k}">${c.court}</button>`).join("");
  const render = () => {
    const liste = PRODUITS.filter((p) => (cat === "tous" || p.cat === cat) && (!offre || p.puff) && correspond(p, q));
    if (tri === "prix-asc") liste.sort((a, b) => a.prix - b.prix);
    if (tri === "prix-desc") liste.sort((a, b) => b.prix - a.prix);
    if (tri === "nom") liste.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
    $$(".filter").forEach((b) => b.classList.toggle("is-active", b.dataset.cat === cat));
    grille.innerHTML = liste.length ? liste.map(carteProduit).join("")
      : `<div class="vide"><p>Aucun produit ne correspond à « ${esc(q)} ».</p><button class="btn ghost small" type="button" id="reset">Effacer la recherche</button></div>`;
    compte.textContent = `${liste.length} produit${liste.length > 1 ? "s" : ""}${q ? ` pour « ${q} »` : ""}`;
    $("#titre-cat").textContent = offre ? "Choisis ta puff offerte" : cat === "tous" ? "Tous nos produits" : CATEGORIES[cat].nom;
    $("#desc-cat").textContent = offre ? `${OFFRE_TEXTE} : ajoute 2 puffs au panier, la 2e est gratuite. Hors puff mystère.` : cat === "tous" ? "Toute la gamme JNR : Lion King, Falcon, Mega Box Pro et modèles à écran." : CATEGORIES[cat].desc;
    document.title = `${cat === "tous" ? "Produits" : CATEGORIES[cat].nom} | ${MARQUE}`;
  };
  filtres.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    cat = b.dataset.cat;
    offre = false;
    majUrl();
    render();
  });
  const majUrl = () => {
    const u = new URLSearchParams();
    if (cat !== "tous") u.set("cat", cat);
    if (q) u.set("q", q);
    if (offre) u.set("offre", "puffs");
    history.replaceState(null, "", "produits.html" + (u.toString() ? "?" + u : ""));
  };
  let attente;
  champ.addEventListener("input", () => { clearTimeout(attente); attente = setTimeout(() => { q = champ.value.trim(); majUrl(); render(); }, 120); });
  selTri.addEventListener("change", () => { tri = selTri.value; render(); });
  grille.addEventListener("click", (e) => { if (e.target.closest("#reset")) { champ.value = q = ""; majUrl(); render(); champ.focus(); } });
  render();
}

/* ---------- Fiche produit ---------- */
function initFiche() {
  const p = produit(new URLSearchParams(location.search).get("id"));
  const zone = $("#fiche");
  if (!p) {
    zone.innerHTML = `<div class="drawer-empty"><h2>Produit introuvable</h2><a class="btn" href="produits.html">Retour aux produits</a></div>`;
    $("#similaires").closest("section").hidden = true;
    return;
  }
  document.title = `${p.nom} | ${MARQUE}`;
  $("#crumb-cat").innerHTML = `<a href="produits.html?cat=${p.cat}">${CATEGORIES[p.cat].nom}</a>`;
  $("#crumb-nom").textContent = p.nom;

  const demandee = new URLSearchParams(location.search).get("v");
  const choix = { variante: p.variantes ? (p.variantes[demandee] ? demandee : Object.keys(p.variantes)[0]) : "", qte: 1 };
  const groupe = (lbl, key, valeurs) => `<div class="opt-group"><span class="lbl">${lbl}</span><div class="opt-list" data-key="${key}">
    ${valeurs.map((v) => key === "variante"
      ? `<button type="button" class="opt opt-img ${v === choix[key] ? "is-active" : ""}" data-v="${esc(v)}"><img src="${esc(p.variantes[v])}" alt="" loading="lazy"><span>${esc(v)}</span></button>`
      : `<button type="button" class="opt ${v === choix[key] ? "is-active" : ""}" data-v="${esc(v)}">${esc(v)}</button>`).join("")}</div></div>`;

  zone.innerHTML = `<div class="pdp">
    <div class="pdp-media" id="pdp-media" style="--pc:${p.couleur}">${artProduit(p, choix.variante)}</div>
    <div>
      <div class="card-cat">${CATEGORIES[p.cat].nom}</div>
      <h1>${esc(p.nom)}</h1>
      <p>${esc(p.resume)}</p>
      <span class="price">${euro(p.prix)}</span>
      ${p.puff ? `<a class="offre-fiche" href="produits.html?offre=puffs">${ICO.gift}<span><b>${OFFRE_TEXTE}</b>Ajoute 2 puffs au panier : la 2e est offerte.</span></a>` : ""}
      ${p.mystere ? `<p class="offre-fiche neutre">La puff mystère n'entre pas dans l'offre « 1 achetée = 1 offerte ».</p>` : ""}
      ${p.variantes ? groupe(`${p.varLabel} : <em id="var-nom">${esc(choix.variante)}</em>`, "variante", Object.keys(p.variantes)) : ""}
      <div class="buy-row">
        <div class="qty"><button type="button" id="q-moins" aria-label="Diminuer">−</button><span id="q-val">1</span><button type="button" id="q-plus" aria-label="Augmenter">+</button></div>
        <button class="btn" id="ajout">Acheter</button>
      </div>
      <h2 style="font-size:20px;margin-top:10px">Caractéristiques</h2>
      <table class="spec-table">${Object.entries(p.specs).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${v === A_CONFIRMER ? `<span class="todo">${v}</span>` : esc(v)}</td></tr>`).join("")}</table>
      ${p.mystere ? `<h2 style="font-size:20px;margin-top:30px">Tu peux recevoir</h2>
      <p class="mystere-note">Chaque puff mystère est tirée au hasard parmi ces ${PRODUITS.filter((x) => x.puff).length} modèles, dans une saveur disponible en stock.</p>
      <div class="mystere-liste">${PRODUITS.filter((x) => x.puff).map((x) => `<a class="mystere-item" href="${lienProduit(x)}"><span>${artProduit(x)}</span><b>${esc(x.nom.replace(/^JNR /, ""))}</b></a>`).join("")}</div>` : ""}
      <h2 style="font-size:20px;margin-top:30px">Contenu</h2>
      <ul class="check-list">${p.contenu.map((c) => `<li>${ICO.check}<span>${esc(c)}</span></li>`).join("")}</ul>
      ${`<div class="legal-note"><strong>Avertissement :</strong> ce produit contient ou est destiné à être utilisé avec de la nicotine, substance à forte dépendance. Son utilisation par les non-fumeurs n'est pas recommandée. Tenir hors de portée des enfants. Vente interdite aux mineurs.${p.cat === "e-liquides" ? " Flacon muni d'un bouchon de sécurité enfant : bien le refermer après usage." : " Contient une batterie au lithium : à déposer en point de collecte, jamais à la poubelle."}</div>`}
    </div></div>`;

  $$(".opt-list", zone).forEach((list) => list.addEventListener("click", (e) => {
    const b = e.target.closest(".opt"); if (!b) return;
    $$(".opt", list).forEach((x) => x.classList.toggle("is-active", x === b));
    choix[list.dataset.key] = b.dataset.v;
    if (list.dataset.key === "variante") {
      $("#pdp-media").innerHTML = artProduit(p, b.dataset.v);
      $("#var-nom").textContent = b.dataset.v;
      $("#bar-var").textContent = b.dataset.v;
      history.replaceState(null, "", lienProduit(p, b.dataset.v));
    }
  }));
  const maj = () => { $("#q-val").textContent = choix.qte; };
  $("#q-moins").addEventListener("click", () => { choix.qte = Math.max(1, choix.qte - 1); maj(); });
  $("#q-plus").addEventListener("click", () => { choix.qte = Math.min(20, choix.qte + 1); maj(); });
  const acheter = () => {
    ajouterAuPanier(p.id, choix);
    volVersPanier($("#pdp-media .photo, #pdp-media svg"));
    setTimeout(() => document.body.classList.add("drawer-open"), 650);
  };
  $("#ajout").addEventListener("click", acheter);

  // Barre d'achat collante (mobile) quand le bouton principal sort de l'écran
  const bar = document.createElement("div");
  bar.className = "buy-bar"; bar.hidden = true;
  bar.innerHTML = `<div><b>${esc(p.nom)}</b><small id="bar-var">${esc(choix.variante)}</small></div><span class="price">${euro(p.prix)}</span><button class="btn small" type="button">Ajouter</button>`;
  document.body.append(bar);
  $("button", bar).addEventListener("click", acheter);
  // Visible seulement quand le bouton principal est passé au-dessus de l’écran
  const majBarre = () => { bar.hidden = $("#ajout").getBoundingClientRect().bottom > 0; };
  window.addEventListener("scroll", majBarre, { passive: true });
  majBarre();

  // Zoom de la photo au survol (souris)
  const media = $("#pdp-media");
  media.addEventListener("pointermove", (e) => {
    if (!fineMotion()) return;
    const r = media.getBoundingClientRect(), img = $(".photo", media); if (!img) return;
    media.classList.add("zoom");
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
  media.addEventListener("pointerleave", () => media.classList.remove("zoom"));

  $("#similaires").innerHTML = PRODUITS.filter((x) => x.cat === p.cat && x.id !== p.id).concat(PRODUITS.filter((x) => x.cat !== p.cat && x.phare)).slice(0, 3).map(carteProduit).join("");
}

/* ---------- Page livraison : infos client envoyées en sub ID vers la page de paiement ---------- */
function initLivraison() {
  const zone = $("#livraison");
  const CHAMPS = [
    // [name, sub ID, libellé, attributs de l'input]
    ["prenom", "sub9", "Prénom", 'autocomplete="given-name" autocapitalize="words"'],
    ["nom", "sub10", "Nom", 'autocomplete="family-name" autocapitalize="words"'],
    ["email", "sub11", "Email", 'type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false"'],
    ["mobile", "sub12", "Téléphone mobile", 'type="tel" inputmode="tel" autocomplete="tel-national"'],
    ["adresse", "sub13", "Adresse", 'autocomplete="address-line1"'],
    ["cp", "sub14", "Code postal", 'autocomplete="postal-code" autocapitalize="characters"'],
    ["ville", "sub15", "Ville", 'autocomplete="address-level2" autocapitalize="words"'],
  ];
  const saisie = store.get("nebule-livraison", {});
  const region = (navigator.language || "").split("-")[1]?.toUpperCase();
  const paysDefaut = PAYS.find((x) => x[0] === saisie.pays) || PAYS.find((x) => x[0] === region) || PAYS[0];

  const recap = () => {
    const box = $("#recap"); if (!box) return;
    if (!panier.length) { rendre(); return; }
    const offre = calculOffre();
    const sousTotal = panier.reduce((s, l) => s + produit(l.id).prix * l.qte, 0);
    const n = panier.reduce((s, l) => s + l.qte, 0);
    box.innerHTML = `<h2>Ta commande <small>${n} article${n > 1 ? "s" : ""}</small></h2>
      ${panier.map((l) => { const p = produit(l.id); return `<div class="line">
        <div class="line-media">${artProduit(p, l.variante)}<span class="recap-qte">${l.qte}</span></div>
        <div><div class="line-title">${esc(p.nom)}</div><div class="line-opt">${esc(l.variante || "")}</div></div>
        <div class="line-price">${euro(p.prix * l.qte)}</div></div>`; }).join("")}
      ${offre.remise ? `<div class="sous-total" style="margin-top:14px"><span>Sous-total</span><span>${euro(sousTotal)}</span></div>
      <div class="sous-total remise"><span>1 achetée = 1 offerte</span><span>−${euro(offre.remise)}</span></div>` : ""}
      <div class="total" style="margin-top:14px"><span>Total</span><span>${euro(sousTotal - offre.remise)}</span></div>
      <small class="muted">Livraison calculée à l'étape du paiement.</small>`;
  };

  const champ = ([name, , label, attrs]) => `<div class="field" data-f="${name}">
    <label for="f-${name}">${label}</label>
    ${name === "mobile"
      ? `<div class="tel"><select id="f-indicatif" aria-label="Indicatif">${PAYS.map((x) => `<option value="${x[2]}">${x[0]} ${x[2]}</option>`).join("")}</select>
         <input id="f-${name}" name="${name}" ${attrs} required value="${esc(saisie[name] || "")}" placeholder="6 12 34 56 78"></div>`
      : `<input id="f-${name}" name="${name}" ${attrs} required value="${esc(saisie[name] || "")}">`}
    <small class="err" hidden></small></div>`;
  const [prenom, nom, email, mobile, adresse, cp, ville] = CHAMPS.map(champ);

  function rendre() {
    if (!panier.length) {
      zone.innerHTML = `<div class="drawer-empty"><h2>Ton panier est vide</h2><p>Ajoute un produit pour passer à la livraison.</p><a class="btn" href="produits.html">Voir les produits</a></div>`;
      return;
    }
    zone.innerHTML = `<div class="ship">
      <form class="ship-form" id="ship-form" novalidate>
        <h1>Livraison</h1>
        <p class="muted">Où doit-on t'envoyer ta commande ? Plus qu'une étape avant le paiement.</p>
        <div class="ship-2">${prenom}${nom}</div>
        ${email}${mobile}${adresse}
        <div class="ship-2">${cp}${ville}</div>
        <div class="field"><label for="f-pays">Pays</label>
          <select id="f-pays" name="pays" autocomplete="country">${PAYS.map((x) => `<option value="${x[0]}">${x[1]}</option>`).join("")}</select></div>
        <button class="btn" type="submit" id="ship-go">Continuer vers le paiement ${ICO.arrowR.replace("<svg", '<svg width="18" height="18"')}</button>
        <div class="ship-trust">${ICO.lock}<span>Paiement sécurisé à l'étape suivante · tes infos sont déjà remplies</span></div>
      </form>
      <aside class="ship-recap" id="recap"></aside>
    </div>`;
    recap();

    const f = $("#ship-form"), selPays = $("#f-pays"), selInd = $("#f-indicatif");
    selPays.value = paysDefaut[0];
    selInd.value = saisie.indicatif || paysDefaut[2];
    const sauver = () => store.set("nebule-livraison", { ...Object.fromEntries(new FormData(f)), indicatif: selInd.value });
    selPays.addEventListener("change", () => { selInd.value = PAYS.find((x) => x[0] === selPays.value)[2]; sauver(); });
    f.addEventListener("input", (e) => { const b = e.target.closest(".field.bad"); if (b) { b.classList.remove("bad"); $(".err", b).hidden = true; } sauver(); });

    // Numéro au format international : +41791234567
    const telInter = (brut) => {
      const t = brut.trim(), chiffres = t.replace(/\D/g, "");
      if (t.startsWith("+")) return "+" + chiffres;
      if (chiffres.startsWith("00")) return "+" + chiffres.slice(2);
      return selInd.value + chiffres.replace(/^0+/, "");
    };
    const erreur = (name, msg) => { const b = $(`[data-f="${name}"]`, f); b.classList.add("bad"); const e = $(".err", b); e.textContent = msg; e.hidden = false; return b; };

    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries([...new FormData(f)].map(([k, v]) => [k, String(v).trim()]));
      const fautes = [];
      CHAMPS.forEach(([name]) => { if (!d[name]) fautes.push(erreur(name, "Champ obligatoire")); });
      if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) fautes.push(erreur("email", "Email invalide"));
      const nbChiffres = d.mobile.replace(/\D/g, "").length;
      if (d.mobile && (nbChiffres < 6 || nbChiffres > 15)) fautes.push(erreur("mobile", "Numéro invalide"));
      if (fautes.length) { fautes[0].querySelector("input").focus(); return; }

      const infos = Object.fromEntries(CHAMPS.map(([name, sub]) => [sub, d[name]]));
      infos.sub12 = telInter(d.mobile);
      infos.sub16 = d.pays;
      const go = $("#ship-go"); go.disabled = true; go.textContent = "Redirection vers le paiement…";
      redirigerAffilie(prixPanier(), infos);
    });
  }
  rendre();
  // Le panier peut changer depuis le tiroir : on met le récap à jour
  document.addEventListener("panier", recap);
}

/* ---------- Formulaire pro ---------- */
function initPro() {
  const f = $("#pro-form"); if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(f);
    const corps = [...d.entries()].map(([k, v]) => `${k} : ${v}`).join("\n");
    location.href = `mailto:${EMAIL_PRO}?subject=${encodeURIComponent("Demande professionnelle – " + (d.get("Société") || ""))}&body=${encodeURIComponent(corps)}`;
    $("#pro-msg").textContent = "Votre logiciel de messagerie va s'ouvrir pour envoyer la demande.";
  });
}

/* ---------- Mouvement ---------- */
const fineMotion = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fond animé : shader WebGL de vapeur (bruit fractal), réactif à la souris et au défilement */
function initBackground() {
  const canvas = document.createElement("canvas"); canvas.id = "bg";
  const grain = document.createElement("div"); grain.className = "grain";
  document.body.prepend(grain); document.body.prepend(canvas);
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" });
  if (!gl) { canvas.remove(); const f = document.createElement("div"); f.className = "bg-fallback"; document.body.prepend(f); return; }

  const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const FS = `precision mediump float;
uniform float uTime;uniform vec2 uRes;uniform vec2 uMouse;uniform float uScroll;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);
 float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
 return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
 for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=0.5;}return v;}
void main(){
 vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;
 uv.y+=uScroll*0.15;
 float t=uTime*0.05;
 vec2 m=(uMouse-0.5)*0.35;
 vec2 q=vec2(fbm(uv+t+m*0.5),fbm(uv+vec2(5.2,1.3)-t*0.7));
 vec2 r=vec2(fbm(uv+3.0*q+vec2(1.7,9.2)+t*0.6+m),fbm(uv+3.0*q+vec2(8.3,2.8)-t*0.4));
 float f=fbm(uv+2.5*r);
 vec3 deep=vec3(0.027,0.043,0.078);
 vec3 teal=vec3(0.06,0.55,0.52);
 vec3 blue=vec3(0.22,0.35,0.85);
 vec3 col=mix(deep,teal,smoothstep(0.35,0.95,f)*0.9);
 col=mix(col,blue,smoothstep(0.4,1.0,length(r))*0.5);
 float d=length(uv-m*0.5);
 col*=1.0-smoothstep(0.35,1.1,d)*0.75;
 col+=teal*0.35*exp(-d*3.0)*(0.6+0.4*sin(uTime*0.8));
 vec2 sp=floor(gl_FragCoord.xy/2.0);
 float s=step(0.9985,hash(sp))*(0.3+0.7*sin(uTime*1.5+hash(sp+1.0)*6.283));
 col+=s*vec3(0.7,0.9,1.0)*0.5;
 gl_FragColor=vec4(col,1.0);}`;

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(prog, n);
  const uTime = U("uTime"), uRes = U("uRes"), uMouse = U("uMouse"), uScroll = U("uScroll");

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scale = (window.innerWidth < 800 ? 0.4 : 0.5) * Math.min(window.devicePixelRatio || 1, 1.5);
  const resize = () => { canvas.width = Math.max(1, Math.round(window.innerWidth * scale)); canvas.height = Math.max(1, Math.round(window.innerHeight * scale)); gl.viewport(0, 0, canvas.width, canvas.height); };
  resize(); window.addEventListener("resize", resize);

  let mx = .5, my = .5, tx = .5, ty = .5;
  window.addEventListener("pointermove", (e) => { tx = e.clientX / window.innerWidth; ty = 1 - e.clientY / window.innerHeight; }, { passive: true });

  const t0 = performance.now();
  const frame = () => {
    if (!document.hidden) {
      mx += (tx - mx) * .04; my += (ty - my) * .04;
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uScroll, window.scrollY / window.innerHeight);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    if (!reduce) requestAnimationFrame(frame);
  };
  frame();
}

/* Apparition au défilement : tague automatiquement les blocs, y compris ceux injectés plus tard */
function initReveal() {
  const SEL = ".section-head, .card, .post, .cat-tile, .feature, .trust-item, .why-list li, .faq details, .info-box, .newsletter, .why > div, .pdp > div, .pro-grid > div, .legal > *, .stat";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
  const tag = () => {
    $$(SEL).forEach((el) => {
      if (el.hasAttribute("data-reveal") || el.closest(".tab-panel, .drawer, .age-gate")) return;
      el.setAttribute("data-reveal", "");
      const sib = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
      el.style.setProperty("--d", `${(sib.indexOf(el) % 8) * 70}ms`);
      if (reduce) el.classList.add("in"); else io.observe(el);
    });
  };
  tag();
  let timer;
  new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(tag, 30); }).observe(document.body, { childList: true, subtree: true });
}

/* Inclinaison 3D + halo lumineux qui suit la souris sur les cartes */
function initTilt() {
  if (!fineMotion()) return;
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest(".card, .cat-tile, .feature, .post");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(1200px) rotateY(${(x - .5) * 5}deg) rotateX(${(.5 - y) * 5}deg) translateY(-6px)`;
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest(".card, .cat-tile, .feature, .post");
    if (el && !el.contains(e.relatedTarget)) el.style.transform = "";
  });
}

function initHeaderScroll() {
  const h = $(".site-header");
  const upd = () => h.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", upd, { passive: true }); upd();
}

/* ---------- Démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const icon = document.createElement("link"); icon.rel = "icon";
  icon.href = "data:image/svg+xml," + encodeURIComponent(LOGO.replace('class="logo-mark" ', 'xmlns="http://www.w3.org/2000/svg" '));
  document.head.append(icon);
  initBackground();
  renderHeader();
  renderFooter();
  initNav();
  initPanier();
  initRecherche();
  ageGate();
  initHeaderScroll();
  initReveal();
  initTilt();
  const page = document.body.dataset.page;
  if (page === "accueil") initAccueil();
  if (page === "produits") initCatalogue();
  if (page === "fiche") initFiche();
  if (page === "pro") initPro();
  if (page === "livraison") initLivraison();
  const faqMail = $("#faq-mail"); if (faqMail) faqMail.href = `mailto:${EMAIL_CONTACT}`;
});
