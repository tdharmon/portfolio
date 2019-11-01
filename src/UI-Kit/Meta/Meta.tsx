import classnames from 'classnames';
import * as React from 'react';

import * as styles from './Meta.module.scss';

interface MetaProps {
  post: BlogPost | LinkPost;
  className?: string;
}

const Meta: React.FC<MetaProps> = ({post, className}) => {
  const classname = classnames(className, styles.Meta);

  const timeToRead = post.body.childMarkdownRemark.timeToRead
    ? `${Math.floor(+post.body.childMarkdownRemark.timeToRead)} min read`
    : undefined;

  const meta = [post.date, timeToRead].filter(Boolean).join(' • ');

  return <p className={classname}>{meta}</p>;
};

export default Meta;
