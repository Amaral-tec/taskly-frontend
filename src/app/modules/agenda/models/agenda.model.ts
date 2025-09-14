export interface AgendaRequestDTO {
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string; 
  reminder?: string; 
  recurrenceType: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'; 
  status?: 'SCHEDULED' | 'CONFIRMED'| 'COMPLETED' | 'CANCELLED';
  userId?: number;
}

export interface AgendaResponseDTO {
  id: number;
  publicId: string;
  title: string;
  description?: string;
  startDateTime: string; 
  endDateTime: string;  
  reminder?: string; 
  recurrenceType: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'; 
  status?: 'SCHEDULED' | 'CONFIRMED'| 'COMPLETED' | 'CANCELLED';
  userId?: number;
  createdAt: string;
  updatedAt: string;
}
