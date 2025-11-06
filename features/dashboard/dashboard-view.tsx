"use client";

import { useEffect, useState } from "react";
import { Task } from "./dashboard.types";
import {
  fetchTasks,
  saveTask,
  deleteTaskById,
} from "./dashboard.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // 🧠 Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  // ➕ Create / Update task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return alert("Please fill all fields");

    await saveTask({ title, date, time }, editId || undefined);

    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setEditId(null);
    loadTasks();
  };

  // ✏️ Edit task
  const editTask = (task: Task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDate(task.date);
    setTime(task.time);
  };

  // 🗑 Delete task
  const handleDelete = async (id: string) => {
    await deleteTaskById(id);
    loadTasks();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Task Dashboard</h1>

      {/* Task Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Edit Task" : "Add Task"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <Button type="submit">
              {editId ? "Update Task" : "Add Task"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {task.date} at {task.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => editTask(task)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
export default DashboardView;