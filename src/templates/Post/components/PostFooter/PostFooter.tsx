import classnames from 'classnames';
import * as React from 'react';

import {useTheme} from '../../../../context/ThemeContext';
import {Header, Link, Space, Spacer} from '../../../../UI-Kit';
import * as styles from './PostFooter.module.scss';
import {LinkDatePair, PostFooterProps} from './types';

export const PostFooter = ({title, getFullLink, data}: PostFooterProps) => {
  const theme = useTheme();

  if (data.length < 1) {
    return null;
  }

  const makePairMarkup = ({link: {slug, label}, date}: LinkDatePair) => {
    return (
      <div className={styles.Pair} key={label}>
        <Link className={styles.Link} url={getFullLink(slug)}>
          {label}
        </Link>
        <span className={classnames([styles.Date, styles[`Date-${theme}`]])}>
          {date}
        </span>
      </div>
    );
  };

  const markup = data.map(makePairMarkup);

  return (
    <div className={styles.PostFooter}>
      <Spacer>
        <Space size="large" />
        <Header rank={2} type="Heading">
          {title}
        </Header>
        <Space size="small" />
        <Spacer size="little">{markup}</Spacer>
      </Spacer>
    </div>
  );
};
