import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ArrowRight, Zap, User, Phone, Mail, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collection, addDoc, updateDoc, getDocs, query as firestoreQuery, where, orderBy, limit, arrayUnion, Timestamp } from "firebase/firestore";
import { ref, push, set, update, get, query as rtdbQuery, orderByChild, limitToLast, serverTimestamp } from "firebase/database";
import { db, rtdb } from "@/lib/firebase";

// Define message types for the chat
type MessageType = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

// Props interface for ChatBot component
interface ChatBotProps {
  onChatStateChange?: (isOpen: boolean) => void;
}

// Initial greeting messages from the bot
const initialMessages = [
  {
    id: "initial-1",
    text: "Hello! I'm your Atandra AI Assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

// Default suggested questions
const defaultSuggestedQuestions = [
  "Tell me about your measurement solutions",
  "What protection systems do you offer?",
  "How can you help with energy conservation?",
  "I'd like to request a demo",
  "How can I contact support?"
];

const ChatBot = ({ onChatStateChange }: ChatBotProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState(defaultSuggestedQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // User details state
  const [showUserForm, setShowUserForm] = useState(true);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(false);
  const [isSubmittingDetails, setIsSubmittingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [userSessionId, setUserSessionId] = useState<string | null>(null);

  // API base URL - update this to match your FastAPI embeddings server
  const API_BASE_URL = "https://rag-590892650418.us-central1.run.app/";
  
  // const API_BASE_URL = "http://0.0.0.0:8000";


  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Notify parent component when chat state changes
  useEffect(() => {
    onChatStateChange?.(isOpen);
  }, [isOpen, onChatStateChange]);

  // Prevent body scroll on mobile when chatbot is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.classList.add('chatbot-open');
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.classList.remove('chatbot-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('chatbot-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check if user details are submitted
    if (!userDetailsSubmitted) {
      setShowUserForm(true);
      return;
    }

    // Add user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Send query to backend
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage.text,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response from backend: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Add bot response to messages
      const botResponse: MessageType = {
        id: `bot-${Date.now()}`,
        text: data.answer,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

      // Update conversation in database if user details are submitted
      if (userDetailsSubmitted && userSessionId) {
        try {
          // First try Realtime Database
          try {
            console.log("Updating conversation in Realtime Database...");
            const messagesRef = ref(rtdb, `userSubmissions/${userSessionId}/messages`);

            // Push new messages to the array
            const userMessageRef = push(messagesRef);
            await set(userMessageRef, {
              text: userMessage.text,
              isBot: false,
              timestamp: serverTimestamp()
            });

            const botMessageRef = push(messagesRef);
            await set(botMessageRef, {
              text: botResponse.text,
              isBot: true,
              timestamp: serverTimestamp()
            });

            // Update last updated timestamp
            await update(ref(rtdb, `userSubmissions/${userSessionId}`), {
              lastUpdated: serverTimestamp()
            });

            console.log("Conversation updated in Realtime Database");
          } catch (rtdbError) {
            console.error("Error updating conversation in Realtime Database:", rtdbError);

            // Fallback to Firestore if Realtime Database fails
            try {
              console.log("Falling back to Firestore for conversation update...");
              // Get all user submissions with the same name and mobile
              const submissionsRef = collection(db, 'userSubmissions');
              const querySnapshot = await getDocs(
                firestoreQuery(
                  submissionsRef,
                  where('name', '==', userName),
                  where('mobile', '==', userMobile),
                  orderBy('timestamp', 'desc'),
                  limit(1)
                )
              );

              if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                  messages: arrayUnion(
                    {
                      text: userMessage.text,
                      isBot: false,
                      timestamp: Timestamp.fromDate(userMessage.timestamp)
                    },
                    {
                      text: botResponse.text,
                      isBot: true,
                      timestamp: Timestamp.fromDate(botResponse.timestamp)
                    }
                  ),
                  lastUpdated: Timestamp.now()
                });
                console.log("Conversation updated in Firestore");
              }
            } catch (firestoreError) {
              console.error("Error updating conversation in Firestore:", firestoreError);
              // Continue even if both updates fail
            }
          }
        } catch (error) {
          console.error("Error updating conversation:", error);
          // Continue even if update fails
        }
      }

    } catch (error) {
      console.error("Error communicating with backend:", error);

      // Fallback message
      const errorResponse: MessageType = {
        id: `bot-${Date.now()}`,
        text: "I'm sorry, I couldn't process your question right now. Please try again later or contact support for assistance.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleSendMessage();
    }
  };

  // Handle user details submission
  const handleUserDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!userName.trim()) {
      setDetailsError("Please enter your name");
      return;
    }

    if (!userMobile.trim()) {
      setDetailsError("Please enter your mobile number");
      return;
    }

    // Mobile number validation (simple check for now)
    if (!/^\d{10}$/.test(userMobile.trim())) {
      setDetailsError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setIsSubmittingDetails(true);
      setDetailsError("");

      // First try to save to Realtime Database
      try {
        console.log("Saving user details to Realtime Database...");

        // Create a new entry in the userSubmissions collection
        const userSubmissionsRef = ref(rtdb, 'userSubmissions');
        const newSubmissionRef = push(userSubmissionsRef);

        // Save the session ID for later updates
        const sessionId = newSubmissionRef.key;
        setUserSessionId(sessionId);

        // Prepare initial messages
        const initialMessagesData = messages.map(msg => ({
          text: msg.text,
          isBot: msg.isBot,
          timestamp: serverTimestamp()
        }));

        // Create message entries
        const messagesRef = ref(rtdb, `userSubmissions/${sessionId}/messages`);
        initialMessagesData.forEach(async (msg) => {
          const msgRef = push(messagesRef);
          await set(msgRef, msg);
        });

        // Set user data
        await set(newSubmissionRef, {
          name: userName.trim(),
          mobile: userMobile.trim(),
          email: userEmail.trim() || null,
          timestamp: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });

        console.log("User details saved to Realtime Database");
      } catch (rtdbError) {
        console.error("Error saving to Realtime Database:", rtdbError);

        // Fallback to Firestore
        try {
          console.log("Falling back to Firestore...");
          const docRef = await addDoc(collection(db, 'userSubmissions'), {
            name: userName.trim(),
            mobile: userMobile.trim(),
            email: userEmail.trim() || null,
            timestamp: Timestamp.now(),
            messages: messages.map(msg => ({
              text: msg.text,
              isBot: msg.isBot,
              timestamp: Timestamp.fromDate(msg.timestamp)
            }))
          });

          // Save the Firestore document ID as session ID
          setUserSessionId(docRef.id);
          console.log("User details saved to Firestore");
        } catch (firestoreError) {
          console.error("Error saving to Firestore:", firestoreError);
          throw new Error("Failed to save user details to any database");
        }
      }

      // Update state to show chat interface
      setUserDetailsSubmitted(true);
      setShowUserForm(false);

      // Add welcome message
      const welcomeMessage: MessageType = {
        id: `bot-${Date.now()}`,
        text: `Hi ${userName}! Thanks for providing your details. How can I help you today?`,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, welcomeMessage]);

      // Add welcome message to database
      if (userSessionId) {
        try {
          const messagesRef = ref(rtdb, `userSubmissions/${userSessionId}/messages`);
          const welcomeMessageRef = push(messagesRef);
          await set(welcomeMessageRef, {
            text: welcomeMessage.text,
            isBot: true,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          console.error("Error saving welcome message:", error);
          // Continue even if this fails
        }
      }

    } catch (error) {
      console.error("Error saving user details:", error);
      setDetailsError("Failed to submit your details. Please try again.");
    } finally {
      setIsSubmittingDetails(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Simple Chat Button - Mobile Optimized Positioning */}
      <div className="fixed bottom-4 right-6 sm:bottom-6 sm:right-6 z-[160]">
        <button
          onClick={() => {
            console.log('Chatbot button clicked!');
            setIsOpen(true);
          }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600 hover:bg-blue-700
                     shadow-lg hover:shadow-xl transition-all duration-200
                     flex items-center justify-center group touch-manipulation
                     cursor-pointer relative"
          aria-label="Open chat assistant"
          style={{
            pointerEvents: 'auto',
            zIndex: 160,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MessageCircle
            className="h-6 w-6 sm:h-7 sm:w-7 text-white
                       group-hover:scale-105 transition-transform duration-200"
            style={{
              display: 'block',
              margin: 'auto'
            }}
          />
        </button>
      </div>

      {/* Enhanced Chat Dialog - Fully Mobile Responsive */}
      {isOpen && (
        <div className="fixed inset-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto z-[160] sm:w-96 sm:h-[600px] md:w-[400px] md:h-[650px]">
          <div className="relative w-full h-full bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            {/* Chat Header */}
            <div className="p-4 sm:p-4 bg-blue-900 border-b border-blue-500/30 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 sm:mr-3">
                  <Zap className="h-4 w-4 sm:h-4 sm:w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-lg font-bold text-white">Atandra AI Assistant</h3>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full w-10 h-10 sm:w-10 sm:h-10 touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* User Details Form */}
            {showUserForm && !userDetailsSubmitted ? (
              <div className="flex flex-col h-[calc(100%-72px)]">
                {/* Form Content Area */}
                <div className="flex-1 overflow-y-auto p-6" style={{ WebkitOverflowScrolling: 'touch', minHeight: '0' }}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Welcome to Atandra Chat</h3>
                    <p className="text-blue-300 text-sm">Please provide your details to continue</p>
                  </div>

                  {detailsError && (
                    <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-md mb-4 text-sm">
                      {detailsError}
                    </div>
                  )}

                  <form onSubmit={handleUserDetailsSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white flex items-center text-sm font-medium">
                        <User className="h-4 w-4 mr-2" />
                        Name <span className="text-red-400 ml-1">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 h-12 text-base rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        style={{ fontSize: '16px' }} // Prevents zoom on iOS
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-white flex items-center text-sm font-medium">
                        <Phone className="h-4 w-4 mr-2" />
                        Mobile Number <span className="text-red-400 ml-1">*</span>
                      </Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={userMobile}
                        onChange={(e) => setUserMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        required
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 h-12 text-base rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        style={{ fontSize: '16px' }} // Prevents zoom on iOS
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white flex items-center text-sm font-medium">
                        <Mail className="h-4 w-4 mr-2" />
                        Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your email (optional)"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 h-12 text-base rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        style={{ fontSize: '16px' }} // Prevents zoom on iOS
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className={`w-full h-14 sm:h-10 text-lg sm:text-base font-medium touch-manipulation rounded-lg transition-all duration-300 ${
                          isSubmittingDetails
                            ? 'bg-gray-600 hover:bg-gray-700 opacity-75 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={isSubmittingDetails}
                      >
                        {isSubmittingDetails ? (
                          'Submitting...'
                        ) : (
                          <>
                            <Mic className="w-4 h-4 mr-2" />
                            Start Conversation
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="flex flex-col h-[calc(100%-140px)] sm:h-[calc(100%-128px)] overflow-y-auto p-3 sm:p-4 gap-3 sm:gap-4 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-[90%] sm:max-w-[85%] ${
                          message.isBot
                            ? "bg-blue-900 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        <p className="text-sm sm:text-base leading-relaxed break-words">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-blue-900 rounded-2xl px-4 py-3 text-white max-w-[85%]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {userDetailsSubmitted && messages.length <= 3 && (
                  <div className="p-3 sm:p-4 border-t border-blue-500/30 bg-black/50">
                    <p className="text-xs text-blue-300 mb-2">Ask me about:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="text-xs sm:text-sm bg-blue-900/40 hover:bg-blue-800/60 text-blue-100 rounded-full px-2.5 py-1.5 sm:px-3 sm:py-1 flex items-center touch-manipulation min-h-[36px] sm:min-h-[32px]"
                        >
                          <span className="truncate max-w-[120px] sm:max-w-none">{question}</span>
                          <ArrowRight className="h-3 w-3 ml-1 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-blue-500/30 bg-gray-900">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask about Atandra Energy..."
                      className="flex-1 bg-black/60 border border-blue-500/40 rounded-full px-4 py-3 text-white focus:outline-none focus:border-blue-400 text-sm sm:text-base transition-colors"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-3 min-w-[48px] touch-manipulation"
                    >
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Overlay to close the chat when clicking outside - positioned behind dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatBot;