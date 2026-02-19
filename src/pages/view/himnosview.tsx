import { useState } from 'react';
import { ArrowLeft, Settings, Plus, Minus, X } from 'lucide-react';
import type { FileHimno } from '../../hooks/useFiles';
import { useSettings } from '../../hooks/useSettings';

interface HymnViewProps {
    hymn: FileHimno;
    themeColors: any;
    onBack: () => void;
}

export default function HymnView({ hymn, themeColors, onBack }: HymnViewProps) {
    const { fontSize, increaseFontSize, decreaseFontSize } = useSettings();
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className={`flex flex-col h-[100dvh] ${themeColors.bgMain} text-white overflow-hidden font-sans relative transition-colors duration-500`}>
            {/* --- HEADER SUPERIOR --- */}
            <div className={`shrink-0 z-20 relative ${themeColors.bgHeader} pb-2`}>
                <div className={`
          flex items-center justify-between px-4 pt-8 pb-6 
          rounded-b-[2.5rem] border-b-1 ${themeColors.borderHeader} ${themeColors.shadowHeader}
          bg-[#050511] 
        `}>
                    {/*BOTON REGRESAR */}
                    <button onClick={onBack} className="p-2 active:scale-90 transition-transform">
                        <ArrowLeft size={28} className="text-white" />
                    </button>

                    {/*TITULO DE HIMNO */}

                    <span className="text-sm font-bold text-gray-200 uppercase tracking-widest  max-w-[80%] text-center">
                        {hymn.title}
                    </span>

                    {/* BOTON CONFIGURACION */}
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`p-2 transition-transform active:scale-90 ${showSettings ? 'rotate-90' : ''}`}
                    >
                        <Settings size={28} className="text-white" />
                    </button>
                </div>
            </div>

            {/* --- MENÚ FLOTANTE --- */}
            {showSettings && (
                <div className="absolute top-24 right-6 z-50 bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 w-64 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tamaño Letra</span>
                        <button onClick={() => setShowSettings(false)}><X size={16} className="text-gray-500" /></button>
                    </div>
                    <div className="flex items-center justify-between bg-[#0f0f18] rounded-xl p-2">
                        <button onClick={decreaseFontSize} className={`p-3 rounded-lg bg-white/5 active:bg-white/10 ${themeColors.accentText}`}>
                            <Minus size={20} />
                        </button>
                        <span className="font-mono text-xl font-bold text-white w-12 text-center">{fontSize}</span>
                        <button onClick={increaseFontSize} className={`p-3 rounded-lg bg-white/5 active:bg-white/10 ${themeColors.accentText}`}>
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* --- CONTENIDO --- */}
            <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
                <div className="max-w-md mx-auto space-y-4 pb-12">

                    {hymn.content.map((paragraph, index) => {
                        const isTitleCard = index === 0;

                        return (
                            <div
                                key={index}
                                className={`
                  w-full ${themeColors.cardBg} backdrop-blur-md
                  rounded-xl p-6 text-center border border-white/10 shadow-lg
                  ${isTitleCard ? 'mb-6 border-b-2 ' + themeColors.borderHeader : ''}
                `}
                            >
                                <p style={{
                                    fontSize: isTitleCard ? '26px' : `${fontSize}px`,
                                    lineHeight: isTitleCard ? 1.3 : 1.6,
                                    fontWeight: isTitleCard ? 'bold' : 'normal',
                                    color: isTitleCard ? '#fff' : '#e5e7eb'
                                }}
                                    className="transition-[font-size] duration-200 ease-out whitespace-pre-line"
                                >
                                    {paragraph}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}