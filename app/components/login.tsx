"use client";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setTimeout(() => {
                navigate('/giftchatbot');
            },1500);
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error during login!", {
                position: "bottom-center",
                autoClose: 1500 // Close after 3 seconds
            });
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            setTimeout(() => {
                navigate('/giftchatbot');
            }, 1500);
        } catch (error) {
            console.error("Error during Google login:", error);
            toast.error("Error during Google login!", { position: "bottom-center" });
        }
    };

    const handleSignupDoubleClick = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Form submitted: ${activeTab}`);
        navigate('/signup');
    };

    const handleSingleClick = () => {
        console.log("Single click detected");
    };

    return (
        <div className="min-h-screen w-full bg-[#433878] flex items-center justify-center p-4">
            <ToastContainer
                position="top-center"
                autoClose={1500} // All toasts will auto-close after 3 seconds
                hideProgressBar={false}
                pauseOnFocusLoss={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
                <div className="hidden lg:flex flex-col justify-center items-center bg-[#7E60BF] w-1/2 p-8">
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></svg>
                        <h1 className="text-5xl font-bold text-white mb-4">HappiWrap</h1>
                        <p className="text-xl text-[#FFE1FF]">Wrap Your World in Happiness</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-[#7E60BF]">Welcome to HappiWrap</h2>
                        <p className="text-[#7E60BF]/80">Your AI-powered gifting assistant</p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#433878] rounded-md">
                            <TabsTrigger value="login" className="text-[#E4B1F0]">Login</TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="text-[#E4B1F0]"
                                onClick={handleSingleClick}
                                onDoubleClick={handleSignupDoubleClick}
                            >
                                Sign Up
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-[#7E60BF]">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="m@example.com"
                                            required
                                            className="bg-white text-[#7E60BF]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-[#7E60BF]">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-white text-[#7E60BF]"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full mt-4 bg-[#FFE1FF] text-[#7E60BF]">Login</Button>
                            </form>
                            {/* Google Login Button */}
                            <Button
                                onClick={handleGoogleLogin}
                                className="gap-2 w-full mt-4 bg-[#FFE1FF] text-[#7E60BF] hover:bg-[#272E3F] flex items-center justify-center"
                            >
                                <svg width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                                Sign in with Google
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
