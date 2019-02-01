import { graphql, StaticQuery, withPrefix } from 'gatsby';
import * as React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

import { openGraphMetaSimple } from '../utils';

interface HelmetProps {
  pageMetadata: PageMetadata;
}

interface HelmetDataProps extends HelmetProps {
  data: {
    site: {
      siteMetadata: SiteMetadata,
    },
  };
}

const Helmet: React.SFC<HelmetDataProps> = ({
  children,
  data,
  pageMetadata,
}) => {

  const {
    siteMetadata,
  } = data.site;

  const title = pageMetadata.title
    ? `${pageMetadata.title} | ${siteMetadata.title}`
    : siteMetadata.title;

  const description = pageMetadata && pageMetadata.description
    ? pageMetadata.description
    : siteMetadata.description;

  const generatedMeta = openGraphMetaSimple(siteMetadata, pageMetadata);

  const meta = [
    {
      content: pageMetadata.description || siteMetadata.description,
      name: 'Description',
    },
    ...generatedMeta,
  ];

  return (
    <ReactHelmet
      title={title}
      meta={generatedMeta}
    >
      <html lang="en" />
    </ReactHelmet>
  );
};

Helmet.defaultProps = {
  pageMetadata: {},
};

export default (props: HelmetProps) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            twitter {
              author
              site
            }
          }
        }
      }
    `}
    // tslint:disable-next-line jsx-no-lambda
    render={(data) => <Helmet data={data} {...props} />}
  />
);
