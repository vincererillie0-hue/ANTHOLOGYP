import { useQuery } from "@tanstack/react-query";
import { Play, Download, Heart, Feather, FlipHorizontal2 as MirrorIcon, Music } from "lucide-react";
import { Volume } from "@shared/schema";
import AudioPlayer from "@/components/audio-player";

export default function WeeklyVolumes() {
  const { data: volumes, isLoading } = useQuery<Volume[]>({
    queryKey: ['/api/volumes'],
  });

  const currentVolume = volumes?.find(v => v.is_current);
  const pastVolumes = volumes?.filter(v => !v.is_current).slice(0, 3) || [];

  const handleSubmitReflection = () => {
    const element = document.getElementById('offering-bowl');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <section id="volumes" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading volumes...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="volumes" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-poetry text-5xl md:text-6xl font-semibold text-foreground mb-6">
            📖 Weekly Offerings
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto prose-sanctuary">
            Each Volume is a sacred container — holding poetry, reflection prompts, and the space for your own unfolding.
          </p>
        </div>
        
        {/* Current Volume */}
        {currentVolume && (
          <div className="max-w-4xl mx-auto mb-16 fade-in">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
              <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                <h3 className="font-poetry text-3xl md:text-4xl font-semibold text-white mb-2">
                  {currentVolume.title}
                </h3>
                <p className="text-primary-foreground/90 text-lg">Current Volume • Released this week</p>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-xl p-6">
                      <h4 className="font-poetry text-2xl font-semibold text-foreground mb-4 flex items-center">
                        <Feather className="text-primary mr-3" size={20} />
                        This Week's Poem
                      </h4>
                      <div className="prose-sanctuary text-muted-foreground italic leading-relaxed">
                        {currentVolume.poem_content}
                      </div>
                    </div>
                    
                    <div className="bg-secondary/10 rounded-xl p-6">
                      <h4 className="font-poetry text-2xl font-semibold text-foreground mb-4 flex items-center">
                        <MirrorIcon className="text-secondary mr-3" size={20} />
                        Soul Reflection
                      </h4>
                      <p className="prose-sanctuary text-muted-foreground mb-4">
                        {currentVolume.reflection_prompt}
                      </p>
                      <button className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                        <Download className="mr-2" size={16} />
                        Download journal prompt
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {currentVolume.soundscape_url && (
                      <div className="bg-accent/10 rounded-xl p-6">
                        <h4 className="font-poetry text-2xl font-semibold text-foreground mb-4 flex items-center">
                          <Music className="text-accent mr-3" size={20} />
                          Ambient Soundscape
                        </h4>
                        <p className="prose-sanctuary text-muted-foreground mb-4">
                          {currentVolume.soundscape_title || "Meditation Soundscape"}
                        </p>
                        <AudioPlayer 
                          url={currentVolume.soundscape_url}
                          title={currentVolume.soundscape_title || "Soundscape"}
                        />
                      </div>
                    )}
                    
                    <div className="text-center pt-4">
                      <button 
                        onClick={handleSubmitReflection}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                        data-testid="button-submit-reflection"
                      >
                        <Heart className="inline mr-2" size={16} />
                        Submit Your Reflection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Past Volumes */}
        {pastVolumes.length > 0 && (
          <div className="max-w-6xl mx-auto fade-in">
            <h3 className="font-poetry text-3xl font-semibold text-center mb-12">Past Volumes</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastVolumes.map((volume) => (
                <div 
                  key={volume.id}
                  className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow"
                  data-testid={`card-volume-${volume.id}`}
                >
                  <div className="bg-gradient-to-br from-muted to-muted/50 p-6">
                    <h4 className="font-poetry text-xl font-semibold text-foreground">{volume.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(volume.release_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="prose-sanctuary text-muted-foreground text-sm mb-4">
                      {volume.reflection_prompt.substring(0, 80)}...
                    </p>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Read Volume →
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-6 text-center">
                  <div className="text-3xl text-accent mb-3">+</div>
                  <h4 className="font-poetry text-xl font-semibold text-foreground">More Coming</h4>
                </div>
                <div className="p-6 text-center">
                  <p className="prose-sanctuary text-muted-foreground text-sm">
                    Join our circle to receive new volumes as they're released
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
