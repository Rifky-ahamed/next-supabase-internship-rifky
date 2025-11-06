"use client";

import { useEffect, useState } from "react";
import { Task } from "./dashboard.types";
import { fetchTasks, saveTask, deleteTaskById } from "./dashboard.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardForm from "./dashboard-form";

const DashboardView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleFormSubmit = async (data: { title: string; date: string; time: string }, editId?: string) => {
    await saveTask(data, editId);
    setEditTask(null);
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTaskById(id);
    loadTasks();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Task Dashboard</h1>

      {/* Task Form Component */}
      <DashboardForm onSubmit={handleFormSubmit} editTask={editTask} />

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
                  <Button variant="outline" onClick={() => setEditTask(task)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(task.id)}>
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
};

export default DashboardView;
