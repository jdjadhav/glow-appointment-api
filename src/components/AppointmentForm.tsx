
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock, User } from "lucide-react";
import { Doctor, Appointment } from "@/pages/Index";

interface AppointmentFormProps {
  doctor: Doctor;
  onSubmit: (appointment: Appointment) => void;
  onBack: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctor, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    service: 'consultation',
    notes: ''
  });

  const services = [
    'General Consultation',
    'Acne Treatment',
    'Skin Cancer Screening',
    'Cosmetic Consultation',
    'Mole Removal',
    'Laser Treatment',
    'Chemical Peel',
    'Botox Treatment'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      date: formData.date,
      time: formData.time,
      service: formData.service,
      notes: formData.notes
    };
    
    onSubmit(appointment);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.patientName && formData.patientEmail && formData.patientPhone && formData.date && formData.time;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold">Book Appointment</h2>
      </div>

      {/* Selected Doctor Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Selected Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{doctor.name}</h3>
              <Badge variant="secondary">{doctor.specialty}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <User className="w-4 h-4 mr-2" />
                Patient Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Full Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="patientPhone">Phone Number *</Label>
                  <Input
                    id="patientPhone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="patientEmail">Email Address *</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Appointment Scheduling */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select time</option>
                    {doctor.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <Label htmlFor="service">Type of Service</Label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any specific concerns or requirements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!isFormValid}
            >
              Book Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentForm;
