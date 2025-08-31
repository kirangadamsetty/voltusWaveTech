import {useState, useEffect} from "react"
function SelectColors(){
     const data = [
        [1,1,1],
        [1,0,1],
        [1,1,1]
     ]
     const [pattern, setPattern] = useState([])
     const [key, setKey] = useState("")
     const totalLength  = data.flat(1).filter(Boolean).length
     useEffect(()=>{
        if(pattern.includes(key) || !key) return
        let updatedData = [...pattern]
        updatedData.push(key)
        setPattern(updatedData)

        if(totalLength === updatedData.length){

       let timer =  setInterval(()=>{
            setPattern(prev=>{
                const updated = [...prev]
                updated.pop()
                if(updated.length === 0){
                    clearInterval(timer)
                }
                return updated
            })
        },400)
        }
       
     },[key])

    return(
      <div>
        {
            data.map((value1, index1)=>{
                return <div key = {index1}>
                    {
                         value1.map((value2, index2)=>{
                            const result  = `${index1}${index2}`
                    return value2 === 1 ? <button onClick = {()=>setKey(result)} key = {index2} className = {`mx-2 my-2 ${pattern.includes(result) ? "bg-blue-200" : "bg-red-200"} w-[100px] h-[100px] border-[1] rounded-md cursor-pointer`}></button> : <span key = {index2} className = "mx-2 my-2 disabled inline-block w-[100px] h-[100px] border-[1] rounded-md "></span>
                })
                    }
                </div>
            })
        }
      </div>
    )
}
export default SelectColors