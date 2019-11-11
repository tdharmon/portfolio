import classnames from 'classnames';
import React, {useContext} from 'react';
import * as styles from './Header.module.scss';
// import {Theme} from '../../utils/Theme';
import {Theme, ThemeContext} from '../../context/ThemeContext';

export type HeaderRank = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HeaderType = 'Display' | 'Title' | 'Heading' | 'Subheading';

interface HeaderProps {
  // theme: Theme;
  rank: HeaderRank;
  type: HeaderType;
  className?: string;
  children: React.ReactNode;
}

const Header = ({rank, type, className, children}: HeaderProps) => {
  const {theme} = useContext(ThemeContext);
  const classname = classnames(styles[`Header-${theme}`], className);

  console.log(`Header-${theme}`);

  const Tag = rank < 1 || rank > 6 ? 'span' : `h${rank}`;

  return <Tag className={classname}>{children}</Tag>;
};

export default Header;
