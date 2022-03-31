import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";


const cookie = new Cookie();

function Header() {
    const signedIn = cookie.get("access_token");
    const router = useRouter();
    const logout =() =>{
        cookie.remove("access_token", { path:"/" });
        router.push("/");
    };

    const normalStyle = 'text-gray-300 hover:bg-gray-700 px-3 py-2 rounded' // デフォルトのclass
    const activeStyle = `${normalStyle} text-blue-600 font-extrabold ` // デフォルトのclassと追加したいclass



  return (
    <div>
        <nav  className="bg-gray-800 w-screen" >
            <div className="flex items-center justify-center h-14 min-w-full">
                <div className="flex min-w-full justify-around">
                    <Link  href="/" >
                        <a className={router.pathname === "/" ? activeStyle : normalStyle}>
                            Home
                        </a>
                    </Link>
                    <Link  href="/task-page">
                        <a className={router.pathname === "/task-page" ? activeStyle : normalStyle}>
                            Task
                        </a>
                    </Link>
                    {/* <Link  href="/blog-page">
                        <a className={router.pathname === "/blog-page" ? activeStyle : normalStyle}>
                            Blog
                        </a>
                    </Link> */}
                    <Link  href="/contact-page">
                        <a className={router.pathname === "/contact-page" ? activeStyle : normalStyle}>
                            Contact
                        </a>
                    </Link>
                    {signedIn == undefined ? 
                        <Link  href="/login" >
                            <a className={router.pathname === "/login" ? activeStyle : normalStyle}>
                                Login
                            </a>
                        </Link>
                    : 
                        <span onClick={logout} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                            Logout
                        </span>
                    }
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header
