import { RequestHandler } from "express";
import { Doctor, ApiResponse, PaginatedResponse, DoctorSearchQuery } from "@shared/types";

// Mock Indian doctors data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar Sharma",
    specialty: "Cardiology",
    specialization: "Interventional Cardiology",
    rating: 4.9,
    reviews: 245,
    experience: "15 years",
    location: "AIIMS Delhi",
    distance: "2.3 km",
    availability: "Available Today",
    nextSlot: "2:30 PM",
    consultationFee: "₹800",
    languages: ["Hindi", "English", "Punjabi"],
    education: "AIIMS Delhi, MD Cardiology",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Dr. Priya Mehta",
    specialty: "Neurology",
    specialization: "Pediatric Neurology",
    rating: 4.8,
    reviews: 189,
    experience: "12 years",
    location: "Fortis Hospital Mumbai",
    distance: "3.1 km",
    availability: "Available Tomorrow",
    nextSlot: "10:00 AM",
    consultationFee: "₹1200",
    languages: ["Hindi", "English", "Marathi"],
    education: "KEM Hospital Mumbai, DM Neurology",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Dr. Arun Singh Chauhan",
    specialty: "Orthopedics",
    specialization: "Sports Medicine",
    rating: 4.7,
    reviews: 156,
    experience: "18 years",
    location: "Apollo Hospital Chennai",
    distance: "4.2 km",
    availability: "Available This Week",
    nextSlot: "Mon 9:00 AM",
    consultationFee: "₹900",
    languages: ["Hindi", "English", "Tamil"],
    education: "CMC Vellore, MS Orthopedics",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Dr. Kavita Reddy",
    specialty: "Pediatrics",
    specialization: "Pediatric Immunology",
    rating: 4.9,
    reviews: 312,
    experience: "10 years",
    location: "Rainbow Children's Hospital",
    distance: "1.8 km",
    availability: "Available Today",
    nextSlot: "4:15 PM",
    consultationFee: "₹600",
    languages: ["Hindi", "English", "Telugu", "Kannada"],
    education: "PGIMER Chandigarh, MD Pediatrics",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Dr. Amit Gupta",
    specialty: "General Medicine",
    specialization: "Internal Medicine",
    rating: 4.8,
    reviews: 203,
    experience: "8 years",
    location: "Max Super Speciality Hospital",
    distance: "1.2 km",
    availability: "Available Today",
    nextSlot: "3:45 PM",
    consultationFee: "₹500",
    languages: ["Hindi", "English"],
    education: "MAMC Delhi, MD Internal Medicine",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Dr. Sunita Patel",
    specialty: "Ophthalmology",
    specialization: "Retinal Surgery",
    rating: 4.9,
    reviews: 178,
    experience: "14 years",
    location: "L.V. Prasad Eye Institute",
    distance: "2.7 km",
    availability: "Available Tomorrow",
    nextSlot: "11:30 AM",
    consultationFee: "₹750",
    languages: ["Hindi", "English", "Gujarati"],
    education: "AIIMS Delhi, MS Ophthalmology",
    image: "/placeholder.svg"
  },
  {
    id: "7",
    name: "Dr. Vikram Singh",
    specialty: "Dermatology",
    specialization: "Cosmetic Dermatology",
    rating: 4.6,
    reviews: 134,
    experience: "9 years",
    location: "Manipal Hospital Bangalore",
    distance: "3.5 km",
    availability: "Available This Week",
    nextSlot: "Tue 2:00 PM",
    consultationFee: "₹700",
    languages: ["Hindi", "English", "Kannada"],
    education: "JIPMER Puducherry, MD Dermatology",
    image: "/placeholder.svg"
  },
  {
    id: "8",
    name: "Dr. Meera Joshi",
    specialty: "Gynecology",
    specialization: "High-Risk Pregnancy",
    rating: 4.8,
    reviews: 267,
    experience: "16 years",
    location: "Cloudnine Hospital",
    distance: "2.1 km",
    availability: "Available Today",
    nextSlot: "5:00 PM",
    consultationFee: "₹800",
    languages: ["Hindi", "English", "Marathi"],
    education: "Seth GS Medical College Mumbai, MD OBG",
    image: "/placeholder.svg"
  },
  {
    id: "9",
    name: "Dr. Rakesh Agarwal",
    specialty: "Gastroenterology",
    specialization: "Liver Diseases",
    rating: 4.7,
    reviews: 145,
    experience: "13 years",
    location: "Medanta Hospital Gurgaon",
    distance: "5.2 km",
    availability: "Available Tomorrow",
    nextSlot: "9:30 AM",
    consultationFee: "₹1000",
    languages: ["Hindi", "English"],
    education: "PGIMER Chandigarh, DM Gastroenterology",
    image: "/placeholder.svg"
  },
  {
    id: "10",
    name: "Dr. Neha Malhotra",
    specialty: "Psychiatry",
    specialization: "Child Psychology",
    rating: 4.8,
    reviews: 198,
    experience: "11 years",
    location: "NIMHANS Bangalore",
    distance: "3.8 km",
    availability: "Available This Week",
    nextSlot: "Wed 4:30 PM",
    consultationFee: "₹900",
    languages: ["Hindi", "English"],
    education: "NIMHANS Bangalore, MD Psychiatry",
    image: "/placeholder.svg"
  },
  {
    id: "11",
    name: "Dr. Suresh Kumar",
    specialty: "Pulmonology",
    specialization: "Sleep Medicine",
    rating: 4.6,
    reviews: 112,
    experience: "10 years",
    location: "Sir Ganga Ram Hospital",
    distance: "4.1 km",
    availability: "Available Tomorrow",
    nextSlot: "1:15 PM",
    consultationFee: "₹650",
    languages: ["Hindi", "English", "Punjabi"],
    education: "PGI Chandigarh, DM Pulmonology",
    image: "/placeholder.svg"
  },
  {
    id: "12",
    name: "Dr. Anjali Verma",
    specialty: "Endocrinology",
    specialization: "Diabetes Management",
    rating: 4.9,
    reviews: 221,
    experience: "14 years",
    location: "Indraprastha Apollo Hospital",
    distance: "2.9 km",
    availability: "Available Today",
    nextSlot: "6:00 PM",
    consultationFee: "₹850",
    languages: ["Hindi", "English"],
    education: "AIIMS Delhi, DM Endocrinology",
    image: "/placeholder.svg"
  }
];

