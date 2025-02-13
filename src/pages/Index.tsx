
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
import { Heart, Brain, Thermometer, Activity, Pill } from "lucide-react";

const commonEmergencies = [
  { icon: Heart, label: "Chest Pain", description: "Heart attack symptoms" },
  { icon: Brain, label: "Stroke", description: "Stroke symptoms" },
  { icon: Activity, label: "Difficulty Breathing", description: "Breathing problems" },
  { icon: Thermometer, label: "High Fever", description: "Temperature above 103°F" },
  { icon: Activity, label: "Severe Allergic Reaction", description: "Anaphylaxis" },
  { icon: Pill, label: "Medication Reaction", description: "Adverse drug reaction" },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const { toast } = useToast();

  const handleEmergencySelect = (emergency: string) => {
    setSelectedEmergency(emergency);
    setSymptoms((prev) => 
      `${emergency}${prev ? "\n\nAdditional symptoms: " + prev : ""}`
    );
  };

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
    const userMessage: Message = {
      role: 'user',
      content: symptoms,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);

    try {
      // This would be replaced with your Deepseek API integration
      setTimeout(() => {
        const assistantResponse: Message = {
          role: 'assistant',
          content: "I understand you're experiencing these symptoms. Let me ask a few clarifying questions:\n\n1. How long have you been experiencing these symptoms?\n2. Have you taken any medication?\n3. Do you have any existing medical conditions?",
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, assistantResponse]);
        setSymptoms("");
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 sm:text-5xl animate-fade-in">
            Healthcare AI Assistant
          </h1>
          <p className="mt-4 text-lg text-blue-600">
            Get immediate medical guidance and chat with our AI healthcare assistant
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {commonEmergencies.map((emergency) => (
            <Button
              key={emergency.label}
              variant="outline"
              className={`h-auto py-6 px-4 flex flex-col items-center gap-3 text-center transition-all duration-200 hover:scale-105 ${
                selectedEmergency === emergency.label 
                ? "border-blue-500 bg-blue-50 shadow-lg" 
                : "hover:border-blue-300 hover:bg-blue-50"
              }`}
              onClick={() => handleEmergencySelect(emergency.label)}
            >
              <emergency.icon className={`h-8 w-8 ${
                selectedEmergency === emergency.label 
                ? "text-blue-600" 
                : "text-blue-400"
              }`} />
              <div>
                <div className="font-semibold text-blue-900">{emergency.label}</div>
                <div className="text-xs text-blue-600">{emergency.description}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card className="border-2 border-blue-100 md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-xl text-blue-900">Chat with AI Assistant</CardTitle>
              <CardDescription className="text-blue-600">
                Describe your symptoms or concerns, and our AI will guide you through the process.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white rounded-lg p-4 h-[400px] overflow-y-auto mb-4 border border-blue-100 shadow-inner">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-lg shadow-md max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Describe your symptoms or respond to the AI's questions..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-[100px] border-blue-200 focus:border-blue-400 shadow-sm"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg text-purple-900">Important Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-yellow-800">Please Include:</h3>
                  <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                    <li>Age and gender</li>
                    <li>Medical history</li>
                    <li>Current medications</li>
                    <li>Symptom duration</li>
                    <li>Pain level (1-10)</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-red-800">Emergency Numbers:</h3>
                  <ul className="list-none text-sm text-red-700 mt-2 space-y-1">
                    <li>Emergency: 911</li>
                    <li>Poison Control: 1-800-222-1222</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-red-50 p-6 rounded-lg shadow-md">
          <p className="text-red-600 font-bold text-lg">
            If you're experiencing a medical emergency, call emergency services immediately!
          </p>
          <p className="text-gray-600 mt-2">
            This AI assistant provides preliminary guidance only and is not a substitute for professional medical care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
