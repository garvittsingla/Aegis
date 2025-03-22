import {WalletMinimal} from "lucide-react" 
export default function Navbar(){

    return(
        <nav  className="w-[80%]    mx-auto px-4  py-5 border-b border-zinc-900 flex justify-between items-center   rounded-lg">
            <div   className="left  text-2xl font-bold   ">Aegis</div>
            <div className="right"> 
                <div className="bg-slate-800/60 px-2 font-medium text-sm py-3 rounded-lg flex gap-2 items-center ">
                    <span><WalletMinimal/></span>
                    bsadjbasldalysgdlauysfduav
                    <span></span>
                </div>
            </div>
        </nav>
    )
}