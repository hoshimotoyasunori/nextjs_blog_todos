import Link from "next/link";

export default function Post({ post }){
    return (
        <div>
            {/* <span>{post.id}</span>
                { " : " } */}
            <Link href={`/posts/${post.id}`}>
                <a className="cursor-pointer text-gray-500 border-b border-gray-900 hover:bg-gray-600">
                    {post.title}
                </a>
            </Link>
        </div>
    );
}