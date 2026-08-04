# ECAKOOG (Entreprise Coopérative Agricole Koognagnan De Grogouya)

Bienvenue dans le dépôt du site internet officiel d'**ECAKOOG**, une entreprise coopérative de la filière café-cacao engagée dans une agriculture durable et l'amélioration des conditions de vie des producteurs en Côte d'Ivoire.

Ce site web présente les activités d'ECAKOOG, son organisation, ses services (achat, collecte, exportation et transformation), ainsi que son programme phare de durabilité **Koognagnan Cacao**.

---

## 📌 Présentation de la Coopérative

Fondée le **14 juillet 2012** à **Grogouya** (région de Lakota), **ECAKOOG COOP-CA** est devenue une actrice majeure de la filière café-cacao en Côte d'Ivoire, obtenant son statut d'exportatrice en octobre 2020.

### Chiffres Clés :
*   **Membres :** Plus de **10 500 producteurs** (principalement répartis dans les régions de Lakota et Gagnoa).
*   **Organisation :** **86 sections** locales, 7 succursales (Gagnoa, Tiassalé, Toulepleu, Zouan-Hounien, Biankouma, Lakota et Divo).
*   **Production :** Capacité estimée à **20 000 tonnes** sur une superficie globale de **22 076,81 hectares**.
*   **Ressources Humaines :** **85 employés** permanents.
*   **Gouvernance :** Dirigée par la Directrice Générale **Ginette Kouamé** et présidée par le PCA **Ousmane Traoré**.

---

## 🌟 Le Programme "Koognagnan Cacao"

Validé par le Conseil du Café-Cacao en 2020, le programme interne de durabilité d'ECAKOOG s'articule autour de **5 piliers fondamentaux** :
1.  **Production de cacao "Fine Saveur" :** Fèves de spécialité avec un processus post-récolte strict, torréfiées et décortiquées à la main par des associations de femmes de producteurs formées par le chocolatier Axel Emmanuel.
2.  **Intrants Biologiques :** Utilisation d'engrais et biopesticides organiques produits localement dans la bio-fabrique de la coopérative pour préserver les sols.
3.  **Inclusion financière & Bancarisation :** Plus de 1 500 producteurs bancarisés, avec pour objectif 100% d'ici 2027.
4.  **Agroforesterie :** Association de cacaoyers avec des essences forestières et fruitières pour lutter contre la déforestation et diversifier les revenus.
5.  **Promotion du Genre & Droits de l'Enfant :** Plus de 55 groupements d'Activités Génératrices de Revenus (AGR), 100+ Associations Villageoises d'Épargne et de Crédit (AVEC) et lutte active contre le travail des enfants.

---

## 🛠️ Architecture Technique

Le site est conçu sur une architecture **Vanilla HTML5 / CSS3 / JavaScript (ES6)** moderne, performante et sans frameworks lourds (pas de React ni de Vue), conformément aux règles définies dans le projet.

