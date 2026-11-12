import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main>
      <h1>404 — Страница не найдена</h1>
      <Link to="/">На главную</Link>
    </main>
  );
}
