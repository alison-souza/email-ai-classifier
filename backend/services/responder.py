# services/responder.py
from services.openai_client import client

def generate_response(text: str, category: str) -> str:
    if category == "Produtivo":
        instruction = f"""
Gere uma resposta profissional e objetiva para este email produtivo, que requer ação ou resposta.  
Regras:
- Parágrafos curtos
- Linguagem corporativa e clara
- Quebras de linha quando necessário
- Foque na ação solicitada no email
- Não use emojis
"""
    else:
        instruction = f"""
Gere uma resposta educada e curta para este email improdutivo, que não exige ação.  
Regras:
- No máximo 3 linhas
- Linguagem profissional e cordial
- Agradeça ou reconheça a mensagem
- Não use emojis
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"O email foi classificado como {category}. {instruction}"},
            {"role": "user", "content": text}
        ],
        temperature=0.4
    )

    return response.choices[0].message.content.strip()
