import { Button } from "@/components/ui/button";

export default function HomePage() {
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

        <Button variant="success">Outline</Button>
      </section>
    </main>
  );
}
