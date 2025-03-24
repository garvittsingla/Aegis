"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import TeacherUplaod from "../_components/TeacherUpload";


export default function Page() {
    const [isconnected, setIsConnected] = useState(false);
    const[contract, setcontract] = useState();
  
  
    const contractAddress = "0x0d3f20d4a9c7b2a6cff5fb836815a7a86350b438";
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
                  "internalType": "uint64",
                  "name": "startTime",
                  "type": "uint64"
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
                  "internalType": "uint64",
                  "name": "",
                  "type": "uint64"
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
                  "internalType": "uint64",
                  "name": "dateOfBirth",
                  "type": "uint64"
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
                  "internalType": "uint64",
                  "name": "_startTime",
                  "type": "uint64"
              }
          ],
          "name": "setExamStartTime",
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
          "name": "OWNER_ROLE",
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
                  "internalType": "uint64",
                  "name": "",
                  "type": "uint64"
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
  
    async function connectWallet() {
      //@ts-ignore

      if (!window.ethereum) {
        console.log("Metamask not installed");
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

      setcontract(contract);
  
      setIsConnected(true);
    }
  
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b bg-black ">
        {!isconnected ? (
            <div className="">
                <div className="text-white w-[80%] mx-auto h-20 flex items-center   ">
                    <div className="left  ">
                        <h1 className="font-[boldonse] text-xl">Aegis</h1>
                    </div>
                </div>
                <div className="w-full h-96  flex items-center flex-col gap-5 justify-center">
                    <h1 className="font-[poppins] text-white text-2xl font-semibold">Connect your wallet to Get started</h1>
            <button onClick={connectWallet} className=" py-2 px-6 bg-purple-500 text-white font-medium rounded-md border-2  hover:bg-purple-600  transition-all duration-300 shadow-md  disabled:opacity-50">Connect Wallet</button>

                </div>
          </div>
        ) : (
          <div className="text-center ">
            <div className="h-20  flex items-center justify-center text-white">
      //@ts-ignore
      //@ts-ignore

            {/* <p className="font-semibold text-xl">Wallet Connected:  {window.ethereum.selectedAddress}</p> */}

            </div>
            <TeacherUplaod contract = {contract}/>
          </div>
        )}
      </div>
      </>
    );
  }