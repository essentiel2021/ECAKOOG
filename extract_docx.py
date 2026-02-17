import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # Namespace for Word
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            text_parts = []
            for p in tree.findall('.//w:p', namespaces):
                paragraph_text = []
                for node in p.findall('.//w:t', namespaces):
                    if node.text:
                        paragraph_text.append(node.text)
                
                if paragraph_text:
                    text_parts.append("".join(paragraph_text))
            
            return "\n\n".join(text_parts)
    except Exception as e:
        return f"Error reading {docx_path}: {str(e)}"

files_to_read = [
    r"d:\Projets\ecakoogMain\06 - Contacts\Contacts.docx",
    r"d:\Projets\ecakoogMain\07 - Partenaires\Partenaires.docx"
]

for file_path in files_to_read:
    print(f"--- START FILE: {os.path.basename(file_path)} ---")
    if os.path.exists(file_path):
        print(extract_text_from_docx(file_path))
    else:
        print(f"File not found: {file_path}")
    print(f"--- END FILE: {os.path.basename(file_path)} ---\n")
