import {
  FC,
  memo,
  useCallback,
} from 'react';

import { Todo } from '../../types/Todo';

interface Props {
  selectedTodo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  handleStatusChange: (todoId: number, completed: boolean) => void;
}

export const TodoModal: FC<Props> = memo(({
  selectedTodo,
  setSelectedTodo,
  handleStatusChange,
}) => {
  const {
    id,
    title,
    description,
    completed,
  } = selectedTodo;

  const onClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

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
            className="status-input"
            checked={completed}
            onChange={(e) => handleStatusChange(id, e.target.checked)}
          />
        </p>

        <button
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
});
