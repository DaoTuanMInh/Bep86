import React from 'react';
import { Phone } from 'lucide-react';

const FloatingButtons = () => {
    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] flex flex-col gap-3 md:gap-4">
            {/* Zalo Button */}
            <a
                href="https://zalo.me/0985700057"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
            >
                {/* Zalo Logo SVG (Simple text version for now) */}
                <div className="text-white font-black text-xs tracking-tighter w-full h-full flex flex-col items-center justify-center pt-0.5">
                    <span className="text-[10px] leading-tight">Chat</span>
                    <span>Zalo</span>
                </div>
                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-zinc-900 text-white text-sm font-bold px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Chat Zalo
                </span>
            </a>

            {/* Phone Button */}
            <a
                href="tel:0985700057"
                className="w-14 h-14 bg-brand-red rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
            >
                <Phone className="w-6 h-6 text-white animate-pulse" />
                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-brand-red rounded-full animate-ping opacity-20" style={{ animationDuration: '1.5s' }}></div>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-zinc-900 text-white text-sm font-bold px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Gọi ngay: 0985.700.057
                </span>
            </a>
        </div>
    );
};

export default FloatingButtons;
