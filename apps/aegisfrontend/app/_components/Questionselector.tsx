export default function Questionselector({setcurrentquestion,questionlength,currentquestion,answeredquestions}:{
    setcurrentquestion:()=>void,
    questionlength:number,
    currentquestion:number,
    answeredquestions:object[]
})

    
{
  const questionumbers = [...Array(questionlength).keys()];
    // console.log(questionlength)

    const isanswered = (index:number):boolean =>{
      if (answeredquestions[index].selectedOption == ""){
        return false
      }
      
      return true
    } 

    return(
        <div className="h-full w-[23%] bg-[#171717]/60 rounded-xl overflow-y-auto mt-4 px-3 text-white py-4">
        <div  className=" flex flex-wrap gap-2 justify-between w-full  ">
          {questionumbers.map((itm,index)=>{
            return(
        <div onClick={()=>setcurrentquestion(index)} role="button" className={`h-15 w-15 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-zinc-500 transition-colors ${isanswered(index) ? "bg-purple-500":"bg-zinc-800"} ${currentquestion == index ? "bg-zinc-500 ring-1 ring-amber-50":""} `}>{index+1}</div>

            )
          })}
        

        
            
            
       
         
        </div>
      </div>
    )
}