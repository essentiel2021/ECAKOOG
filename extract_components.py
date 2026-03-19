import os

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"
index_path = os.path.join(base_dir, "index.html")

# Create components directory
components_dir = os.path.join(base_dir, "components")
os.makedirs(components_dir, exist_ok=True)

with open(index_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Extract header (lines 17-95, index 16-95)
header_lines = lines[16:95]
with open(os.path.join(components_dir, "header.html"), "w", encoding="utf-8") as f:
    f.writelines(header_lines)

# Extract footer (lines 552-641, index 551-641)
footer_lines = lines[551:641]
with open(os.path.join(components_dir, "footer.html"), "w", encoding="utf-8") as f:
    f.writelines(footer_lines)

print("Extracted header.html and footer.html to components/ directory.")
