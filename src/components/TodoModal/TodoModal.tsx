import { FC, memo, useCallback } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: FC<Props> = memo(({
  todo,
  selectedTodo,
  setSelectedTodo,
}) => {
  const {
    title,
    description,
    completed,
  } = todo;

  const onClose = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, [selectedTodo]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

        <p>
          Status:
          <input
            type="checkbox"
            checked={completed}
          />
        </p>

        <button
          type="button"
          onClick={() => onClose(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
});
