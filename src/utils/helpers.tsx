import {BlogPost, LinkPost} from '../types/Post';

const checkHttp = (link: string) => {
  const completeProtocol = /^https?/;
  const hasProtocol = completeProtocol.test(link);

  if (hasProtocol) {
    return link;
  }

  const partialProtocol = /^:?\/\//;
  const preparedLink = link.replace(partialProtocol, '');

  return `https://${preparedLink}`;
};

interface PostEdges {
  edges: [{node: BlogPost | LinkPost}];
}

const combinePostTypes = (
  blogPosts: PostEdges,
  linkPosts: PostEdges,
  order: 'desc' | 'asc' = 'desc',
): Array<BlogPost | LinkPost> => {
  const orderMultiplier = order === 'desc' ? 1 : -1;

  const posts = [
    // blog posts
    ...blogPosts.edges.map((edge) => {
      const blogPost: BlogPost = {
        ...(edge.node as BlogPost),
      };

      return blogPost;
    }),
    // link posts
    ...linkPosts.edges.map((edge) => {
      const linkPost: LinkPost = {
        ...(edge.node as LinkPost),
      };

      return linkPost;
    }),
  ].sort((firstDate, secondDate) => {
    const a = new Date(firstDate.date);
    const b = new Date(secondDate.date);

    if (a < b) {
      return 1 * orderMultiplier;
    }
    if (a > b) {
      return -1 * orderMultiplier;
    }

    return 0;
  });

  return posts;
};

export {combinePostTypes, checkHttp};
