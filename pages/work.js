import React from 'react'
import { ListData } from '../components/ListData';
import  Link  from 'next/link';
import Layout from "../components/Layout";
import Image  from 'next/image';

function work() {
  return (
    <Layout title="work Page">
      <ul className='min-h-screen mt-5'>
        {ListData.map((value, key) => {
          return (
            <li key={key} className="p-4 m-6 border bg-slate-300">
              <p className='text-2xl font-bold'>・{value.title}</p>
              <Image src={value.thumbnail} width={200} height={100} alt="サムネ"></Image>
              <p>Skill:{value.skill}</p>
              <Link href={value.url}>
                <a className="text-blue-400 hover:bg-sky-300 font-bold">{value.url}</a>
              </Link>
              <p>{value.trial}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  )
}

export default work
