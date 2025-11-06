// features/home/home.service.ts
import { supabase } from "@/lib/supabaseClient";

// 🧠 Fetch logged-in user
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user || null;
};

// 🚪 Logout function
export const logoutUser = async () => {
  await supabase.auth.signOut();
};
