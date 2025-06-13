
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Mail } from "lucide-react";
import DoctorSelection from "./DoctorSelection";
import AppointmentForm from "./AppointmentForm";
import ConfirmationView from "./ConfirmationView";
import { Doctor, Appointment } from "@/pages/Index";

const BookingSection = () => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'form' | 'confirmation'>('selection');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep('form');
  };

  const handleAppointmentSubmit = (appointmentData: Appointment) => {
    setAppointment(appointmentData);
    setCurrentStep('confirmation');
    
    // Simulate API calls that would happen in a real backend
    console.log('Appointment booked:', appointmentData);
    console.log('Would send confirmation email to doctor:', selectedDoctor?.email);
    console.log('Would send acceptance email to patient:', appointmentData.patientEmail);
    console.log('Would create Google Calendar event for:', appointmentData.date, appointmentData.time);
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setSelectedDoctor(null);
  };

  const handleBookAnother = () => {
    setCurrentStep('selection');
    setSelectedDoctor(null);
    setAppointment(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep === 'selection' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'selection' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <User className="w-4 h-4" />
              </div>
              <span>Select Doctor</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <Calendar className="w-4 h-4" />
              </div>
              <span>Book Appointment</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                <Mail className="w-4 h-4" />
              </div>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'selection' && (
            <DoctorSelection onDoctorSelect={handleDoctorSelect} />
          )}
          
          {currentStep === 'form' && selectedDoctor && (
            <AppointmentForm 
              doctor={selectedDoctor}
              onSubmit={handleAppointmentSubmit}
              onBack={handleBackToSelection}
            />
          )}
          
          {currentStep === 'confirmation' && appointment && selectedDoctor && (
            <ConfirmationView 
              appointment={appointment}
              doctor={selectedDoctor}
              onBookAnother={handleBookAnother}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
