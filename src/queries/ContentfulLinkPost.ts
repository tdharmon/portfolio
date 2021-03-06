import {graphql} from 'gatsby';

export const ContentfulLinkPost = graphql`
  fragment ContentfulLinkPost on ContentfulLinkPost {
    title
    slug
    link
    date(formatString: "DD MMM YYYY")
    body {
      childMarkdownRemark {
        html
        excerpt(format: PLAIN, pruneLength: 116)
        timeToRead
      }
    }
    internal {
      type
    }
  }
`;
