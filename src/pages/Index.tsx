import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FeaturesSection from "@/components/FeaturesSection";
import BookingSection from "@/components/BookingSection";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  email: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  googleCalendarEventId?: string;
  meetingUrl?: string;
  meetingCode?: string;
}

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);

  if (showBooking) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <BookingSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            SkinCare Pro Clinic
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted partner for comprehensive dermatology care and advanced skin health solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowBooking(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Care of Your Skin?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their dermatological care.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowBooking(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            Schedule Your Consultation Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
