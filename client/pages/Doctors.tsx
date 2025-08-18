import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Doctor, ApiResponse, PaginatedResponse } from "@shared/types";
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  Search,
  Filter,
  Heart,
  Brain,
  Baby,
  Eye,
  Bone,
  Activity,
  Loader2
} from "lucide-react";

const specialtyIcons: Record<string, any> = {
  "Cardiology": Heart,
  "Neurology": Brain,
  "Pediatrics": Baby,
  "Ophthalmology": Eye,
  "Orthopedics": Bone,
  "General Medicine": Activity,
  "Dermatology": Activity,
  "Gynecology": Activity,
  "Gastroenterology": Activity,
  "Psychiatry": Brain,
  "Pulmonology": Activity,
  "Endocrinology": Activity,
};

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        sortBy,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedSpecialty !== "all" && { specialty: selectedSpecialty })
      });

      const response = await fetch(`/api/doctors?${queryParams}`);
      const data: ApiResponse<PaginatedResponse<Doctor>> = await response.json();

      if (data.success && data.data) {
        setDoctors(data.data.data);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.error || "Failed to fetch doctors");
      }
    } catch (err) {
      setError("Failed to fetch doctors");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specialties from API
  const fetchSpecialties = async () => {
    try {
      const response = await fetch("/api/doctors/specialties");
      const data: ApiResponse<string[]> = await response.json();

      if (data.success && data.data) {
        setSpecialties(["all", ...data.data]);
      }
    } catch (err) {
      console.error("Error fetching specialties:", err);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [searchTerm, selectedSpecialty, sortBy, currentPage]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleBookAppointment = (doctorId: string) => {
    // TODO: Implement appointment booking
    console.log("Booking appointment with doctor:", doctorId);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Find Expert Doctors
          </h1>
          <p className="text-lg text-gray-600">
            Book appointments with qualified healthcare professionals near you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search doctors, specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.filter(s => s !== "all").map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="experience">Most Experience</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Button */}
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading doctors...</span>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {doctors.length} doctors {searchTerm && `for "${searchTerm}"`}
              </p>
            </div>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {doctors.map((doctor) => {
                const SpecialtyIcon = specialtyIcons[doctor.specialty] || Activity;
                return (
                  <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 border-none shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl mb-1">{doctor.name}</CardTitle>
                              <CardDescription className="text-blue-600 font-medium flex items-center">
                                <SpecialtyIcon className="w-4 h-4 mr-1" />
                                {doctor.specialty}
                              </CardDescription>
                              <p className="text-sm text-gray-500 mt-1">{doctor.specialization}</p>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`${
                                doctor.availability.includes("Today") 
                                  ? "bg-green-100 text-green-700 border-green-200" 
                                  : "bg-blue-100 text-blue-700 border-blue-200"
                              }`}
                            >
                              {doctor.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Rating and Reviews */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{doctor.experience} experience</span>
                        </div>
                      </div>

                      {/* Location and Distance */}
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{doctor.location}</span>
                        <span className="text-sm">• {doctor.distance} away</span>
                      </div>

                      {/* Education and Languages */}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Education:</span> {doctor.education}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Languages:</span>
                          <div className="flex flex-wrap gap-1">
                            {doctor.languages.map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Next Available and Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-green-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">Next: {doctor.nextSlot}</span>
                          </div>
                          <span className="text-lg font-bold text-gray-900">{doctor.consultationFee}</span>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                          onClick={() => handleBookAppointment(doctor.id)}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}

            {/* No Results */}
            {doctors.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all available doctors.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
