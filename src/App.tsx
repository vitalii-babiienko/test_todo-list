import { FC, useState } from 'react';
import { useLocalStorage } from './app/hooks';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import './styles/App.css'
import { Todo } from './types/Todo';

export const App: FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

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
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
            />
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  )
};

export default App;
