import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

import CardSlug from '../components/card_one/CardSlug';
// import { getAllPosts } from '../lib/api';
import { getPosts, getRecentPosts } from '../services';

export const Index = (props) => {
   let posts = props.data.postsConnection.edges
  return (
    <>
      <Layout></Layout>
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <CardSlug
            key={i}
            title={post.node.title}
            slug={post.node.slug}
            description={post.description}
            img={
              typeof post.node.image.url == 'string'
                ? post.node.image.url
                : post.node.image.url.url
            }
            date={post.node.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getPosts();
  const recent = await getRecentPosts();
  return {
    props: {
      data: posts,
      recent,
    },
  };
};

export default Index;
