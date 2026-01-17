import nltk
import re
from nltk.corpus import stopwords
from nltk.stem import RSLPStemmer

nltk.download("stopwords")
nltk.download("rslp")

stop_words = set(stopwords.words("portuguese"))
stemmer = RSLPStemmer()

def preprocess_text(text: str) -> str:
    import re
    from nltk.corpus import stopwords
    import nltk
    nltk.download("stopwords", quiet=True)
    
    stop_words = set(stopwords.words("portuguese"))
    
    text = text.lower()
    text = re.sub(r"[^a-zà-ú0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    
    tokens = [word for word in text.split() if word not in stop_words and len(word) > 2]
    
    return " ".join(tokens)

