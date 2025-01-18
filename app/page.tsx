import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth");
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        Hi from Home
      </div>
    </section>
  );
}
