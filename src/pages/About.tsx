
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const stats = [
    { icon: Users, label: "Patients Served", value: "50,000+" },
    { icon: Award, label: "Years of Experience", value: "25+" },
    { icon: Clock, label: "Response Time", value: "< 5 min" },
    { icon: Shield, label: "Success Rate", value: "98%" }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Dermatologist",
      experience: "15 years",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Michael Chen",
      role: "Cosmetic Dermatologist",
      experience: "12 years",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Pediatric Dermatologist",
      experience: "10 years",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About SkinCare Pro</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Leading the future of dermatology with cutting-edge technology and compassionate care.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At SkinCare Pro, we're committed to revolutionizing dermatological care through innovative technology, 
              expert medical professionals, and patient-centered service. Our mission is to make quality skin care 
              accessible, convenient, and effective for everyone.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.experience} experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600">Your safety and privacy are our top priorities in everything we do.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Patient-Centered</h3>
                <p className="text-gray-600">Every decision we make is focused on improving patient outcomes.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">We strive for excellence in medical care and technological innovation.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-600">Making quality healthcare accessible to everyone, everywhere.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
