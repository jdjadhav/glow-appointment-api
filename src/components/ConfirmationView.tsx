
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Clock, User, Mail, Phone, MapPin } from "lucide-react";
import { Doctor, Appointment } from "@/pages/Index";

interface ConfirmationViewProps {
  appointment: Appointment;
  doctor: Doctor;
  onBookAnother: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ 
  appointment, 
  doctor, 
  onBookAnother 
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-gray-600">
          Your appointment has been successfully booked and confirmed.
        </p>
      </div>

      {/* Appointment Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Date:</span>
                <span className="ml-2">{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Time:</span>
                <span className="ml-2">{appointment.time}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Service:</span>
                <span className="ml-2">{appointment.service}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="font-medium">Appointment ID:</span>
                <Badge variant="outline" className="ml-2">
                  #{appointment.id}
                </Badge>
              </div>
              
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span className="ml-2">SkinCare Pro Clinic</span>
              </div>
            </div>
          </div>
          
          {appointment.notes && (
            <div className="pt-4 border-t">
              <span className="font-medium text-sm">Notes:</span>
              <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Doctor Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Your Doctor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{doctor.name}</h3>
              <Badge variant="secondary" className="mb-2">
                {doctor.specialty}
              </Badge>
              <p className="text-sm text-gray-600">{doctor.experience} of experience</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium">Name:</span>
            <span className="ml-2">{appointment.patientName}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Mail className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium">Email:</span>
            <span className="ml-2">{appointment.patientEmail}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium">Phone:</span>
            <span className="ml-2">{appointment.patientPhone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications Info */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Email Notifications Sent</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Confirmation email sent to you at {appointment.patientEmail}</li>
                <li>✓ Appointment notification sent to Dr. {doctor.name}</li>
                <li>✓ Calendar invitation added to your Google Calendar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onBookAnother} className="flex-1">
          Book Another Appointment
        </Button>
        <Button variant="outline" className="flex-1">
          Download Confirmation
        </Button>
      </div>

      {/* Important Notes */}
      <Card className="mt-6 bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <h3 className="font-medium text-yellow-800 mb-2">Important Notes:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Please arrive 15 minutes before your appointment time</li>
            <li>• Bring a valid ID and insurance card</li>
            <li>• To reschedule or cancel, call us at least 24 hours in advance</li>
            <li>• If you have any questions, contact us at (555) 123-4567</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationView;
