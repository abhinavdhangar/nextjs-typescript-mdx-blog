import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import RecentPostWidget from '../components/RecentPostWidget';

import { getPosts, getRecentPosts } from '../services';


export const Index = (props) => {
    console.log(props)
    let posts = props.data.postsConnection.edges
    console.log(props.recent)
    return (
        <Layout>
            <h1>Home Page</h1>
            <p>Next.js starter for your next blog or personal site. Built with:</p>
            <ul className="list-disc pl-4 my-6">
                <li>Next.js</li>
                <li className="mt-2">Typescript</li>
                <li className="mt-2">MDX</li>
                <li className="mt-2">Tailwind CSS</li>
            </ul>

            <a
                href="https://github.com/ChangoMan/nextjs-typescript-mdx-blog"
                className="inline-block px-7 py-3 rounded-md text-white dark:text-white bg-blue-600 hover:bg-blue-700 hover:text-white dark:hover:text-white"
            >
                Get the source code!
            </a>

            {posts.map((post) => (

                <article key={post.slug} className="mt-12">

                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        {format(parseISO(post.node.createdAt), 'MMMM dd, yyyy')}
                    </p>
                    <h1 className="mb-2 text-xl">
                        <Link as={`/posts1/${post.node.slug}`} href={`/posts1/[slug]`}>
                            <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                                {post.node.title}
                            </a>
                        </Link>
                    </h1>
                    {post.node.image && typeof post.node.image.url == "string" && <Image
                        alt={post.node.title}
                        src={post.node.image.url}
                        width={660}
                        height={380}
                        priority
                    />}
                  {post.node.image && post.node.image.url.url && <Image
                        alt={post.node.title}
                        src={post.node.image.url.url}
                        width={660}
                        height={380}
                        priority
                    />}
                    <div className="mb-3 max-w-[669px]" dangerouslySetInnerHTML={{ __html: `${post.node.excerpt.html}` }} />
                    <p>
                        <Link as={`/posts1/${post.node.slug}`} href={`/posts1/[slug]`}>
                            <a>Read More</a>
                        </Link>
                    </p>
               
                </article>
            ))}
           

                {/* <RecentPostWidget content={props.recent.posts}/> */}
            
        </Layout>
    );
};



export const getServerSideProps = async (ctx) => {

    const posts = await getPosts()
    const recent = await getRecentPosts()
    return {
        props: {
            data: posts
            , recent
        }
    }
}

export default Index;
