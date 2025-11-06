"use client";

import { useState, useEffect } from "react";
import { Task } from "./dashboard.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardFormProps {
  onSubmit: (data: { title: string; date: string; time: string }, editId?: string) => void;
  editTask?: Task | null;
}

export default function DashboardForm({ onSubmit, editTask }: DashboardFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDate(editTask.date);
      setTime(editTask.time);
      setEditId(editTask.id);
    } else {
      setTitle("");
      setDate("");
      setTime("");
      setEditId(null);
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return alert("Please fill all fields");
    onSubmit({ title, date, time }, editId || undefined);
  };

  return (
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
  );
}
