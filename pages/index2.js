import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardSlug from '../components/card_one/CardSlug';
// import { getAllPosts } from '../lib/api';
import { getPosts, getRecentPosts } from '../services';

export const Index = () => {
  const [posts, setPosts] = React.useState([]);
  const [pagination, setPagination] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  React.useEffect(() => {
    async function run() {
      const postData = await getPosts(pagination);
      setPagination(() => pagination + 1);
      // console.log(posts);
      setPosts(postData.postsConnection.edges);
    }
    run();
  }, []);

  //  let posts = props.data.postsConnection.edges
  const fetchData = async () => {
    let dd = posts;
    const postData = await getPosts(pagination);
    setPagination(() => pagination + 1);
    
    // console.log(postData.postsConnection.edges.length)
    if (!postData.postsConnection.edges.length > 0) {
      
      // console.log("data enededde daf")
      setHasMore(false);
    }
    // console.log(postData.postsConnection.edges);
    // console.log(dd);
    //  dd.push(postData.postsConnection.edges)

    postData.postsConnection.edges.map((single) => {
      dd.push(single);
    });
    setPosts(dd);
  };

  return (
    <>
      <Layout></Layout>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        // scrollableTarget="scrollableDiv"
        endMessage={
          <div style={{ textAlign: 'center' }}>
            <p>Yay! You have seen it all</p>
          </div>
        }
      >
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <CardSlug
              key={i}
              title={post.node.title}
              slug={post.node.slug}
              description={post.node.excerpt.html}
              img={
                post.node.image && typeof post.node.image.url == 'string'
                  ? post.node.image.url
                  : post.node.image && post.node.image.url.url
              }
              date={post.node.createdAt}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Index;
