import Link from 'next/link';
import Layout from "../components/Layout";
import Task from "../components/Task";
import { useEffect } from "react";
import { getAllTaskData } from "../lib/tasks";
import useSWR from "swr";
import StateContextProvider from '../context/StateContext';
import TaskForm from '../components/TaskForm';
import Cookie from "universal-cookie";

const cookie = new Cookie();

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
const signedIn = cookie.get("access_token");

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
                <div className='flex flex-col ' >
                <h1 className='text-2xl mb-2'>Skill SET</h1>
                    <ul>
                        {filteredTasks &&
                            filteredTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate}/>)}
                    </ul>
                    {signedIn == undefined ?
                        ""
                    :
                        <TaskForm taskCreated={mutate}/>
                    }
                </div>
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