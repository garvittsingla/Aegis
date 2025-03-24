"use client";
import { ethers } from "ethers";
import { Router } from "next/router";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
// import moment from "moment"; // For formatting AccessTime

// function StudentLogin() {
//   const [message, setMessage] = useState("");
//   const [contract, setContract] = useState(null);
// //   const []

//   //owner contract to auth student
//   const contractAddress = "";
//   const contractABI = [];

//   //student contract to fetch cid
//   const contractAddress2 = "";
//   const contractABI2 = [];

//   const authenticateUser = async (value) => {
//     setLoading(true);
//     setMessage("");
//     try {
//       if (!window.ethereum) {
//         setMessage("Metamask not installed");
//         setLoading(false);
//         return;
//       }
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
  
//       if (value.toLowerCase() !== address.toLowerCase()) {
//         setMessage("Entered public key does not match connected wallet address");
//         setLoading(false);
//         return;
//       }
  
//       const contract = new ethers.Contract(contractAddressOwner, contractABIOwner, signer);
//       setContractOwner(contract);
  
//       const studentDetails = await contract.authStudents(value);
//       if (studentDetails.isRegistered) {
//         setAuthSuccess(true);
//         const contractStudents = new ethers.Contract(contractAddressStudents, contractABIStudents, signer);
//         setContractStudents(contractStudents);
//       } else {
//         setMessage("Student not registered");
//       }
//     } catch (err) {
//       setMessage("Error connecting wallet or authenticating student");
//       console.log(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

// // contract2.fetchcid arr
// // funstion to call contract2 (student) for fetching a random cid
//     async function fetchJsonFromPinata(cid) {
//         const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
//         const data = await response.json();
//         return data;
//     }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const value = e.target.form.elements[0].value;
//     authenticateUser(value);
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
//         <h2>Enter Student Public Key</h2>
//         <input
//           type="text"
//           placeholder="Enter your Public Key"
//           className="w-70 mb-5 py-2 px-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
//         />
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="w-70 py-2 px-4 bg-purple-500 text-white font-medium rounded-md border-2 border-green-400 hover:bg-purple-600 hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-green-500/30"
//         >Submit</button>
//       </div>
// {/* // if successfull then show the questions otherwise a loading screen */}
//     </>
//   );
// }



