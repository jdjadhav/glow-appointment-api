
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Calendar, Users, Stethoscope } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Appointment Booking",
      description: "Easy scheduling with healthcare providers, automated reminders, and seamless calendar integration.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Activity,
      title: "Telemedicine",
      description: "Connect with certified healthcare professionals for virtual consultations and medical advice.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Users,
      title: "Dermascan",
      description: "Advanced dermatology scanning technology for skin health monitoring and early detection.",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Stethoscope,
      title: "SOS",
      description: "Emergency medical assistance and urgent care services available 24/7 for critical situations.",
      color: "text-red-600 bg-red-100"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our range of innovative features designed to make healthcare accessible, efficient, and personalized for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
