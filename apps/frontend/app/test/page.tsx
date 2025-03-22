  "use client"
  import Navbar from "@/_components/Navbar";
  import Question from "@/_components/Question";
  import Questionselector from "@/_components/Questionselector";
  import { useState } from "react";

  interface AnsweredQuestion {
    questionIndex: number;
    selectedOption: string;
  }
  

  export default function Page(){

    const questions = [
      {
        question: "Who is father of Ketan goyal?",
        options: ["Garvit", "chotu", "Pauuu", "Takla"]
      },
      // ... (existing 20 questions remain the same)
      {
        question: "What is the closest star to Earth?",
        options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"]
      },
      {
        question: "Which element is essential for photosynthesis?",
        options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Hydrogen"]
      },
      {
        question: "Who wrote 'The Theory of Evolution'?",
        options: ["Charles Darwin", "Isaac Newton", "Albert Einstein", "Gregor Mendel"]
      },
      {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"]
      },
      {
        question: "Which continent is the largest?",
        options: ["North America", "Africa", "Asia", "Europe"]
      },
      {
        question: "What is the value of Pi (π) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"]
      },
      {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Joseph Lister"]
      },
      {
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"]
      },
      {
        question: "Which is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"]
      },
      {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"]
      },
      {
        question: "Who painted 'The Starry Night'?",
        options: ["Van Gogh", "Monet", "Picasso", "Da Vinci"]
      },
      {
        question: "What is the smallest planet in our solar system?",
        options: ["Mars", "Venus", "Mercury", "Pluto"]
      },
      {
        question: "What is the chemical symbol for silver?",
        options: ["Si", "Ag", "Au", "Fe"]
      },
      {
        question: "Who invented the light bulb?",
        options: ["Tesla", "Edison", "Franklin", "Bell"]
      },
      {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Tiger"]
      },
      {
        question: "Which metal is liquid at room temperature?",
        options: ["Lead", "Iron", "Mercury", "Copper"]
      },
      {
        question: "What is the human body's largest muscle?",
        options: ["Biceps", "Gluteus Maximus", "Quadriceps", "Deltoids"]
      },
      {
        question: "Who was the first person to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"]
      },
      {
        question: "What is the boiling point of water in Celsius?",
        options: ["90°C", "95°C", "100°C", "105°C"]
      },
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"]
      },
      // ... (existing 20 questions remain the same)
      {
        question: "What is the closest star to Earth?",
        options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"]
      },
      {
        question: "Which element is essential for photosynthesis?",
        options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Hydrogen"]
      },
      {
        question: "Who wrote 'The Theory of Evolution'?",
        options: ["Charles Darwin", "Isaac Newton", "Albert Einstein", "Gregor Mendel"]
      },
      {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"]
      },
      {
        question: "Which continent is the largest?",
        options: ["North America", "Africa", "Asia", "Europe"]
      },
      {
        question: "What is the value of Pi (π) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"]
      },
      {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Joseph Lister"]
      },
      {
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"]
      },
      {
        question: "Which is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"]
      },
      {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"]
      },
      {
        question: "Who painted 'The Starry Night'?",
        options: ["Van Gogh", "Monet", "Picasso", "Da Vinci"]
      },
      {
        question: "What is the smallest planet in our solar system?",
        options: ["Mars", "Venus", "Mercury", "Pluto"]
      },
      {
        question: "What is the chemical symbol for silver?",
        options: ["Si", "Ag", "Au", "Fe"]
      },
      {
        question: "Who invented the light bulb?",
        options: ["Tesla", "Edison", "Franklin", "Bell"]
      },
      {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Tiger"]
      },
      {
        question: "Which metal is liquid at room temperature?",
        options: ["Lead", "Iron", "Mercury", "Copper"]
      },
      {
        question: "What is the human body's largest muscle?",
        options: ["Biceps", "Gluteus Maximus", "Quadriceps", "Deltoids"]
      },
      {
        question: "Who was the first person to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"]
      },
      {
        question: "What is the boiling point of water in Celsius?",
        options: ["90°C", "95°C", "100°C", "105°C"]
      }
    ]
    const [currentquestion,setcurrentquestion] = useState(0)
    const [answeredquestions, setansweredquestions] = useState<AnsweredQuestion[]>(
      Array.from({ length: questions.length }, (_, index) => ({
        questionIndex: index,
        selectedOption: ""
      }))
    );

    

    const answeredquestionsnumber =()=>{
      return answeredquestions.filter(q => q.selectedOption !== "").length;
    }
    const isAllDone = () =>{
      return answeredquestions.every(q => q.selectedOption !== "");
    }
    const nextquestion =() =>{
      setcurrentquestion(prev=>prev+1)
    }
    const lastquestion =() =>{
      setcurrentquestion(prev=>prev-1)
    }
    const handleselectedanswers = (index: number, optionindex: number) => {
      setansweredquestions((prev) => {
        const exists = prev.findIndex(q => q.questionIndex === index);
        
        if (exists !== -1) {
          // Update existing answer
          return prev.map(q => 
            q.questionIndex === index 
              ? { ...q, selectedOption: questions[index].options[optionindex] }
              : q
          );
        } else {
          // Add new answer
          return [...prev, {
            questionIndex: index,
            selectedOption: questions[index].options[optionindex]
          }];
        }
      });
    };
    const handleSubmit = () => {
      // Sort answers by question index before submitting
      if (isAllDone() === true){
        console.log("Final Answers:", answeredquestions);

      }else{
        alert("Do every question")
      }
      
      
      
    };
    // console.log(answeredquestions)
    
    
    return(
      <div className="h-screen font-mono bg-black w-full">
        <Navbar/>
        <div className="w-full h-10 flex justify-center items-center gap-2 ">
          <div className="text-white flex mt-3 flex-col "> 
            <span>RUST Final Test</span>
            <span className="text-xs text-slate-500">Session 1</span>
          </div>
          <div className="w-4/7 h-3 ring-1 ring-amber-50 overflow-hidden border-slate-600 rounded-md ">
            <div style={{ 
            width: `${(answeredquestionsnumber() / questions.length) * 100}%` 
          }} className={`h-full bg-purple-800`}> </div>
          </div>
          <span className="text-sm"> {Math.round((answeredquestionsnumber() / questions.length) * 100)}%</span>
        </div>
        <div className="w-[80%] h-5/7 p-3 flex items-center justify-between  mx-auto  ">
       
          <Question nextquestion={nextquestion} lastquestion={lastquestion} answeredquestions={answeredquestions} handleselectedanswers={handleselectedanswers} questionname={questions[currentquestion].question} options={questions[currentquestion].options} questionnumber={currentquestion}/>
        <Questionselector answeredquestions={answeredquestions} setcurrentquestion={setcurrentquestion} questionlength={questions.length} currentquestion={currentquestion} />

        </div>
        <div className="w-[50%]  mx-auto flex items-center justify-end px-15 mt-4">
          <button onClick={handleSubmit} className={`px-2 py-2 bg-gray-700 text-white rounded-md ${isAllDone() ? "bg-purple-500 cursor-pointer hover:bg-purple-800 hover:shadow-md ":"cursor-not-allowed"}  shadow-purple-400   transition-all font-semibold  `}>Submit Test</button>
        </div>
      </div>
    )
  }
