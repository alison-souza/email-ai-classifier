from services.openai_client import client

def classify_email(text: str) -> str:
    prompt = f"""
Você é um classificador de emails corporativos.  
Classifique o email abaixo em apenas UMA das categorias:

- Produtivo: Emails que requerem uma ação ou resposta específica, como solicitações de suporte técnico, atualização sobre casos em aberto ou dúvidas sobre o sistema.
- Improdutivo: Emails que não necessitam de ação imediata, como mensagens de felicitações ou agradecimentos.

Responda apenas com a categoria correta: "Produtivo" ou "Improdutivo".

Email:
\"\"\"{text}\"\"\"
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Você é um classificador de emails corporativos especializado em distinguir emails produtivos e improdutivos."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    category = response.choices[0].message.content.strip().capitalize()
    if category not in ["Produtivo", "Improdutivo"]:
        category = "Improdutivo"

    return category
