"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutView = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">About This App</h1>

      <Card>
        <CardHeader>
          <CardTitle>What is This App?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This web application is built using <strong>Next.js</strong> and <strong>TypeScript</strong>, 
            with <strong>Supabase</strong> handling the backend database and authentication.
          </p>

          <p className="text-muted-foreground">
            It demonstrates how to manage data efficiently using modern frameworks, 
            featuring a fully functional dashboard where users can create, update, and delete tasks.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>⚡ Next.js 14 (App Router)</li>
            <li>🧠 TypeScript</li>
            <li>🗄️ Supabase (Database & Auth)</li>
            <li>🎨 Tailwind CSS + ShadCN UI</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Developer</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            Developed by <strong>Rifky Ahamed</strong> — a passionate IT student and developer
            learning to build modern full-stack applications with Supabase and Next.js.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
export default AboutView;