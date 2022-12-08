import { useEffect } from "react"
import { getPostSlug } from "../services"

export default function App(){
  useEffect(()=>{
      async function run(){
          let data = await getPostSlug()
          console.log(data)
      }
      run()
  })
    return(
        <div>hello </div>
    )
}