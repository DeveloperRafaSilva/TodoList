import React from 'react';
import TodoList from './TodoList';
import Icone from './assets/foguete.svg';
import caderno from './assets/caderno.svg';
import Style from './style.module.css';
import Delete from './assets/delete.svg';
const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = React.useState([]);
  fetch('http://localhost:3000/tarefas', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((dados) => {
      setTarefas(dados);
    });

  React.useEffect(() => {
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida === true);
    setTarefasConcluidas(concluidas);
  }, [tarefas]);

  function completarTarefa(tarefa) {
    window.confirm('Concluir tarefa ?');
    if (confirm() === true) {
      fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nomeTarefa: tarefa.nomeTarefa,
          concluida: true,
        }),
      })
        .then((response) => response.json())
        .then((dados) => {});
    }
  }

  function deletar(tarefa) {
    fetch(`http://localhost:3000/tarefas/${tarefa}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
      });
  }

  if (tarefas)
    return (
      <div>
        <div className={Style.topo}>
          <img src={Icone} alt="Icone todoList" />
        </div>
        <div className={Style.input}>
          <TodoList />
        </div>
        <div className={Style.infosTarefas}>
          <p className={Style.criadas}>
            Tarefas criadas <span>{tarefas.length}</span>
          </p>
          <p className={Style.concluidas}>
            Tarefas Concluidas <span>{tarefasConcluidas.length}</span>
          </p>
        </div>
        {tarefas.length === 0 && (
          <div className={Style.localTarefas}>
            <img src={caderno} alt="Icone caderno" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
        {tarefas.length > 0 && (
          <div className={Style.tarefas}>
            {tarefas.map((tarefa) => (
              <div key={tarefa.id}>
                <div onClick={() => completarTarefa(tarefa)}>
                  <p
                    className={
                      tarefa.concluida === true
                        ? Style.concluida
                        : Style.naoConcluida
                    }
                  >
                    {tarefa.nomeTarefa}
                  </p>
                </div>
                <span>
                  <img
                    src={Delete}
                    onClick={() => deletar(tarefa.id)}
                    alt="delete Icone"
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  else return null;
};

export default App;
