import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import {
  Heart,
  Calendar,
  FileText,
  Bot,
  Shield,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Activity,
  Brain,
  Pill,
  Star,
  Award,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Connect with qualified healthcare professionals across various specialties.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FileText,
    title: "Digital Records",
    description: "Maintain secure, comprehensive digital health records accessible anytime.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Brain,
    title: "AI Health Assistant",
    description: "Get intelligent health insights and personalized recommendations.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Pill,
    title: "Medicine Tracking",
    description: "Smart medication management with reminders and interactions.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Activity,
    title: "Health Analytics",
    description: "Track your progress with detailed health metrics and insights.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock healthcare assistance when you need it most.",
    color: "from-indigo-500 to-indigo-600"
  }
];

const stats = [
  { label: "Healthcare Professionals", value: "500+", icon: Stethoscope },
  { label: "Patient Satisfaction", value: "98%", icon: Star },
  { label: "Consultations Completed", value: "10K+", icon: Calendar },
  { label: "Recovery Success Rate", value: "95%", icon: TrendingUp }
];

const benefits = [
  "Verified and licensed healthcare providers",
  "End-to-end encrypted health data",
  "AI-powered health recommendations",
  "Seamless appointment scheduling",
  "Comprehensive health tracking",
  "Emergency consultation support"
];

const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Cardiologist",
    content: "HealthCare+ has revolutionized how I connect with patients. The platform is intuitive and secure.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Patient",
    content: "I love how easy it is to book appointments and track my health progress. Highly recommended!",
    rating: 5
  },
  {
    name: "Apollo Hospital",
    role: "Healthcare Institution",
    content: "The comprehensive patient management system has improved our operational efficiency significantly.",
    rating: 5
  }
];

export default function Index() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const { currentUser, userData } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      // Redirect based on user role
      if (userData?.role === 'doctor') {
        window.location.href = '/doctor-dashboard';
      } else if (userData?.role === 'hospital') {
        window.location.href = '/hospital-dashboard';
      } else {
        window.location.href = '/doctors';
      }
    } else {
      setSignupModalOpen(true);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  India's Leading Healthcare Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Health,{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    Personalized
                  </span>{" "}
                  & Protected
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with India's best doctors, manage your health records digitally, 
                  and get AI-powered health insights—all in one secure platform designed for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!currentUser ? (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={handleGetStarted}
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Sign In
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/doctors">
                      <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Find Doctors
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/assistant">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-200 text-blue-700 hover:bg-blue-50">
                        AI Assistant
                        <Bot className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Licensed Doctors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">India's #1 Health Platform</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-1 gap-4">
                  <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Welcome to HealthCare+</h3>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Health Score</span>
                          <span className="font-semibold text-green-600">Excellent</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Next Visit</p>
                            <p className="text-xs text-gray-600">Dr. Verma</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">AI Insight</p>
                            <p className="text-xs text-gray-600">Stay hydrated</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding the right doctor to tracking your health journey, 
              our platform provides comprehensive healthcare solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals & Patients
            </h2>
            <p className="text-lg text-gray-600">
              See what our community says about their experience with HealthCare+
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust HealthCare+ for their health management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!currentUser ? (
              <>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full sm:w-auto"
                  onClick={handleGetStarted}
                >
                  Start Your Health Journey
                  <Heart className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Sign In to Your Account
                </Button>
              </>
            ) : (
              <Link to="/doctors">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Explore Doctors
                  <Stethoscope className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Auth Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false);
          setSignupModalOpen(true);
        }}
      />

      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setSignupModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </Layout>
  );
}
