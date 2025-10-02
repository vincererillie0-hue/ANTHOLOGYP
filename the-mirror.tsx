import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { NotebookPen, Heart, Compass, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { sendSessionRequestEmail } from "@/lib/emailjs";

const sessionRequestSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  innerLandscape: z.string().min(20, "Please share more about your inner landscape (at least 20 characters)"),
  sessionIntent: z.string().min(10, "Please describe what you hope to explore (at least 10 characters)"),
});

type SessionRequestFormData = z.infer<typeof sessionRequestSchema>;

export default function TheMirror() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SessionRequestFormData>({
    resolver: zodResolver(sessionRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      innerLandscape: "",
      sessionIntent: "",
    },
  });

  const sessionMutation = useMutation({
    mutationFn: async (data: SessionRequestFormData) => {
      await sendSessionRequestEmail(data);
    },
    onSuccess: () => {
      toast({
        title: "Session Request Sent",
        description: "Thank you for reaching out. You'll receive a response within 24 hours with scheduling options.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Unable to Send Request",
        description: "There was an issue sending your session request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: SessionRequestFormData) => {
    setIsSubmitting(true);
    try {
      await sessionMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="mirror" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-poetry text-5xl md:text-6xl font-semibold text-foreground mb-6">
              🔮 The Mirror
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto prose-sanctuary">
              Sometimes the inner journey calls for a guide. A witness. Someone to hold space 
              while you navigate the terrain of your own becoming.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 fade-in">
              <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
                <h3 className="font-poetry text-2xl font-semibold text-foreground mb-6">
                  What to Expect
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <Heart className="text-primary" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Sacred Presence</h4>
                      <p className="text-muted-foreground text-sm prose-sanctuary">
                        A non-judgmental space where you can explore your deepest questions and insights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 rounded-full p-2 mt-1">
                      <Compass className="text-secondary" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Gentle Guidance</h4>
                      <p className="text-muted-foreground text-sm prose-sanctuary">
                        Not advice or answers, but questions that help you find your own way forward.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/10 rounded-full p-2 mt-1">
                      <Sprout className="text-accent" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Integration Support</h4>
                      <p className="text-muted-foreground text-sm prose-sanctuary">
                        Tools and practices to help integrate insights into daily life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-border">
                <div className="text-center">
                  <div className="font-poetry text-lg font-medium text-foreground mb-2">Session Investment</div>
                  <div className="text-3xl font-semibold text-primary mb-1">$125</div>
                  <div className="text-sm text-muted-foreground">90 minutes via video call</div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl shadow-xl p-8 border border-border fade-in">
              <h3 className="font-poetry text-2xl font-semibold text-foreground mb-6">
                Request a Session
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-foreground">
                          Your Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="How would you like to be addressed?"
                            className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                            data-testid="input-session-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-foreground">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                            data-testid="input-session-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="innerLandscape"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-foreground">
                          Describe Your Inner Landscape
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="What brings you to seek guidance? What questions are calling to you? There's no right or wrong way to share — trust what wants to be expressed."
                            className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                            data-testid="textarea-inner-landscape"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sessionIntent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-foreground">
                          What do you hope to explore?
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={3}
                            placeholder="Your intentions for our time together..."
                            className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                            data-testid="textarea-session-intent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      data-testid="button-request-session"
                    >
                      <NotebookPen className="mr-2" size={16} />
                      {isSubmitting ? "Sending..." : "Request Session"}
                    </Button>
                  </div>
                </form>
              </Form>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground prose-sanctuary text-center">
                  You'll receive a response within 24 hours with scheduling options and payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
