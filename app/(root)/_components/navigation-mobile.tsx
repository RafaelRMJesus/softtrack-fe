
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";


export const NavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex md:hidden">
      <button
        className="flex items-center justify-center p-2"
        onClick={toggleMenu}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background p-6 shadow-md">
          <nav className="flex flex-col items-center gap-y-4">
            <Link href="/" className="text-sm text-gray-700">
              Nossa Solução
            </Link>
            <Link href="/about" className="text-sm text-gray-700">
              Sobre o Projeto
            </Link>
            <Link href="/video" className="text-sm text-gray-700">
              Video Pitch
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};