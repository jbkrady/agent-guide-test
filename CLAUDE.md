# CLAUDE.md

Page web « Lancer la routine » : un champ « Sujet » et un bouton qui déclenchent une routine Claude Code via un relais Vercel. Voir [README.md](README.md) pour la présentation générale.

## Structure

- `index.html` : page unique, HTML + CSS + JS inline, sans dépendance ni build.
- `api/lancer.js` : fonction Vercel (Node, ESM). Seul endroit qui connaît l'URL et le jeton de la routine.
- Pas de `package.json`, pas de `vercel.json` : Vercel détecte tout seul (aucun framework).

## Règles à respecter

- **Le jeton ne doit jamais apparaître** dans le code, le dépôt, la page, un commit, un log ou le chat. Il vit uniquement dans la variable Vercel `ROUTINE_TOKEN`. Ne jamais le demander ni le saisir à la place de l'utilisateur : c'est à lui de le renseigner dans Vercel.
- `ROUTINE_URL` et `ROUTINE_TOKEN` sont lues via `process.env` dans `api/lancer.js`. Ne pas les exposer côté page (pas de `NEXT_PUBLIC_`, pas d'injection dans le HTML).
- **Ne pas tester en cliquant sur « Lancer » ou en envoyant un POST à `/api/lancer`** sans l'accord de l'utilisateur : cela déclenche vraiment la routine. Pour vérifier que le relais répond, un GET suffit (réponse attendue : 405).
- Ne pas ajouter de fichier `.env*` au dépôt (déjà dans `.gitignore`, ainsi que `.vercel`).
- Messages destinés à l'utilisateur en français, accents compris.

## Relais `api/lancer.js`

- POST uniquement (405 sinon). Corps attendu : `{ "sujet": "<texte, 500 caractères max>" }`.
- Appelle `ROUTINE_URL` avec `Authorization: Bearer <ROUTINE_TOKEN>`, `anthropic-version: 2023-06-01`, `anthropic-beta: experimental-cc-routine-2026-04-01`, corps `{ "text": sujet }`.
- Réponses : `200 { ok, url }` (`url` = `claude_code_session_url`), `400` sujet invalide, `405`, `500` variables absentes, `502` routine en erreur ou injoignable.
- L'en-tête `anthropic-beta` est celui du déclencheur par API des routines : s'il change, c'est ici qu'il faut le mettre à jour.
- Les messages d'erreur renvoyés (`erreur`) sont affichés tels quels par la page : rester lisible, ne jamais y mettre de détail sensible.

## Page `index.html`

- Appelle `fetch('/api/lancer')` en adresse relative : elle ne fonctionne donc que servie par Vercel, pas en `file://`.
- Design : variante « 2A — Wash » du projet Claude Design « Lancer la routine » (grand titre, dégradé rose en haut, carte centrale avec champ, idées de sujets, « Comment ça marche »). Thème clair uniquement, comme dans la maquette. JavaScript pur inline, aucune police ni bibliothèque externe.
- Les états (envoi, lancée, erreur avec « Réessayer ») sont rendus dans `#statut`, construits avec le DOM (`createElement`, `textContent`), jamais avec `innerHTML`. Le lien « Suivre le travail » n'est créé que si l'adresse de session commence par `https://`. Garder cette approche.
- En cas d'erreur, le message technique renvoyé par le relais est affiché en petit sous le texte du design : utile pour diagnostiquer (401, 404, « non configurée »).
- Les fichiers `image-slot.js` et `support.js` du projet de design sont le moteur de l'outil de maquette : ne pas les copier dans le site.

## Vercel

- Compte : Hobby personnel `jeanbaptistekrady-9091` (pas d'équipe).
- Projet : `lancer-routine`, id `prj_jyWf286ZLCRGcnmlNV5ARwg5TAz3`.
- Production : https://lancer-routine.vercel.app
- Variables d'environnement (Production) : `ROUTINE_URL` et `ROUTINE_TOKEN` (type Secret), à modifier dans Settings → Environment Variables. Une variable modifiée ne s'applique qu'après un redéploiement.
- Le dépôt GitHub `jbkrady/agent-guide-test` est connecté : un push sur `main` redéploie la production.
- La CLI `vercel` n'est pas connectée sur cette machine (`vercel login` demande une session interactive). Pour déployer sans push : passer par l'intégration Vercel de l'application (redéploiement d'un déploiement existant) ou par le tableau de bord (Deployments → … → Redeploy).
- Ne pas créer d'environnement personnalisé (Settings → Environments) : payant et inutile ici.

## Git

- Branche unique : `main`, remote `origin` = `git@github.com:jbkrady/agent-guide-test.git`.
- Messages de commit en français, à la forme impérative courte.
- Le chemin local contient un espace (`Noé /agent-guide-test`) : toujours mettre le chemin entre guillemets dans les commandes shell.

## Limites connues

- Le navigateur intégré à l'application Claude Code bloque les requêtes vers `/api/lancer` (`net::ERR_BLOCKED_BY_CLIENT`), d'où « Failed to fetch » dans cet aperçu. Ce n'est pas un bug du site : tester dans Safari, Chrome ou Firefox.
- Le tableau de bord Vercel peut afficher « No Production Deployment » un court instant alors que le déploiement est prêt ; recharger la page.
- Aucun test automatisé ni CI : la vérification est manuelle (page en ligne + GET sur `/api/lancer` pour le relais).
