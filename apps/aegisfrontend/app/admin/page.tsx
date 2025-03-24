"use client";
import React, { useState } from "react";
import { ethers } from "ethers";

export default function Page(){
    const [isconnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);

  // Status messages
  const [message, setMessage] = useState("");

  // Exam start time state
  const [examStartTime, setExamStartTime] = useState("");

  // Setter fields
  const [setterAddress, setSetterAddress] = useState("");
  const [setterName, setSetterName] = useState("");
  const [setterGovID, setSetterGovID] = useState("");
  const [setterAadhar, setSetterAadhar] = useState("");
  const [setterDOB, setSetterDOB] = useState("");

  const contractAddress = "0x30adbefb04d58f9587338844bfab487e4aaec19c";
  const contractABI = [
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

  async function connectWallet() {
      //@ts-ignore

    if (!window.ethereum) {
      setMessage("Metamask not installed");
      return;
    }

    // requesting metamask connection
      //@ts-ignore

    await window.ethereum.request({ method: "eth_requestAccounts" });
      //@ts-ignore

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
      //@ts-ignore

    setContract(contract);

    setIsConnected(true);
  }

  const handleExamStart = async () => {
    if (!isconnected || !contract) {
      setMessage("Wallet not connected");
      return;
    }

    try {
      // Convert date string to Unix timestamp (seconds)
      const timestamp = Math.floor(new Date(examStartTime).getTime() / 1000);

      if (isNaN(timestamp) || timestamp <= Math.floor(Date.now() / 1000)) {
        setMessage("Please enter a valid future date and time");
        return;
      }

      // Call contract method
      //@ts-ignore

      const tx = await contract.setExamStartTime(timestamp);
      await tx.wait();
    } catch (err) {
      setMessage("Error setting exam start time");
      //@ts-ignore

      console.log(err.message);
    }
  };

  const handleAddSetter = async () => {
    if (!isconnected || !contract) {
      setMessage("Please connect wallet first");
      return;
    }

    try {
      setMessage("Registering exam setter...");
      if (!setterName || !setterGovID || !setterAadhar || !setterDOB) {
        setMessage("Please fill all setter fields");
        return;
      }

      const dobTimestamp = Math.floor(new Date(setterDOB).getTime() / 1000);
      //@ts-ignore

      const tx = await contract.registerSetter(
        setterAddress,
        setterName,
        setterGovID,
        setterAadhar,
        dobTimestamp
      );
      await tx.await();
    } catch (err) {
      setMessage("Please fill all setter fields");
      //@ts-ignore

      console.log(err.message);
    }
  };

// can add evaluator function as well

  return (
    <>
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
      
      <svg className="absolute bottom-5 right-5 w-16 h-16 opacity-40" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#A855F7" strokeWidth="4" fill="none" className="animate-pulse" style={{ filter: "drop-shadow(0 0 12px #A855F7)" }} />
      </svg>
        <div className="text-white text-2xl font-[boldonse]  w-full">Aegis</div>
      <div className="w-full max-w-lg bg-gray-900/30 p-5 rounded-lg border border-purple-500/20 backdrop-blur-lg mb-8">
        {!isconnected ? (
          <button
            onClick={connectWallet}
            className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg border border-purple-400 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 font-poppins"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-center">
            <span className="text-green-400 font-semibold font-poppins">Wallet Connected</span>
          </div>
        )}
      </div>
  
      {/* Main Heading */}
      <h1 className="text-5xl font-bold text-white mb-10 tracking-wider font-poppins flex items-center">
        Owner Dashboard
        <svg className="ml-3 w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px #00FF00)" }}>
          <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2a8 8 0 0 0-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm0 4v4l4 2" />
        </svg>
      </h1>
  
      {/* Side-by-Side Sections */}
      <div className="w-full max-w-5xl flex flex-row gap-6">
        {/* Start the Exam Section */}
        <div className="flex-1 bg-gray-900/30 p-6 rounded-lg border border-purple-500/20 backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-white mb-4 font-poppins flex items-center">
            Start the Exam
            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #A855F7)" }}>
              <path d="M12 2v4m0 12v4m-4-8H4m16 0h-4m-1.66-5.66l2.83-2.83m-2.83 12.49l2.83-2.83M6.83 6.83l-2.83 2.83m2.83 12.49l-2.83-2.83" />
            </svg>
          </h2>
          <input
            type="datetime-local"
            value={examStartTime}
            onChange={(e) => setExamStartTime(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300"
          />
          <button
            onClick={handleExamStart}
            className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg border border-purple-400 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 font-poppins"
          >
            Start Exam
          </button>
        </div>
  
        {/* Add Exam Setter Section */}
        <div className="flex-1 bg-gray-900/30 p-6 rounded-lg border border-purple-500/20 backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-white mb-4 font-poppins flex items-center">
            Add Exam Setter
            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #00FF00)" }}>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0m4 0h10m-5-5v10" />
            </svg>
          </h2>
          <input
            type="text"
            placeholder="Enter exam setter address"
            value={setterAddress}
            onChange={(e) => setSetterAddress(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Enter name"
            value={setterName}
            onChange={(e) => setSetterName(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Enter Government ID"
            value={setterGovID}
            onChange={(e) => setSetterGovID(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Enter Aadhar Number"
            value={setterAadhar}
            onChange={(e) => setSetterAadhar(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={setterDOB}
            onChange={(e) => setSetterDOB(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300"
          />
          <button
            onClick={handleAddSetter}
            className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg border border-purple-400 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 font-poppins"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </>
  );
}