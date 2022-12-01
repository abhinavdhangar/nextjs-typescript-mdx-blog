export default function App(){
    let arr = ["https://picsum.photos/200/300?random=2","https://picsum.photos/200/300?random=2","https://picsum.photos/200/300?random=2","https://picsum.photos/200/300?random=2","https://picsum.photos/200/300?random=2"]
    return(
        <>
        {arr.map((single,index)=>(
            <img key={index} src={single}/>
        ))}
        </>
    )
}