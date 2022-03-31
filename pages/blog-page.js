import Layout from "../components/Layout";
import Link from 'next/link';
import { getAllPostData } from "../lib/posts";
import Post from "../components/Post";

export default function BlogPage({ filteredPosts }){
    return(
        <Layout title="Blog Page">
            <h1>Blog List</h1>
            <ul>
                {filteredPosts &&
                    filteredPosts.map((post) => <Post key={post.id} post={post} />)}
            </ul>
            {/* <Link href="/">
                <a className="flex cursor-pointer mt-12">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 mr-3 cursor-pointer" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                        />
                    </svg>
                    <span>Back to home page</span>
                </a>
            </Link> */}
        </Layout>
    );
}

export async function getStaticProps(){
    const filteredPosts = await getAllPostData();
    return{
        props: { filteredPosts },
        revalidate:3,
    };
}