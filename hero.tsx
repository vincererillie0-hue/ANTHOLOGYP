import { BookOpen, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToVolumes = () => {
    const element = document.getElementById('volumes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative texture-overlay">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80')"
        }}
      />
      
      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <div className="space-y-8 fade-in visible">
          <h1 className="font-poetry text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-tight">
            The Living<br />
            <span className="text-primary">Anthology</span>
          </h1>
          
          <div className="font-poetry text-xl md:text-2xl text-muted-foreground italic">
            by R.P8
          </div>
          
          <div className="prose-sanctuary text-lg md:text-xl text-foreground max-w-2xl mx-auto space-y-6">
            <p className="font-poetry italic">A Poetic Ritual for Seekers of the Inner Journey</p>
            
            <div className="space-y-4 text-base md:text-lg">
              <p>
                This is not an app.<br />
                It is a sanctuary.<br />
                A ceremonial archive.<br />
                A digital book that writes itself as you do.
              </p>
              
              <p>
                Each week, a new Volume opens —<br />
                with verse, with questions, with silence and flame.<br />
                Those called deeper may submit their reflections<br />
                or request a private session with the Guide.
              </p>
            </div>
          </div>
          
          <div className="pt-8">
            <button 
              onClick={scrollToVolumes}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              data-testid="button-open-book"
            >
              <BookOpen className="inline mr-3" size={20} />
              Open the Book
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <ChevronDown className="text-2xl text-muted-foreground" size={32} />
      </div>
    </section>
  );
}
