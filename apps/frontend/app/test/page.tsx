import React from "react";
import Navbar from "@/_components/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      
      <div className="  mx-auto pt-8 px-4 h-full w-[80%]">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">Practice Questions</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Question Panel */}
          <div className="w-full lg:w-5/6">
            <div className="rounded-lg overflow-hidden border border-gray-700 bg-zinc-900 shadow-lg">
              {/* Question Header */}
              <div className="bg-zinc-900 p-6">
                <div className="flex items-start gap-3">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-md font-medium text-sm">Q.1</span>
                  <p className="text-xl font-medium leading-relaxed">
                    The number of non-empty equivalence relations on the set {"{1, 2, 3}"} is:
                  </p>
                </div>
              </div>
              
              {/* Options */}
              <div className="p-4 space-y-3">
                <div className="option-container">
                  <label className="flex items-center p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
                    <input type="radio" name="answer" className="sr-only" />
                    <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-indigo-500 mr-4 text-sm font-medium">A</span>
                    <span className="text-lg">5</span>
                  </label>
                </div>
                
                <div className="option-container">
                  <label className="flex items-center p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
                    <input type="radio" name="answer" className="sr-only" />
                    <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-indigo-500 mr-4 text-sm font-medium">B</span>
                    <span className="text-lg">6</span>
                  </label>
                </div>
                
                <div className="option-container">
                  <label className="flex items-center p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
                    <input type="radio" name="answer" className="sr-only" />
                    <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-indigo-500 mr-4 text-sm font-medium">C</span>
                    <span className="text-lg">7</span>
                  </label>
                </div>
                
                <div className="option-container">
                  <label className="flex items-center p-4 rounded-lg border bg-zinc-900 hover:bg-gray-700 transition-colors cursor-pointer">
                    <input type="radio" name="answer" className="sr-only" />
                    <span className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-indigo-500 mr-4 text-sm font-medium">D</span>
                    <span className="text-lg">8</span>
                  </label>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="p-4 flex justify-between border-t bg-zinc-900">
                <button className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors">Previous</button>
                <button className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors">Next</button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-2/5">
            <div className="rounded-lg border bg-zinc-900  p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Question Navigator</h2>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(15)].map((_, i) => (
                  <button
                    key={i}
                    className={`h-10 w-10 rounded-md flex items-center justify-center 
                      ${i === 0 ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"} 
                      transition-colors`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-indigo-600 rounded-sm mr-2"></div>
                    <span className="text-sm">Current Question</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm mr-2"></div>
                    <span className="text-sm">Answered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-yellow-600 rounded-sm mr-2"></div>
                    <span className="text-sm">Marked for Review</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Time Remaining</h3>
                <div className="bg-zinc-900 rounded-md p-3">
                  <div className="text-2xl font-bold text-center">24:36</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}