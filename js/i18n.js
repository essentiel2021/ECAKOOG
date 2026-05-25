/*
 * ECAKOOG - Moteur i18n (vanilla)
 * - Langue par défaut : fr (texte présent dans le HTML, fallback si JS absent).
 * - Traduit tout élément portant data-i18n="cle" (textContent).
 * - Traduit des attributs via data-i18n-attr="placeholder:cle;title:cle2".
 * - Bouton FR/EN : <button class="lang-btn" data-lang="en">EN</button>.
 * - Langue mémorisée dans localStorage('lang').
 *
 * Doit être chargé AVANT components.js pour que window.I18N existe
 * lorsque les composants (header/footer/sidebar) sont injectés.
 */
(function () {
    const SUPPORTED = ['fr', 'en'];
    const DEFAULT_LANG = 'fr';

    // Même logique de préfixe racine que components.js (pages en sous-dossier)
    const pathName = window.location.pathname;
    const isSubfolder = ['/services/', '/kognagnan-cacao/', '/realisations/', '/actualites/']
        .some(function (seg) { return pathName.includes(seg); });
    const rootPrefix = isSubfolder ? '../' : './';

    function getStoredLang() {
        const stored = localStorage.getItem('lang');
        return SUPPORTED.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;
    }

    const I18N = {
        lang: getStoredLang(),
        dict: {},
        ready: Promise.resolve()
    };

    function loadDict(lang) {
        return fetch(rootPrefix + 'js/lang/' + lang + '.json')
            .then(function (r) { return r.ok ? r.json() : {}; })
            .then(function (data) { I18N.dict = data || {}; })
            .catch(function () { I18N.dict = {}; });
    }

    function translateEl(el) {
        const key = el.getAttribute('data-i18n');
        if (key && I18N.dict[key] != null) {
            el.textContent = I18N.dict[key];
        }
        // Texte riche (conserve les balises, ex. <strong>) : valeur HTML dans le dico
        const htmlKey = el.getAttribute('data-i18n-html');
        if (htmlKey && I18N.dict[htmlKey] != null) {
            el.innerHTML = I18N.dict[htmlKey];
        }
        const attrSpec = el.getAttribute('data-i18n-attr');
        if (attrSpec) {
            attrSpec.split(';').forEach(function (pair) {
                const parts = pair.split(':');
                const attr = (parts[0] || '').trim();
                const k = (parts[1] || '').trim();
                if (attr && k && I18N.dict[k] != null) {
                    el.setAttribute(attr, I18N.dict[k]);
                }
            });
        }
    }

    function translateTree(root) {
        const scope = root || document;
        if (scope.nodeType === 1 && (scope.hasAttribute('data-i18n') || scope.hasAttribute('data-i18n-html') || scope.hasAttribute('data-i18n-attr'))) {
            translateEl(scope);
        }
        scope.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]').forEach(translateEl);
    }

    function updateSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === I18N.lang);
        });
    }

    function apply(root) {
        translateTree(root || document);
        updateSwitcher();
    }

    function setLanguage(lang) {
        if (SUPPORTED.indexOf(lang) === -1) return I18N.ready;
        I18N.lang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
        I18N.ready = loadDict(lang).then(function () { apply(document); });
        return I18N.ready;
    }

    // API publique pour components.js (ré-applique après injection d'un composant)
    I18N.apply = apply;
    I18N.setLanguage = setLanguage;
    window.I18N = I18N;

    // Chargement initial
    document.documentElement.setAttribute('lang', I18N.lang);
    I18N.ready = loadDict(I18N.lang).then(function () { apply(document); });

    // Clics sur le sélecteur de langue (délégué : fonctionne aussi sur le header injecté)
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            e.preventDefault();
            setLanguage(btn.getAttribute('data-lang'));
        }
    });
})();
