import Navbar from "@/_components/Navbar";
import { Globe } from "@/components/ui/globe";
import Image from "next/image";

export default function Home() {
  return (
   <div className="h-screen font-[poppins] bg-black/95 w-full text-white">
      <Navbar/>
    <div className="bg--800 w-full h-4/5 flex items-center">
    <div className="w-3/4 h-full">
    <div className=" h-1/2  w-full flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
        Secure Tests, Immutable Trust
        </h1>
        <h1 className="text-6xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
        Powered by Blockchain
        </h1>
</div>
<div>

</div>
     </div>
    <div className="w-1/2 h-full bg--300 flex items-end justify-between">
        <Globe className="right-0 ml-230 mt-20"/>
        <div className="text-lg ml-35">Trusted by <span className="text-purple-500/90">People</span> around the Globe</div>
     </div>
    </div>
      {/* <Globe /> */}
   </div>
  );
}
