import React from 'react'
import { ListData } from '../components/ListData';
import  Link  from 'next/link';
import Layout from "../components/Layout";

function work() {
  return (
    <Layout title="Blog Page">
      <ul className='min-h-screen '>
        {ListData.map((value, key) => {
          return (
            <li key={key} className="m-10 ">
                <p>・{value.title}</p>
              <p>Skill:{value.skill}</p>
              <Link href={value.url}>
                <a className="text-blue-400 hover:bg-sky-300">{value.url}</a>
              </Link>
              <p className='border bg-slate-300'>{value.trial}</p>
            </li>
            
          );
        })}
      </ul>
    </Layout>
  )
}

export default work
