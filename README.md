# Nébule — revendeur de cigarettes électroniques JNR

Site statique (HTML + CSS + JS, sans build), structure inspirée de jnrvapor.com, textes originaux en français.
Catalogue (24 produits, 73 variantes) : puffs JNR (Lion King, Falcon, Falcon Bar, Falcon-X, Falcon Pro, Mega Box, Mega Box Pro, Blazt, Bykux, HexaFuse 6-in-1, Quads 4-in-1, Shisha Ultra, Alien), kits rechargeables (AeroX, Stellarc, Falcon Mini, Lila Kiss⁺, ZPluse 42K+, ShishaSip 35K, pod rapace 25 W, pod écran tactile) et e-liquides (Cigusto ×4, Fruitéo Exotique, JNR 10 ml ×4) avec une rangée « Tous les goûts » sur l’accueil.

> ⚠️ **Marché** : les puffs jetables sont interdites à la vente en **France** (février 2025) et en **Belgique** (janvier 2025).
> Le site indique partout « pas de livraison en France ni en Belgique ». Le pays de vente reste **à préciser** (pied de page, CGV).

## Pages

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : carrousel, bande défilante, produits phares, gammes, collection + infos légales, à propos, guides, actualités, newsletter |
| `produits.html?cat=…` | Catalogue filtrable (`lion-king`, `falcon`, `mega-box`, `ecran`, `reservoir`, `kits-pods`, `shisha`, `alien`, `e-liquides`) |
| `produit.html?id=…&v=…` | Fiche produit (`v` présélectionne la saveur) : choix saveur/finition (la photo change), quantité, caractéristiques |
| `faq.html` | Questions fréquentes (choix, utilisation, recyclage, livraison) |
| `professionnels.html` | Espace pro + formulaire (ouvre le client mail) |
| `mentions-legales.html` | Mentions légales, CGV, livraison, confidentialité — **à compléter** (champs surlignés) |

## Images

`img/` contient une photo détourée par variante, en **WebP** qualité 92, 900 px de haut (3,7 Mo au total). Les photos plus petites que 900 px sont agrandies en Lanczos avec accentuation : pour une netteté parfaite, fournir des photos d’au moins 900 px de haut, découpée depuis le montage fourni
(`Desktop/phopto puff/`, 8 images à fond transparent ; les halos lumineux sont retirés au découpage).
`hero-collection.png` est le montage complet.

Pour ajouter une variante : convertir la photo en WebP (hauteur ~900 px), la déposer dans `img/`, puis l'ajouter dans `variantes` du produit (`script.js`).

## À compléter dans `script.js`

- **Prix** : puffs jetables **9,99 €** (produits marqués `puff: true`), e-liquides **2 €**, **puff mystère 2 €**. Kits rechargeables **9,99 €**.
- **Offre « 1 puff achetée = 1 puff offerte au choix »** : calculée dans le panier par `calculOffre()` sur les produits `puff: true` (une puff sur deux offerte, les moins chères d’abord). Exclus : puff mystère, kits rechargeables, e-liquides. Bandeau en haut du site, pastille sur les cartes, rappel sur les fiches, page `produits.html?offre=puffs` pour choisir la puff offerte.
- **Puff mystère** (`id: "puff-mystere"`) : sa fiche liste automatiquement tous les produits `puff: true`. Ajouter `puff: true` à une nouvelle puff l’ajoute au tirage. Le tirage lui-même se fait à la préparation de la commande.
- **`specsDeBase()`** : nombre de bouffées, nicotine, contenance, batterie → affichés « À confirmer » (surlignés) tant qu'ils ne sont pas renseignés.
- Modèles **identifiés** (septembre 2026) : « Octopus » = **HexaFuse 6-in-1 120K**, « Cordon » = **ShishaSip 35K**.
- **Fiches techniques** complétées depuis jnrvapor.com (Lion King 42K, Falcon 16K, Falcon-X 18K, Blazt 44K, Bykux 59K, Mega Box 25K, ZPluse 42K+, HexaFuse, ShishaSip) et cigusto.com (Cigusto Classic et Fruitéo Exotique : 50 ml, 0 mg, 50/50, France).
- **Noms provisoires** (modèles absents de jnrvapor.com) : « JNR Pod rapace 25 W » et « JNR Pod écran tactile ».
- **AeroX vert** non ajouté : sur la photo fournie, il est en partie caché par l’AeroX violet.
- **Encore inconnu** : nicotine de l’Alien et de la Falcon Pro, saveurs des Shisha Ultra rose et bleue, des Falcon Pro argent et rouge, des Stellarc et AeroX, specs du pod rapace 25 W et du pod écran tactile ; nicotine du Bykux, saveur de la Mega Box à façade rose, saveurs du ShishaSip. Mega Box : sur les visuels JNR, la façade or à tranche bleue est associée à un dos bleu « Blueberry… », **à vérifier** face à la correspondance « Strawberry Raspberry Ice ».
- **Saveurs par couleur** (vérifiées sur les tableaux officiels de jnrvapor.com, septembre 2026) :
  - Falcon Bar : bleu = Blue Razz Cherry, vert = Kiwi Watermelon Ice, orange = Passion Fruit Kiwi.
  - Mega Box Pro : or = Mixed Berry, bronze = Passion Fruit Kiwi, graphite = Love 66, argent à tranche bleue = Blue Razz Ice / Blue Razz Cherry (très proches : **à vérifier** sur le produit).
  - Mega Box : façade or = Strawberry Banana, façade or à tranche bleue = Strawberry Raspberry Ice ; façade rose **à confirmer**. Les photos de dos `mega-box-strawberry-banana.webp` et `mega-box-strawberry-raspberry-ice.webp` ne sont plus utilisées.
  - ZPluse 42K+ (ex-« JNR Réservoir ») : loup = Mixed Berries, tigre = Mango Passion Fruit (+ e-liquide Watermelon Mango Peach), gorille = Mixed Berries (+ e-liquide Peach Berry).
  - Falcon-X (ex-« JNR Écran 100 % ») : saveur imprimée sur chaque visuel.
- `MARQUE`, `EMAIL_CONTACT`, `EMAIL_PRO` en tête de fichier.

## Fonctionnement

- Recherche instantanée : loupe de l’en-tête, touche `/` ou `Ctrl+K`, flèches + Entrée (modèles, goûts, gammes).
- Catalogue : recherche (`?q=`) et tri par prix ou par nom.
- Cartes : pastilles des variantes (clic ou survol) qui changent photo, liens et variante ajoutée au panier.
- Fiche : vignettes photo des variantes, zoom au survol, barre d’achat collante sur mobile, URL mise à jour avec la variante.
- Ajout au panier : la photo s’envole vers l’icône panier.

- Fond animé : shader WebGL (`initBackground()`), dégradé CSS de secours, respect de `prefers-reduced-motion`.
- Animations : apparition au scroll, inclinaison 3D des cartes, parallaxe du produit dans le hero.
- Panier : `localStorage` (`nebule-panier`). « Passer commande » est un placeholder (brancher Shopify ou Stripe).
- Vérification d'âge : `localStorage` (`nebule-majeur`), 18 ans (à passer à 21 si le pays l'exige).

## Lancer en local

```bash
npx -y serve -l 8768 .
```

`serve.json` désactive les « clean URLs » pour conserver `produit.html?id=…`.
