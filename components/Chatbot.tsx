import React, { useState, useRef, useEffect } from 'react';
import { createChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import type { ChatMessage } from '../types';


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chatRef.current) {
            chatRef.current = createChat();
        }
        // Add a default welcome message
        setMessages([{
            role: 'model',
            text: "Hello! I'm your AI Mentor. Ask me anything about your B.Tech journey."
        }]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-glow-primary)]/50 hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-light)]/50"
                aria-label="Toggle AI Mentor Chat"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-[var(--color-bg-alt)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-[var(--color-shadow)] overflow-hidden">
                    <div className="p-4 border-b border-[var(--color-border)]">
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] text-center">Roadmap AI Mentor</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm rounded-xl px-4 py-2 ${msg.role === 'user' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-input-bg)] text-[var(--color-text-secondary)]'}`}>
                                   {msg.text || <span className="animate-pulse">...</span>}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)]">
                        <div className="flex items-center bg-[var(--color-bg)]/50 rounded-lg border border-[var(--color-border)] focus-within:border-[var(--color-primary-light)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                disabled={isLoading}
                                className="w-full bg-transparent p-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
                            />
                            <button type="submit" disabled={isLoading} className="p-3 text-[var(--color-primary-light)] hover:text-[var(--color-primary)] disabled:text-[var(--color-text-muted)]">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-t-transparent border-[var(--color-text-primary)] rounded-full animate-spin"></div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
