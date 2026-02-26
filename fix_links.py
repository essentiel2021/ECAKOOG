import os

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"

kognagnan_pages = [
    "agroforesterie.html", 
    "bancarisation-assurance.html", 
    "cacao-fine-saveur.html", 
    "intrants-biologiques.html", 
    "promotion-genre.html"
]

for page in kognagnan_pages:
    path = os.path.join(base_dir, page)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check if we already inserted it
    if 'href="kognagnan.css"' not in content:
        # We find the style.css link and append kognagnan.css right after
        target_str = '<link rel="stylesheet" href="style.css'
        
        # Split and re-join
        lines = content.split('\n')
        new_lines = []
        for line in lines:
            new_lines.append(line)
            if target_str in line:
                # Add the kognagnan link right after
                new_lines.append('    <link rel="stylesheet" href="kognagnan.css">')
        
        new_content = '\n'.join(new_lines)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
            print(f"Updated {page}")

print("Fix applied.")
