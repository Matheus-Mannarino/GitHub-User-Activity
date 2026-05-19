from github_api import obter_dados #importando a função do outro arquivo
from utils import tipos_eventos #importando o dicionario de tipos de evento
from datetime import datetime #importando o modulo de data e tempo

username = input("Insira um username: ") #input pedindo um username

dados = obter_dados(username) #chamando a função com o username inserido

if dados == []: #se os dados forem vazios 
    print("Nenhuma atividade pública recente encontrada.")
else: #se houver dados
    for evento in dados[:10]:
        tipo = evento.get("type", "Evento desconhecido") # pegando o tipo do evento, se não tiver tipo, retorna "Evento desconhecido"
        repositorio = evento.get("repo", {}).get("name", "Repositório desconhecido") # pegando o nome do repositório, se não tiver repositório, retorna "Repositório desconhecido"
        descricao = tipos_eventos.get(tipo, tipo) # pegando a descrição do evento a partir do dicionário, se não tiver descrição, retorna o tipo do evento
        data_evento = evento["created_at"] # pegando a data do evento
        data_datetime = datetime.strptime( #transformando a string em um objeto datetime
            data_evento,
            "%Y-%m-%dT%H:%M:%SZ"
        )
        data_formatada = data_datetime.strftime( #transformando o objeto datetime em string formatada
            "%d/%m/%Y %H:%M"
        )
        print(f'{data_formatada} | {descricao} em {repositorio}')