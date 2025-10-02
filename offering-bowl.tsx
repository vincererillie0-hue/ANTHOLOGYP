import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Volume } from "@shared/schema";
import { sendReflectionEmail } from "@/lib/emailjs";

const reflectionSchema = z.object({
  seekerName: z.string().min(1, "Please enter your name"),
  volumeReference: z.string().min(1, "Please select a volume"),
  reflection: z.string().min(10, "Please share your reflection (at least 10 characters)"),
  anonymousSharing: z.boolean().default(false),
});

type ReflectionFormData = z.infer<typeof reflectionSchema>;

export default function OfferingBowl() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: volumes } = useQuery<Volume[]>({
    queryKey: ['/api/volumes'],
  });

  const form = useForm<ReflectionFormData>({
    resolver: zodResolver(reflectionSchema),
    defaultValues: {
      seekerName: "",
      volumeReference: "",
      reflection: "",
      anonymousSharing: false,
    },
  });

  const reflectionMutation = useMutation({
    mutationFn: async (data: ReflectionFormData) => {
      await sendReflectionEmail(data);
    },
    onSuccess: () => {
      toast({
        title: "Reflection Received",
        description: "Thank you for sharing your truth. Your reflection has been received with gratitude.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Unable to Send",
        description: "There was an issue sending your reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ReflectionFormData) => {
    setIsSubmitting(true);
    try {
      await reflectionMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="offering-bowl" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-poetry text-5xl md:text-6xl font-semibold text-foreground mb-6">
              📨 The Offering Bowl
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto prose-sanctuary">
              Share your reflections, insights, or simply the questions that keep you awake. 
              Every offering is received in sacred confidence.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 border border-border fade-in">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="seekerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poetry text-lg font-medium text-foreground">
                          Your Name (or pen name)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="How shall I know you?"
                            className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                            data-testid="input-seeker-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="volumeReference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poetry text-lg font-medium text-foreground">
                          Which Volume speaks to you?
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                              data-testid="select-volume"
                            >
                              <SelectValue placeholder="Select a volume" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {volumes?.map((volume) => (
                              <SelectItem key={volume.id} value={volume.id}>
                                {volume.title}
                              </SelectItem>
                            ))}
                            <SelectItem value="general">General Reflection</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="reflection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poetry text-lg font-medium text-foreground">
                        Your Reflection
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={8}
                          placeholder="Let your truth flow onto the page. Whether poetry, prose, or stream of consciousness — all forms of expression are welcome here."
                          className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                          data-testid="textarea-reflection"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="anonymousSharing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1.5"
                          data-testid="checkbox-anonymous"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-muted-foreground prose-sanctuary">
                          I give permission for anonymous quotes from my reflection to be featured in future Volumes 
                          (your name will never be shared without explicit consent)
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="text-center pt-6">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    data-testid="button-submit-reflection"
                  >
                    <NotebookPen className="mr-3" size={16} />
                    {isSubmitting ? "Offering..." : "Offer to the Bowl"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
