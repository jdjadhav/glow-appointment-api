
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Revolutionary AI Technology Detects Skin Cancer with 98% Accuracy",
      excerpt: "Our new AI-powered dermascan technology has achieved unprecedented accuracy in early skin cancer detection...",
      author: "Dr. Sarah Johnson",
      date: "June 10, 2025",
      category: "Technology",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Telemedicine Consultations Show 40% Increase in Patient Satisfaction",
      excerpt: "Recent studies show that patients prefer the convenience and accessibility of virtual dermatology consultations...",
      author: "Medical Team",
      date: "June 8, 2025",
      category: "Research",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Summer Skin Care: Essential Tips from Our Dermatologists",
      excerpt: "As summer approaches, our expert dermatologists share crucial advice for protecting your skin...",
      author: "Dr. Michael Chen",
      date: "June 5, 2025",
      category: "Health Tips",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Latest News</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay updated with the latest developments in dermatology, healthcare technology, and skin care innovations.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 cursor-pointer">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
