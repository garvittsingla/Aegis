'use client'
import { Download, PanelRightDashed, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import { useRef, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { ethers } from 'ethers';

export default function Page(){
    const router = useRouter();
    const targetRef = useRef(null);
    const params = useParams<{ studentpublickey: string; }>()
    const [isClient, setIsClient] = useState(false);
    const [examCID, setExamCID] = useState<string | null>(null);
    const [examName, setExamName] = useState("Rust End Sem Exam");
    const [studentPublicKey, setStudentPublicKey] = useState<string | null>(null);

    // Function to connect wallet and get the student's public key
    const connectWallet = async () => {
      try {
        // @ts-ignore
        if (!window.ethereum) {
          alert("Please install MetaMask to continue");
          return false;
        }
        
        // @ts-ignore
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // @ts-ignore
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setStudentPublicKey(address);
        console.log("Connected wallet address:", address);
        
        // Redirect if we're not already on the student's dashboard
        if (params.studentpublickey !== address) {
          router.push(`/studentdashboard/${address}`);
        }
        
        return true;
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
        return false;
      }
    };

    useEffect(() => {
        setIsClient(true);
        
        // Check for exam CID in localStorage
        if (typeof window !== 'undefined') {
            const storedCID = localStorage.getItem('examCID');
            if (storedCID) {
                setExamCID(storedCID);
                console.log("Found exam CID in localStorage:", storedCID);
            }
        }
        
        // If no studentpublickey in URL or it's "undefined", connect wallet to get it
        if (!params.studentpublickey || params.studentpublickey === "undefined") {
          connectWallet();
        }
    }, [params.studentpublickey]);

    const goToExam = () => {
        if (examCID) {
            window.location.href = `/test?cid=${examCID}`;
        } else {
            window.location.href = "/test";
        }
    };

    const downloadPdf = async () => {
        if (!targetRef.current || !isClient) return;
        
        try {
            // Get the target element
            const element = targetRef.current as HTMLElement;
            
            // Create a temporary iframe to render content without oklch colors
            const iframe = document.createElement('iframe');
            iframe.style.width = '800px';
            iframe.style.height = '600px';
            iframe.style.position = 'absolute';
            iframe.style.top = '-9999px';
            iframe.style.left = '-9999px';
            
            document.body.appendChild(iframe);
            
            // Create a simple HTML structure without oklch colors
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) {
                throw new Error('Could not create iframe document');
            }
            
            // Copy the element's content into the iframe with a simple style
            const clonedContent = element.cloneNode(true) as HTMLElement;
            
            // Override all styles with simple ones
            const simpleStyleSheet = iframeDoc.createElement('style');
            simpleStyleSheet.textContent = `
                body { 
                    background-color: black; 
                    color: white; 
                    font-family: Arial, sans-serif; 
                }
                .card {
                    width: 300px;
                    background-color: rgba(20, 20, 20, 0.8);
                    border: 1px solid rgba(100, 100, 100, 0.3);
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #4ade80;
                }
                .avatar {
                    width: 30px;
                    height: 30px;
                    background-color: #4ade80;
                    border-radius: 50%;
                    opacity: 0.7;
                }
                .field {
                    margin-bottom: 15px;
                }
                .label {
                    font-size: 12px;
                    color: #9ca3af;
                }
                .value {
                    font-size: 14px;
                    font-weight: 500;
                }
                .pk {
                    font-family: monospace;
                    font-size: 12px;
                    word-break: break-all;
                }
            `;
            
            iframeDoc.head.appendChild(simpleStyleSheet);
            
            // Create content structure manually (no oklch colors)
            const data = {
                name: element.querySelector('[class*="font-medium"]')?.textContent || 'Garvit Singla',
                rollNo: dummyData.Rollno,
                aadharNo: dummyData.Adharno,
                publicKey: dummyData.publickey
            };
            
            const contentHTML = `
                <div class="card">
                    <div class="header">
                        <div class="title">Student Admit Card</div>
                        <div class="avatar"></div>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name</div>
                            <div class="value">${data.name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Roll No</div>
                            <div class="value">${data.rollNo}</div>
                        </div>
                        <div class="field">
                            <div class="label">Aadhar No</div>
                            <div class="value">${data.aadharNo}</div>
                        </div>
                        <div class="field">
                            <div class="label">Public Key</div>
                            <div class="pk">${data.publicKey}</div>
                        </div>
                    </div>
                </div>
            `;
            
            iframeDoc.body.innerHTML = contentHTML;
            
            // Wait for iframe content to be rendered
            setTimeout(async () => {
                try {
                    // Create a canvas from the iframe content
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    if (!ctx) {
                        throw new Error('Could not get canvas context');
                    }
                    
                    const contentElement = iframeDoc.querySelector('.card');
                    if (!contentElement) {
                        throw new Error('Could not find content element');
                    }
                    
                    // Set canvas dimensions
                    canvas.width = 320;
                    canvas.height = 420;
                    
                    // Fill background
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Convert the iframe document content to a data URL
                    ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
                    ctx.fillRect(10, 10, 300, 400);
                    ctx.fillStyle = '#4ade80';
                    ctx.font = 'bold 18px Arial';
                    ctx.fillText('Student Admit Card', 20, 40);
                    
                    // Draw circle
                    ctx.beginPath();
                    ctx.arc(280, 30, 15, 0, 2 * Math.PI);
                    ctx.fillStyle = '#4ade80';
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                    
                    // Draw content
                    ctx.fillStyle = '#9ca3af';
                    ctx.font = '12px Arial';
                    ctx.fillText('Name', 20, 80);
                    ctx.fillText('Roll No', 20, 130);
                    ctx.fillText('Aadhar No', 20, 180);
                    ctx.fillText('Public Key', 20, 230);
                    
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '14px Arial';
                    ctx.fillText(data.name, 20, 100);
                    ctx.fillText(data.rollNo, 20, 150);
                    ctx.fillText(data.aadharNo, 20, 200);
                    
                    // Handle public key (wrap text)
                    const publicKey = data.publicKey;
                    const maxWidth = 260;
                    let startY = 250;
                    ctx.font = '12px monospace';
                    
                    if (publicKey.length > 30) {
                        for (let i = 0; i < publicKey.length; i += 30) {
                            ctx.fillText(publicKey.substring(i, i + 30), 20, startY);
                            startY += 20;
                        }
                    } else {
                        ctx.fillText(publicKey, 20, startY);
                    }
                    
                    // Convert canvas to image
                    const imgData = canvas.toDataURL('image/png');
                    
                    // Create PDF
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });
                    
                    const imgWidth = 180; // A4 width with margins
                    const pageHeight = 297; // A4 height in mm
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    // Add image to PDF with some margin
                    pdf.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);
                    pdf.save('student-admit-card.pdf');
                    
                    // Clean up
                    document.body.removeChild(iframe);
                    
                } catch (innerError) {
                    console.error('Error in canvas rendering:', innerError);
                    alert('Failed to generate PDF. Please try again.');
                    document.body.removeChild(iframe);
                }
            }, 500);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };
    
    const dummyData = {
        Studentname:"Garvit Singla",
        Rollno:"2410991145",
        Adharno:"21213123432",
        publickey:params.studentpublickey
    }
    return(
        <div className='h-screen bg-black text-white font-[poppins]'> 
            <nav className='h-20 flex items-center justify-between px-6 bg--900 w-[80%] mx-auto'>
                <h1 className='text-xl font-[boldonse]'>Aegis</h1>
                
                {/* Add wallet connect button if not on specific student dashboard */}
                {(!params.studentpublickey || params.studentpublickey === "undefined") && (
                  <button
                    onClick={connectWallet}
                    className='px-4 py-2 bg-purple-600 rounded-md flex items-center gap-2'
                  >
                    Connect Wallet <User size={16} />
                  </button>
                )}
            </nav>
            
        <div className='w-full flex h-96 bg--900'>
            <div className='w-1/2 h-full flex justify-end ml-40 '>
                <div className='w-full h-full mx-auto backdrop-blur-md bg-gray-800/20 border border-gray-700/30 
                   rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 
                   transition-all duration-300 relative overflow-hidden'>
                                        <div className="absolute inset-0 pointer-events-none">
                        <div className="w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                        animate-shine absolute -top-1/2 -left-1/2 transform rotate-30"></div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold font-[] text-purple-600">Rust Final exam</h2>
          <div className="w-8 h-8 bg-purple-300 rounded-full opacity-70 shadow-md"></div>
          
        </div>
        <div className="space-y-4 text-white">
          <div>
            <span className="text-gray-300 text-sm">Exam Name</span>
            <p className="font-medium">{examName}</p>
          </div>
          <div>
            <span className="text-gray-300 text-sm">Date</span>
            <p className="font-medium">26 March 2025</p>
          </div>
          <div>
            <span className="text-gray-300 text-sm">Exam Time</span>
            <p className="font-medium">10:00AM</p>
          </div>
          <div>
            {examCID ? (
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 text-sm mr-2">●</span>
                  <span className="text-gray-300 text-sm">Exam Available</span>
                </div>
                <button 
                  onClick={goToExam} 
                  className='px-3 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-md cursor-pointer flex items-center gap-2'
                >
                  Continue to Exam <PanelRightDashed/>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-2">●</span>
                  <span className="text-gray-300 text-sm">No Active Exam</span>
                </div>
                <button 
                  className='px-3 py-2 bg-gray-600 cursor-not-allowed rounded-md flex items-center gap-2 opacity-70'
                  disabled
                >
                  No Available Exam
                </button>
              </div>
            )}
          </div>
        </div>
        
        
                   </div>
                   
            </div>
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
            <div onClick={() =>downloadPdf()} className=' w-full h-24 flex justify-end px-56 items-center'>
                <h1  className='px-4 py-3 bg-purple-400 text-white w-fit rounded-md cursor-pointer flex gap-2 items-center'>Download your Card <Download/></h1>
            </div>
    </div>
    )
}
