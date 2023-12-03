import { Link } from "wouter";

export function NotFoundPage() {
  return (
    <section className="page max-width w-full">
      <h1>Not found :(</h1>

      <Link to="/characters">Go to characters</Link>
    </section>
  );
}
