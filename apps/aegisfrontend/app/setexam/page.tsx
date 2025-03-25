"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
// import TeacherUplaod from "../_components/TeacherUpload";


export default function Page() {
    const [isconnected, setIsConnected] = useState(false);
    const[contract, setcontract] = useState();
  
  
    const contractAddress = "0xf45094ab0c3260a2a1ba3f5bfe0a73592b24d90e";
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_AdminContractAddress",
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
                    "internalType": "string",
                    "name": "QuesCID",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "SetsName",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "unlockTime",
                    "type": "uint256"
                }
            ],
            "name": "appendQuestionCID",
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
                    "name": "setterName",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "CIDno",
                    "type": "string"
                }
            ],
            "name": "CIDAppended",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "CIDarr",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "CIDindx",
                    "type": "uint32"
                }
            ],
            "name": "getCIDarrElement",
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
            "inputs": [],
            "name": "getCIDArrLen",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
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
            "inputs": [
                {
                    "internalType": "string",
                    "name": "quesCID",
                    "type": "string"
                }
            ],
            "name": "showCIDpool",
            "outputs": [
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
     

            {/* <p className="font-semibold text-xl">Wallet Connected:  {window.ethereum.selectedAddress}</p> */}

            </div>
            {/* <TeacherUplaod contract = {contract}/> */}
          </div>
        )}
      </div>
      </>
    );
  }
