import { Link, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/calendar" style={{ marginRight: 12 }}>
          Calendar
        </Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
