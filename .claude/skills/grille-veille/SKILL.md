---
name: grille-veille
description: Cherche, trie, résume et note des articles d'actualité. À utiliser dès qu'on demande une veille, une revue de presse ou un tri d'articles, même sans nommer la grille.
---

# Grille de veille

## Entrée

Deux cas possibles :
- **Articles fournis** (liens, textes ou extraits) : passer directement au traitement.
- **Sujet seul** (« fais une veille sur X ») : commencer par la collecte.

Pour chaque article, il faut au minimum : le titre, la source et la date de publication.

**Fenêtre de temps** : 7 jours par défaut, sauf si l'utilisateur précise une autre période (« 10 jours », « le mois »). Dans tout ce qui suit, « la fenêtre » désigne cette période.

## Collecte (si aucun article n'est fourni)

- Lancer 3 à 4 recherches variées : actualité générale, régulateurs ou institutions, presse spécialisée, langue de l'utilisateur.
- Citer la date du jour et la fenêtre dans les requêtes.
- Ne jamais retenir une date lue dans le résumé d'une recherche : elle peut être fausse. La vérifier sur la page de l'article (étape 2).

## Traitement, article par article

### 1. Écarter si la source n'est pas fiable

Sont fiables : les médias reconnus, les publications scientifiques ou institutionnelles, les communiqués et blogs officiels des acteurs concernés (à signaler comme « source de l'acteur lui-même »).

Sont écartés : les sources anonymes, les agrégateurs et republications (remonter à la source d'origine et l'utiliser à la place), les réseaux sociaux et forums sauf compte officiel de l'organisation concernée. En cas de doute réel, écarter.

### 2. Vérifier la date, écarter si hors fenêtre

- Lire la date sur la page de l'article, pas dans un résumé de recherche.
- Hors fenêtre ou date introuvable : écarter.
- **Dater l'événement, pas seulement l'article** : si l'article est un récapitulatif ou une newsletter qui commente un fait plus ancien, il reste éligible, mais le résumé doit le signaler (« document publié le… »).

### 3. Écarter si l'article n'est pas lisible

Si l'article est payant, bloqué ou inaccessible, ne jamais le résumer d'après son seul titre. L'écarter et le compter à part dans le bilan, sous « non vérifiables ».

### 4. Résumer en 2 phrases sans jargon

- Exactement 2 phrases : ce qui s'est passé, puis pourquoi c'est important ou ce que cela change.
- **Un seul fait par résumé.** Si l'article en contient plusieurs (revue de presse, newsletter), garder le plus important pour l'utilisateur.
- Aucun jargon, sigle non expliqué ni anglicisme évitable. Un lecteur qui ne connaît pas le sujet doit comprendre.

### 5. Noter l'impact de 1 à 3

- **3 — fort** : une échéance, une décision ou un changement de règle touche l'utilisateur dans les 30 jours ; demande une réaction rapide.
- **2 — moyen** : nouveauté factuelle à connaître, qui peut influencer une décision à venir, sans échéance proche.
- **1 — faible** : opinion, analyse de fond ou contexte sans nouveauté factuelle ; utile pour la culture générale.

Noter selon l'effet pour l'utilisateur, pas selon le bruit médiatique. Si le contexte de l'utilisateur est connu (métier, projet), s'en servir ; sinon, indiquer quand la note changerait selon son profil.

## Sortie

- **5 articles maximum**, triés par impact décroissant (3 puis 2 puis 1).
- **Départage des ex æquo** : d'abord l'article à échéance la plus proche, puis le plus récent.
- S'il y a plus de 5 articles retenus, garder les 5 premiers du classement.
- Format de chaque entrée, avec un exemple (fictif) :

```
### [Titre de l'article](lien)
Source · date · **Impact : N/3**
Phrase 1. Phrase 2.
```

```
### [Un régulateur ouvre une consultation sur les logiciels d'aide au diagnostic](https://exemple.org/article)
Agence du médicament (source de l'acteur lui-même) · 15/09/2026 · **Impact : 3/3**
L'agence demande l'avis des fabricants sur de nouvelles règles pour les logiciels qui aident à poser un diagnostic. Les réponses sont attendues avant le 10 octobre, faute de quoi leur avis ne sera pas pris en compte.
```

- Terminer par un bilan : « X articles examinés, Y écartés (hors fenêtre : a, source douteuse : b, non vérifiables : c), Z retenus », en citant brièvement les écartés notables.
- S'il y a moins de 5 articles retenus, le dire et ne pas compléter avec des articles écartés. Proposer d'élargir la fenêtre (par exemple à 10 jours) en citant l'article écarté le plus proche du seuil et sa date.
- Si aucun article ne passe les filtres, le dire clairement.
