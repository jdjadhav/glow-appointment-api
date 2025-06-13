
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Clock, Users, Shield, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";

const Telemedicine = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
      rating: 4.9,
      experience: "15 years",
      price: "$120/session",
      available: "Available Now",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Cosmetic Dermatologist", 
      rating: 4.8,
      experience: "12 years",
      price: "$140/session",
      available: "Available in 30 min",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Telemedicine Consultations</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with certified dermatologists from the comfort of your home. Get expert medical advice through secure video consultations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>HD Video Calls</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Telemedicine?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Video className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Video Calls</h3>
                <p className="text-gray-600">High-quality, encrypted video consultations with board-certified dermatologists.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
                <p className="text-gray-600">Get consultations within minutes, no waiting rooms or long appointment delays.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Privacy Protected</h3>
                <p className="text-gray-600">All consultations are HIPAA compliant and your data is fully encrypted.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Doctors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-green-600">{doctor.available}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">⭐ {doctor.rating}/5 rating</p>
                    <p className="text-sm">{doctor.experience} experience</p>
                    <p className="text-lg font-semibold text-blue-600">{doctor.price}</p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Telemedicine;
