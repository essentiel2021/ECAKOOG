import os

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"

# 1. Read the widget CSS from service.css
service_css_path = os.path.join(base_dir, "service.css")
with open(service_css_path, "r", encoding="utf-8") as f:
    service_content = f.read()

# Lines 48-106 from service.css (which contain the widget code)
widget_css = """
.sidebar-widget {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('assets/service-widget-bg.jpg');
    background-size: cover;
    background-position: center;
    padding: 40px 30px;
    text-align: center;
    color: var(--agrica-white);
    border-radius: 8px;
}

/* Fallback if image missing */
.sidebar-widget {
    background-color: var(--agrica-dark);
}

.sidebar-widget h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: var(--agrica-white);
}

.sidebar-widget p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 25px;
    color: rgba(255, 255, 255, 0.8);
}

.widget-phone {
    font-size: 24px;
    font-weight: 800;
    display: block;
    margin-bottom: 10px;
    color: var(--agrica-or);
}

.widget-email {
    font-size: 16px;
    color: var(--agrica-white);
    text-decoration: underline;
    display: block;
    margin-bottom: 30px;
}

.btn-widget {
    display: inline-block;
    padding: 12px 30px;
    background-color: var(--agrica-or);
    color: var(--agrica-dark);
    text-decoration: none;
    font-weight: 800;
    border-radius: 50px;
    transition: all 0.3s ease;
}

.btn-widget:hover {
    background-color: var(--agrica-white);
    transform: translateY(-3px);
}
"""

# 2. Rename classes for realisation.css
replacements = {
    "sidebar-widget": "realisation-widget",
    "widget-phone": "realisation-widget-phone",
    "widget-email": "realisation-widget-email",
    "btn-widget": "btn-realisation-widget"
}

realisation_widget_css = widget_css
for old, new in replacements.items():
    realisation_widget_css = realisation_widget_css.replace(old, new)

# 3. Append to realisation.css
realisation_css_path = os.path.join(base_dir, "realisation.css")
with open(realisation_css_path, "a", encoding="utf-8") as f:
    f.write("\n/* --- Widget Styles (from generic service) --- */")
    f.write(realisation_widget_css)

# 4. Update the 3 HTML files
html_files = [
    "realisation-chateaux-eau.html",
    "realisation-ecole-primaire.html",
    "realisation-kits-scolaires.html"
]

for file in html_files:
    filepath = os.path.join(base_dir, file)
    with open(filepath, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Replace in HTML body directly
    for old, new in replacements.items():
        html_content = html_content.replace(f'class="{old}"', f'class="{new}"')
        html_content = html_content.replace(f'class="{old} ', f'class="{new} ')
        html_content = html_content.replace(f' {old}"', f' {new}"')
        html_content = html_content.replace(f' {old} ', f' {new} ')
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)

print("Widget styles successfully migrated and renamed.")
