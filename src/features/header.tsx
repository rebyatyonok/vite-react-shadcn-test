import { Link } from "wouter";
import { ThemeToggle } from "@/features/theme-toggle";

export function Header() {
  return (
    <header className="max-width w-full text-lg grid px-10 py-5 gap-6 items-center grid-cols-[auto_1fr_auto]">
      <span className="font-bold">StarWars Heroes</span>
      <div className="flex gap-3">
        <Link to="/characters">Characters</Link>
      </div>
      <ThemeToggle />
    </header>
  );
}
