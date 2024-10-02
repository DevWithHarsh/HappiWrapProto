"use client"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [activeTab, setActiveTab] = useState("signup");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //Firebase create user logic
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            //Save user details to Firestore
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname
                });
            }

            // Success message and navigate to login or home page
            toast.success("User Registered Successfully!!", {
                position: "top-center",
            });
            navigate('/login'); // Immediately navigate to login page after signup

        } catch (error) {
            // Handle errors
            console.error("Error during signup:", error);
            toast.error("Error during signup!", {
                position: "bottom-center",
            });
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to login page
    };

    return (
        <div className="min-h-screen w-full bg-[#433878] flex items-center justify-center p-4">
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
                <div className="hidden lg:flex flex-col justify-center items-center bg-[#7E60BF] w-1/2 p-8">
                    <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift mb-4">
                            <rect x="3" y="8" width="18" height="4" rx="1" />
                            <path d="M12 8v13" />
                            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                        </svg>
                        <h1 className="text-5xl font-bold text-white mb-4">HappiWrap</h1>
                        <p className="text-xl text-[#FFE1FF]">Wrap Your World in Happiness</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-[#7E60BF]">Welcome to HappiWrap</h2>
                    <p className="text-[#7E60BF]/80">Your AI-powered gifting assistant</p>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#433878] rounded-md">
                            <TabsTrigger value="login" className="text-[#E4B1F0]" onClick={handleLoginClick}>Login</TabsTrigger>
                            <TabsTrigger value="signup" className="text-[#E4B1F0]">Sign Up</TabsTrigger>
                        </TabsList>

                        {/* Signup Form */}
                        <TabsContent value="signup">
                            <form onSubmit={handleSignup}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[#7E60BF]">Full Name</Label>
                                        <Input id="name" placeholder="John Doe" onChange={(e) => setFname(e.target.value)} required className="bg-white text-[#7E60BF]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-[#7E60BF]">Email</Label>
                                        <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmail(e.target.value)} required className="bg-white text-[#7E60BF]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-[#7E60BF]">Password</Label>
                                        <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required className="bg-white text-[#7E60BF]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password" className="text-[#7E60BF]">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" required className="bg-white text-[#7E60BF]" />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full mt-4 bg-[#FFE1FF] text-[#7E60BF]">Sign Up</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
