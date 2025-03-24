"use client";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const { register, handleSubmit, reset } = useForm();

  const [student, setStudent] = useState();
  const [status, setStatus] = useState("");
      //@ts-ignore

  const handlesetStatus = (msg) => {
    setStatus(msg);
  };

  const sampleDetails = {
    student: "0xc016773A2f734594b0f07aC46986fA3282f0373c",
    name: "Kartik",
    studentID: "123456",
    aadharNumber: "827498529482",
    dateofBirth: "1742779250",
  };

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
  ];
  const StudentRegistrationFees = ethers.parseEther("0.00025");
      //@ts-ignore

  const registerStudent = async (data) => {
      //@ts-ignore

    if (!window.ethereum) {
      handlesetStatus("Please install MetaMask!");
      return;
    }

    try {
      // requesting metamask connection
      //@ts-ignore

      await window.ethereum.request({ method: "eth_requestAccounts" });
      //@ts-ignore

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const { student, name, studentID, aadharNumber, dateOfBirth } = data;

      if (!student || !name || !studentID || !aadharNumber || !dateOfBirth) {
        handlesetStatus("Please fill all fields.");
        return;
      }

      const dateofBirthTimestamp = Math.floor(
        new Date(dateOfBirth).getTime() / 1000
      );

// sample comparing
      if (
        sampleDetails.name === name &&
        sampleDetails.studentID === studentID &&
        sampleDetails.aadharNumber === aadharNumber &&
      //@ts-ignore

        sampleDetails.dateofBirth === dateofBirthTimestamp
      ) {
        handlesetStatus("Student already exists!");
      }

      handlesetStatus("Waiting for MetaMask confirmation...");

      // Send Transaction
      const transaction = await contract.registerStudents(
        student,
        name,
        studentID,
        aadharNumber,
        dateofBirthTimestamp,
        { value: StudentRegistrationFees }
      );

      //Waiting for transaction confirmation
      const receipt = await transaction.wait();
      console.log(receipt);
      handlesetStatus(
        `Registration Successfull! Transaction Hash: ${receipt.transactionHash}`
      );

      contract.on("StudentRegistered", (student, studentID, timestamp) => {
        console.log(
          `Student ${student} registered with ID ${studentID} at ${timestamp}`
        );
      });

      //navigate to next page
    } catch (err) {
      console.error("Transaction failed: ", err);
      //@ts-ignore

      handlesetStatus(`Student Already Registered`);
    }
};
      //@ts-ignore

  const onSubmit = (data) => {
    setStudent(data);
    registerStudent(data)
    console.log(data);
    reset();
  };

  return (
    <>
  <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-poppins">
    {/* Navbar */}
    <nav className="w-full bg-black/80 backdrop-blur-md py-4 px-6 flex items-center justify-between border-b border-purple-500/20">
      {/* Logo */}
      <div className="text-xl font-bold text-white font-[boldonse]">
      <Link href="./link">
        Aegis
      </Link>
      </div>
      
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>

    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
      
      <svg className="absolute bottom-5 right-5 w-16 h-16 opacity-40 hidden md:block" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#A855F7" strokeWidth="4" fill="none" className="animate-pulse" style={{ filter: "drop-shadow(0 0 12px #A855F7)" }} />
      </svg>

      {/* Form Container */}
      <div className="bg-gray-900/30 rounded-lg p-6 sm:p-8 w-full max-w-md backdrop-blur-lg border border-purple-500/20">
        <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center font-poppins flex items-center justify-center">
          Student Details
          <svg className="ml-2 w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #00FF00)" }}>
            <path d="M12 2v4m0 12v4m-4-8H4m16 0h-4m-1.66-5.66l2.83-2.83m-2.83 12.49l2.83-2.83M6.83 6.83l-2.83 2.83m2.83 12.49l-2.83-2.83" />
          </svg>
        </h2>

        <h4 className="text-green-400 text-center font-poppins mb-4">{status}</h4>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full justify-center gap-4"
        >
          <label className="text-gray-300 text-sm sm:text-base font-poppins">Student Public Key</label>
          <input
            type="text"
            {...register("student")}
            required
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          />

          <label className="text-gray-300 text-sm sm:text-base font-poppins">Student Name</label>
          <input
            type="text"
            {...register("name")}
            required
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          />

          <label className="text-gray-300 text-sm sm:text-base font-poppins">StudentID</label>
          <input
            type="text"
            {...register("studentID")}
            required
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          />

          <label className="text-gray-300 text-sm sm:text-base font-poppins">Aadhar Card Number</label>
          <input
            type="text"
            {...register("aadharNumber")}
            required
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          />

          <label className="text-gray-300 text-sm sm:text-base font-poppins">Date of Birth</label>
          <input
            type="date"
            placeholder="dd/mm/yy"
            {...register("dateOfBirth")}
            required
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          />

          <label className="text-gray-300 text-sm sm:text-base font-poppins">Qualification</label>
          <select
            {...register("Qualification")}
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          >
            <option>10th</option>
            <option>12th</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>

          <label className="text-gray-300 text-sm sm:text-base font-poppins">
            Percentage Scored in last qualification
          </label>
          <input
            type="text"
            {...register("Percentage")}
            required
            className="bg-gray-800/20 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 font-poppins text-sm sm:text-base"
          />

          <input
            type="submit"
            className="mt-4 sm:mt-7 text-base sm:text-xl font-semibold px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg border border-purple-400 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 font-poppins"
          />
        </form>
      </div>
    </div>
  </div>
</>
  );
}

