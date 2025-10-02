import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-poetry text-2xl font-semibold text-primary">
            🌿 The Living Anthology
          </div>
          
          <div className="hidden md:flex space-x-8 font-medium">
            <button 
              onClick={() => scrollToSection('volumes')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-volumes"
            >
              Volumes
            </button>
            <button 
              onClick={() => scrollToSection('mirror')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-mirror"
            >
              The Mirror
            </button>
            <button 
              onClick={() => scrollToSection('circle')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-circle"
            >
              Join Circle
            </button>
          </div>
          
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('volumes')}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="mobile-nav-volumes"
              >
                Volumes
              </button>
              <button 
                onClick={() => scrollToSection('mirror')}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="mobile-nav-mirror"
              >
                The Mirror
              </button>
              <button 
                onClick={() => scrollToSection('circle')}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="mobile-nav-circle"
              >
                Join Circle
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
