import os
import re

base_dir = r"c:\Users\OLS Latrille\Desktop\ECAKOOG\ECAKOOG"

# Regex patterns to safely match everything from <header> to </header> and <footer> to </footer>
# We use re.DOTALL so that '.' matches newlines.
header_pattern = re.compile(r"<header.*?</header>", re.DOTALL | re.IGNORECASE)
footer_pattern = re.compile(r"<footer.*?</footer>", re.DOTALL | re.IGNORECASE)

# We want to replace these with placeholders
header_placeholder = '    <div id="header-placeholder"></div>'
footer_placeholder = '    <div id="footer-placeholder"></div>'

for filename in os.listdir(base_dir):
    if filename.endswith(".html") and os.path.isfile(os.path.join(base_dir, filename)):
        filepath = os.path.join(base_dir, filename)
        
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 1. Replace header
        content = header_pattern.sub(header_placeholder, content)
        
        # 2. Replace footer
        content = footer_pattern.sub(footer_placeholder, content)
        
        # 3. Add components.js script before script.js if it doesn't exist
        # First ensure we don't duplicate it
        if 'components.js' not in content:
            # Most files have <script src="script.js?v=XXX"></script>
            # Let's cleanly inject it right before script.js
            content = re.sub(
                r'(<script src="script\.js)', 
                r'<script src="components.js?v=1.0"></script>\n        \1', 
                content
            )
            # Fallback if no script.js is found, inject before </body>
            if 'components.js' not in content:
                content = content.replace('</body>', '    <script src="components.js?v=1.0"></script>\n</body>')
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"Refactored {filename}")

print("Phase 4 HTML Refactoring complete.")
