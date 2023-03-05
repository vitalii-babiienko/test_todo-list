import {
  FC,
  memo,
  useCallback,
} from 'react';

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  handleStatusChange: (todoId: number, completed: boolean) => void;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoItem: FC<Props> = memo(({
  todo,
  todos,
  setTodos,
  handleStatusChange,
  setSelectedTodo,
}) => {
  const {
    id,
    title,
    description,
    completed,
  } = todo;

  const handleShowModal = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      const target = e.target as HTMLTableRowElement;

      if (target.className === 'status-input'
        || target.className === 'remove-button') {
        return;
      }

      setSelectedTodo(todo);
  }, [todos]);

  const handleRemove = useCallback(() => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }, [todos]);

  return (
    <tr
      className="tbody-row"
      onClick={handleShowModal}
    >
      <td>{id}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <input
          type="checkbox"
          className="status-input"
          checked={completed}
          onChange={(e) => handleStatusChange(id, e.target.checked)}
        />

        <button
          type="button"
          className="remove-button"
          onClick={handleRemove}
        >
          x
        </button>
      </td>
    </tr>
  );
});
