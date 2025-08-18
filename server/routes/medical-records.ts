import { RequestHandler } from "express";
import { MedicalRecord, ApiResponse, PaginatedResponse } from "@shared/types";

// Mock medical records data
let mockMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    patientId: "user123",
    doctorId: "1",
    title: "Annual Health Checkup",
    description: "Complete blood count, lipid profile, and ECG results normal. Blood pressure slightly elevated.",
    category: "diagnosis",
    date: "2024-01-10",
    attachments: ["blood_report.pdf", "ecg_report.pdf"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    patientId: "user123",
    doctorId: "2",
    title: "Prescription - Hypertension Management",
    description: "Prescribed Amlodipine 5mg once daily. Follow up in 4 weeks.",
    category: "prescription",
    date: "2024-01-12",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    patientId: "user123",
    title: "COVID-19 Vaccination",
    description: "Second dose of COVID-19 vaccine (Covishield) administered.",
    category: "vaccination",
    date: "2023-12-15",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getMedicalRecords: RequestHandler = (req, res) => {
  try {
    const patientId = req.query.patientId as string;
    const category = req.query.category as string;
    const page = parseInt(req.query.page?.toString() || '1');
    const limit = parseInt(req.query.limit?.toString() || '10');

    let filteredRecords = mockMedicalRecords;

    // Filter by patient ID if provided
    if (patientId) {
      filteredRecords = filteredRecords.filter(
        record => record.patientId === patientId
      );
    }

    // Filter by category if provided
    if (category) {
      filteredRecords = filteredRecords.filter(
        record => record.category === category
      );
    }

    // Sort by date (newest first)
    filteredRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    const response: ApiResponse<PaginatedResponse<MedicalRecord>> = {
      success: true,
      data: {
        data: paginatedRecords,
        total: filteredRecords.length,
        page,
        limit,
        totalPages: Math.ceil(filteredRecords.length / limit)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch medical records'
    });
  }
};

export const createMedicalRecord: RequestHandler = (req, res) => {
  try {
    const recordData = req.body;
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      ...recordData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockMedicalRecords.push(newRecord);

    const response: ApiResponse<MedicalRecord> = {
      success: true,
      data: newRecord,
      message: 'Medical record created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating medical record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create medical record'
    });
  }
};

export const updateMedicalRecord: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const recordIndex = mockMedicalRecords.findIndex(record => record.id === id);
    if (recordIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Medical record not found'
      });
    }

    mockMedicalRecords[recordIndex] = {
      ...mockMedicalRecords[recordIndex],
      ...updateData,
      updatedAt: new Date()
    };

    const response: ApiResponse<MedicalRecord> = {
      success: true,
      data: mockMedicalRecords[recordIndex],
      message: 'Medical record updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating medical record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update medical record'
    });
  }
};

export const deleteMedicalRecord: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const recordIndex = mockMedicalRecords.findIndex(record => record.id === id);
    if (recordIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Medical record not found'
      });
    }

    mockMedicalRecords.splice(recordIndex, 1);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Medical record deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting medical record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete medical record'
    });
  }
};
