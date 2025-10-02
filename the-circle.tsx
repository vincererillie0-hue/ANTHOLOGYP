import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/emailjs";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function TheCircle() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      console.log('Circle mutation: Starting subscription for', data.email);
      await subscribeToNewsletter(data.email);
      console.log('Circle mutation: Subscription completed');
    },
    onSuccess: () => {
      console.log('Circle mutation: onSuccess triggered, showing toast');
      toast({
        title: "Welcome to the Circle",
        description: "You've successfully joined our sacred community. Watch for the next Volume in your inbox.",
      });
      form.reset();
    },
    onError: (error) => {
      console.log('Circle mutation: onError triggered:', error);
      toast({
        title: "Unable to Subscribe",
        description: "There was an issue with your subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      await subscribeMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="circle" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 fade-in">
            <h2 className="font-poetry text-5xl md:text-6xl font-semibold text-foreground mb-6">
              🌾 Join the Circle
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto prose-sanctuary">
              Receive each new Volume as it's released. No noise, no filler — 
              only poetry, prompts, and the invitation to go deeper.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-card to-muted/20 rounded-2xl shadow-xl p-8 md:p-12 border border-border fade-in">
            <div className="max-w-lg mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Email address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-6 py-4 bg-background border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-lg text-center"
                            data-testid="input-circle-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-4 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    data-testid="button-join-circle"
                  >
                    <Mail className="mr-3" size={16} />
                    {isSubmitting ? "Joining..." : "Enter the Circle"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-semibold text-primary">Weekly</div>
                    <div className="text-sm text-muted-foreground">New Volumes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-secondary">Sacred</div>
                    <div className="text-sm text-muted-foreground">Confidentiality</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-accent">Always</div>
                    <div className="text-sm text-muted-foreground">Unsubscribe</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground prose-sanctuary">
                  Your email is held in sacred trust. It will never be shared, sold, or used for anything 
                  other than delivering these weekly offerings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
