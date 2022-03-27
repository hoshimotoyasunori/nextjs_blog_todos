import Cookie from 'universal-cookie';
import Layout from '../components/Layout';
import { useRouter } from "next/router";

const cookie = new Cookie();

export default function MainPage(){
    const router = useRouter();
    const logout =() =>{
        cookie.remove("access_token", { path:"/" });
        router.push("/");
    };
    return (
        <Layout title="Main Page">
            <svg 
                onClick={logout}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mt-10 cursor-pointer" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
            </svg>
        </Layout>
    )
}