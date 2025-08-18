export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialization: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  distance: string;
  availability: string;
  nextSlot: string;
  consultationFee: string;
  languages: string[];
  education: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  type: 'in-person' | 'video' | 'phone';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId?: string;
  title: string;
  description: string;
  category: 'diagnosis' | 'prescription' | 'lab-result' | 'imaging' | 'vaccination' | 'surgery' | 'other';
  date: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DoctorSearchQuery {
  search?: string;
  specialty?: string;
  location?: string;
  rating?: number;
  sortBy?: 'rating' | 'experience' | 'distance' | 'price';
  page?: number;
  limit?: number;
}
