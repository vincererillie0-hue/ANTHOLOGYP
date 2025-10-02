export default function Footer() {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <h3 className="font-poetry text-3xl font-semibold">The Code of Intention</h3>
            
            <blockquote className="prose-sanctuary text-lg space-y-4 italic">
              <p>
                <em>This space is a sanctuary, not a stage.</em><br />
                <em>There is no performance here.</em><br />
                <em>Only presence.</em>
              </p>
              
              <p>
                <em>What is offered, is offered in truth.</em><br />
                <em>What is received, is received in silence.</em>
              </p>
              
              <p>
                <em>This is a place of remembering, not achieving.</em><br />
                <em>Of ritual, not routine.</em><br />
                <em>Of poetry, not perfection.</em>
              </p>
            </blockquote>
            
            <div className="font-poetry text-xl">
              May every word be a <span className="text-primary">key</span>,<br />
              and never a <span className="text-muted-foreground">cage</span>.
            </div>
          </div>
          
          <div className="border-t border-muted-foreground/20 pt-8">
            <div className="space-y-4">
              <div className="font-poetry text-xl">
                🌿 The Living Anthology — by R.P8
              </div>
              <p className="text-background/70 prose-sanctuary">
                Poet of silence. Architect of soul space.<br />
                This Anthology is my way of offering presence in a digital form —<br />
                a mirror for your inward fire, and an altar where nothing must be performed.
              </p>
              <div className="text-sm text-background/50">
                Built with reverence • Hosted with intention
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
