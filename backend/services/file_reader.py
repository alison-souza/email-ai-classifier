from PyPDF2 import PdfReader

def read_file(file) -> str:
    if file.filename.endswith(".txt"):
        return file.read().decode("utf-8", errors="ignore")

    if file.filename.endswith(".pdf"):
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.strip()


    return ""
