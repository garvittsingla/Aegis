'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { ethers } from 'ethers';

export default function StudentDashboardRoot() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [examCID, setExamCID] = useState<string | null>(null);

  // Check for exam CID in localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCID = localStorage.getItem('examCID');
      if (storedCID) {
        setExamCID(storedCID);
        console.log("Found exam CID in localStorage:", storedCID);
      }
    }
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      // @ts-ignore
      if (!window.ethereum) {
        alert("Please install MetaMask to continue");
        setIsConnecting(false);
        return;
      }
      
      // @ts-ignore
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // @ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      console.log("Connected wallet address:", address);
      
      // Redirect to student's specific dashboard
      router.push(`/studentdashboard/${address}`);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-[poppins]">
      {/* Header */}
      <nav className="h-20 flex items-center justify-between px-6 w-[80%] mx-auto">
        <h1 className="text-xl font-bold">Aegis</h1>
      </nav>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <div className="max-w-md w-full p-6 backdrop-blur-md bg-gray-800/20 border border-gray-700/30 
                   rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">Student Dashboard</h2>
            <p className="text-gray-400">Connect your wallet to access your exams and dashboard</p>
          </div>

          {examCID && (
            <div className="mb-6 p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-green-400 w-3 h-3 rounded-full mr-2"></span>
                <h3 className="text-green-400">Exam Available</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">You have an active exam ready to take.</p>
              <button 
                onClick={() => router.push(`/test?cid=${examCID}`)}
                className="w-full py-2 bg-green-600 hover:bg-green-700 transition-colors rounded-md text-white font-medium"
              >
                Go to Exam
              </button>
            </div>
          )}

          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`w-full py-3 ${
              isConnecting 
                ? "bg-gray-700 cursor-wait" 
                : "bg-purple-600 hover:bg-purple-700"
            } rounded-lg transition-colors flex items-center justify-center gap-2`}
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Connect Wallet</span>
                <User size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 