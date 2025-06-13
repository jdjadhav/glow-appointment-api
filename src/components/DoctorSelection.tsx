
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";
import { Doctor } from "@/pages/Index";

interface DoctorSelectionProps {
  onDoctorSelect: (doctor: Doctor) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ onDoctorSelect }) => {
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
      experience: "15 years",
      image: "/placeholder.svg",
      email: "sarah.johnson@skincare.com",
      availableSlots: ["09:00", "10:30", "14:00", "15:30", "16:00"]
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Cosmetic Dermatologist",
      experience: "12 years",
      image: "/placeholder.svg",
      email: "michael.chen@skincare.com",
      availableSlots: ["10:00", "11:30", "13:00", "14:30", "16:30"]
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatric Dermatologist",
      experience: "10 years",
      image: "/placeholder.svg",
      email: "emily.rodriguez@skincare.com",
      availableSlots: ["09:30", "11:00", "13:30", "15:00", "17:00"]
    },
    {
      id: "4",
      name: "Dr. David Kim",
      specialty: "Mohs Surgeon",
      experience: "18 years",
      image: "/placeholder.svg",
      email: "david.kim@skincare.com",
      availableSlots: ["08:00", "10:00", "12:00", "14:00", "16:00"]
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {doctor.specialty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{doctor.experience} of experience</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9/5 (127 reviews)</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Available Today</span>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-2">Available slots today:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableSlots.slice(0, 3).map((slot) => (
                    <Badge key={slot} variant="outline" className="text-xs">
                      {slot}
                    </Badge>
                  ))}
                  {doctor.availableSlots.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{doctor.availableSlots.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={() => onDoctorSelect(doctor)}
                className="w-full"
              >
                Select Doctor
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelection;
