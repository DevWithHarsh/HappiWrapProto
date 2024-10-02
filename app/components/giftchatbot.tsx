"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom' // For navigating on logout
import { signOut } from 'firebase/auth'
import { auth } from './firebase' // Assuming this is where Firebase auth is initialized

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  products?: Product[];
}

type Product = {
  name: string;
  price: string;
  link: string;
  site: 'Amazon' | 'Flipkart';
}

const questions = [
  "What's the occasion for the gift? (e.g., birthday, anniversary, holiday)",
  "What's your budget for the gift?",
  "What's the age range of the recipient?",
  "Does the recipient have any specific interests or hobbies?",
  "Do you prefer a practical gift or something more sentimental?"
]

export default function GiftChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your gift recommendation assistant. I'll ask you a few questions to help find the perfect gift. Let's start!", sender: 'bot' },
    { id: 2, text: questions[0], sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate(); // To navigate after logout

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        const nextQuestion: Message = {
          id: messages.length + 2,
          text: questions[currentQuestion + 1],
          sender: 'bot'
        };
        setTimeout(() => setMessages(prevMessages => [...prevMessages, nextQuestion]), 1000);
      } else {
        const suggestion: Message = {
          id: messages.length + 2,
          text: "Based on your answers, here are some gift suggestions:",
          sender: 'bot',
          products: generateProductSuggestions()
        };
        setTimeout(() => setMessages(prevMessages => [...prevMessages, suggestion]), 1500);
      }
    }
  }

  const generateProductSuggestions = (): Product[] => {
    return [
      {
        name: "Kindle Paperwhite",
        price: "$139.99",
        link: "https://www.amazon.com/dp/B08KTZ8249",
        site: "Amazon"
      },
      {
        name: "Fitbit Versa 3",
        price: "$229.95",
        link: "https://www.amazon.com/dp/B08DFCWVZ4",
        site: "Amazon"
      },
      {
        name: "Instant Pot Duo 7-in-1",
        price: "$89.00",
        link: "https://www.amazon.com/dp/B00FLYWNYQ",
        site: "Amazon"
      },
      {
        name: "Fujifilm Instax Mini 11 Instant Camera",
        price: "₹5,999",
        link: "https://www.flipkart.com/fujifilm-instax-mini-11-instant-camera/p/itm37b776d91e6cf",
        site: "Flipkart"
      },
      {
        name: "Noise ColorFit Pro 3 Smartwatch",
        price: "₹3,999",
        link: "https://www.flipkart.com/noise-colorfit-pro-3-smartwatch/p/itm4eb2a9d36d1b1",
        site: "Flipkart"
      }
    ];
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/"); // Navigate back to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-[#433878] w-full h-screen flex justify-center items-center p-2 relative">
      {/* Logout Button Positioned at Top-Right */}
      <Button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-[#7E60BF] text-white"
      >
        Logout
      </Button>

      <Card className="w-1/2 min-w-min h-screen p-4 bg-[#E4B1F0] shadow-lg flex flex-col border-none">
        <CardHeader className='flex items-center justify-center'>
          {/* Gift Chatbot Title */}
          <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></svg>
            <CardTitle className="text-4xl font-bold text-center text-[#7E60BF] ml-2">HappiWrap</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarImage src={message.sender === 'user' ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
                    <AvatarFallback className='bg-[#433878] text-white'>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                  </Avatar>
                  <div className={`mx-2 p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'} text-[#7E60BF]`}>
                    {message.text}
                    {message.products && (
                      <ul className="mt-2 space-y-2">
                        {message.products.map((product, index) => (
                          <li key={index} className="text-sm">
                            <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              {product.name} - {product.price} ({product.site})
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        
        <CardFooter>
          <form onSubmit={handleSend} className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Type your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
