import { FC, memo, useCallback } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoList: FC<Props> = memo(({
  todos,
  setTodos,
  selectedTodo,
  setSelectedTodo,
}) => {
  const handleShowModal = useCallback((targetTodo: Todo) => {
    setSelectedTodo(targetTodo);
  }, [selectedTodo]);

  const handleStatusChange = useCallback((todoId: number, completed: boolean) => {
    const filteredTodos = todos.map((todo) => (
      todo.id !== todoId ? todo : {...todo, completed: !completed}
    ));

    setTodos(filteredTodos);
  }, [todos]);

  const handleRemove = useCallback((todoId: number) => {
    setTodos(todos.filter(({ id }) => id !== todoId));
  }, [todos]);

  const cutOffExcess = useCallback((str: string) => (
    str.length > 20 ? str.slice(0, 20) + '...' : str
  ), []);

  return (
    <table className="table">
      <thead>
        <tr className="thead-row">
          <th>
            <span>
              ID
            </span>
          </th>

          <th>
            <span>
              TITLE
            </span>
          </th>

          <th>
            <span>
              DESCRIPTION
            </span>
          </th>

          <th>
            <span>
              STATUS
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(({
          id,
          title,
          description,
          completed,
        }) => (
          <tr
            key={id}
            className="tbody-row"
          >
            <td>{id}</td>
            <td>{cutOffExcess(title)}</td>
            <td>{cutOffExcess(description)}</td>
            <td>
              <button
                type="button"
                className="open-modal-button"
                onClick={() => handleShowModal({id, title, description, completed})}
              >
                See details
              </button>

              <input
                type="checkbox"
                className="status-input"
                checked={completed}
                onChange={() => handleStatusChange(id, completed)}
              />

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemove(id)}
              >
                x
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
