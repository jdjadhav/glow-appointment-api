
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Scan, AlertTriangle, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dermascan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI scanning process
    setTimeout(() => {
      setScanResult({
        riskLevel: "Low Risk",
        confidence: 85,
        findings: [
          "No suspicious patterns detected",
          "Normal skin pigmentation",
          "Recommend regular monitoring"
        ],
        recommendation: "Continue regular skin care routine. Schedule annual check-up."
      });
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AI-Powered Dermascan</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Advanced dermatology scanning technology for early detection of skin conditions. Upload a photo and get instant AI analysis.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Scan className="w-5 h-5" />
              <span>AI Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Photo Upload</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Interface */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Skin Analysis Tool</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Skin Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Uploaded skin" className="max-w-full h-64 object-cover mx-auto rounded" />
                  ) : (
                    <div>
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded"
                />
                {selectedImage && (
                  <Button 
                    onClick={handleScan} 
                    disabled={isScanning}
                    className="w-full"
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    {isScanning ? "Analyzing..." : "Start AI Analysis"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scan className="w-5 h-5 mr-2" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!scanResult && !isScanning && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Upload an image to see analysis results</p>
                  </div>
                )}
                
                {isScanning && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">AI is analyzing your skin image...</p>
                  </div>
                )}

                {scanResult && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-semibold">Risk Level:</span>
                      <span className="text-green-600 font-bold">{scanResult.riskLevel}</span>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-semibold mb-2">Confidence: {scanResult.confidence}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${scanResult.confidence}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Findings:</h4>
                      <ul className="space-y-1">
                        {scanResult.findings.map((finding: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Recommendation:</h4>
                      <p className="text-sm">{scanResult.recommendation}</p>
                    </div>

                    <Button variant="outline" className="w-full">
                      Book Consultation with Dermatologist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Important Disclaimer</h3>
          </div>
          <p className="text-yellow-700 max-w-2xl mx-auto">
            This AI analysis is for informational purposes only and should not replace professional medical advice. 
            Always consult with a qualified dermatologist for proper diagnosis and treatment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dermascan;
