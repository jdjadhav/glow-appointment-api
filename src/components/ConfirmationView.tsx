
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Clock, User, Mail, Phone, MapPin, Video, ExternalLink } from "lucide-react";
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
          Your appointment has been successfully booked with Google Calendar integration.
        </p>
      </div>

      {/* Google Services Integration Status */}
      <Card className="mb-6 bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <CheckCircle className="w-5 h-5 mr-2" />
            Google Services Integration Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-green-700">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Google Calendar event created</span>
              </div>
              <div className="flex items-center text-sm text-green-700">
                <Mail className="w-4 h-4 mr-2" />
                <span>Calendar invitations sent</span>
              </div>
            </div>
            <div className="space-y-2">
              {appointment.meetingUrl && (
                <div className="flex items-center text-sm text-green-700">
                  <Video className="w-4 h-4 mr-2" />
                  <span>Google Meet room created</span>
                </div>
              )}
              <div className="flex items-center text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Email confirmations sent</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Conference Details */}
      {appointment.meetingUrl && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Video className="w-5 h-5 mr-2" />
              Video Conference Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div>
                <p className="font-medium">Google Meet Link</p>
                <p className="text-sm text-gray-600">Meeting Code: {appointment.meetingCode}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(appointment.meetingUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
            </div>
            <div className="text-sm text-blue-700">
              <p>• The meeting link has been included in your calendar invitation</p>
              <p>• You'll receive a reminder 15 minutes before the appointment</p>
              <p>• Dial-in option available for audio-only participation</p>
            </div>
          </CardContent>
        </Card>
      )}

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
                  #{appointment.id.slice(-8)}
                </Badge>
              </div>
              
              {appointment.googleCalendarEventId && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Calendar Event ID:</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {appointment.googleCalendarEventId.slice(-8)}
                  </Badge>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span className="ml-2">
                  {appointment.meetingUrl ? 'Virtual (Google Meet)' : 'SkinCare Pro Clinic'}
                </span>
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onBookAnother} className="flex-1">
          Book Another Appointment
        </Button>
        <Button variant="outline" className="flex-1">
          Add to My Calendar
        </Button>
        {appointment.meetingUrl && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(appointment.meetingUrl, '_blank')}
          >
            <Video className="w-4 h-4 mr-2" />
            Test Meeting Link
          </Button>
        )}
      </div>

      {/* Important Notes */}
      <Card className="mt-6 bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <h3 className="font-medium text-yellow-800 mb-2">Important Notes:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Check your email for the Google Calendar invitation</li>
            <li>• The appointment will appear in your Google Calendar automatically</li>
            {appointment.meetingUrl && (
              <li>• Test your camera and microphone before the video call</li>
            )}
            <li>• You'll receive automated reminders before your appointment</li>
            <li>• To reschedule, please contact us at least 24 hours in advance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationView;
