import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LogoMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-lg leading-none text-app-surface">
      {/* TODO: reemplazar con <img src="/logo-manos.png" alt="" className="h-9 w-9" /> */}
      <span role="img" aria-hidden="true">
        🤝
      </span>
    </span>
  );
}

const navLinkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
    isActive
      ? 'bg-green-light text-primary'
      : 'text-primary hover:bg-green-light/80',
  ].join(' ');

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-green-light bg-app-surface shadow-nav">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={closeMenu}
          aria-label="UConecta — inicio"
        >
          <LogoMark />
          <span className="font-extrabold tracking-tight text-primary">UConecta</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <NavLink to="/" end className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/explorar" className={navLinkClass}>
            Explorar Eventos
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/mis-eventos" className={navLinkClass}>
              Mis Eventos
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted">Hola, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">Menú</span>
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-green-light bg-app-surface px-4 pb-4 pt-2 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Móvil">
            <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
              Inicio
            </NavLink>
            <NavLink to="/explorar" className={navLinkClass} onClick={closeMenu}>
              Explorar Eventos
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/mis-eventos" className={navLinkClass} onClick={closeMenu}>
                Mis Eventos
              </NavLink>
            )}
            <div className="mt-3 flex flex-col gap-2 border-t border-green-light pt-3">
              {isAuthenticated ? (
                <>
                  <span className="px-3 py-2 text-sm text-muted">Hola, {user?.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="rounded-lg border-2 border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary hover:bg-green-light"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg border-2 border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary hover:bg-green-light"
                    onClick={closeMenu}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-primary hover:opacity-90"
                    onClick={closeMenu}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
