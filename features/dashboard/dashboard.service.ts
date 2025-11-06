import { supabase } from "@/lib/supabaseClient";

// ✅ Fetch all tasks for the logged-in user
export const fetchTasks = async  () =>{
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) return [];

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

// ✅ Insert or update a task
export const saveTask = async (
  task: { title: string; date: string; time: string },
  editId?: string
) => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) throw new Error("Not logged in");

  if (editId) {
    await supabase
      .from("tasks")
      .update(task)
      .eq("id", editId)
      .eq("user_id", user.id);
  } else {
    await supabase.from("tasks").insert([{ ...task, user_id: user.id }]);
  }
}

// ✅ Delete task
export const deleteTaskById = async (id: string) => {
  await supabase.from("tasks").delete().eq("id", id);
}
