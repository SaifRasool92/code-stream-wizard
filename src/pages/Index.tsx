
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
import { Heart, Brain, Thermometer, Lungs, Pill, Activity } from "lucide-react";

const commonEmergencies = [
  { icon: Heart, label: "Chest Pain", description: "Heart attack symptoms" },
  { icon: Brain, label: "Stroke", description: "Stroke symptoms" },
  { icon: Activity, label: "Difficulty Breathing", description: "Breathing problems" },
  { icon: Thermometer, label: "High Fever", description: "Temperature above 103°F" },
  { icon: Lungs, label: "Severe Allergic Reaction", description: "Anaphylaxis" },
  { icon: Pill, label: "Medication Reaction", description: "Adverse drug reaction" },
];

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState("");
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Emergency Medical Assistant
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get immediate guidance for emergency situations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {commonEmergencies.map((emergency) => (
            <Button
              key={emergency.label}
              variant="outline"
              className={`h-auto py-4 px-4 flex flex-col items-center gap-2 text-center ${
                selectedEmergency === emergency.label ? "border-red-500 bg-red-50" : ""
              }`}
              onClick={() => handleEmergencySelect(emergency.label)}
            >
              <emergency.icon className="h-6 w-6 text-red-600" />
              <div>
                <div className="font-semibold">{emergency.label}</div>
                <div className="text-xs text-gray-500">{emergency.description}</div>
              </div>
            </Button>
          ))}
        </div>

        <Card className="border-2 border-red-100">
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Emergency Help</CardTitle>
            <CardDescription>
              Quickly describe your symptoms or select a common emergency above.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Describe your symptoms or emergency situation in detail..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Important Information to Include:</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                  <li>Age and gender of the patient</li>
                  <li>Any existing medical conditions</li>
                  <li>Current medications</li>
                  <li>When symptoms started</li>
                  <li>Any recent relevant events</li>
                </ul>
              </div>
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

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-2 border-orange-100">
            <CardHeader>
              <CardTitle className="text-lg text-orange-600">Emergency Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Emergency Services:</span>
                  <span className="font-bold">911</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Poison Control:</span>
                  <span className="font-bold">1-800-222-1222</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>✓ Stay calm and focused</li>
                <li>✓ Keep the patient still if possible</li>
                <li>✓ Have someone else call for help if available</li>
                <li>✓ Gather any relevant medical documents</li>
              </ul>
            </CardContent>
          </Card>
        </div>

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
