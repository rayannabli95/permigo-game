# ROADMAP.md — Plan de bataille V1 → V3

## 🚀 V1 — MVP "Triple Validation" (3-4 semaines)

**Objectif** : un produit utilisable en beta par 3-5 auto-écoles.

### Sprint 1 (semaine 1) — Foundation

- [ ] Clone composants réutilisables depuis permigo-v7 (auth, toast, modal, esc, mesh-bg)
- [ ] Setup Vite + Supabase + Vercel
- [ ] Schema DB initial (migrations supabase)
- [ ] 31 compétences REMC en seed
- [ ] Tracking analytics events_analytics
- [ ] Login + logout fonctionnel
- [ ] Routing simple par rôle (élève / enseignant / gérant)

### Sprint 2 (semaine 2) — Module pédagogie (cœur)

- [ ] Table `validations` + RLS
- [ ] Table `quiz_attempts` + RLS
- [ ] Page Fiche élève (côté enseignant)
- [ ] Bouton "Valider compétence" (côté enseignant)
- [ ] Push notif quand validation
- [ ] Modal Quiz post-validation (3 questions)
- [ ] 30 questions de seed (8 compétences × ~4 questions)
- [ ] Calcul score cognitif + affichage côté élève + enseignant

### Sprint 3 (semaine 3) — Consolidation + Progression

- [ ] Edge function ou cron pour consolidation 48h
- [ ] Push notif "Petite vérif rapide ?"
- [ ] Modal Quiz consolidation (2 questions)
- [ ] Update score_consolidation
- [ ] Page Accueil élève (crédit + stats + prochaine action)
- [ ] Page Parcours REMC visuel (map 4 mondes)
- [ ] Système Streak (DB + UI + cron quotidien)
- [ ] XP simple (sans niveau pour V1)

### Sprint 4 (semaine 4) — Gérant + polish

- [ ] Dashboard "Pulse école" (4 KPI)
- [ ] Calcul des KPI côté DB (vue SQL ou RPC)
- [ ] Page Équipe (liste enseignants + ajout)
- [ ] Polish landing + déploiement Vercel
- [ ] Tests sur 3-5 comptes démo réalistes
- [ ] Documentation utilisateur basique

**Critère de sortie V1** : 3 auto-écoles testent et donnent un avis. Au moins 1 utilise quotidiennement.

---

## 🎨 V2 — Polish + Gamification complète (1-2 semaines)

**Objectif** : produit vendable à 19€/mois.

### Features

- [ ] Trophées (4 trophées + 1 trophée final)
- [ ] Animation reveal trophy (déjà codée dans permigo-v7)
- [ ] Gemmes (système gain/dépense)
- [ ] Boutique avatars (8 avatars dont 4 payants)
- [ ] Sons (5 sons : ding, streak, reveal, tap, whoosh)
- [ ] Examens blancs (3 examens disponibles, 40 questions chacun)
- [ ] 120 questions complètes (31 comp × 4)
- [ ] Notifications smart (timing + messages contextuels)
- [ ] Page profil élève + édition avatar

### Marketing-ready

- [ ] OG image + meta SEO
- [ ] Page publique auto-école (`permigo.app/<slug>`)
- [ ] Témoignages élèves intégrés
- [ ] Sticker "Certifié PermiGo" téléchargeable
- [ ] QR code auto-école

**Critère de sortie V2** : NPS élève > 70. 10 auto-écoles clients à 19€/mois.

---

## 📈 V3 — Croissance & viralité (1-2 mois)

**Objectif** : 50+ auto-écoles, début de viralité.

### Engagement

- [ ] Leagues (Bronze → Diamant) + classement hebdo
- [ ] Top 10 école + Top 100 national (anonymisé)
- [ ] Quêtes journalières
- [ ] Coffres / loot boxes
- [ ] Streak protection (50 gemmes pour geler 1 jour)

### Acquisition

- [ ] Programme parrainage (élève → ami + école → école)
- [ ] Stratégie TikTok organique (vidéos cas d'usage)
- [ ] Partenariats moniteurs influenceurs (Boris Permis, etc.)
- [ ] Cas clients vidéos (3 témoignages d'écoles)

### Pédagogie avancée

- [ ] Mémoire espacée intelligente (algorithme Anki simplifié)
- [ ] Recommandations IA "Qu'est-ce que je dois réviser ?"
- [ ] Stats avancées élève (point fort, point faible, etc.)
- [ ] Examens blancs adaptatifs (difficulté ajustée)

### Vue gérant

- [ ] Export CSV élèves
- [ ] Statistiques avancées (rétention, abandons, etc.)
- [ ] Benchmark vs auto-écoles similaires (anonyme)
- [ ] Programme de fidélité élève

**Critère de sortie V3** : 100 auto-écoles. Modèle commercial validé.

---

## 🔮 V4+ — Long terme (1 an+)

- App mobile native (PWA → iOS/Android via Capacitor)
- Extension à d'autres permis (A, A2, BSR, Permis bateau)
- Module "PostPermis" (révision conduite, perfectionnement)
- Marketplace pédagogique (cours vidéo, ebooks)
- Partenariats institutionnels (sécurité routière, mutuelles)
- B2C pur (élève autonome 4.99€/mois)
- API publique pour intégrateurs

---

## ❌ Hors scope (ce qu'on NE FAIT PAS)

| Feature | Pourquoi non |
|---|---|
| Système de paiement intégré | Casse-tête juridique + non aligné avec la mission |
| Planning enseignants avec créneaux | Complexifie + l'école a déjà ses outils |
| Réservation autonome élève | Idem, pas notre métier |
| Gestion comptable | Cible Logipermis, on ne se positionne pas là |
| Contenu code de la route complet | Cible Codes Rousseau, on est complémentaire |
| Auto-école en ligne | Cible Ornikar, on est l'inverse (renforce l'école physique) |
| Système d'examen pratique | Domaine de l'État, on ne touche pas |
| Donner un permis virtuel | Légal seulement via État |

---

## 🎯 Priorités absolues

### Top 3 features pour V1
1. **Quiz post-validation** (la magie pédagogique unique)
2. **Streak quotidien** (la mécanique d'addiction utile)
3. **Pulse école** (la donnée que le gérant ne peut pas ignorer)

### Le reste = nice to have, peut attendre

---

## 📅 Calendrier idéal

| Mois | Étape | Objectif |
|---|---|---|
| **M+0 à M+1** | V1 dev | Code MVP fonctionnel |
| **M+1 à M+3** | Beta privée 3-5 écoles | Premiers feedbacks + témoignages |
| **M+3 à M+4** | V2 dev | Polish + gamification |
| **M+4 à M+6** | Lancement public | 10-20 écoles payantes |
| **M+6 à M+12** | V3 + croissance | 50-100 écoles, viralité |

---

## 🛑 Quand reconsidérer la roadmap

Tu DOIS appeler l'utilisateur si :
- Une feature V1 prend > 5 jours (trop complexe)
- Un retour utilisateur invalide une assumption majeure
- Un concurrent sort un truc identique
- Un nouveau insight pédagogique change la donne

Sinon, on suit le plan.
