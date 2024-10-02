// 'use client'
// import React, { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./components/login";
// import Signup from "./components/signup";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";
// import { auth } from "./components/firebase";
// //import AuthPage from "./AuthPage";
// import GiftChatbot from "./components/giftchatbot";
// import BotHome from "./components/home";

// export default function App() {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   });
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<BotHome />} />
//       <Route
//                 path="/"
//                 element={user ? <Navigate to="/giftchatbot" /> : <Login />}
//               />
        
//         {/* <Route path="/" element={<Login />} /> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/giftchatbot" element={<GiftChatbot />} />
//         {/* Redirect any undefined route to login
//         <Route path="*" element={<Navigate to="/" />} /> */}
//       </Routes>
//       <ToastContainer />
//     </Router>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";
import { User } from "firebase/auth"; 
import GiftChatbot from "./components/giftchatbot";
import BotHome from "./components/home";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Handles client-only rendering

  useEffect(() => {
    setIsMounted(true); // Ensures component renders only on client
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Prevent rendering on server by checking if the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BotHome />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/giftchatbot" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/giftchatbot" element={<GiftChatbot />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
