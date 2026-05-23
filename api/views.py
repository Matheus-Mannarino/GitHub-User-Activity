from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime
from .github_api import obter_dados
from .utils import tipos_eventos

def activity(request, username): #função que recebe a requisição e o nome de usuario
    dados = obter_dados(username) #chama a função obter_dados para obter os dados do github

    if "erro" in dados: #se houver um erro na resposta da api, retorne o erro em formato json
        return JsonResponse(
            {"erro": dados["erro"]},
            status=400
        )
    
    if not dados: #se a resposta da api for vazia, retorne uma mensagem informando que não há atividades recentes
        return JsonResponse(
            {"mensagem": "Nenhuma atividade pública recente encontrada"}
        )
    
    atividades = [] #lista para armazenar as atividades

    for evento in dados[:10]: #percorrer os primeiros 10 eventos
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

        atividades.append( #adicionando as atividades formatadas na lista de atividades
            {
                "data": data_formatada,
                "description": descricao,
                "repository": repositorio
            }
        )

    return JsonResponse(atividades, safe=False) #retornando a lista de atividades em formato json

