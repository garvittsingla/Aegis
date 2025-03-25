'use client';
import React, { useState, useRef } from 'react';
import { ethers } from 'ethers';
import { Plus, Send, X } from 'lucide-react';
import axios from 'axios';

// Define types
interface QuestionItem {
  question: string;
  options: string[];
}

export default function ExamSetter() {
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [questionSet, setQuestionSet] = useState<QuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['']);
  const [cid, setCid] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [setName, setSetName] = useState('');
  const [accessTime, setAccessTime] = useState('');

  // Pinata API keys
  const PINATA_API_KEY = "34e5a156dcda211cc4f4";
  const PINATA_SECRET_KEY = "96406ebf4e15091bb9878ff7c58970ea4731465d78bdb200369ec52233fce8d8";
  const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMmY1NWJhOS1mNmE1LTRiNzMtODg3MC1mZjI3YTBmMDc4NzMiLCJlbWFpbCI6ImthcnRpazExODIuYmVjc2UyNEBjaGl0a2FyYS5lZHUuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzRlNWExNTZkY2RhMjExY2M0ZjQiLCJzY29wZWRLZXlTZWNyZXQiOiI5NjQwNmViZjRlMTUwOTFiYjk4NzhmZjdjNTg5NzBlYTQ3MzE0NjVkNzhiZGIyMDAzNjllYzUyMjMzZmNlOGQ4IiwiZXhwIjoxNzc0MjcwMzczfQ.OMsCboJ-0_JrAf6P7KPrAGb9iN3kHUDvd2N3VI6nDE0";

  // Contract details
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

  // Connect to wallet
  async function connectWallet() {
    try {
      // @ts-ignore
      if (!window.ethereum) {
        alert("Metamask not installed! Please install Metamask to continue.");
        return;
      }
      
      // Request account access
      // @ts-ignore
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // @ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      // Create contract instance
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
      setWalletAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  }

  // Handle question input change
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentQuestion(e.target.value);
  };

  // Handle option input change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    setCurrentOptions(newOptions);
  };

  // Add a new option input field
  const addOptionField = () => {
    setCurrentOptions([...currentOptions, '']);
  };

  // Remove an option
  const removeOption = (index: number) => {
    if (currentOptions.length > 1) {
      const newOptions = currentOptions.filter((_, i) => i !== index);
      setCurrentOptions(newOptions);
    }
  };

  // Add current question and options to the question set
  const addQuestionToSet = () => {
    if (!currentQuestion.trim()) {
      alert("Please enter a question");
      return;
    }
    
    const filteredOptions = currentOptions.filter(opt => opt.trim() !== '');
    if (filteredOptions.length === 0) {
      alert("Please add at least one option");
      return;
    }

    const newQuestion: QuestionItem = {
      question: currentQuestion,
      options: filteredOptions
    };

    setQuestionSet([...questionSet, newQuestion]);
    setCurrentQuestion('');
    setCurrentOptions(['']);
  };

  // Upload to Pinata and get CID
  const uploadToPinata = async (data: any) => {
    try {
      console.log("Data being uploaded to Pinata:", data);
      
      // Prepare request body with data and metadata
      const requestBody = {
        pinataContent: data,
        pinataMetadata: {
          name: `Exam Set - ${setName}`,
          keyvalues: {
            timestamp: Date.now().toString()
          }
        }
      };
      
      // Make a direct API call to Pinata to pin JSON
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
      console.log("Received CID from Pinata:", cidString);
      
      // Verify the uploaded content
      const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${cidString}`;
      console.log("Content can be verified at:", gatewayUrl);
      
      // Get the content to verify it was uploaded correctly
      try {
        const verificationResponse = await axios.get(gatewayUrl);
        console.log("Content retrieved from Pinata:", verificationResponse.data);
        
        // Compare with original data
        const originalJson = JSON.stringify(data);
        const retrievedJson = JSON.stringify(verificationResponse.data);
        const matches = originalJson === retrievedJson;
        
        console.log("Original data matches retrieved data:", matches);
        if (!matches) {
          console.log("Original:", originalJson);
          console.log("Retrieved:", retrievedJson);
        }
      } catch (verifyError) {
        console.error("Error verifying content:", verifyError);
      }
      
      return cidString;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      throw error;
    }
  };

  // Handle set name change
  const handleSetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetName(e.target.value);
  };

  // Handle access time change
  const handleAccessTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessTime(e.target.value);
  };

  // Submit the entire question set
  const submitSet = async () => {
    if (questionSet.length === 0) {
      alert("Please add at least one question to the set");
      return;
    }

    if (!setName.trim()) {
      alert("Please enter a set name");
      return;
    }

    if (!accessTime.trim()) {
      alert("Please enter set access time");
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload to Pinata
      const cidString = await uploadToPinata(questionSet);
      setCid(cidString);
      
      // Calculate Unix timestamp for unlock time
      const unlockTime = Math.floor(new Date(accessTime).getTime() / 1000);
      
      // Send to contract if we have a contract instance
      if (contract) {
        try {
          const transaction = await contract.appendQuestionCID({
            cidString,
            setName,
            unlockTime
          });
          
          await transaction.wait();
          console.log("Transaction confirmed on blockchain");
        } catch (contractError) {
          console.error("Contract interaction error:", contractError);
          alert("Contract interaction failed. Check console for details.");
        }
      }

      alert(`Question set uploaded successfully! CID: ${cidString}`);
      setQuestionSet([]);
      setIsUploading(false);
      
      // Store CID in localStorage for the test page to use
      localStorage.setItem('examCID', cidString);
      
      // Provide a way to navigate to the test page
      const goToTest = window.confirm("Would you like to go to the test page now?");
      if (goToTest) {
        window.location.href = `/test?cid=${cidString}`;
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
      alert("Failed to submit questions. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-[poppins]">
      {/* Header */}
      <nav className="h-20 flex items-center px-6 w-[80%] mx-auto">
        <h1 className="text-xl font-[boldonse]">Aegis</h1>
      </nav>

      {!isConnected ? (
        <div className="w-full h-96 flex items-center flex-col gap-5 justify-center">
          <h1 className="font-[poppins] text-2xl font-semibold">Connect your wallet to set exam questions</h1>
          <button 
            onClick={connectWallet} 
            className="py-2 px-6 bg-purple-500 text-white font-medium rounded-md border-2 hover:bg-purple-600 transition-all duration-300 shadow-md"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Exam Setter</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Setter Public Key</span>
              <span className="text-xs text-gray-400 truncate max-w-[150px]">{walletAddress}</span>
            </div>
          </div>

          {/* Question Input */}
          <div className="border border-teal-800/30 rounded-lg p-4 mb-6 backdrop-blur-md bg-gray-900/20">
            <textarea
              placeholder="Enter the question"
              value={currentQuestion}
              onChange={handleQuestionChange}
              className="w-full p-3 mb-4 bg-transparent border border-teal-800/30 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows={3}
            />

            {/* Options */}
            {currentOptions.map((option, index) => (
              <div key={index} className="flex mb-4 gap-2">
                <input
                  type="text"
                  placeholder={`Input option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 p-3 bg-transparent border border-teal-800/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                {index === currentOptions.length - 1 ? (
                  <button
                    onClick={addOptionField}
                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => removeOption(index)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-red-900/50 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addQuestionToSet}
              className="w-full py-3 bg-teal-800/50 hover:bg-teal-700/50 rounded-lg transition-colors"
            >
              Add Question to the set
            </button>
          </div>

          {/* Question List */}
          {questionSet.length > 0 && (
            <div className="border border-teal-800/30 rounded-lg p-4 mb-6 backdrop-blur-md bg-gray-900/20">
              <h3 className="text-xl mb-4">Questions Added: {questionSet.length}</h3>
              <div className="max-h-60 overflow-y-auto">
                {questionSet.map((q, idx) => (
                  <div key={idx} className="mb-4 p-3 border border-teal-800/30 rounded-lg">
                    <p className="font-medium mb-2">Q{idx + 1}: {q.question}</p>
                    <ul className="pl-4">
                      {q.options.map((opt, optIdx) => (
                        <li key={optIdx} className="text-gray-300 text-sm">• {opt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Set Information */}
          <div className="border border-teal-800/30 rounded-lg p-4 mb-6 backdrop-blur-md bg-gray-900/20">
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Set Name</label>
              <input
                type="text"
                placeholder="Enter exam set name"
                value={setName}
                onChange={handleSetNameChange}
                className="w-full p-3 bg-transparent border border-teal-800/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Access Time (When the exam should be available)</label>
              <input
                type="datetime-local"
                value={accessTime}
                onChange={handleAccessTimeChange}
                className="w-full p-3 bg-transparent border border-teal-800/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* CID Display */}
          {cid && (
            <div className="border border-teal-800/30 rounded-lg p-4 mb-6 backdrop-blur-md bg-gray-900/20">
              <h3 className="text-xl mb-2">Content ID Received:</h3>
              <p className="font-mono text-sm break-all bg-black/30 p-3 rounded">{cid}</p>
            </div>
          )}

          {/* Submit Set Button */}
          <button
            onClick={submitSet}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            disabled={questionSet.length === 0 || isUploading}
          >
            {isUploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <span>Submit Set</span>
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
} 
