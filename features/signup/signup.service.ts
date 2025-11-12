import { supabase } from "@/lib/supabaseClient";

/**
 * Handles user signup via Supabase
 * @param email - User email
 * @param password - User password
 * @returns An object with `error` and `data`
 */
export const signupUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || "Signup failed" };
  }
};
