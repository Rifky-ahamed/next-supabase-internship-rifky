"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // 🧠 Fetch tasks
  const fetchTasks = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    setTasks([]);
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!error && data) setTasks(data);
};

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Create / Update Task
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title || !date || !time) return alert("Please fill all fields");

  // Get current user
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    alert("You must be logged in to create a task");
    return;
  }

  if (editId) {
    await supabase.from("tasks").update({ title, date, time }).eq("id", editId).eq("user_id", user.id);
    setEditId(null);
  } else {
    await supabase.from("tasks").insert([{ title, date, time, user_id: user.id }]);
  }

  setTitle("");
  setDate("");
  setTime("");
  fetchTasks();
};


  // 🗑 Delete Task
  const deleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  // ✏️ Edit Task
  const editTask = (task: Task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDate(task.date);
    setTime(task.time);
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
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <Button type="submit">{editId ? "Update Task" : "Add Task"}</Button>
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
                  <Button variant="destructive" onClick={() => deleteTask(task.id)}>
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
