import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "成长看板" },
  { to: "/tasks", label: "任务" },
  { to: "/goals", label: "目标" },
  { to: "/pet", label: "宠物" },
  { to: "/feedback", label: "反馈" },
];

export function App() {
  return (
    <div className="shell">
      <aside className="shell-nav">
        <div>
          <p className="eyebrow">Work Partner</p>
          <h1>学习成长搭子</h1>
        </div>
        <nav className="primary-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="shell-content">
        <Outlet />
      </main>
    </div>
  );
}
