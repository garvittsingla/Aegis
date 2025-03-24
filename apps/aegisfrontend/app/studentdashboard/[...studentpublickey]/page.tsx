'use client'
import generatePDF from 'react-to-pdf';
import { Download } from 'lucide-react';
import { useParams } from 'next/navigation'
import { useRef } from 'react';

export default function Page(){
    const targetRef = useRef(null);
    const params = useParams<{ studentpublickey: string;  }>()
    const dummyData = {
        Studentname:"Garvit Singla",
        Rollno:"2410991145",
        Adharno:"21213123432",
        publickey:params.studentpublickey
    }
    return(
        <div className='h-screen bg-black text-white font-[poppins]'> 
            <nav className='h-20 flex items-center px-6 bg--900 w-[80%] mx-auto'>
                <h1 className='text-xl font-[boldonse]'>Aegis</h1>
            </nav>
            
        <div className='w-full flex h-96 bg--900'>
            <div className='w-1/2 h-full'></div>
            <div className='w-1/2 h-full flex items-center pl-70 justify-between '>
                {/* Card Container */}
      <div
        ref={targetRef}
        className="w-80 backdrop-blur-md bg-gray-800/20 border border-gray-700/30 
                   rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 
                   transition-all duration-300 relative overflow-hidden"
      >
        {/* Shiny Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          animate-shine absolute -top-1/2 -left-1/2 transform rotate-30"></div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-green-300">Student Admit Card</h2>
          <div className="w-8 h-8 bg-green-300 rounded-full opacity-70 shadow-md"></div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-white">
          <div>
            <span className="text-gray-300 text-sm">Name</span>
            <p className="font-medium">{dummyData.Studentname}</p>
          </div>
          <div>
            <span className="text-gray-300 text-sm">Roll No</span>
            <p className="font-medium">{dummyData.Rollno}</p>
          </div>
          <div>
            <span className="text-gray-300 text-sm">Aadhar No</span>
            <p className="font-medium">{dummyData.Adharno}</p>
          </div>
          <div>
            <span className="text-gray-300 text-sm">Public Key</span>
            <p className="font-mono text-sm break-all">{dummyData.publickey}</p>
          </div>
        </div>
      </div>
      
            </div>
        </div>
            <div onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})} className=' w-full h-24 flex justify-end px-56 items-center'>
                <h1  className='px-4 py-3 bg-purple-400 text-white w-fit rounded-md cursor-pointer flex gap-2 items-center'>Download your Card <Download/></h1>
            </div>
    </div>
    )
}