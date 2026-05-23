import { useState } from "react" 

function App() {
  const buscarAtividades = async () => { /* função assíncrona para buscar as atividades do usuário */
    setError("") /* limpa qualquer mensagem de erro anterior */
    setActivities([]) /* limpa as atividades anteriores antes de buscar novas */
    setLoading(true) /* indica que a busca está em andamento */
  
    const response = await fetch( /* faz uma requisição para a API usando o nome de usuário fornecido */
    `http://127.0.0.1:8000/api/activity/${username}/`
  )

  const data = await response.json() /* converte a resposta da API para JSON */

  setLoading(false) /* indica que a busca foi concluída */

  if (!response.ok) { /* se a resposta da API não for bem-sucedida, exibe a mensagem de erro retornada pela API */
    setError(data.erro)
    return
  }

  if (data.mensagem) { /* se a resposta da API possuir uma mensagem de erro, exibe essa mensagem */
    setError(data.mensagem)
    return
  }

  setActivities(data) /* atualiza o estado com as atividades retornadas pela API */
  }
  const [username, setUsername] = useState("") /* estado para armazenar o nome de usuário digitado */
  const [error, setError] = useState("") /* estado para armazenar mensagens de erro, caso necessário */
  const [activities, setActivities] = useState([]) /* estado para armazenar as atividades retornadas pela API */
  const [loading, setLoading] = useState(false) /* estado para indicar se a busca está em andamento */
  return (
    <div>
      <h1>GitHub User Activity</h1> {/* título da pagina */}

      <input 
        type="text"
        placeholder="Digite um username"
        value={username} /* o valor do input é controlado pelo estado username */
        onChange={(event) => setUsername(event.target.value)} /* atualiza o estado com o valor digitado pelo usuário */
      /> {/* campo onde usuário digitará */}

      <button onClick={buscarAtividades}>
        Buscar
      </button> {/* botão de busca */}

      <hr />

      {loading && <p>Carregando...</p>} {/* se a busca estiver em andamento, exibe a mensagem de carregamento */}

      {error && <p>{error}</p>} {/* se houver uma mensagem de erro, exibe essa mensagem para o usuário */}
      {!loading && !error && activities.length === 0 ? ( /* se não houver erro e a lista de atividades estiver vazia, exibe a mensagem de que nenhuma atividade foi encontrada */
      <p>Nenhuma atividade encontrada.</p> 
      ) : (
        !loading && ( /* se a busca não estiver em andamento, exibe a lista de atividades */
          <ul>
            {activities.map((activity, index) => ( /* caso houver atividades, mapeia as atividades e exibe cada uma em uma lista */
              <li key={index}> {/* exibe a data, descrição e repositório de cada atividade */}
                  {activity.data} | {activity.description} em {activity.repository}
              </li>
          ))}
          </ul>
        )  
      )}
    </div>
  )
}

export default App