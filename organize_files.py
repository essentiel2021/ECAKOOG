import os
import re
import shutil

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"

# 1. Defining the map
file_mapping = {
    # Services
    "services.html": "services/index.html",
    "achat-collecte.html": "services/achat-collecte.html",
    "exportation.html": "services/exportation.html",
    "transformation.html": "services/transformation.html",

    # Kognagnan
    "kognagnan-cacao.html": "kognagnan-cacao/index.html",
    "agroforesterie.html": "kognagnan-cacao/agroforesterie.html",
    "bancarisation-assurance.html": "kognagnan-cacao/bancarisation-assurance.html",
    "cacao-fine-saveur.html": "kognagnan-cacao/cacao-fine-saveur.html",
    "intrants-biologiques.html": "kognagnan-cacao/intrants-biologiques.html",
    "promotion-genre.html": "kognagnan-cacao/promotion-genre.html",

    # Realisations
    "realisations.html": "realisations/index.html",
    "realisation-chateaux-eau.html": "realisations/chateaux-eau.html",
    "realisation-ecole-primaire.html": "realisations/ecole-primaire.html",
    "realisation-kits-scolaires.html": "realisations/kits-scolaires.html",

    # Actualites
    "actualites.html": "actualites/index.html",
    "ecakoog-a-la-celebration-des-10-ans-de-cemoi.html": "actualites/10-ans-cemoi.html",
    "ecakoog-au-salon-mondial-du-chocolat-a-paris.html": "actualites/salon-mondial.html",
    "rabo-rural-fund-en-visite-chez-ecakoog.html": "actualites/visite-rabo-fund.html",
}

# 2. Moving files
for old_name, new_name in file_mapping.items():
    old_path = os.path.join(base_dir, old_name)
    new_path = os.path.join(base_dir, new_name)
    if os.path.exists(old_path):
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        shutil.move(old_path, new_path)

# Move CSS and JS
for f in os.listdir(base_dir):
    if os.path.isfile(os.path.join(base_dir, f)):
        if f.endswith(".css"):
            shutil.move(os.path.join(base_dir, f), os.path.join(base_dir, "css", f))
        elif f.endswith(".js"):
            shutil.move(os.path.join(base_dir, f), os.path.join(base_dir, "js", f))

# 3. Path Rewriting Functions
def get_prefix(filepath):
    # returns "" if depth=0 (root), "../" if depth=1
    rel_path = os.path.relpath(filepath, base_dir)
    depth = len(rel_path.replace('\\', '/').split('/')) - 1
    return "../" * depth if depth > 0 else ""

css_pattern = re.compile(r'href=(["\'])(?!https?|//)([^"\']*\.css(?:\?[^"\']*)?)(["\'])')
js_pattern = re.compile(r'src=(["\'])(?!https?|//)([^"\']*\.js(?:\?[^"\']*)?)(["\'])')
assets_src = re.compile(r'src=(["\'])assets/')
assets_href = re.compile(r'href=(["\'])assets/')
components_fetch = re.compile(r"fetch\(['\"]components/")

# Process all HTML/JS files in the dir
for root, dirs, files in os.walk(base_dir):
    # skip .git or assets
    if '.git' in root or 'assets' in root or '.gemini' in root:
        continue
        
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            prefix = get_prefix(filepath)
            
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            content = css_pattern.sub(lambda m: f'href={m.group(1)}{prefix}css/{m.group(2)}{m.group(3)}', content)
            content = js_pattern.sub(lambda m: f'src={m.group(1)}{prefix}js/{m.group(2)}{m.group(3)}', content)
            content = assets_src.sub(f'src=\g<1>{prefix}assets/', content)
            content = assets_href.sub(f'href=\g<1>{prefix}assets/', content)
            
            # Update internal HTML links
            for old_link, new_link in file_mapping.items():
                # We do a simple replacement. If a link was `<a href="achat-collecte.html">` 
                # we change it to `<a href="{prefix}services/achat-collecte.html">`
                # Need to be careful not to double replace.
                # using regex \b or just quotes
                content = re.sub(f'href=(["\']){re.escape(old_link)}(["\'])', f'href=\g<1>{prefix}{new_link}\g<2>', content)

            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)

# 4. Modify components/header.html and footer.html
for comp in ["header.html", "footer.html"]:
    comp_path = os.path.join(base_dir, "components", comp)
    if os.path.exists(comp_path):
        with open(comp_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace normal links with {{ROOT}} links
        for old_link, new_link in file_mapping.items():
             content = re.sub(f'href=(["\']){re.escape(old_link)}(["\'])', f'href=\g<1>{{{{ROOT}}}}{new_link}\g<2>', content)
        
        # also static root links like index.html
        content = re.sub(f'href=(["\'])index.html(["\'])', f'href=\g<1>{{{{ROOT}}}}index.html\g<2>', content)
        content = re.sub(f'href=(["\'])a-propos.html(["\'])', f'href=\g<1>{{{{ROOT}}}}a-propos.html\g<2>', content)
        content = re.sub(f'href=(["\'])contact.html(["\'])', f'href=\g<1>{{{{ROOT}}}}contact.html\g<2>', content)
        content = re.sub(f'href=(["\'])partenaires.html(["\'])', f'href=\g<1>{{{{ROOT}}}}partenaires.html\g<2>', content)
        
        # Image in header `<img src="assets/LogoEcakoog.png">`
        content = re.sub(r'src=(["\'])assets/', r'src=\g<1>{{ROOT}}assets/', content)
        
        with open(comp_path, "w", encoding="utf-8") as f:
            f.write(content)

print("Files successfully moved and HTML paths updated.")
