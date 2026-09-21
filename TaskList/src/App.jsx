import { useEffect, useMemo, useState } from "react";

const storageKey = "task-list-items";
const filters = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Completed", value: "completed" },
];

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(savedTasks) ? savedTasks : [];
  } catch {
    return [];
  }
}

function createTask(title, details) {
  return {
    id: crypto.randomUUID(),
    title,
    details,
    completed: false,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch {
      
    }
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const openCount = tasks.length - completedCount;

  const visibleTasks = useMemo(() => {
    if (filter === "open") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  }, [filter, tasks]);

  function handleAddTask(event) {
    event.preventDefault();

    const nextTitle = title.trim();
    if (!nextTitle) return;

    setTasks((currentTasks) => [createTask(nextTitle, details.trim()), ...currentTasks]);
    setTitle("");
    setDetails("");
  }

  function updateTask(id, patch) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, ...patch } : task)),
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="app-shell">
      <section className="workspace" aria-labelledby="app-title">
        <header className="topbar">
          <div>
            <p className="eyebrow">Today</p>
            <h1 id="app-title">Task List</h1>
          </div>
          <div className="summary" aria-live="polite">
            <span>{openCount} open</span>
            <span>{completedCount} done</span>
          </div>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <div className="field-group">
            <label htmlFor="task-title">Task</label>
            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="Add a task"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="field-group details-field">
            <label htmlFor="task-details">Details</label>
            <input
              id="task-details"
              name="details"
              type="text"
              placeholder="Optional details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>

        <div className="filters" aria-label="Filter tasks by status">
          {filters.map((item) => (
            <button
              className={`filter-button${filter === item.value ? " active" : ""}`}
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ul className="task-list" aria-live="polite">
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} onUpdate={updateTask} />
          ))}
        </ul>

        {visibleTasks.length === 0 && (
          <p className="empty-state visible">{getEmptyMessage(tasks, filter)}</p>
        )}
      </section>
    </main>
  );
}

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDetails, setEditDetails] = useState(task.details);

  function startEditing() {
    setEditTitle(task.title);
    setEditDetails(task.details);
    setIsEditing(true);
  }

  function saveEdit(event) {
    event.preventDefault();

    const nextTitle = editTitle.trim();
    if (!nextTitle) return;

    onUpdate(task.id, {
      title: nextTitle,
      details: editDetails.trim(),
    });
    setIsEditing(false);
  }

  return (
    <li className={`task-item${task.completed ? " completed" : ""}${isEditing ? " editing" : ""}`}>
      {isEditing ? (
        <div className="task-content">
          <form className="edit-form" onSubmit={saveEdit}>
            <input
              className="edit-title"
              type="text"
              required
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />
            <input
              className="edit-details"
              type="text"
              placeholder="Optional details"
              value={editDetails}
              onChange={(event) => setEditDetails(event.target.value)}
            />
            <div className="edit-actions">
              <button type="submit">Save</button>
              <button className="cancel-edit" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <label className="status-toggle">
            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={(event) => onUpdate(task.id, { completed: event.target.checked })}
            />
            <span className="checkmark" aria-hidden="true" />
          </label>
          <div className="task-content">
            <p className="task-title">{task.title}</p>
            {task.details && <p className="task-details">{task.details}</p>}
          </div>
          <div className="task-actions">
            <button className="edit-task" type="button" aria-label="Edit task" onClick={startEditing}>
              Edit task
            </button>
            <button className="delete-task" type="button" aria-label="Delete task" onClick={() => onDelete(task.id)}>
              Delete task
            </button>
          </div>
        </>
      )}
    </li>
  );
}

function getEmptyMessage(tasks, filter) {
  if (tasks.length === 0) return "No tasks yet.";
  if (filter === "open") return "No open tasks.";
  if (filter === "completed") return "No completed tasks.";
  return "No tasks match this filter.";
}