import classnames from 'classnames';
import * as React from 'react';

import {Header, Icon, Link} from '../../UI-Kit';

import {HeaderRank, HeaderType} from '../Header/Header';

import * as styles from './LinkHeader.module.scss';

interface LinkHeaderProps {
  rank: HeaderRank;
  type: HeaderType;
  hasLinkIcon?: boolean;
  href: string;
  className?: string;
}

const LinkHeader: React.FC<LinkHeaderProps> = ({
  rank,
  type,
  href,
  hasLinkIcon,
  className,
  children,
}) => {
  const classname = classnames(styles.LinkHeader, styles[type], className);

  return (
    <Header rank={rank} type={type} className={classname}>
      <Link href={href} className={styles.Link}>
        {children}
      </Link>
      {hasLinkIcon && <Icon name="link" className={styles.Icon} />}
    </Header>
  );
};

LinkHeader.defaultProps = {
  hasLinkIcon: false,
  rank: 2,
  type: 'Title',
};

export default LinkHeader;
