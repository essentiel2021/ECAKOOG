import os
import glob

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"

def update_file(filepath, replacements):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# 1. Service Pages
service_pages = ["achat-collecte.html", "exportation.html", "transformation.html"]
for page in service_pages:
    path = os.path.join(base_dir, page)
    # Remove old specific CSS and add service.css
    page_name = page.replace(".html", "")
    replacements = {
        f'<link rel="stylesheet" href="{page_name}.css?v=1.0">': '<link rel="stylesheet" href="service.css?v=1.0">',
        f'<link rel="stylesheet" href="{page_name}.css">': '<link rel="stylesheet" href="service.css?v=1.0">'
    }
    update_file(path, replacements)


# 2. Kognagnan Pages
kognagnan_pages = [
    "agroforesterie.html", 
    "bancarisation-assurance.html", 
    "cacao-fine-saveur.html", 
    "intrants-biologiques.html", 
    "promotion-genre.html"
]

for page in kognagnan_pages:
    path = os.path.join(base_dir, page)
    # They currently have their own CSS like agroforesterie.css
    page_name = page.replace(".html", "")
    replacements = {
        f'<link rel="stylesheet" href="{page_name}.css">': f'<link rel="stylesheet" href="kognagnan.css">\n    <link rel="stylesheet" href="{page_name}.css">',
        "service-layout": "kognagnan-layout",
        "service-sidebar": "kognagnan-sidebar",
        "service-content": "kognagnan-content",
        "service-hero-img": "kognagnan-hero-img",
        "service-title": "kognagnan-title",
        "service-description": "kognagnan-description",
        "service-main-content": "kognagnan-main-content"
    }
    # Also need to replace inside style.css? No style.css is already stripped of service- layout.
    update_file(path, replacements)

# 3. Realisation Pages
realisation_pages = [
    "realisation-chateaux-eau.html",
    "realisation-ecole-primaire.html",
    "realisation-kits-scolaires.html"
]

for page in realisation_pages:
    path = os.path.join(base_dir, page)
    # They might use actu1.css, we should inject realisation.css
    replacements = {
        '<link rel="stylesheet" href="actu1.css">': '<link rel="stylesheet" href="actu1.css">\n    <link rel="stylesheet" href="realisation.css">',
    }
    update_file(path, replacements)

print("HTML updates complete.")
