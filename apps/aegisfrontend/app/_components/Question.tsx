export default function Question({
  questionname,
    options,
    handleselectedanswers,
    questionnumber,
    answeredquestions,
    nextquestion,
    lastquestion,
    className
  }: {
    questionname: String,
    options: String[],
    handleselectedanswers: (index: number, optionindex: number) => void,
    questionnumber: number,
    answeredquestions: object[],
    nextquestion:()=>void,
    lastquestion:()=>void,
    className:String
  }) {
    const isAnswered = (index: number): boolean => {
      //@ts-ignore

      return answeredquestions[questionnumber].selectedOption === options[index];
    };
 

    window.addEventListener("keydown",(e)=>{
        e.preventDefault()
    })
  
    return (
      <div className={`h-full w-3/4 flex px-5 py-3 flex-col bg-[#171717]/60 rounded-xl ${className} bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:20px_20px]`}>
        <div className="h-2/8 w-[80%] mx-auto overflow-y-auto items-center border-white/40 text-lg flex my-4 border-b">
          <div className="flex flex-col gap-2">
            <div className="text-[#B0B0B0] text-sm font-md">Question.{questionnumber + 1}</div>
            <div className="text-2xl font-lg text-white">{questionname}</div>
          </div>
        </div>
        <div className="h-6/8 w-[80%] mx-auto flex flex-col gap-2 py-1">
          {options.map((itm, index) => (
            <div
              key={index}
              onClick={() => handleselectedanswers(questionnumber, index)}
              className={`
                w-full h-15 flex gap-2 items-center px-5 rounded-lg
                transition-all duration-200 cursor-pointer
                ${isAnswered(index) 
                  ? 'bg-zinc-800 ring-1 ring-purple-500/30' 
                  : 'hover:bg-zinc-800/30 shadow-sm hover:shadow-md'}
              `}
            >
              <span className={`
                w-8 h-8 flex items-center justify-center rounded-full
                ${isAnswered(index) ? 'bg-purple-600' : 'bg-zinc-800'}
                text-white
              `}>
                {String.fromCharCode(65 + index)}
              </span>
              <p className="text-white text-lg">{itm}</p>
            </div>
          ))}
          <div className=" w-full h-10 flex justify-end">
            <div className=" w-1/2 h-full flex gap-4 px-15 font-semibold text-white ">
                <button className="bg-purple-500 px-4 rounded-md cursor-pointer hover:bg-purple-700" onClick={lastquestion}>Previous</button>
                <button className="bg-purple-500 px-8 rounded-md cursor-pointer hover:bg-purple-700" onClick={nextquestion}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }