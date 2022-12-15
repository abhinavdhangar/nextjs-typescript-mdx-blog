// import Image from 'next/image';
import React from 'react';
import { v4 as uuid } from 'uuid';
import Layout from '../components/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import CardSlug from '../components/card_one/CardSlug';
import { getPosts } from '../services';
import AnimLetter from '../components/AnimLetter';
export const Index = () => {
  const [posts, setPosts] = React.useState([]);
  const [pagination, setPagination] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  React.useEffect(() => {
    async function run() {
      const postData = await getPosts(pagination);
      setPagination(() => pagination + 1);
      setPosts(postData.postsConnection.edges);
    }
    run();
  }, []);

  const fetchData = async () => {
    let dd = posts;
    const postData = await getPosts(pagination);
    setPagination(() => pagination + 1);

    if (!postData.postsConnection.edges.length > 0) {
      setHasMore(false);
    }

    postData.postsConnection.edges.map((single) => {
      dd.push(single);
    });
    setPosts(dd);
  };

  const banner = {
    animate: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };
  const cardVariant = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition:{
      type:"spring"
    }
    // transition:{duration:6}
  };

  return (
    <>
      <Layout></Layout>
      <div className={`flex  items-center justify-center my-4`}>
        <AnimLetter />
      </div>
      {/* <h1 className="text-6xl flex items-center justify-center font-semibold my-4">
        Blogs
      </h1> */}
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
        {posts.length > 1 && (
          <motion.div
          
            variants={banner}
            initial="initial"
            animate="animate"
            className="grid overflow-hidden  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {posts.map((post) => (
              <motion.div key={uuid()} variants={cardVariant}>
                <CardSlug
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </InfiniteScroll>
    </>
  );
};

export default Index;
