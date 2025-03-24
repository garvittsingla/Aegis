"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Flowing from "./_components/Flowing";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 0.3], ["100vh", "0vh"]);

  return (
    <div className="min-h-screen bg-black text-white font-[poppins]">
      <div className="min-h-[200vh]">
        <nav className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-[boldonse]">AEGIS</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-sm hover:text-gray-300">About</Link>
            <Link href="/my-tests" className="text-sm hover:text-gray-300">My Tests</Link>
            <Link href="/tokenomics" className="text-sm hover:text-gray-300">Tokenomics</Link>
            <Link href="/airdrop" className="text-sm hover:text-gray-300">Airdrop</Link>
            <button  className="px-4 py-3 bg-purple-600 rounded-full text-sm font-semibold hover:bg-purple-700">
              <Link href="./newstudentregister">Register</Link>
            </button>
          </div>
        </nav>

        <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 w-[80%] mx-auto bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:20px_20px]">
          <div className="text-center z-10">
            <h1 className="text-9xl md:text-[12rem] font-extrabold leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              <span className="relative">
                SECURE
                <span className="absolute -top-8 -left-8 text-6xl text-lime-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">#</span>
              </span>
              <br />
              <span className="relative">
                TESTS
                <span className="absolute -top-8 -right-8 text-6xl text-lime-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">3</span>
              </span>
            </h1>
            <h2 className="text-6xl md:text-7xl font-bold mt-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              WITH WEB3
            </h2>
          </div>

          <div className="absolute top-1/3 right-1/4 transform -translate-y-1/2 z-10">
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-lime-400 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold">EduChain</p>
                <p className="text-xs text-gray-300">Secured 500+ tests</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 transform translate-y-1/2 z-10">
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-lime-400 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold">Arbitrum orbit</p>
              <p className="text-xs text-gray-300">Trusted by 10K+ users</p>
              </div>
            </div>
          </div>

          <svg className="absolute top-10 left-10 w-24 h-24 text-lime-400 animate-spin-slow drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2m0 20c5.523 0 10-4.477 10-10S17.523 2 12 2m8 10h4m-4-4v8" />
          </svg>
          <svg className="absolute top-1/4 right-10 w-32 h-32 text-lime-400 animate-spin-slow drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2m0 20c5.523 0 10-4.477 10-10S17.523 2 12 2m8 10h4m-4-4v8" />
          </svg>
          <svg className="absolute bottom-1/3 left-20 w-20 h-20 text-lime-400 animate-spin-slow drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2m0 20c5.523 0 10-4.477 10-10S17.523 2 12 2m8 10h4m-4-4v8" />
          </svg>
          <svg className="absolute bottom-10 right-1/3 w-28 h-28 text-lime-400 animate-spin-slow drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2m0 20c5.523 0 10-4.477 10-10S17.523 2 12 2m8 10h4m-4-4v8" />
          </svg>

          <div className="absolute bottom-10 right-10 z-10">
            <button className="flex items-center gap-2 px-6 py-3 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-500 transition-all drop-shadow-[0_4px_8px_rgba(0,255,0,0.5)]">
              Get Started for Free
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

       
        <motion.div
          className="lower w-full h-[4000px] bg-black z-20 fixed top-0 left-0"
          style={{ y }}
        >
          <div className="h-screen">
              
          <Flowing />

          </div>
        </motion.div>
      </div>
    </div>
  );
}