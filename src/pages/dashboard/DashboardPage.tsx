import { useState } from 'react';
import { Search, Music, Folder } from 'lucide-react';
import { useFiles, type FileHimno } from '../../hooks/useFiles'; 
import HymnView
 from '../view/himnosview';
type TabType = 'himnos' | 'folder';

// --- CONFIGURACIÓN DE COLORES (THEMING) ---
const THEMES = {
  himnos: {
    bgMain: 'bg-[#050511]',
    bgHeader: 'bg-[#050511]',
    cardBg: 'bg-[#11112b]/30', // Color de fondo de las tarjetas en la vista de lectura
    bgSearch: 'bg-[#11112b]',
    borderHeader: 'border-blue-600/50',
    shadowHeader: 'shadow-[0_4px_30px_rgba(37,99,235,0.3)]',
    textTitle: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]',
    accentText: 'text-blue-500',
    accentBorder: 'focus:border-blue-500',
    itemEven: 'bg-[#080812]',
    itemOdd: 'bg-[#13132b]',
    navActive: 'text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
  },
  folder: {
    bgMain: 'bg-[#120516]',
    bgHeader: 'bg-[#120516]',
    cardBg: 'bg-[#2a0e30]', // Color de fondo de las tarjetas (Morado oscuro)
    bgSearch: 'bg-[#2a0e30]',
    borderHeader: 'border-fuchsia-600/50',
    shadowHeader: 'shadow-[0_4px_30px_rgba(192,38,211,0.3)]',
    textTitle: 'drop-shadow-[0_0_15px_rgba(232,121,249,0.6)]',
    accentText: 'text-fuchsia-500',
    accentBorder: 'focus:border-fuchsia-500',
    itemEven: 'bg-[#1a0821]',
    itemOdd: 'bg-[#2e0f38]',
    navActive: 'text-fuchsia-400 bg-fuchsia-500/10 shadow-[0_0_15px_rgba(232,121,249,0.2)]'
  }
};

export default function HymnaryDashboard() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('himnos');
  const [selectedHymn, setSelectedHymn] = useState<FileHimno | null>(null); // Estado para abrir himno
  
  const { files } = useFiles(activeTab);
  const theme = THEMES[activeTab];

  // --- MODO LECTURA ---
  // Si hay un himno seleccionado, mostramos la vista de lectura en lugar del dashboard
  if (selectedHymn) {
    return (
      <HymnView 
        hymn={selectedHymn} 
        themeColors={theme} // Pasamos el tema actual para que combine
        onBack={() => setSelectedHymn(null)} 
      />
    );
  }

  // --- MODO DASHBOARD (LISTA) ---
  const filteredFiles = files.filter(file => {
    const term = searchTerm.toLowerCase().trim();
    const matchesTitle = file.title.toLowerCase().includes(term);
    const matchesNumber = file.number.toString().includes(term);
    return matchesTitle || matchesNumber;
  });

  return (
    <div className={`flex flex-col h-screen ${theme.bgMain} text-white overflow-hidden font-sans transition-colors duration-500`}>
      
      {/* HEADER + BUSCADOR */}
      <div className={`shrink-0 z-20 relative ${theme.bgHeader} pb-4 shadow-xl transition-colors duration-500`}>
        <div className={`
          ${theme.bgHeader} pt-10 pb-8 rounded-b-[2.5rem] mb-4 border-b 
          ${theme.borderHeader} ${theme.shadowHeader} transition-all duration-500
        `}>
          <h1 className={`text-3xl font-bold text-center tracking-[0.2em] text-white uppercase ${theme.textTitle}`}>
            {activeTab === 'himnos' ? 'HIMNOS' : 'FOLDER'}
          </h1>
        </div>

        <div className="px-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${theme.accentText} transition-colors duration-300`} />
            </div>
            <input
              type="text"
              placeholder={`Buscar en ${activeTab}...`}
              className={`
                w-full ${theme.bgSearch} text-gray-200 pl-11 pr-4 py-4 rounded-2xl 
                border border-white/10 ${theme.accentBorder} focus:ring-1 focus:ring-opacity-50
                outline-none placeholder-gray-500 text-xl transition-all shadow-inner
              `}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* LISTA DE HIMNOS */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <div className="space-y-2">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file, index) => (
              <button
                key={file.id}
                onClick={() => setSelectedHymn(file)} // AL CLICK, ABRIMOS LA VISTA
                className={`
                  w-full p-4 rounded-xl flex items-center gap-4 transition-all border border-transparent active:scale-[0.97]
                  ${index % 2 === 0 ? theme.itemEven : theme.itemOdd}
                  border-b border-white/5 shadow-sm
                `}
              >
                <span className={`${theme.accentText} font-bold text-3xl w-12 text-right shrink-0 font-mono tracking-tighter transition-colors duration-300`}>
                  {file.number > 0 ? file.number : index + 1}.
                </span>
                <span className="text-gray-200 font-medium text-xl leading-snug text-left line-clamp-2">
                  {file.title}
                </span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-gray-600 space-y-4">
              <div className={`${theme.bgSearch} p-4 rounded-full`}>
                <Search size={32} className="opacity-50" />
              </div>
              <p className="text-sm uppercase tracking-widest font-semibold">Sin resultados</p>
            </div>
          )}
        </div>
      </div>

      {/* NAVBAR INFERIOR */}
      <div className="bg-[#0f0f13]/90 backdrop-blur-xl border-t border-white/5 absolute bottom-0 w-full pb-2 pt-1 px-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          <NavButton 
            icon={<Music size={20} />} 
            label="Himnos" 
            isActive={activeTab === 'himnos'} 
            activeClass={THEMES.himnos.navActive}
            onClick={() => { setActiveTab('himnos'); setSearchTerm(''); }}
          />
          <NavButton 
            icon={<Folder size={20} />} 
            label="Folder" 
            isActive={activeTab === 'folder'} 
            activeClass={THEMES.folder.navActive}
            onClick={() => { setActiveTab('folder'); setSearchTerm(''); }}
          />
        </div>
      </div>
    </div>
  );
}

// COMPONENTE DE BOTÓN NAV
interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  activeClass: string;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, activeClass, onClick }: NavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-2 w-24 rounded-2xl transition-all duration-300 ${
        isActive 
          ? `${activeClass} transform scale-105` 
          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold tracking-widest uppercase">{label}</span>
    </button>
  );
}