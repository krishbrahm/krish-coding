'use client';

export default function Task({ todo, onToggle, onDelete }) {
    return (
        <li className="flex items-center justify-between p-3 border-b last:border-0 bg-white rounded-md shadow-sm mb-2">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() => onToggle(todo.id, todo.is_completed)}
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                />
                <span className={`text-gray-700 ${todo.is_completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
            >
                Delete
            </button>
        </li>
    );
}