function StudentLogin() {
	// const router = useRouter()
  // State variables
  const [isLoading, setLoading] = useState(false); // Tracks loading state
  const [isAuthSuccess, setAuthSuccess] = useState(false); // Tracks authentication success
  const [questionsData, setQuestionsData] = useState(null); // Stores fetched questions
  const [message, setMessage] = useState(""); // Displays error or status messages
  const [contractOwner, setContractOwner] = useState(null); // Owner contract instance
  const [contractStudents, setContractStudents] = useState(null); // Students contract instance
  const [quesCID, setQuesCID] = useState(""); // Stores question CID for potential answer submission
  const [quesSet_name, setQuesSet_name] = useState(""); // Stores question set name
  const [accessTime, setAccessTime] = useState(null); // Stores access time

  // Owner contract details (to authenticate student)
  const contractAddressOwner = "0x30adbefb04d58f9587338844bfab487e4aaec19c"; // Replace with actual address
  const contractABIOwner =  [
	{
		"inputs": [],
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "evaluator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "evaluatorGovID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "EvaluatorRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			}
		],
		"name": "ExamStartTimeSet",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getExamStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSettersWorkingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
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
				"internalType": "address",
				"name": "evaluator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "govID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "dateOfBirth",
				"type": "uint64"
			}
		],
		"name": "registerEvaluator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "setter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "govID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateOfBirth",
				"type": "uint256"
			}
		],
		"name": "registerSetter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateOfBirth",
				"type": "uint256"
			}
		],
		"name": "registerStudents",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "payable",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "evaluator",
				"type": "address"
			}
		],
		"name": "revokeEvaluator",
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
				"internalType": "address",
				"name": "setter",
				"type": "address"
			}
		],
		"name": "revokeSetter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "student",
				"type": "address"
			}
		],
		"name": "revokeStudent",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			}
		],
		"name": "setExamStartTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			}
		],
		"name": "setSetterWorkingTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "setter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "setterGovID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "SetterRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "SetterstartTime",
				"type": "uint256"
			}
		],
		"name": "SettersWorkingTimeSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "StudentRegistered",
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
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "action",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "UserInteraction",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
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
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SetterWorkingTime",
		"outputs": [
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
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "showUserData",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "role",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startTime",
		"outputs": [
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
		"inputs": [],
		"name": "STUDENT_REGISTRATION_FEE",
		"outputs": [
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

  // Students contract details (to fetch CID)
  const contractAddressStudents = "0xd8d2823e61356a89cc7c3244eea1fbe94ace13e3"; // Replace with actual address
  const contractABIStudents =[
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
];

  // Authenticate the student using the owner contract
  const authenticateUser = async (value) => {
    setLoading(true);
    setMessage("");
    try {
      // Check if Metamask is installed
      if (!window.ethereum) {
        setMessage("Metamask not installed");
        setLoading(false);
        return;
      }

      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Wallet connected")

      // Verify the entered public key matches the connected wallet address
      if (value.toLowerCase() !== address.toLowerCase()) {
        setMessage("Entered public key does not match connected wallet address");
        setLoading(false);
        return;
      }

      // Create owner contract instance
      const contract = new ethers.Contract(contractAddressOwner, contractABIOwner, signer);
      setContractOwner(contract);

      const contractStudents = new ethers.Contract(contractAddressStudents, contractABIStudents, signer);
        setContractStudents(contractStudents);

    //   // Call authStudents to check if the student is registered
    //   const studentDetails = await contract.authStudents(value);
    //   if (studentDetails.isRegistered) {
        // setAuthSuccess(true);
    //     // Create Students contract instance
    //     const contractStudents = new ethers.Contract(contractAddressStudents, contractABIStudents, signer);
    //     setContractStudents(contractStudents);
    //   } else {
    //     setMessage("Student not registered");
    //     setLoading(false);
    //   }
    } catch (err) {
      setMessage("Error connecting wallet or authenticating student");
      console.log(err.message);
      setLoading(false);
    }
  };

  // Fetch questions from Students contract and Pinata
  const fetchQuestions = async () => {
    setLoading(true);
    setMessage("");
    try {
      // Call getCIDfromPool to get the CID, question set name, and access time
      console.log("in fetch question")
      const val = await contractStudents.getCIDfromPool();
      setQuesCID(val[0]);
      setQuesSet_name(val[1]);
      setAccessTime(val[2]);
      console.log(val);

      // Fetch question JSON from Pinata
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${val[0]}`);
      if (!response.ok) {
        throw new Error("Failed to fetch questions from Pinata");
      }
      const questionJson = await response.json();
      if(questionJson.length === 0){
        console.log("empty content");
      }
      console.log(questionJson);
      setQuestionsData(questionJson);
	 window.location.href="./test"
    } catch (err) {
      setMessage("Error fetching questions: " + err.message);
      console.log(err.message);
      setQuestionsData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = e.target.form.elements[0].value;
    await authenticateUser(value);
  };

  // Automatically fetch questions after successful authentication
  useEffect(() => {
    if ( contractStudents) {
      fetchQuestions();
    }
  }, [isAuthSuccess, contractStudents]);

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-poppins">
    {/* Navbar */}
    <nav className="w-full bg-black/80 backdrop-blur-md py-4 px-6 flex items-center justify-between border-b border-purple-500/20">
      {/* Logo */}
      <div className="text-2xl font-bold text-white font-poppins">
        Aegis
      </div>
      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-white font-poppins hover:text-purple-400 transition-colors duration-300">About</a>
        <a href="#" className="text-white font-poppins hover:text-purple-400 transition-colors duration-300">My Tests</a>
        <a href="#" className="text-white font-poppins hover:text-purple-400 transition-colors duration-300">Tokenomics</a>
        <a href="#" className="text-white font-poppins hover:text-purple-400 transition-colors duration-300">Airdrop</a>
      </div>
      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  
    {/* Main Content */}
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
      {/* Neon Glow Circles (Decorative SVGs) */}
      <svg className="absolute top-20 left-5 w-12 h-12 opacity-40 hidden md:block" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#00FF00" strokeWidth="4" fill="none" className="animate-pulse" style={{ filter: "drop-shadow(0 0 12px #00FF00)" }} />
      </svg>
      <svg className="absolute bottom-5 right-5 w-16 h-16 opacity-40 hidden md:block" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#A855F7" strokeWidth="4" fill="none" className="animate-pulse" style={{ filter: "drop-shadow(0 0 12px #A855F7)" }} />
      </svg>
  
      {isLoading ? (
        // Loading Screen
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" style={{ filter: "drop-shadow(0 0 8px #00FF00)" }}></div>
          <p className="text-white text-lg font-medium font-poppins">
            Loading<span className="text-green-400">...</span>
          </p>
        </div>
      ) : questionsData ? (
        // Questions Display
        <div className="w-full max-w-md bg-gray-900/30 p-4 sm:p-6 rounded-lg border border-purple-500/20 backdrop-blur-lg">
          <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 font-poppins flex items-center">
            Questions
            <svg className="ml-2 w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #00FF00)" }}>
              <path d="M12 2v4m0 12v4m-4-8H4m16 0h-4m-1.66-5.66l2.83-2.83m-2.83 12.49l2.83-2.83M6.83 6.83l-2.83 2.83m2.83 12.49l-2.83-2.83" />
            </svg>
          </h2>
          <p className="text-white text-base sm:text-lg mb-2 font-poppins">
            <span className="text-green-400">Question Set:</span> {quesSet_name}
          </p>
          <p className="text-white text-base sm:text-lg mb-4 font-poppins">
            <span className="text-green-400">Access Time:</span> {accessTime}
          </p>
          <ul className="list-disc list-inside text-white space-y-2 font-poppins">
            {Array.isArray(questionsData) ? (
              questionsData.map((question, index) => (
                <li key={index} className="text-sm sm:text-lg">
                  {question}
                </li>
              ))
            ) : (
              <li className="text-sm sm:text-lg">No questions available</li>
            )}
          </ul>
        </div>
      ) : (
        // Form for Entering Public Key
        <div className="w-full max-w-md bg-gray-900/30 p-4 sm:p-6 rounded-lg border border-purple-500/20 backdrop-blur-lg">
          <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 font-poppins flex items-center">
            Enter Student Public Key
            <svg className="ml-2 w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #00FF00)" }}>
              <path d="M12 2v4m0 12v4m-4-8H4m16 0h-4m-1.66-5.66l2.83-2.83m-2.83 12.49l2.83-2.83M6.83 6.83l-2.83 2.83m2.83 12.49l-2.83-2.83" />
            </svg>
          </h2>
          {message && (
            <p className="text-red-400 text-base sm:text-lg font-medium mb-4 font-poppins">{message}</p>
          )}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your Public Key"
              className="w-full py-2 px-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300 text-sm sm:text-base"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 sm:py-3 px-4 sm:px-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg border border-purple-400 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 font-poppins text-sm sm:text-base"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  </div>
  );
}

export default StudentLogin;