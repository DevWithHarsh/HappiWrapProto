"use client"
// // Home.tsx
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { MessageCircle, UserPlus } from 'lucide-react';
// import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// export default function BotHome() {
//   const navigate = useNavigate();

//   return (
//     <main className="min-h-screen w-full bg-[#433878] flex flex-col items-center justify-center p-4 relative">
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="flex flex-col items-center mb-8"
//       >
//         <div className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#FFE1FF] mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
//           <h1 className="text-4xl font-bold text-[#E4B1F0]">HappiWrap</h1>
//         </div>
//         <p className="mt-2 text-xl text-[#E4B1F0] font-semibold text-center">Wrap Your World in Happiness with HappiWrap</p>
//       </motion.div>

//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-2xl"
//       >
//         <div className="p-4 flex sm:flex-row justify-center items-center gap-4">
//           <Button 
//             onClick={() => navigate('/login')} // Redirect to login & signup page
//             className="bg-[#7E60BF] hover:bg-[#FFE1F0] hover:text-[#433878] text-white text-lg rounded-full transition-colors duration-300 w-40 h-12 flex items-center justify-center"
//           >
//             <MessageCircle className="mr-2 h-6 w-6" />
//             Start Chatting
//           </Button>
//           <Button 
//             onClick={() => navigate('/login')}
//             variant="outline"
//             className="bg-transparent border-2 border-[#E4B1F0] text-[#E4B1F0] hover:bg-[#E4B1F0] hover:text-[#433878] text-lg rounded-full transition-colors duration-300 w-40 h-12 flex items-center justify-center"
//           >
//             <UserPlus className="mr-2 h-6 w-6" />
//             Login / Sign Up
//           </Button>
//         </div>
//       </motion.div>
//     </main>
//   );
// }
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, ShoppingBag, ThumbsUp, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react';
import { auth } from './firebase';

export default function Component() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    const handleStartChat = () => {
        if (user) {
            navigate('/giftchatbot');
        } else {
            navigate('/login'); // Redirect to login if not logged in
        }
    };
    return (
        <div className="h-screen bg-[#433878] text-[#E4B1F0] flex flex-col">
            {/* Background doodle */}
            <div
                className="fixed inset-0 z-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='%23E4B1F0' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='8' width='18' height='4' rx='1'/%3E%3Cpath d='M12 8v13'/%3E%3Cpath d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7'/%3E%3Cpath d='M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}
            ></div>

            {/* Header */}
            <header className="bg-[#7E60BF] text-[#FFE1FF] py-6 px-6 flex justify-between items-center z-10">
                <div className="flex items-center space-x-2">
                    <Gift className="h-8 w-8" />
                    <h1 className="text-2xl font-bold">HappiWrap</h1>
                </div>
                <div className="text-sm font-medium">CodeCrusaders</div>
            </header>

            {/* Main content */}
            <main className="flex-grow container mx-auto px-4 py-16 z-10 space-y-24">
                <section className="text-center">
                    <h2 className="text-4xl font-bold mb-6">Wrap Your World in Happiness</h2>
                    <p className="text-xl mb-10">Your AI-powered gift recommendation chatbot</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleStartChat}
                            className="bg-[#7E60BF] hover:bg-[#FFE1F0] hover:text-[#433878] text-white text-lg rounded-full transition-colors duration-300 w-40 h-12 flex items-center justify-center"
                        >Start Chat
                        </button>
                        <Button variant="outline" className="border-[#E4B1F0] text-[#E4B1F0] hover:bg-[#E4B1F0] hover:text-[#433878] px-6 py-3 text-lg transition-all duration-300 transform hover:scale-105" onClick={() => navigate('/login')}>
                            <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                        </Button>
                    </div>
                </section>

                <section>
                    <h3 className="text-3xl font-bold text-center mb-10">Our Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-[#7E60BF] text-[#FFE1FF] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl">
                                    <Gift className="mr-2 h-6 w-6 animate-bounce" />
                                    Personalized Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg">Get tailored gift suggestions based on your preferences and the recipient&apos;s interests.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#7E60BF] text-[#FFE1FF] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl">
                                    <ShoppingBag className="mr-2 h-6 w-6 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    E-commerce Integration
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg">Seamlessly browse and purchase from various online stores without leaving the chat.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#7E60BF] text-[#FFE1FF] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl">
                                    <ThumbsUp className="mr-2 h-6 w-6 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    Smart Learning
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg">Our AI learns from your choices to improve future recommendations and gift ideas.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="text-center">
                    <h3 className="text-3xl font-bold mb-6">About Us</h3>
                    <p className="max-w-2xl mx-auto text-lg leading-relaxed">
                        HappiWrap is your ultimate gift-giving companion. Our AI-powered chatbot takes the stress out of finding the perfect present. Whether it&apos;s for a birthday, anniversary, or just because, we&apos;re here to help you spread joy with thoughtful, personalized gift recommendations.
                    </p>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-[#7E60BF] py-8 px-6 text-center z-10 text-[#FFE1FF]">
                <p className="text-lg">&copy; 2023 HappiWrap. All rights reserved.</p>
                <div className="mt-4 space-x-6">
                    <a href="#" className="text-[#FFE1FF] hover:underline text-lg">Privacy Policy</a>
                    <a href="#" className="text-[#FFE1FF] hover:underline text-lg">Terms of Service</a>
                    <a href="#" className="text-[#FFE1FF] hover:underline text-lg">Contact Us</a>
                </div>
            </footer>
        </div>
    )
}