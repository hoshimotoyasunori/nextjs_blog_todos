import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Auth(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);


    const login = async () => {
        try{
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,{
                method: "POST",
                body: JSON.stringify({ username: username, password: password }),
                headers:{
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if(res.status === 400 ){
                    throw "authentication failed";
                }else if(res.ok){
                    return res.json();
                }
            }).then((data) => {
                const options = { path: "/" };
                cookie.set("access_token", data.access, options);
            });
            router.push("/");
        }catch(err){
            alert(err);
        }
    };

    const authUser = async (e) => {
        e.preventDefault();
        if(isLogin){
            login();
        }else{
            try{
                await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`,{
                    method: "POST",
                    body: JSON.stringify({ username:username, password:password }),
                    headers:{
                        "Content-Type":"application/json",
                    },
                }).then((res) => {
                    if(res.status === 400 ){
                        throw "authentication failed2";
                    }
                });
                login();
            }catch(err){
                alert(err);
            }
        }
    }

    return (
        <div className="max-w-md w-full space-y-8">
            <div className='flex flex-col items-center justify-center'>
                <Image className="mx-auto h-12 w-auto" src="/power.jpg" width={100} height={100} alt="workflow"/>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
                    {isLogin ? "Login" : "Sign up"}
                </h2>
            </div>
            <form className="mt-6 space-y-6" onSubmit={authUser}>
                <input type="hidden" name="remember" value="true"/>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <input 
                            name="username" 
                            type="text" 
                            autoComplete="username" 
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="username"
                            value={username}
                            onChange = {(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <input 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
                            required 
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                            placeholder="Password"
                            value = {password}
                            onChange = {(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button 
                        type="submit" 
                        className="group relative w-60  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg 
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor" 
                                aria-hidden="true"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </span>
                        {isLogin ? "Login with JWT" : "Create new user"}
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <div className="text-sm">
                        <span 
                            onClick={() => setIsLogin(!isLogin)} 
                            className=" font-medium text-white-600 hover:text-indigo-500 cursor-pointer"
                        >
                            {isLogin ? "※Create new user" : "※Login"}
                        </span>
                    </div>
                </div>
            </form>
        </div>
        );
}