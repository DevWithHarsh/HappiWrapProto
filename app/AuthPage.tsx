// "use client"

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { Gift } from 'lucide-react';
// import { auth } from './components/firebase';

// export default function AuthPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [activeTab, setActiveTab] = useState("login");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleAuthSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       // Your authentication logic here
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('./gift-chatbot');
//     } catch (error) {
//       setError("Authentication failed. Please check your credentials.");
//       console.error("Auth error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#433878] flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
//         <div className="hidden lg:flex flex-col justify-center items-center bg-[#7E60BF] w-1/2 p-8">
//           <div className="text-center">
//             <Gift className="w-24 h-24 text-white mb-4" />
//             <h1 className="text-5xl font-bold text-white mb-4">HappiWrap</h1>
//             <p className="text-xl text-[#FFE1FF]">Wrap Your World in Happiness</p>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/2 p-8">
//           <div className="mb-6">
//             <h2 className="text-3xl font-bold text-[#7E60BF]">Welcome to HappiWrap</h2>
//             <p className="text-[#7E60BF]/80">Your AI-powered gifting assistant</p>
//           </div>

//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#433878] rounded-md">
//               <TabsTrigger value="login" className="text-[#E4B1F0]">Login</TabsTrigger>
//               <TabsTrigger value="signup" className="text-[#E4B1F0]">Sign Up</TabsTrigger>
//             </TabsList>

//             <TabsContent value="login">
//               <form onSubmit={handleAuthSubmit}>
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="text-[#7E60BF]">Email</Label>
//                     <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required className="bg-white text-[#7E60BF]" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="password" className="text-[#7E60BF]">Password</Label>
//                     <Input id="password" type="password" value={password}
//                       onChange={(e) => setPassword(e.target.value)} required className="bg-white text-[#7E60BF]" />
//                   </div>
//                 </div>
//                 <Button type="submit" className="w-full mt-4 bg-[#FFE1FF] text-[#7E60BF]">Login</Button>
//               </form>
//             </TabsContent>

//             <TabsContent value="signup">
//               <form onSubmit={handleAuthSubmit}>
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name" className="text-[#7E60BF]">Full Name</Label>
//                     <Input id="name" placeholder="John Doe" value={fname} onChange={(e) => setFname(e.target.value)} required className="bg-white text-[#7E60BF]" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="text-[#7E60BF]">Email</Label>
//                     <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white text-[#7E60BF]" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="password" className="text-[#7E60BF]">Password</Label>
//                     <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white text-[#7E60BF]" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="confirm-password" className="text-[#7E60BF]">Confirm Password</Label>
//                     <Input id="confirm-password" type="password" required className="bg-white text-[#7E60BF]" />
//                   </div>
//                 </div>
//                 <Button type="submit" className="w-full mt-4 bg-[#FFE1FF] text-[#7E60BF]">Sign Up</Button>
//               </form>
//             </TabsContent>
//           </Tabs>

//           {error && <p className="mt-4 text-red-500">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }