import os
import re

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"
actu_css_path = os.path.join(base_dir, "actu1.css")
realisation_css_path = os.path.join(base_dir, "realisation.css")

# 1. Read actu1.css
with open(actu_css_path, "r", encoding="utf-8") as f:
    actu_content = f.read()

# 2. We want to duplicate the whole actu1.css file into realisation.css
# But we need to rename all the classes to avoid conflict and make it specific.
# actu-detail-section -> realisation-detail-section
# actu-detail-grid -> realisation-detail-grid
# actu-sidebar -> realisation-sidebar
# actu-main -> realisation-main
# actu-main-img -> realisation-main-img
# actu-main-date -> realisation-main-date
# actu-main-title -> realisation-main-title
# actu-main-text -> realisation-main-text

# Let's just do a blanket replace of "actu-" with "realisation-" for the main structure
# Note: actu-gallery is already in realisation.css from the previous step! 
# Let's read the existing realisation.css first to append to it instead of overwriting, OR we just overwrite it completely to have a clean file.
# Since realisation.css currently only has the `.realisation-layout` (which we aren't using for these 3 pages anyway, they use actu-detail-grid), it's safe to overwrite it with the actu1 structure.

with open(realisation_css_path, "r", encoding="utf-8") as f:
    existing_realisation = f.read()

# Actually, the user's 3 realisation pages currently use `actu-detail-grid` AND `actu-sidebar`. 
# They DO NOT use `realisation-layout` which we created earlier (they use a different template).
# Let's create a fresh realisation.css based entirely on actu1.css

replacements = {
    "actu-detail-section": "realisation-detail-section",
    "actu-detail-grid": "realisation-detail-grid",
    "actu-sidebar": "realisation-sidebar",
    "actu-main": "realisation-main",
    "actu-main-img": "realisation-main-img",
    "actu-main-date": "realisation-main-date",
    "actu-main-title": "realisation-main-title",
    "actu-main-text": "realisation-main-text",
    "actu-gallery": "realisation-gallery"
}

realisation_content = actu_content
for old, new in replacements.items():
    realisation_content = realisation_content.replace(old, new)

# Write the new realisation.css
with open(realisation_css_path, "w", encoding="utf-8") as f:
    f.write("/* --- Realisation Page Specific Styles (Forked from actu1.css) --- */\n")
    f.write(realisation_content)

# 3. Update the 3 HTML files
html_files = [
    "realisation-chateaux-eau.html",
    "realisation-ecole-primaire.html",
    "realisation-kits-scolaires.html"
]

for file in html_files:
    filepath = os.path.join(base_dir, file)
    with open(filepath, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Replace class names
    for old, new in replacements.items():
        html_content = html_content.replace(old, new)
        
    # Remove the link to actu1.css since realisation.css now has everything
    # Currently it has:
    # <link rel="stylesheet" href="actu1.css">
    # <link rel="stylesheet" href="realisation.css">
    # Let's just remove the actu1 line.
    html_content = html_content.replace('<link rel="stylesheet" href="actu1.css">\n', '')
    html_content = html_content.replace('<link rel="stylesheet" href="actu1.css">', '')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)

print("Migration to realisation.css complete.")
