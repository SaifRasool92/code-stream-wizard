
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Please describe your symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Here you would integrate with your backend API
    // For now, we'll just simulate a response
    try {
      // Replace this with your actual API call
      setTimeout(() => {
        setResponse(
          "Please remain calm. If you're experiencing chest pain: 1. Sit down and rest 2. Take aspirin if available 3. Loosen any tight clothing 4. Call emergency services immediately. Stay on the line with them until help arrives."
        );
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error getting response",
        description: "Please try again",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Emergency Medical Assistant
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Describe your symptoms and get immediate guidance for emergency situations
          </p>
        </div>

        <Card className="border-2 border-red-100">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Emergency Help</CardTitle>
            <CardDescription>
              Quickly describe what you're experiencing. We'll provide immediate steps you can take.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Describe your symptoms or emergency situation (e.g., 'I'm experiencing chest pain and shortness of breath')"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Getting help..." : "Get Emergency Guidance"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {response && (
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">Immediate Actions</CardTitle>
              <CardDescription>
                Follow these steps while emergency services are on their way
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-blue">
                <p className="text-lg text-gray-700 whitespace-pre-line">{response}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <p className="text-red-600 font-bold text-lg">
            If you're experiencing a medical emergency, call emergency services immediately!
          </p>
          <p className="text-gray-600 mt-2">
            This app provides preliminary guidance only and is not a substitute for professional medical care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
