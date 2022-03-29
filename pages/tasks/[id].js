import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";
import { useRouter } from 'next/router';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Post({ staticTask, id }){
    const router = useRouter();
    const { data:task, mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
        fetcher,
        {
            fallbackData:staticTask,
        }
    );
    useEffect(() =>{
        mutate();
    },[mutate]);
    if(router.isFallback || !task){
        return <div>Loading...</div>
    }
    
    return(
        <Layout title={task.title}>
            <span className="m-4">
                { "ID : "}
                { task.id }
            </span>
            <p className="mb-4 text-xl font-bold">{ task.title }</p>
            <p className="mb-12">{ task.created_at }</p>
            <Link href="/task-page">
                <a className="flex cursor-pointer mt-12">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-3" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                    <span>Back to task-page</span>
                </a>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths(){
    const paths = await getAllTaskIds();
    return{
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }){
    const staticTask = await getTaskData(params.id);
    return{
        props:{
            id:staticTask.id,
            staticTask,
        },
        revalidate:3,
    };
}

