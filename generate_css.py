import os

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"
style_path = os.path.join(base_dir, "style.css")

with open(style_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Extract lines 1992 (index 1991) to 2196 (index 2196) - 1-based to 0-based
css_to_extract = lines[1991:2196]
extracted_text = "".join(css_to_extract)

# Remove the extracted lines from style.css
new_lines = lines[:1991] + lines[2196:]
with open(style_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

# 1. service.css (as is)
with open(os.path.join(base_dir, "service.css"), "w", encoding="utf-8") as f:
    f.write("/* --- Service Layout Styles --- */\n")
    f.write(extracted_text)

# 2. kognagnan.css (replace service with kognagnan)
kognagnan_text = extracted_text.replace("service-", "kognagnan-")
with open(os.path.join(base_dir, "kognagnan.css"), "w", encoding="utf-8") as f:
    f.write("/* --- Kognagnan Layout Styles --- */\n")
    f.write(kognagnan_text)

# 3. realisation.css (replace service with realisation)
realisation_text = extracted_text.replace("service-", "realisation-")
with open(os.path.join(base_dir, "realisation.css"), "w", encoding="utf-8") as f:
    f.write("/* --- Realisation Layout Styles --- */\n")
    f.write(realisation_text)

print("CSS generation complete.")
