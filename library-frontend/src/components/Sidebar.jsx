import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, UserCog, Repeat2, Package } from 'lucide-react';

const links = [
  { to: '/',               icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/livros',         icon: <BookOpen size={18} />,        label: 'Livros' },
  { to: '/usuarios',       icon: <Users size={18} />,           label: 'Usuários' },
  { to: '/bibliotecarios', icon: <UserCog size={18} />,         label: 'Bibliotecários' },
  { to: '/emprestimos',    icon: <Repeat2 size={18} />,         label: 'Empréstimos' },
  { to: '/estoque',        icon: <Package size={18} />,         label: 'Estoque' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📚</div>
        <div>
          <div className="logo-text">Biblioteca</div>
          <div className="logo-sub">Sistema de Controle</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {l.icon}
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">© 2024 Library Control</div>
    </aside>
  );
}