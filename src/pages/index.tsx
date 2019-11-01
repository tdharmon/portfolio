import classnames from 'classnames';
import {graphql} from 'gatsby';
import * as React from 'react';

import {Layout} from '../layouts';

import * as styles from './homepage.module.scss';

import {Helpers, Routes} from '../utils';

import {CaseStudyTile, Header, Link, PostTile, Tile} from '../UI-Kit';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    allContentfulProject: {edges: [{node: Project}]};
    allContentfulCaseStudy: {edges: [{node: CaseStudy}]};
    allContentfulBlogPost: {edges: [{node: BlogPost}]};
    allContentfulLinkPost: {edges: [{node: LinkPost}]};
  };
}

export default (props: IndexPageProps) => {
  const featuredWork: Array<{node: Project}> =
    props.data.allContentfulProject.edges;
  const featuredStudies: Array<{node: CaseStudy}> =
    props.data.allContentfulCaseStudy.edges;

  const posts = Helpers.combinePostTypes(
    props.data.allContentfulBlogPost,
    props.data.allContentfulLinkPost
  ).slice(0, 3);

  return (
    <Layout>
      <div className="row">
        <div className="col-sm-12 col-md-10 col-lg-8">
          <div className={classnames(styles.MainHeader, 'my-6 mt-lg-8')}>
            <span>Hi, I'm</span>
            <Header
              rank={1}
              type="Headline"
              className={classnames(styles.Name, 'my-0')}
            >
              Trevor Harmon.
            </Header>
            <p className="mt-5">{props.data.site.siteMetadata.tagline}</p>
          </div>
        </div>
      </div>

      <div className="row mt-6 mb-4">
        <Header rank={2} type="SectionTitle" className="col my-0">
          Recent Posts
        </Header>
      </div>
      <div className="row">
        {posts.map((post: BlogPost | LinkPost, index: number) => (
          <div className="col-sm-6 col-lg-4 mb-4" key={index}>
            <PostTile post={post} />
          </div>
        ))}
        <div className="col-sm-12">
          <Link href={Routes.blog()} target="_blank">
            Read more posts &rarr;
          </Link>
        </div>
      </div>

      <div className="row mt-6 mb-4">
        <Header rank={2} type="SectionTitle" className="col">
          Projects
        </Header>
      </div>
      <div className="row">
        {featuredWork.map((item, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <Tile item={item.node} />
          </div>
        ))}
        <div className="col-sm-12">
          <Link href={Routes.projects()} target="_blank">
            See more projects &rarr;
          </Link>
        </div>
      </div>

      <div className="row mt-6 mb-4">
        <Header rank={2} type="SectionTitle" className="col my-0">
          Case Studies
        </Header>
      </div>
      <div className="row">
        {featuredStudies.map((item, index) => (
          <div className="col-sm-12 col-lg-8 mb-4" key={index}>
            <CaseStudyTile item={item.node} />
          </div>
        ))}
        <div className="col-sm-12 col-lg-8">
          <Link href={Routes.caseStudies()} target="_blank">
            See more case studies &rarr;
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        tagline
      }
    }
    allContentfulProject(
      filter: {featureOnHomepage: {eq: true}}
      sort: {fields: [projectCompletionDate], order: DESC}
    ) {
      edges {
        node {
          ...ContentfulProjectTile
        }
      }
    }
    allContentfulCaseStudy(filter: {featureOnHomepage: {eq: true}}) {
      edges {
        node {
          ...ContentfulCaseStudyTile
        }
      }
    }
    allContentfulBlogPost(sort: {order: DESC, fields: [date]}, limit: 3) {
      edges {
        node {
          title
          slug
          description
          date(formatString: "MMMM DD, YYYY")
          body {
            childMarkdownRemark {
              html
              excerpt
              timeToRead
            }
          }
          tags
        }
      }
    }
    allContentfulLinkPost(sort: {order: DESC, fields: [date]}, limit: 3) {
      edges {
        node {
          title
          slug
          link
          date(formatString: "MMMM DD, YYYY")
          internal {
            type
          }
          body {
            childMarkdownRemark {
              html
              excerpt(format: PLAIN, pruneLength: 116)
              timeToRead
            }
          }
        }
      }
    }
  }
`;
