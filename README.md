# Lancer la routine

Petite page web : on saisit un sujet, on clique sur **Lancer**, et une routine Claude Code est déclenchée avec ce sujet.

En ligne : https://lancer-routine.vercel.app

## Fonctionnement

```
Navigateur ──POST /api/lancer──▶ Fonction Vercel ──POST + jeton──▶ Routine Claude
 (index.html)                    (api/lancer.js)
```

- `index.html` : le champ « Sujet » et le bouton. La page ne contient aucun secret.
- `api/lancer.js` : le relais. Il lit l'URL et le jeton de la routine dans les variables d'environnement, puis appelle la routine. Le jeton ne quitte jamais le serveur.

## Variables d'environnement

À définir dans Vercel (projet `lancer-routine` → **Settings → Environment Variables**), pour l'environnement **Production** :

| Variable | Contenu |
|---|---|
| `ROUTINE_URL` | L'URL de déclenchement de la routine |
| `ROUTINE_TOKEN` | Le jeton de la routine (type **Secret**) |

Ne jamais écrire ces valeurs dans le code, dans le dépôt ou dans un chat.

Une variable modifiée n'est prise en compte qu'au déploiement suivant : après un changement, faire **Deployments → … → Redeploy**.

## Déploiement

Le dépôt GitHub `jbkrady/agent-guide-test` est connecté au projet Vercel : chaque `git push` sur `main` redéploie la production.

## Utilisation

Ouvrir https://lancer-routine.vercel.app dans un navigateur classique, saisir un sujet, cliquer sur **Lancer**. En cas de succès, la page affiche « Routine lancée. » et un lien **Ouvrir la session**.

Messages d'erreur possibles :

| Message | Cause probable |
|---|---|
| Routine non configurée côté serveur | Variables absentes ou pas encore redéployées |
| La routine a répondu 401 / 403 | Jeton refusé |
| La routine a répondu 404 | URL de la routine incorrecte |
| Failed to fetch | Requête bloquée côté navigateur (voir ci-dessous) |

## Limites connues

- La page ne fonctionne pas ouverte en local (`file://`) : l'adresse `/api/lancer` n'existe que sur le site déployé.
- Le navigateur intégré à Claude Code bloque les requêtes vers `/api/lancer` (`ERR_BLOCKED_BY_CLIENT`). Utiliser Safari, Chrome ou Firefox.
- Le relais envoie l'en-tête `anthropic-beta: experimental-cc-routine-2026-04-01`, propre au déclencheur par API des routines. S'il change, le modifier dans `api/lancer.js`.
