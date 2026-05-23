import { useState } from "react" 

function App() {
  const buscarAtividades = async () => { /* função assíncrona para buscar as atividades do usuário */
  const response = await fetch( /* faz uma requisição para a API usando o nome de usuário fornecido */
    `http://127.0.0.1:8000/api/activity/${username}/`
  )

  const data = await response.json() /* converte a resposta da API para JSON */

  console.log(data)

  setActivities(data) /* atualiza o estado com as atividades retornadas pela API */
  }
  const [username, setUsername] = useState("") /* estado para armazenar o nome de usuário digitado */
  const [activities, setActivities] = useState([]) /* estado para armazenar as atividades retornadas pela API */
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

      {activities.length === 0 ? (
      <p>Nenhuma atividade encontrada.</p> /* caso nao houver atividades, mostre o parágrafo */
      ) : (
        <ul>
          {activities.map((activity, index) => ( /* caso houver atividades, mapeia as atividades e exibe cada uma em uma lista */
            <li key={index}>
                {activity.data} | {activity.description} em {activity.repository}
            </li>
        ))}
        </ul>
      )}
    </div>
  )
}

export default App