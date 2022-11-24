import Stepper from '../components/Stepper'
import { getPosts } from '../services'

// export default async function Index(){

//     return (
//         <Stepper/>
//     )
// }
const Index = (props) => {
    return (
        <div>
            {JSON.stringify(props)}
        </div>
    );
}


export const getServerSideProps = async (ctx) => {
const posts = await getPosts() || "non"

    return {
        props:{
            data:posts
        }
    }
}

export default Index;