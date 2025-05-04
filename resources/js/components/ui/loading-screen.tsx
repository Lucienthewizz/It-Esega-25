"use client";

import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  isOpen: boolean;
}

export default function LoadingScreen({
  isOpen
}: LoadingScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-100/50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-full blur-xl -translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-200/80 rounded-full blur-xl translate-x-2 translate-y-2"></div>
        </div>
        
        {/* Loader Container */}
        <div className="relative">
          {/* Pulsing Circle Behind Loader */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20"></span>
          
          {/* Spinner */}
          <Loader2 className="h-12 w-12 text-red-600 animate-spin relative z-10" />
        </div>
      </div>
    </div>
  );
} 