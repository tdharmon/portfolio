declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.png' {
  const content: any;
  export = content;
}

interface PortfolioItem {
  title: string;
  slug: string;
  featureImage: contentfulAsset;
  featureOnHomepage: boolean;
}

interface Project extends PortfolioItem {
  client?: string;
  description: {
    id?: string;
    description: string;
  };
  projectCompletionDate?: Date;
  projectImages: [contentfulAsset]
}

interface CaseStudy extends PortfolioItem {
  tagline: string;
  tableOfContents: contentfulLongText;
  post: contentfulLongText;
}

interface BlogPost {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  heroImage: contentfulAsset;
  date: Date;
  body: {
    childMarkdownRemark: {
      html: string;
      excerpt: string;
      timeToRead: string;
    }
  }
  tags: [string];
  sourceAttribution?: contentfulAttribution;
  photoAttribution?: contentfulAttribution;
}

interface AboutPageData {
  title: string;
  post: contentfulLongText;
  featureImage: contentfulAsset;
}

interface contentfulLongText {
  id?: number;
  internal: {
    type?: string;
    mediaType: string;
    content: string;
    contentDigest?: string;
    owner?: string;
  }
  // this is generated by gatsby-transformer-remark
  // it's not a contentful thing
  childMarkdownRemark: {
    html: string;
  }
}

interface contentfulAsset {
  id?: string;
  title: string;
  description: string;
  fluid: {
    aspectRatio: number;
    base64: string;
    sizes: object;
    src: string;
    srcSet: string;
  }
}

type contentfulAttributionType = 'Photo' | 'Article';
type contentfulAttributionSource = 'Unsplash' | 'Medium';

interface contentfulAttribution {
  id?: string;
  name: string;
  sourceLocation: string;
  sourceName: contentfulAttributionSource;
  author: string;
  type: contentfulAttributionType;
}

interface SiteMetadata {
  title: string;
  description: string;   
  tagline: string;
  siteUrl: string;
  twitter: {
    author: string;
    site: string;
  }
}

interface PageMetadata {
  title?: string;
  description?: string;   
  url?: string;
  image?: string;
}

interface MediumPost {
  title: string;
  uniqueSlug: string;
  firstPublishedAt: string;
  virtuals: {
    subtitle: string;
    metaDescription: string;
    readingTime: number;
  };
}
