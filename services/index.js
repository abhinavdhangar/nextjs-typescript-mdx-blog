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

