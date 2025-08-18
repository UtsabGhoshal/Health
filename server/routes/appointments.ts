import { RequestHandler } from "express";
import { Appointment, ApiResponse, PaginatedResponse } from "@shared/types";

// Mock appointments data
let mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    patientId: "user123",
    date: "2024-01-15",
    time: "14:30",
    status: "scheduled",
    type: "in-person",
    notes: "Regular checkup",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    doctorId: "2",
    patientId: "user123",
    date: "2024-01-20",
    time: "10:00",
    status: "scheduled",
    type: "video",
    notes: "Follow-up consultation",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAppointments: RequestHandler = (req, res) => {
  try {
    const patientId = req.query.patientId as string;
    const page = parseInt(req.query.page?.toString() || '1');
    const limit = parseInt(req.query.limit?.toString() || '10');

    let filteredAppointments = mockAppointments;

    // Filter by patient ID if provided
    if (patientId) {
      filteredAppointments = mockAppointments.filter(
        appointment => appointment.patientId === patientId
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);

    const response: ApiResponse<PaginatedResponse<Appointment>> = {
      success: true,
      data: {
        data: paginatedAppointments,
        total: filteredAppointments.length,
        page,
        limit,
        totalPages: Math.ceil(filteredAppointments.length / limit)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments'
    });
  }
};

export const createAppointment: RequestHandler = (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...appointmentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockAppointments.push(newAppointment);

    const response: ApiResponse<Appointment> = {
      success: true,
      data: newAppointment,
      message: 'Appointment created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create appointment'
    });
  }
};

export const updateAppointment: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointmentIndex = mockAppointments.findIndex(app => app.id === id);
    if (appointmentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      ...updateData,
      updatedAt: new Date()
    };

    const response: ApiResponse<Appointment> = {
      success: true,
      data: mockAppointments[appointmentIndex],
      message: 'Appointment updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update appointment'
    });
  }
};

export const cancelAppointment: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const appointmentIndex = mockAppointments.findIndex(app => app.id === id);
    if (appointmentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    mockAppointments[appointmentIndex].status = 'cancelled';
    mockAppointments[appointmentIndex].updatedAt = new Date();

    const response: ApiResponse<Appointment> = {
      success: true,
      data: mockAppointments[appointmentIndex],
      message: 'Appointment cancelled successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel appointment'
    });
  }
};
