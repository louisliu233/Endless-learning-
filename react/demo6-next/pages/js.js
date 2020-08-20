import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'

export default function FirstPost(){

    function goHome(){
        Router.push('/')
    }
    return (
        <>
        <Head>
            <title>First Post</title>
        </Head>   
        <h2>First Post</h2> 
            <h3>
                <Link href='/'>
                    <a>Back to home</a>
                </Link>
            </h3>
            <button onClick={goHome}>Back to home</button><br/>
            <h3>
            <Link href={{pathname:'/person'}}>
                    <a>Back to Person</a>
            </Link>
            </h3>
        </>
    )
}