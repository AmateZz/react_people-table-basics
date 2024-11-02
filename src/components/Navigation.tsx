import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
