import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import Button from "./ui/Button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/chekbox";
import { Input } from "./ui/input";
import { Plus, Trash2, Sparkles, AlertCircle } from "lucide-react";
import useTodoStore from "../store/todoStore";

export default function AllTodos() {
  const { 
    todos, 
    todoData, 
    setTodoData, 
    fetchTodos, 
    createTodo, 
    deleteTodo, 
    toggleTodoComplete 
  } = useTodoStore();

  // Local state to manage the visual error message
  const [error, setError] = useState("");

  // Fetch data on load
  useEffect(() => {
    fetchTodos();
  }, []); 

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!todoData.title.trim()) {
      setError("Task title is required!"); // Sets the premium UI error message
      return;
    }

    await createTodo();
  };

  // Helper to clear error when user starts typing
  const handleTitleChange = (e) => {
    if (error) setError(""); // Remove error styling instantly
    setTodoData({ title: e.target.value });
  };

  const getPriorityBadge = (p) => {
    if (p === 'H') return <Badge className="bg-red-500/10 text-red-500">High</Badge>;
    if (p === 'M') return <Badge className="bg-amber-500/10 text-amber-500">Medium</Badge>;
    return <Badge className="bg-slate-500/10 text-slate-500">Low</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">Workspace Tasks</h1>
      </div>

      {/* Dynamic Counter Badges */}
      <div className="flex gap-3 mt-2 text-xs font-semibold">
        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
          Total: {todos.length}
        </span>
        <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
          Completed: {todos.filter(t => t.is_completed).length}
        </span>
        <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
          Pending: {todos.filter(t => !t.is_completed).length}
        </span>
      </div>

      {/* Input Form */}
      <Card className="bg-white">
        <CardHeader><CardTitle className="text-lg">Add New Task</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2 space-y-1">
                {/* BINDING INPUT WITH ZUSTAND & ERROR CONDITIONAL BORDER */}
                <Input 
                  placeholder="Task title..." 
                  value={todoData.title}
                  onChange={handleTitleChange}
                  className={`w-full transition-colors ${
                    error ? "border-red-500 focus-visible:ring-red-500 bg-red-50/30" : ""
                  }`}
                />
                {/* Premium Inline Error Message */}
                {error && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1 animate-fade-in">
                    <AlertCircle className="h-3.5 w-3.5" /> {error}
                  </p>
                )}
              </div>
              <div>
                <select 
                  value={todoData.priority}
                  onChange={(e) => setTodoData({ priority: e.target.value })}
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 bg-white"
                >
                  <option value="H">High Priority</option>
                  <option value="M">Medium Priority</option>
                  <option value="L">Low Priority</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <Input 
                  placeholder="Description..." 
                  value={todoData.description || ''}
                  onChange={(e) => setTodoData({ description: e.target.value })}
                  className="w-full" 
                />
              </div>
              <Button className={'p-4'} type="submit" color="blue">
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* List Grid */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className={todo.is_completed ? 'opacity-60 bg-slate-50' : 'bg-white'}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3.5 flex-1">
                <div className="pt-1">
                  <Checkbox 
                    checked={todo.is_completed}
                    onCheckedChange={() => toggleTodoComplete(todo)}
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <p className={`font-medium text-slate-900 ${todo.is_completed ? 'line-through text-slate-400' : ''}`}>
                    {todo.title}
                  </p>
                  {todo.description && <p className="text-sm text-slate-500">{todo.description}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                {getPriorityBadge(todo.priority)}
                <Button 
                  color="custom" 
                  onClick={() => deleteTodo(todo.id)}
                  className="h-9 w-9 text-slate-400 hover:text-red-500 p-0 bg-transparent hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {todos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 px-4 text-center bg-white rounded-xl border border-dashed border-slate-200 dark:bg-slate-950 dark:border-slate-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-4 animate-pulse">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              You're all caught up!
            </h3>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 max-w-xs">
              No pending tasks found. Enjoy your free time or add a new task above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}