import {
  FC,
  memo,
  useCallback,
  useRef,
  useState
} from 'react';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
}

export const TodoForm: FC<Props> = memo(({
  todos,
  setTodos,
}) => {
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [description, setDescription] = useState('');
  const [isDescription, setIsDescription] = useState(true);
  const titleInput = useRef<HTMLInputElement>(null);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    setIsTitle(true);
  }, [title]);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
    setIsDescription(true);
  }, [description]);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setIsTitle(false);

      return;
    }

    if (!description.trim()) {
      setIsDescription(false);

      return;
    }

    if (isTitle && isDescription) {
      const newTodo: Todo = {
        id: +new Date(),
        title,
        description,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setDescription('');

      if (titleInput.current) {
        titleInput.current.focus();
      };
    }

  }, [title, description]);

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
          ref={titleInput}
          className={`input ${!isTitle ? "is-error" : ""}`}
          placeholder="Enter title"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
        />

        {!isTitle && (
          <span className="error">
            The title field can't be empty
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
          className={`input ${!isDescription ? "is-error" : ""}`}
          placeholder="Enter description"
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
        />

        {!isDescription && (
          <span className="error">
            The description field can't be empty
          </span>
        )}
      </div>

      <button
        className="button"
        type="submit"
      >
        Create
      </button>
    </form>
  );
});
