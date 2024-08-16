import React from 'react';
import Style from './style.module.css';
const TodoList = () => {
  const [tarefa, setTarefa] = React.useState('');

  function postarTarefa(event) {
    event.preventDefault();
    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      body: JSON.stringify({
        nomeTarefa: tarefa,
        concluida: false,
      }),
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
      });
  }

  return (
    <div>
      <form className={Style.Divinput} action="">
        <input
          required
          placeholder="Adicione uma tarefa"
          type="text"
          name="tarefa"
          id="tarefa"
          onChange={({ target }) => setTarefa(target.value)}
        />
        <button onClick={postarTarefa}>CRIAR +</button>
      </form>
    </div>
  );
};

export default TodoList;
