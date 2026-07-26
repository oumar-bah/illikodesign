# PRD — Illiko Design (Site vitrine premium)

## Problème / Demande initiale
Site web premium, 100% en français, pour une entreprise d'imprimerie & communication
visuelle « Illiko Design ». Palette luxe noir / or / blanc, typographie élégante,
animations fluides, UI/UX moderne, niveau « world-class / Awwwards ».
Site vitrine uniquement (frontend), formulaire de contact/devis sans envoi email (pas de SendGrid),
coordonnées fictives, images générées par IA.

## Architecture
- Frontend React (CRA + craco), Tailwind, shadcn/ui.
- Motion : framer-motion (reveals, hero masqué, compteurs), lenis (smooth scroll), react-fast-marquee.
- Typo : Playfair Display (titres) + Manrope (corps) + Cinzel (logo).
- One-page avec ancres. Aucun backend utilisé pour les features (vitrine).
- Contenu centralisé dans `src/data/site.js`. Composants dans `src/components/site/`.
- Images IA hébergées (hero, 6 services, portfolio, atelier) — sans texte anglais.

## Personas
- Dirigeants d'entreprises / restaurateurs / commerces cherchant enseignes, impression, textile, goodies.
- Particuliers pour projets sur mesure.

## Réalisé (26/07/2026)
- Navbar sticky (blur), menu mobile, CTA devis.
- Hero kinétique : image parallax + révélation ligne par ligne + CTAs.
- Sections FR : À propos (manifeste), Nos Services (bento 6 pôles + marquee 32 prestations),
  Nos Réalisations (galerie), Pourquoi nous (stats animées + atouts), Témoignages (marquee),
  Demande de devis (formulaire + upload + toast succès), FAQ (accordéon), Contact (infos + Google Maps).
- Boutons flottants WhatsApp + appel + retour haut. Liens réseaux sociaux. SEO meta FR.
- Vérifié : desktop + mobile + tablette, formulaire devis (état succès + toast), scroll.

## Backlog / Prochaines étapes (P1/P2)
- Remplacer les coordonnées fictives par les vraies (tel/WhatsApp, email, adresse Maps, réseaux).
- Optionnel : brancher le formulaire à un backend (stockage devis + upload fichiers) ou email (Resend).
- Optionnel : page dédiée par service, blog, multilingue.

## Notes
- Aucune authentification. Formulaire devis = front-only (validation + toast), AUCUN envoi réel.
