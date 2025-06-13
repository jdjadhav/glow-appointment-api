
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Clock, AlertTriangle, Activity, Ambulance } from "lucide-react";
import Navigation from "@/components/Navigation";

const SOS = () => {
  const [emergencyType, setEmergencyType] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const emergencyTypes = [
    { id: "skin-reaction", label: "Severe Allergic Reaction", icon: AlertTriangle, color: "text-red-600" },
    { id: "burn", label: "Severe Burns", icon: Activity, color: "text-orange-600" },
    { id: "wound", label: "Deep Wounds/Cuts", icon: AlertTriangle, color: "text-red-600" },
    { id: "other", label: "Other Emergency", icon: Ambulance, color: "text-gray-600" }
  ];

  const handleEmergencyCall = () => {
    // In a real app, this would trigger emergency services
    alert("Emergency services have been contacted. Help is on the way!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Emergency Header */}
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 mr-4 animate-pulse" />
            <h1 className="text-4xl font-bold">Emergency SOS</h1>
          </div>
          <p className="text-xl mb-6">
            24/7 Emergency medical assistance for critical dermatological situations
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Instant Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Location Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Actions */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Emergency Call */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center text-red-700">
                  <Phone className="w-6 h-6 mr-2" />
                  Immediate Emergency
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  For life-threatening emergencies, call immediately. Our emergency team will dispatch help to your location.
                </p>
                <Button 
                  onClick={handleEmergencyCall}
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-4"
                  size="lg"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  CALL EMERGENCY (911)
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This will also alert our medical team
                </p>
              </CardContent>
            </Card>

            {/* Emergency Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Describe Emergency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type of Emergency:</label>
                  <div className="space-y-2">
                    {emergencyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setEmergencyType(type.id)}
                        className={`w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors ${
                          emergencyType === type.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <type.icon className={`w-5 h-5 mr-3 ${type.color}`} />
                          <span>{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your address or enable location"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <Button variant="outline" className="w-full mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!emergencyType}
                >
                  <Ambulance className="w-4 h-4 mr-2" />
                  Request Medical Assistance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Emergency Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Emergency Hotline</h3>
                <p className="text-gray-600 mb-4">24/7 emergency medical support</p>
                <p className="text-2xl font-bold text-red-600">1-800-EMERGENCY</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nearest Hospital</h3>
                <p className="text-gray-600 mb-4">Find emergency rooms nearby</p>
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Hospitals
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">First Aid Guide</h3>
                <p className="text-gray-600 mb-4">Emergency first aid instructions</p>
                <Button variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  View Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Important Notice</h3>
          </div>
          <p className="text-yellow-700 max-w-2xl mx-auto">
            For immediate life-threatening emergencies, call 911 or your local emergency number first. 
            This service is a supplement to, not a replacement for, professional emergency medical services.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SOS;
