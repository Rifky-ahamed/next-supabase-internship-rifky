"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Check login session when page loads
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        // Not logged in → redirect to /login
        router.push("/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  // 🧭 Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return null; // prevent flash before redirect

  // ✅ Show your original home content if logged in
  return (
    <main className="text-center mt-16 font-sans px-4">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Welcome to My Next.js + Supabase Project 🚀
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        This is the <strong>Home page</strong> of your internship project.
      </p>

      <section className="space-y-4">
        <p className="text-base">
          Use the navigation bar to explore different pages:
        </p>
        <ul className="list-none space-y-2">
          <li>🏠 <span className="font-medium">Home</span> — You are here</li>
          <li>📄 About — Learn more about the project</li>
          <li>📊 Dashboard — See your Supabase data</li>
        </ul>

        {/* ✅ Reuse your button for logout */}
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        Logged in as: <strong>{user.email}</strong>
      </p>
    </main>
  );
}
