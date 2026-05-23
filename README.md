# GitHub User Activity

Aplicação full-stack que consulta a API pública do GitHub e exibe as atividades recentes de um usuário.

## Tecnologias utilizadas

- Python
- Django
- Django REST Framework
- React
- JavaScript
- GitHub API
- HTML
- CSS

## Funcionalidades

- Buscar atividades recentes de um usuário do GitHub
- Exibir os 10 eventos mais recentes
- Tratar usuário inválido
- Tratar usuário sem atividades recentes


## Como executar o backend

```bash
pip install -r requirements.txt
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000
```

## Como executar o frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Exemplo de uso

Digite um username do GitHub, como:

```text
torvalds
```

A aplicação exibirá as atividades públicas recentes do usuário.
