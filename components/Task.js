import Link from "next/link";
import { useContext } from "react";
import Cookie from "universal-cookie";
import { StateContext } from "../context/StateContext";

const cookie = new Cookie();

export default function Task({ task, taskDeleted }) {

    const { setSelectedTask } = useContext(StateContext);
    
    const deleteTask = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${cookie.get("access_token")}`,
            },
        }).then((res) => {
            if (res.status === 401) {
                alert("JWT Token not valid");
            }
        });
        taskDeleted();
    };

    return (
        <div>
            <span>{task.id}</span>
                {" : "}
            <Link href={`/tasks/${task.id}`}>
                <a className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
                    {task.title}
                </a>
            </Link>

            <div className="float-right ml-20">
                <svg
                    onClick={() => setSelectedTask(task)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 float-left cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>

                <svg
                    onClick={deleteTask}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </div>
        </div>
    );
}
