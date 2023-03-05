import {
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';

import { ErrorType } from '../../types/ErrorType';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
}

export const TodoForm: FC<Props> = memo(({
  todos,
  setTodos,
}) => {
  const [error, setError] = useState<ErrorType | null>(null);
  const inputTitle = useRef<HTMLInputElement>(null);

  const isTitleFieldEmpty = error === ErrorType.Title;
  const isDescriptionFieldEmpty = error === ErrorType.Description;

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const todoTitle: string = target.todoTitle.value;
    const todoDescription: string = target.todoDescription.value;

    if (!todoTitle.trim()) {
      setError(ErrorType.Title);

      return;
    }

    if (!todoDescription.trim()) {
      setError(ErrorType.Description);

      return;
    }

    if (todoTitle && todoDescription) {
      const newTodo: Todo = {
        id: +new Date(),
        title: todoTitle,
        description: todoDescription,
        completed: false,
      };
  
      setTodos([...todos, newTodo]);
      setError(null);
  
      target.reset();
  
      if (inputTitle.current) {
        inputTitle.current.focus();
      };
    }
  }, [todos]);

  return (
    <form
      className="form"
      onSubmit={handleFormSubmit}
    >
      <div className="field">
        <label htmlFor="todo-title" className="label">
          Title:
        </label>

        <input
          type="text"
          id="todo-title"
          name="todoTitle"
          className={`input ${isTitleFieldEmpty ? "is-error" : ""}`}
          placeholder="Enter title"
          ref={inputTitle}
        />

        {isTitleFieldEmpty && (
          <span className="error">
            {ErrorType.Title}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-description" className="label">
          Description:
        </label>

        <input
          type="text"
          id="todo-description"
          name="todoDescription"
          className={`input ${isDescriptionFieldEmpty ? "is-error" : ""}`}
          placeholder="Enter description"
        />

        {isDescriptionFieldEmpty && (
          <span className="error">
            {ErrorType.Description}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="button"
      >
        Create
      </button>
    </form>
  );
});
