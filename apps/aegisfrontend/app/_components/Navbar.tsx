// import StarBorder from "@/animations/StarBorder/StarBorder"
import {WalletMinimal,ShieldOff} from "lucide-react"
import StarBorder from "@/outercomponents/StarBorder/StarBorder" 
export default function Navbar(){

    return(
        <nav  className="w-[80%]    mx-auto px-4  py-5 border-b border-zinc-900 flex justify-between items-center text-white  rounded-lg">
           <div className="left flex items-center gap-2 text-xl font-[boldonse] relative">
                <div className="flex z-10 gap-2">
                    <span><ShieldOff className="text-purple-400"/></span>
                    <span>Aegis</span>
                </div>
                <div className="absolute bottom-1 left-2 w-full h-3 bg-purple-400 rounded-full blur-lg opacity-60"></div>
            </div>
            <div className="right"> 
                <div className=" ">
                    <StarBorder className="" >Conncet wallet</StarBorder >
                </div> 
             </div>
        </nav>
    )
}