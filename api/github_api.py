import requests

def obter_dados(username): #função que recebe como parametro o nome de usuario 
    url = f"https://api.github.com/users/{username}/events" #url da api do github
    response = requests.get(url) # fazendo a requisição para a api

    if response.status_code == 200: #se a requisição for bem sucedida retorne o json
        return response.json()
    elif response.status_code == 404: #se a requisição não for bem sucedida retorne o erro
        return {"erro": "Usuário não encontrado."}
    else: #outros erros
        return {"erro": f"Erro na API. Código: {response.status_code}"} 