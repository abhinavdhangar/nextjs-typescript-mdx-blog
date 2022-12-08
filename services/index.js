import { gql, GraphQLClient, request } from 'graphql-request';
const graphQLAPI = process.env.NEXT_PUBLIC_HYGRPAH_ENDPOINT;
console.log(graphQLAPI);
const graphQLClient = new GraphQLClient(
  graphQLAPI // here add your endpoint
);
export const getPosts = async (page) => {
  var pagination = page;
  // if(pagination==1) {pagination = 0 }
  const graphQLClient = new GraphQLClient(graphQLAPI, {
    headers: () => ({
      //  'gcms-locales': 'en'
    }),
  });
  const query = gql`
    query Posts {
      postsConnection(first:10,skip:${JSON.stringify(page * 10)}) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt {
              html
            }

            image {
              ... on ImageSystem {
                url
              }
              ... on AssetSystem {
                url {
                  url
                }
              }
            }

            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt {
          markdown
          text
        }
        image {
          ... on ImageSystem {
            url
          }
          ... on AssetSystem {
            url {
              url
            }
          }
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        galleryList {
          url
        }
        markdownContent
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphQLAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 4
      ) {
        title
        image {
          ... on ImageSystem {
            url
          }
          ... on AssetSystem {
            url {
              url
            }
          }
        }
        excerpt {
          html
        }
        galleryList {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphQLAPI, query, { slug, categories });

  return result.posts;
};

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        slug

        image {
          ... on ImageSystem {
            url
          }
          ... on AssetSystem {
            url {
              url
            }
          }
        }
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result;
};

export const getCategories = async () => {
  const query = gql`
    query Categories {
      categories {
        name
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result;
};

export const getBlogSearch = async (page, word) => {
  console.log('word is. ..');
  console.log(word);
  const query = gql`
    query Search {
      posts(first:10,skip:${JSON.stringify(
        page * 10
      )},where: { _search: ${JSON.stringify(word)}}) {
          title
      slug
      excerpt{
        html
      }
      createdAt
       image {
        ... on AssetSystem {
          url {
            url
          }
        }
        ... on ImageSystem {
          url
        }
      }
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result;
};

export const getPostsByCategories = async (page, category) => {
  const query = gql` 
  query MyQuery {
  categories(where: {_search: ${JSON.stringify(category)}}) {
    posts(first:10,skip:${JSON.stringify(page * 10)}) {
      title
      slug
      excerpt{
        html
      }
      createdAt
       image {
        ... on AssetSystem {
          url {
            url
          }
        }
        ... on ImageSystem {
          url
        }
      }
    }
  }
}
`;

  const result = await graphQLClient.request(query);
  return result;
};

export const getPostSlug = async () => {
  const query = gql`
    query allSlug {
      posts {
        slug
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result;
};
