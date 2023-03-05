import {
  FC,
  useState,
  useCallback,
} from 'react';

import { useLocalStorage } from './app/hooks';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import './styles/App.css';
import { Todo } from './types/Todo';

export const App: FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleStatusChange = useCallback((todoId: number, completed: boolean) => {
    const filteredTodos = todos.map((todo) => (
      todo.id !== todoId ? todo : {...todo, completed}
    ));

    if (selectedTodo) {
      setSelectedTodo({...selectedTodo, completed});
    }

    setTodos(filteredTodos);
  }, [todos, selectedTodo]);

  return (
    <>
      <div className="app">
        <div className="app__content">
          <TodoForm
            todos={todos}
            setTodos={setTodos}
          />

          <div className="block">
            <TodoList
              todos={todos}
              setTodos={setTodos}
              setSelectedTodo={setSelectedTodo}
              handleStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          handleStatusChange={handleStatusChange}
        />
      )}
    </>
  )
};

export default App;
