import { format, parseISO } from 'date-fns';

import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import CopyButton from '../../components/CopyButton';
import Layout from '../../components/Layout';
import Pre from '../../components/Pre';
import Stepper from '../../components/Stepper';
// import { MetaProps } from '../../types/layout';
import { getPostDetails, getPostSlug } from '../../services';
// import { PostType } from '../../types/post';
// import BreadCrumb from '../../components/BreadCrumb'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DraggerFramer from '../../components/dragger_framer/App';
import AccordianWidget from '../../components/accordian_framer/Accordian';
import StylishHeading from '../../components/StylishHeading';
// import styles from '../../styles/slug.module.css'
import StyleImage from '../../components/SlugImage'
const components = {
  Head,
  Image,
  CopyButton,
  Link,
  pre: Pre,
  Stepper,
  StyleImage
};

const PostPage = ({ source, content }) => {
  let router = useRouter();
  let slug = router.query.slug;
  let categorySlug = [];
  source.categories.map((category) => {
    categorySlug.push(category.slug);
  });

  const [heightHook, setHeightHook] = useState(null);
  const isBigScreen = useMediaQuery({ query: '(min-width: 1100px)' });
  useEffect(() => {
    const height = document.body.scrollHeight;
    if (typeof window !== 'undefined') {
      setHeightHook(height);
    }
  });

  const customMeta = {
    title: `${source.title} - Hunter Chang`,
    description: source.excerpt.text,
    image:
      source.image && typeof source.image.url == 'string'
        ? source.image.url
        : source.image && source.image.url.url,
    // image: `${WEBSITE_HOST_URL}${source.image.}`,
    date: source.createdAt,
    type: 'article',
  };
  return (
    <motion.div
      className="blogPost"
      animate={{ opacity: [1, 0.6, 0, 1] }}
      transition={{ delay: 2 }}
    >
      <Layout customMeta={customMeta}>
        <article>
          <h1 className="mb-3 text-gray-900 dark:text-white">
            <StylishHeading heading={source.title} />
            {/* <span>{heightHook}</span> */}
          </h1>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -300 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
          >
            <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
              {format(parseISO(source.createdAt), 'MMMM dd, yyyy')}
            </p>

            <div className="flex">
              <div className="prose max-w-[800px] dark:prose-dark">
                <MDXRemote {...content} components={components} />
              </div>
              {isBigScreen && (
                <div className="w-[96%] h-auto md:ml-[30px] ">
                  <div
                    className={`w-full ${
                      heightHook < 1200
                        ? 'translate-y-[50px]'
                        : 'translate-y-[499px]'
                    } h-auto md:ml-[30px]`}
                  >
                    <AccordianWidget category={categorySlug} slug={slug} />
                  </div>
                  {isBigScreen && heightHook > 1200 && (
                    <div
                      className={`w-[96%] mt-[45px] ${
                        heightHook < 1200
                          ? 'translate-y-[70px]'
                          : 'translate-y-[499px]'
                      } h-auto md:ml-[30px]`}
                    >
                      <DraggerFramer />
                    </div>
                  )}
                  {isBigScreen && heightHook > 1200 && (
                    <div
                      className={`w-[96%] my-[45px] ${
                        heightHook < 1200
                          ? 'translate-y-[70px]'
                          : 'translate-y-[499px]'
                      } h-auto md:ml-[30px]`}
                    >
                      <iframe
                        frameBorder="no"
                        allowfullscreen="true"
                        src="https://www.jiosaavn.com/embed/playlist/1106094575"
                        width="360"
                        height="500"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </article>
      </Layout>
    </motion.div>
    // <Layout customMeta={customMeta}>
    //   <BreadCrumb present={source.title}/>
    //   <article>
    //     <h1 className="mb-3 text-gray-900 dark:text-white">
    //       {source.title}
    //     </h1>
    //     <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
    //       {format(parseISO(source.createdAt), 'MMMM dd, yyyy')}
    //     </p>
    //     <div className="prose dark:prose-dark">
    //       <MDXRemote {...content} components={components} />
    //     </div>
    //   </article>
    // </Layout>
  );
};

export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug;
  const result = await getPostDetails(slug);
  let rawData = result.markdownContent;

  const { content, data } = matter(rawData);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      source: result,
      content: mdxSource,
    },
    revalidate: 1000,
  };
};

export const getStaticPaths = async () => {
  const postsData = await getPostSlug();

  let paths = postsData.posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'false',
  };
};

export default PostPage;
