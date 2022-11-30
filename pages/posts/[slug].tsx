import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import AccordianWidget from '../../components/accordian_framer/Accordian';

import Banner from '../../components/Banner';
import CopyButton from '../../components/CopyButton';
import DraggerFramer from '../../components/dragger_framer/App';
import Heading from '../../components/Heading';
import Layout, { WEBSITE_HOST_URL } from '../../components/Layout';
import Pre from '../../components/Pre';
import Stepper from '../../components/Stepper';
import { MetaProps } from '../../types/layout';
import { PostType } from '../../types/post';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

//Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  CopyButton,
  Link,
  pre: Pre,
  Stepper,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
};

const PostPage = ({ source, frontMatter }: PostPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Hunter Chang`,
    description: frontMatter.description,
    image: `${WEBSITE_HOST_URL}${frontMatter.image}`,
    date: frontMatter.date,
    type: 'article',
  };
  // let hookVariable = useWindowHeight()
  const [heightHook, setHeightHook] = useState(null);
   const isBigScreen = useMediaQuery({ query: '(min-width: 1100px)' })
  useEffect(() => {
    const height =document.body.scrollHeight
        if (typeof window !== 'undefined') {
        console.log('window.innerHeight', document.body.scrollHeight);
    setHeightHook(height);
    }

  });
          document.addEventListener("loadeddata",()=>{
            console.log("loaded all response !!!!!")
          })
  return (
    <motion.div animate={{ opacity: [1, 0.6, 0, 1] }} transition={{ delay: 2 }}>

      <Layout customMeta={customMeta}>
        <article>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -300 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
          >
            <h1 className="mb-3 text-gray-900 dark:text-white">
              <Heading heading={frontMatter.title} />
              {/* <span>{heightHook}</span> */}
            </h1>
            <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
              {format(parseISO(frontMatter.date), 'MMMM dd, yyyy')}
            </p>

            <div className="flex">
              <div className="prose max-w-[700px] dark:prose-dark">
                <MDXRemote {...source} components={components} />
              </div>
            {isBigScreen &&  <div className="w-full h-auto md:ml-[30px] ">
                <div className={`w-full ${heightHook<1200?"translate-y-[50px]":"translate-y-[499px]"} h-auto md:ml-[30px]`}>
                  <AccordianWidget />
                </div>
               {isBigScreen && heightHook>1200 && <div className={`w-full ${heightHook<1200?"translate-y-[50px]":"translate-y-[499px]"} h-auto md:ml-[30px]`}>
                  <DraggerFramer />
                </div>}
              </div>}
            </div>
          </motion.div>
        </article>
      </Layout>
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

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
  // console.log(mdxSource)
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
