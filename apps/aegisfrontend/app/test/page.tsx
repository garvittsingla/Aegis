"use client"
import { div } from "framer-motion/client";
import Navbar from "../_components/Navbar";
import Question from "../_components/Question";
import Questionselector from "../_components/Questionselector";
import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

interface AnsweredQuestion {
  questionIndex: number;
  selectedOption: string;
}

interface QuestionItem {
  question: string;
  options: string[];
}

interface SubmissionData {
  studentPublicKey: string;
  examCID: string;
  answers: AnsweredQuestion[];
  timestamp: number;
}

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [studentPublicKey, setStudentPublicKey] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCID, setSubmissionCID] = useState<string | null>(null);

  // Pinata API keys
  const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMmY1NWJhOS1mNmE1LTRiNzMtODg3MC1mZjI3YTBmMDc4NzMiLCJlbWFpbCI6ImthcnRpazExODIuYmVjc2UyNEBjaGl0a2FyYS5lZHUuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzRlNWExNTZkY2RhMjExY2M0ZjQiLCJzY29wZWRLZXlTZWNyZXQiOiI5NjQwNmViZjRlMTUwOTFiYjk4NzhmZjdjNTg5NzBlYTQ3MzE0NjVkNzhiZGIyMDAzNjllYzUyMjMzZmNlOGQ4IiwiZXhwIjoxNzc0MjcwMzczfQ.OMsCboJ-0_JrAf6P7KPrAGb9iN3kHUDvd2N3VI6nDE0";
  const studentContract = "0x62b3e601cc72289a0165cb404c94d64b38573b6f";

  const studentABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_questionBankAddress",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "_adminContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AccessControlBadConfirmation",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "neededRole",
          "type": "bytes32"
        }
      ],
      "name": "AccessControlUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "callerConfirmation",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "paperSubmitted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "quesCID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ansCID",
          "type": "string"
        }
      ],
      "name": "submitPaper",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "AdminContract",
      "outputs": [
        {
          "internalType": "contract RoleBasedAccess",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "EXAM_EVALUATOR_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "EXAM_SETTER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCIDfromPool",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "STUDENT_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  
  // Function to connect wallet and get student's public key
  const connectWallet = async () => {
    try {
      // @ts-ignore
      if (!window.ethereum) {
        alert("Please install MetaMask to continue");
        return false;
      }
      
      // @ts-ignore
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // @ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setStudentPublicKey(address);
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
      return false;
    }
  };

  // Function to upload submission to Pinata
  const uploadSubmissionToPinata = async (submissionData: SubmissionData): Promise<string> => {
    try {
      console.log("Uploading submission to Pinata:", submissionData);
      
      // Prepare request body with data and metadata
      const requestBody = {
        pinataContent: submissionData,
        pinataMetadata: {
          name: `Exam Submission - ${submissionData.studentPublicKey}`,
          keyvalues: {
            timestamp: Date.now().toString(),
            examCID: submissionData.examCID
          }
        }
      };
      
      // Make API call to Pinata
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PINATA_JWT}`
          }
        }
      );
      
      const cidString = response.data.IpfsHash;
      console.log("Submission uploaded to Pinata successfully. CID:", cidString);
      return cidString;
    } catch (error) {
      console.error("Error uploading submission to Pinata:", error);
      throw error;
    }
  };

  // Function to fetch questions from Pinata using CID
  const fetchQuestionsFromPinata = async (cid: string) => {
    try {
      setLoading(true);
      const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
      console.log("Fetching questions from:", gatewayUrl);
      
      const response = await axios.get(gatewayUrl);
      console.log("Questions fetched successfully:", response.data);
      
      // Validate that the response has the expected structure
      if (Array.isArray(response.data)) {
        setQuestions(response.data);
        
        // Initialize answered questions array with empty selections
        setAnsweredQuestions(
          Array.from({ length: response.data.length }, (_, index) => ({
            questionIndex: index,
            selectedOption: ""
          }))
        );
      } else {
        console.error("Unexpected data format:", response.data);
        setError("The questions data is not in the expected format.");
        // Fallback to default questions if there's an issue
        useFallbackQuestions();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions. Using default set.");
      // Fallback to default questions if there's an error
      useFallbackQuestions();
    } finally {
      setLoading(false);
    }
  };

  // Use hardcoded questions as fallback
  const useFallbackQuestions = () => {
    const fallbackQuestions = [
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
      }
    ];
    
    setQuestions(fallbackQuestions);
    setAnsweredQuestions(
      Array.from({ length: fallbackQuestions.length }, (_, index) => ({
        questionIndex: index,
        selectedOption: ""
      }))
    );
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Connect wallet to get student's public key
    connectWallet();
    
    // Get CID from URL query parameters, localStorage, or use a default CID
    const getCID = () => {
      // Try to get CID from URL parameters
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const cidFromUrl = params.get('cid');
        
        if (cidFromUrl) {
          return cidFromUrl;
        }
        
        // Try to get CID from localStorage
        const cidFromStorage = localStorage.getItem('examCID');
        if (cidFromStorage) {
          return cidFromStorage;
        }
      }
      
      // Default CID - Replace with a known good CID from your exams
      // You should update this with a CID you've tested
      return "QmaJpXZUbBXGa4DjsJzN3KNUHU5PkgTUv8qx7qy6ASyKeE";
    };
    
    // Get CID and fetch questions
    const cid = getCID();
    if (cid) {
      fetchQuestionsFromPinata(cid);
    } else {
      useFallbackQuestions();
    }
  }, []);

  if (!isMounted) return null;
  
  if (loading) {
    return (
      <div className="h-screen font-[poppins] bg-black w-full flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
        <div className="text-white text-xl">Loading questions...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen font-[poppins] bg-black w-full flex items-center justify-center flex-col gap-4">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <div className="text-white">Using fallback questions instead.</div>
        {questions.length === 0 && (
          <button 
            onClick={useFallbackQuestions}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Load Fallback Questions
          </button>
        )}
      </div>
    );
  }

  // If already submitted and showing results
  if (submitted && submissionCID) {
    return (
      <div className="h-screen font-[poppins] bg-black w-full flex items-center justify-center flex-col gap-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-white">Test Submitted Successfully!</h1>
        <p className="text-gray-400">Your answers have been uploaded to IPFS</p>
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
          <p className="text-gray-300 mb-2">Submission CID:</p>
          <p className="font-mono text-sm text-purple-400 break-all">{submissionCID}</p>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  const answeredQuestionsNumber = () => {
    return answeredQuestions.filter(q => q.selectedOption !== "").length;
  };
  
  const isAllDone = () => {
    return answeredQuestions.every(q => q.selectedOption !== "");
  };
  
  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
  };
  
  const lastQuestion = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const handleSelectedAnswers = (index: number, optionIndex: number) => {
    setAnsweredQuestions((prev) => {
      const exists = prev.findIndex(q => q.questionIndex === index);
      
      if (exists !== -1) {
        // Update existing answer
        return prev.map(q => 
          q.questionIndex === index 
            ? { ...q, selectedOption: questions[index].options[optionIndex] }
            : q
        );
      } else {
        // Add new answer
        return [...prev, {
          questionIndex: index,
          selectedOption: questions[index].options[optionIndex]
        }];
      }
    });
  };
  
  const handleSubmit = async () => {
    if (!isAllDone()) {
      alert("Please answer all questions before submitting");
      return;
    }
    
    // If wallet not connected, try to connect
    if (!studentPublicKey) {
      const connected = await connectWallet();
      if (!connected) {
        alert("Please connect your wallet to submit answers");
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      
      // Get the exam CID
      const examCID = 
        new URLSearchParams(window.location.search).get('cid') || 
        localStorage.getItem('examCID') || 
        "QmaJpXZUbBXGa4DjsJzN3KNUHU5PkgTUv8qx7qy6ASyKeE";
      
      // Prepare submission data
      const submissionData: SubmissionData = {
        studentPublicKey,
        examCID,
        answers: answeredQuestions,
        timestamp: Date.now()
      };
      
      console.log("Final Submission Data:", submissionData);
      
      // Upload answers to Pinata
      const cid = await uploadSubmissionToPinata(submissionData);
      setSubmissionCID(cid);
      
      // Clear localStorage
      localStorage.removeItem('examCID');
      
      // Mark as submitted
      setSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    //@ts-ignore
    //@ts-ignore
    //@ts-ignore
    <div className="h-screen font-[poppins] bg-black w-full ">
      <Navbar/>
      <div>
        
      </div>
      <div className="w-full h-10 flex justify-center items-center gap-5 ">
        <div className="text-white flex mt-3 flex-col font-[poppins]"> 
          <span >Rust Final Test</span>
          <span className="text-xs text-slate-500">Session 1</span>
        </div>
        <div className="w-4/7 h-3 ring-1 ring-amber-50 overflow-hidden border-slate-600 rounded-md ">
          <div style={{ 
          width: `${(answeredQuestionsNumber() / questions.length) * 100}%` 
        }} className={`h-full bg-purple-800 shadow-2xl shadow-purple-600`}> </div>
        </div>
        <span className="text-sm"> {Math.round((answeredQuestionsNumber() / questions.length) * 100)}%</span>
      </div>
      {questions.length > 0 && (
        <div className="w-[80%] h-5/7 p-3 flex items-center justify-between mx-auto">
          <Question 
            className={"mt-3"} 
            nextquestion={nextQuestion} 
            lastquestion={lastQuestion} 
            answeredquestions={answeredQuestions} 
            handleselectedanswers={handleSelectedAnswers} 
            questionname={questions[currentQuestion].question} 
            options={questions[currentQuestion].options} 
            questionnumber={currentQuestion}
          />
          <div className="h-[80%] w-[1px] bg-white/10"></div>
          
          <Questionselector 
            answeredquestions={answeredQuestions} 
            setcurrentquestion={setCurrentQuestion}  
            questionlength={questions.length} 
            currentquestion={currentQuestion} 
          />
        </div>
      )}
      <div className="w-[50%] mx-auto flex items-center justify-end px-15 mt-4">
        <button 
          onClick={handleSubmit} 
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            isSubmitting 
              ? "bg-gray-600 cursor-wait" 
              : isAllDone() 
                ? "bg-purple-500 cursor-pointer hover:bg-purple-800 hover:shadow-md" 
                : "bg-gray-700 cursor-not-allowed"
          } shadow-purple-400 transition-all font-semibold text-white`}
          disabled={isSubmitting || !isAllDone()}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Test</span>
          )}
        </button>
      </div>
    </div>
  );
}
