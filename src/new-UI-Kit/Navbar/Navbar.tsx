import classnames from 'classnames';
import React from 'react';

import {useTheme} from '../../context/ThemeContext';
import {Link} from '../../new-UI-Kit';
import {Button} from '../../UI-Kit';
import {Routes} from '../../utils';
import * as styles from './Navbar.module.scss';

import {BrandButton, ToggleThemeButton} from './components';

export const Navbar = () => {
  const theme = useTheme();
  const classname = classnames(styles.Navbar, styles[`Navbar-${theme}`]);

  const navbarLinks = [
    {
      display: 'Blog',
      location: Routes.blog(),
    },
    {
      display: 'Projects',
      location: Routes.projects(),
    },
    {
      display: 'About',
      location: Routes.about(),
    },
  ];

  const linkMarkup = (
    <ul className={styles.Links}>
      {navbarLinks.map((link, index) => (
        <li key={index}>
          <Link href={link.location}>{link.display}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={classname}>
      <div className="container d-flex flex-column">
        <div className={styles.TopElementsWrapper}>
          <BrandButton />
          {linkMarkup}
          <ToggleThemeButton className={styles.ToggleThemeButton} />
        </div>
      </div>
    </div>
  );
};
