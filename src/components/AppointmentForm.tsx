
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock, User, Video, Loader2 } from "lucide-react";
import { Doctor, Appointment } from "@/pages/Index";
import { createCalendarEvent, createMeetingRoom, sendCalendarInvitations, sendAppointmentEmails } from "@/utils/googleServices";

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
    notes: '',
    includeVideoCall: true
  });

  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    
    try {
      // Step 1: Create Calendar Event
      setBookingStep('Creating calendar event...');
      const calendarEvent = await createCalendarEvent(
        formData.patientName,
        formData.patientEmail,
        doctor.name,
        doctor.email,
        formData.date,
        formData.time,
        formData.service,
        formData.notes
      );

      let meetingUrl = '';
      let meetingCode = '';

      // Step 2: Create Google Meet Room (if video call is included)
      if (formData.includeVideoCall) {
        setBookingStep('Setting up video conference...');
        const meetResponse = await createMeetingRoom(calendarEvent.id);
        meetingUrl = meetResponse.meetingUrl;
        meetingCode = meetResponse.meetingCode;
      }

      // Step 3: Send Calendar Invitations
      setBookingStep('Sending calendar invitations...');
      await sendCalendarInvitations(calendarEvent);

      // Step 4: Send Email Notifications
      setBookingStep('Sending confirmation emails...');
      await sendAppointmentEmails(
        formData.patientEmail,
        doctor.email,
        formData,
        meetingUrl
      );

      // Step 5: Create final appointment object
      const appointment: Appointment = {
        id: calendarEvent.id,
        doctorId: doctor.id,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        date: formData.date,
        time: formData.time,
        service: formData.service,
        notes: formData.notes,
        googleCalendarEventId: calendarEvent.id,
        meetingUrl: meetingUrl,
        meetingCode: meetingCode
      };

      setBookingStep('Finalizing appointment...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSubmit(appointment);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingStep('Error occurred. Please try again.');
      setTimeout(() => {
        setIsBooking(false);
        setBookingStep('');
      }, 2000);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.patientName && formData.patientEmail && formData.patientPhone && formData.date && formData.time;

  if (isBooking) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold">Booking Your Appointment</h3>
              <p className="text-gray-600">{bookingStep}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Integrating with Google Calendar</span>
                </div>
                {formData.includeVideoCall && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Setting up Google Meet</span>
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Sending notifications</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

            {/* Video Call Option */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Video className="w-4 h-4 mr-2" />
                Video Consultation
              </h3>
              
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="includeVideoCall"
                  checked={formData.includeVideoCall}
                  onChange={(e) => handleInputChange('includeVideoCall', e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <Label htmlFor="includeVideoCall" className="flex-1">
                  Include Google Meet video call for remote consultation
                  <p className="text-sm text-gray-600 mt-1">
                    A Google Meet link will be automatically generated and included in your calendar invitation
                  </p>
                </Label>
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

            {/* Google Integration Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Google Services Integration</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ Automatic Google Calendar event creation</li>
                <li>✓ Calendar invitations sent to both patient and doctor</li>
                {formData.includeVideoCall && <li>✓ Google Meet video conference setup</li>}
                <li>✓ Email confirmations with meeting details</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!isFormValid}
            >
              Book Appointment with Google Integration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentForm;
