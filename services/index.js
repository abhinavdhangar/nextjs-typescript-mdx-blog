import {gql,GraphQLClient,request} from 'graphql-request'
const graphQLAPI = process.env.NEXT_PUBLIC_HYGRPAH_ENDPOINT
console.log(graphQLAPI)
const graphQLClient = new GraphQLClient(
  graphQLAPI // here add your endpoint
);
export const getPosts = async ()=>{

    const query = gql`
    query Posts {
      postsConnection {
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
            excerpt{
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
    
      
    `

    const result = await graphQLClient.request(query)
    return result;


}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt{
          markdown
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
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
      
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

export const getRecentPosts = async ()=>{
    const query = gql
    `
    query getRecentPosts{
        posts(orderBy:createdAt_ASC, last : 3){
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
    }`

    const result = await graphQLClient.request(query)
    return result;

}