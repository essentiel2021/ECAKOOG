import os

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"

html_files = [
    "realisation-chateaux-eau.html",
    "realisation-ecole-primaire.html",
    "realisation-kits-scolaires.html"
]

for file in html_files:
    filepath = os.path.join(base_dir, file)
    with open(filepath, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    html_content = html_content.replace('        <link rel="stylesheet" href="realisation.css">', '    <link rel="stylesheet" href="realisation.css">')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)

print("Fixed indentation.")
