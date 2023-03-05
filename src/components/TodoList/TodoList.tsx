import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  handleStatusChange: (todoId: number, completed: boolean) => void;
}

export const TodoList: FC<Props> = memo(({
  todos,
  setTodos,
  setSelectedTodo,
  handleStatusChange,
}) => {
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
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            handleStatusChange={handleStatusChange}
            setSelectedTodo={setSelectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
});