export const getAllDoctors: RequestHandler = (req, res) => {
  try {
    const query = req.query as DoctorSearchQuery;
    let filteredDoctors = [...mockDoctors];

    // Apply search filter
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm) ||
        doctor.specialization.toLowerCase().includes(searchTerm) ||
        doctor.location.toLowerCase().includes(searchTerm)
      );
    }

    // Apply specialty filter
    if (query.specialty && query.specialty !== 'all') {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.specialty.toLowerCase().includes(query.specialty!.toLowerCase())
      );
    }

    // Apply sorting
    if (query.sortBy) {
      filteredDoctors.sort((a, b) => {
        switch (query.sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'experience':
            return parseInt(b.experience) - parseInt(a.experience);
          case 'distance':
            return parseFloat(a.distance) - parseFloat(b.distance);
          case 'price':
            return parseInt(a.consultationFee.replace('₹', '')) - parseInt(b.consultationFee.replace('₹', ''));
          default:
            return 0;
        }
      });
    }

    // Apply pagination
    const page = parseInt(query.page?.toString() || '1');
    const limit = parseInt(query.limit?.toString() || '10');
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

    const response: ApiResponse<PaginatedResponse<Doctor>> = {
      success: true,
      data: {
        data: paginatedDoctors,
        total: filteredDoctors.length,
        page,
        limit,
        totalPages: Math.ceil(filteredDoctors.length / limit)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctors'
    });
  }
};

export const getDoctorById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const doctor = mockDoctors.find(doc => doc.id === id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: 'Doctor not found'
      });
    }

    const response: ApiResponse<Doctor> = {
      success: true,
      data: doctor
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctor'
    });
  }
};

export const getDoctorSpecialties: RequestHandler = (req, res) => {
  try {
    const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialty))];
    const response: ApiResponse<string[]> = {
      success: true,
      data: specialties
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching specialties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch specialties'
    });
  }
};
