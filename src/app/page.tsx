"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/server/actions/user.action";
import { useDispatch } from "react-redux";
import { setPrompt } from "@/store/chatSlice";
import { animation } from "@/lib/animation";

interface MousePosition {
  x: number;
  y: number;
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCreate = (): void => {
    if (!input.trim()) return;

    startTransition(async () => {
      try {
        const id = await createWorkspace(input);
        dispatch(setPrompt(input));
        router.push(`/chat/${id}`);
      } catch (err) {
        console.error("Error creating workspace:", err);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleCreate();
    }
  };

  return (
    <div className="min-h-full bg-black w-full flex items-center justify-center relative overflow-hidden">
      {/* Dynamic cursor follower */}
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-10 animate-float-${i % 3}`}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, 
                ${['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 6)]}, 
                ${['#1e40af', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'][Math.floor(Math.random() * 6)]}
              )`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}

        {/* Neural network pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-5" viewBox="0 0 1200 800">
            <defs>
              <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="url(#neuralGradient)" />
                <line x1="50" y1="50" x2="150" y2="50" stroke="url(#neuralGradient)" strokeWidth="0.5" opacity="0.3" />
                <line x1="50" y1="50" x2="50" y2="150" stroke="url(#neuralGradient)" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)" />
          </svg>
        </div>

        {/* Particle system */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-particle opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="w-[90%] max-w-5xl flex flex-col items-center gap-9 relative z-10 text-center px-4">
        {/* Hero section */}
        <div className="space-y-8 animate-hero-entrance">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight tracking-tight">
              What do you want to
            </h1>
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight animate-text-shimmer">
              build?
            </h1>
            
            {/* Floating elements around text */}
            <div className="absolute -top-8 -right-8 w-4 h-4 bg-blue-500 rounded-full animate-bounce opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <div className="absolute top-1/2 -left-12 w-1 h-1 bg-pink-500 rounded-full animate-ping" />
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Transform your wildest ideas into stunning reality with AI-powered web development
          </p>
        </div>

        {/* Enhanced input section */}
        <div className="w-full max-w-3xl relative animate-fade-in-delay-3 group">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-slow" />
          
          {/* Input container */}
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-5 hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
            <div className="space-y-5">
              <Textarea
                value={input}
                onChange={handleInputChange}
                className={`w-full h-20 md:h-35 resize-none bg-transparent text-white placeholder-gray-500 !border-none !ring-0 !outline-none focus:!border-none focus:!ring-0 focus:!outline-none text-lg leading-relaxed transition-all duration-300 ${
                  isTyping ? 'transform scale-[1.01]' : ''
                }`}
                placeholder="Describe your vision in detail — a revolutionary SaaS platform, an artistic portfolio, a cutting-edge dashboard, or anything you can imagine..."
                onKeyDown={handleKeyDown}
              />
              
              {/* Character count and typing indicator */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  {isTyping && (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce delay-100" />
                      <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce delay-200" />
                    </div>
                  )}
                  <span>{input.length} characters</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced action button */}
            <Button
              onClick={handleCreate}
              disabled={isPending || !input.trim()}
              className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group-hover:animate-pulse-slow"
            >
              {isPending ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FaArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{
        animation
       }</style>
    </div>
  );
}