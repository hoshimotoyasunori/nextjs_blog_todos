import React from 'react'
import { ListData } from '../components/ListData';
import  Link  from 'next/link';
import Layout from "../components/Layout";
import Image  from 'next/image';

function work() {
  return (
    <Layout title="work Page">
      <ul className=' mt-5 flex  flex-wrap justify-center w-screen min-w-full  '>
        {ListData.map((value, key) => {
          return (
            <li key={key} className="p-4 m-6 border bg-slate-300 flex-none w-50">
              <p className='text-2xl font-bold'>・{value.title}</p>
              <div className='my-4 flex justify-center items-center'>
                <Image src={value.thumbnail} width={300} height={180} alt="サムネ" />
              </div>
              <p>Skill:{value.skill}</p>
              <Link href={value.url}>
                <a className="text-blue-400 hover:bg-sky-300 ">{value.url}</a>
              </Link>
              <p className='w-80'>{value.trial}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  )
}

export default work
