import React, { useState } from "react";
import axios from "axios";

function TeacherUplaod({ contract }:{contract:any}) {
  const [question, setQuestion] = useState();
    //set it as a global state/ in smart contract?
    const [CID, setCid] = useState();

// add in .env import.meta.env.
  const PINATA_API_KEY = "34e5a156dcda211cc4f4";
  const PINATA_SECRET_KEY = "96406ebf4e15091bb9878ff7c58970ea4731465d78bdb200369ec52233fce8d8";

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const uploadQues = e.target.form.elements[0].value;
    const setName = e.target.form.elements[1].value;
    const setAccessTime = e.target.form.elements[2].value;
    setQuestion(uploadQues);

    try {
        //creating a proper JSON object to send to Pinata as useState is async and does not get updated immediately
        const jsonData = {
            question: uploadQues
        }

      // Make the API request to Pinata
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      );

      // Getting the CID
      const ipfsHash = response.data.IpfsHash;
    //   console.log("Successfully pinned JSON to IPFS with hash:", ipfsHash);

      setCid(ipfsHash);

      const unlockTime = Math.floor(
        new Date(setAccessTime).getTime() / 1000
      );

      const transaction = await contract.appendQuestionCID({
        ipfsHash,
        setName,
        unlockTime
    });

    await transaction.wait();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
  <div className="w-[80%] mx-auto bg-gray-900/30 p-4 sm:p-6 rounded-lg border border-purple-500/20 mt-20 backdrop-blur-lg ">
    {/* Heading */}
    <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 font-poppins flex items-center">
      Upload the Questions
      <svg className="ml-2 w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #00FF00)" }}>
        <path d="M12 2v4m0 12v4m-4-8H4m16 0h-4m-1.66-5.66l2.83-2.83m-2.83 12.49l2.83-2.83M6.83 6.83l-2.83 2.83m2.83 12.49l-2.83-2.83" />
      </svg>
    </h2>

    {/* Form */}
    <form className="flex flex-col gap-5 mt-6 sm:mt-10">
      <input
        type="text"
        placeholder="Enter your question JSON"
        className="w-full py-2 px-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300 text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="Enter your set name"
        className="w-full py-2 px-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300 text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="Enter Set Access Time"
        className="w-full py-2 px-4 bg-gray-800/20 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 placeholder-gray-500 font-poppins transition-all duration-300 text-sm sm:text-base"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 sm:py-3 px-4 sm:px-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg border border-purple-400 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 font-poppins text-sm sm:text-base"
      >
        Upload
      </button>
    </form>
  </div>
</>
  );
}

export default TeacherUplaod;