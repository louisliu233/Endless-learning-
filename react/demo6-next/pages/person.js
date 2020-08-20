import Link from 'next/link'
import {withRouter} from 'next/router'

 function Person({router}){
    return (
        <>
        <h3>
        <Link href='/js'><a>Back to First Post</a></Link>
        </h3>
        <p>{router.pathname}</p>
        </>
    )
}

export default withRouter(Person)