### Caractéristiques principales :
1.  **Moteur d'Internationalisation (i18n) Vanilla :**
    *   Fichiers dictionnaires JSON situés dans [js/lang/](file:///C:/Users/USER/Desktop/ecakoog/js/lang).
    *   Gestionnaire dynamique dans [js/i18n.js](file:///C:/Users/USER/Desktop/ecakoog/js/i18n.js) traduisant les attributs `data-i18n`, `data-i18n-html` et `data-i18n-attr`.
    *   Sélection de la langue (Français par défaut, Anglais) avec mémorisation dans le `localStorage`.
2.  **Composants Dynamiques :**
    *   Les éléments globaux (Header, Footer, Sidebar) sont factorisés dans le dossier [components/](file:///C:/Users/USER/Desktop/ecakoog/components).
    *   Ils sont injectés dynamiquement à l'aide de [js/components.js](file:///C:/Users/USER/Desktop/ecakoog/js/components.js) qui calcule automatiquement les préfixes de chemin relatifs (`{{ROOT}}`) selon la profondeur des pages.
3.  **Styles CSS Structurés (Domain-Driven) :**
    *   Le fichier global [css/style.css](file:///C:/Users/USER/Desktop/ecakoog/css/style.css) gère la charte graphique, les variables CSS globales, la grille et le layout global.
    *   Les styles spécifiques de domaine sont isolés : `service.css`, `kognagnan.css`, `realisation.css`, `actu1.css`.
4.  **Effets & Intégrations :**
    *   Lightbox modal pour les galeries d'images (dans [js/script.js](file:///C:/Users/USER/Desktop/ecakoog/js/script.js)).
    *   Animations d'apparition au défilement (Scroll Reveal dans `script.js`).
    *   Carrousels de défilement pour les sections d'accueil (`script.js`).

---

## 📂 Structure du Code Source

```text
├── .cursorrules           # Règles spécifiques de codage pour l'IA
├── .gitignore             # Fichiers ignorés par Git
├── README.md              # Documentation du projet
├── a-propos.html          # Page "À Propos"
├── contact.html           # Page de contact
├── partenaires.html       # Page des partenaires
├── index.html             # Page d'accueil principale
├── gitlog.txt             # Journal des dernières modifications importantes
│
├── components/            # Composants HTML réutilisables
│   ├── header.html        # Barre de navigation supérieure
│   ├── footer.html        # Pied de page
│   └── sidebar-widget.html# Widget latéral d'aide et de contact
│
├── css/                   # Feuilles de style CSS
│   ├── style.css          # Styles globaux (layout, en-tête, variables, etc.)
│   ├── a-propos.css       # Styles pour la page À Propos
│   ├── actualites.css     # Styles généraux pour la section Actualités
│   ├── actu1.css          # Styles spécifiques pour les articles d'actualités
│   ├── contact.css        # Styles pour la page Contact
│   ├── kognagnan.css      # Styles pour la section durabilité Koognagnan Cacao
│   ├── service.css        # Styles pour les pages de services
│   └── realisation.css    # Styles pour les pages de réalisations
│
├── js/                    # Fichiers JavaScript
│   ├── script.js          # Script principal (Lightbox, scroll, animations)
│   ├── components.js      # Chargement et injection des composants HTML
│   ├── i18n.js            # Moteur de traduction multilingue
│   └── lang/              # Dictionnaires de traduction
│       ├── fr.json        # Traductions françaises
│       └── en.json        # Traductions anglaises
│
├── services/              # Pages liées aux services et expertises
│   ├── index.html         # Landing page des services
│   ├── achat-collecte.html# Détail du service achat & collecte
│   ├── exportation.html   # Détail du service exportation
│   └── transformation.html# Détail de l'unité de transformation
│
├── kognagnan-cacao/       # Pages liées au programme Koognagnan Cacao
│   ├── index.html         # Présentation générale du programme
│   ├── agroforesterie.html# Pilier Agroforesterie
│   ├── bancarisation-assurance.html # Pilier Bancarisation & Assurance
│   ├── cacao-fine-saveur.html       # Pilier Cacao Fine Saveur
│   ├── intrants-biologiques.html    # Pilier Production d'intrants
│   └── promotion-genre.html         # Pilier Promotion du genre
│
├── realisations/          # Pages détaillant les projets communautaires
│   ├── index.html         # Index des réalisations
│   ├── chateaux-eau.html  # Construction de châteaux d'eau
│   ├── ecole-primaire.html# Construction d'écoles
│   └── kits-scolaires.html# Distribution de fournitures scolaires
│
├── actualites/            # Articles de blog et nouvelles
│   ├── index.html         # Index des actualités
│   ├── 10-ans-cemoi.html  # Article sur les 10 ans de Cemoi
│   ├── salon-mondial.html # Article sur le Salon du Chocolat
│   └── visite-rabo-fund.html # Article sur la visite de Rabo Foundation
│
└── assets/                # Images, logos et médias (organisés par domaine)
```

---

## 💻 Instructions de Développement & Standards

Pour conserver l'intégrité du projet, veuillez suivre scrupuleusement les règles du fichier [.cursorrules](file:///C:/Users/USER/Desktop/ecakoog/.cursorrules) :

1.  **Architecture CSS (Domain-Driven) :**
    *   Ne dupliquez pas le code CSS.
    *   Les variables de couleur, de typographie et les composants globaux doivent rester dans [css/style.css](file:///C:/Users/USER/Desktop/ecakoog/css/style.css).
    *   Les styles de pages spécifiques doivent être déclarés dans leurs fichiers de domaine respectifs (ex: `service.css` pour les pages du dossier `/services/`).
2.  **Nommage BEM :**
    *   Préfixez toujours les classes spécifiques avec le nom du domaine (ex. : `.kognagnan-card`, `.realisation-title`) pour éviter tout conflit global.
    *   N'utilisez jamais de classes génériques telles que `.sidebar` ou `.content` en dehors de la portée globale de `style.css`.
3.  **HTML Sémantique :**
    *   Structurez vos pages avec les balises HTML5 appropriées : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, et `<footer>`.
4.  **Format d'Images & Performance :**
    *   Utilisez **exclusivement le format `.webp`** pour toutes les photographies et images complexes afin de garantir des temps de chargement optimaux.
    *   Ajoutez l'attribut `loading="lazy"` sur les images situées sous la ligne de flottaison (viewport initial).
5.  **JavaScript Pur (Vanilla) :**
    *   N'utilisez aucune bibliothèque externe (comme jQuery).
    *   Déclarez les événements via `addEventListener` dans les fichiers `.js`. Les attributs HTML du type `onclick` sont strictement interdits.

---

## 🚀 Lancement Local

> [!IMPORTANT]
> En raison de l'utilisation de requêtes HTTP `fetch()` pour charger dynamiquement les composants HTML et les fichiers de traduction JSON, le site **ne fonctionnera pas** si vous ouvrez directement le fichier `index.html` dans votre navigateur (erreur de politique CORS).
>
> Vous devez obligatoirement servir le projet via un serveur HTTP local.

### Méthodes recommandées :

#### Option A : Extension VS Code "Live Server"
1. Ouvrez le dossier du projet dans VS Code.
2. Cliquez sur **Go Live** dans la barre d'état au bas de la fenêtre (ou clic droit sur `index.html` > *Open with Live Server*).

#### Option B : Serveur Python (intégré)
Si Python est installé sur votre machine, exécutez la commande suivante à la racine du projet :
```bash
python -m http.server 8000
```
Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`.

#### Option C : Serveur Node.js (npm/npx)
Si Node.js est installé, vous pouvez servir le projet sans installation permanente :
```bash
npx serve .
# Ou installez http-server globalement :
# npm install -g http-server
# http-server .
```

---

## 📝 Historique des Modifications Récentes

D'après le journal de développement du projet (`gitlog.txt`), les dernières interventions comprenaient :
*   `a2de10e` : Refonte de la barre latérale des réalisations en reprenant le contenu original avec le style de la barre latérale des services.
*   `74cd1bb` : Uniformisation des barres latérales des pages de réalisations en remplaçant la structure de la barre d'actualités par celle des services.
*   `f7c4208` : Correction du bug d'icônes d'accentuation tronquées sur les cartes de réalisations (`overflow: visible`).
*   `1394294` : Application de la modale Lightbox d'image sur les galeries de toutes les pages d'actualités.
*   `3e81330` : Implémentation initiale de la modale Lightbox d'image pour agrandir les photos lors d'un clic.