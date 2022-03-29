import Link from 'next/link';
import Layout from "../components/Layout";
import Task from "../components/Task";
import { useEffect } from "react";
import { getAllTaskData } from "../lib/tasks";
import useSWR from "swr";
import StateContextProvider from '../context/StateContext';
import TaskForm from '../components/TaskForm';


const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`

export default function TaskPage({staticfilteredTasks}){

    const { data: tasks, mutate } =useSWR(apiUrl, fetcher,{
        fallbackData:staticfilteredTasks,
    });
    const filteredTasks = tasks?.sort(
        (a,b) => new Date(b.created_at) - new Date(a.created_at)
    );
    useEffect(() => {
        mutate();
    }, [mutate]);

    return(
        <StateContextProvider>
            <Layout title="Task Page">
                <TaskForm taskCreated={mutate}/>
                <ul>
                    {filteredTasks &&
                        filteredTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate}/>)}
                </ul>
                <Link href="/main-page">
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
                        <span>Back to main page</span>
                    </a>
                </Link>
            </Layout>
        </StateContextProvider>
    );
}

export async function getStaticProps(){
    const filteredTasks = await getAllTaskData();
    return{
        props: { filteredTasks },
        revalidate:3,
    };
}