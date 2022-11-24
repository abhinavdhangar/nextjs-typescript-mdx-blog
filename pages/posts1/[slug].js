import { format, parseISO } from 'date-fns';

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
import CopyButton from '../../components/CopyButton';
import Layout, { WEBSITE_HOST_URL } from '../../components/Layout';
import Pre from '../../components/Pre';
import Stepper from '../../components/Stepper'
import { MetaProps } from '../../types/layout';
import {getPostDetails} from '../../services'
import { PostType } from '../../types/post';
import BreadCrumb from '../../components/BreadCrumb'
// import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  CopyButton,
  Link,
  pre:Pre,
  Stepper
};

// type PostPageProps = {
//   source: MDXRemoteSerializeResult;
//   frontMatter: PostType;
// };

const PostPage = ({ source ,content})=> {
  const customMeta = {
    title: `${source.title} - Hunter Chang`,
    description: source.description,
    image:typeof source.image.url == "string" ? source.image.url:source.image.url.url,
    // image: `${WEBSITE_HOST_URL}${source.image.}`,
    date: source.createdAt,
    type: 'article',
  };
  return (

    <Layout customMeta={customMeta}>
      <BreadCrumb present={source.title}/>
      <article>
        <h1 className="mb-3 text-gray-900 dark:text-white">
          {source.title}
        </h1>
        <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
          {format(parseISO(source.createdAt), 'MMMM dd, yyyy')}
        </p>
        <div className="prose dark:prose-dark">
          <MDXRemote {...content} components={components} />
        </div>
      </article>
    </Layout>
  );
};

export const getServerSideProps= async ({ params }) => {
const {slug} = params
const result = await getPostDetails(slug)
let rawData = result.markdownContent
console.log(rawData)
const {content,data} = matter(rawData)

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
      content:mdxSource
    },
  };
};

// export const getStaticPaths= async () => {
//   const paths = postFilePaths
//     // Remove file extensions for page paths
//     .map((path) => path.replace(/\.mdx?$/, ''))
//     // Map the path into the static paths object required by Next.js
//     .map((slug) => ({ params: { slug } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default PostPage;
