'use client'; // This must be line 1

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Task from './components/Task';

export default function Home() {
// 1. We name this "todos" so it matches the database and the loop below
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState('');

// Automatically fetch items when the page loads
useEffect(() => {
  fetchTodos();
}, []);

// Grab all tasks from Supabase
const fetchTodos = async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    setTodos(data); // Save the cloud list into our local "todos" state
  }
};

// CREATE: Add a task to Supabase
const addTodo = async (e) => {
  e.preventDefault();
  if (newTodo.trim() === '') return;

  const { error } = await supabase
    .from('todos')
    .insert([{ title: newTodo }]);

  if (error) {
    console.error('Error adding task:', error);
  } else {
    setNewTodo('');
    fetchTodos(); // Refresh our list from the database
  }
};

// UPDATE: Toggle the checkbox status in Supabase
const toggleComplete = async (id, currentStatus) => {
  const { error } = await supabase
    .from('todos')
    .update({ is_completed: !currentStatus })
    .eq('id', id);

  if (error) {
    console.error('Error updating task:', error);
  } else {
    fetchTodos(); // Refresh the list
  }
};

// DELETE: Remove a task completely from Supabase
const deleteTodo = async (id) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
  } else {
    fetchTodos(); // Refresh the list
  }
};

return (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Next.js & Supabase Tasks</h1>

      {/* Input Form */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Write a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Add
        </button>
      </form>

      {/* Displaying Task Component List */}
      <ul className="space-y-1">
        {/* ✅ Handled correctly with "todos.map" */}
        {todos.map((todo) => (
          <Task
            key={todo.id}
            todo={todo}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  </main>
);
}
