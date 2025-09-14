import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgendaRequestDTO, AgendaResponseDTO } from '../models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private baseUrl = `${environment.apiUrl}/agenda`; 

  constructor(private http: HttpClient) {}

  create(data: AgendaRequestDTO): Observable<AgendaResponseDTO> {
    return this.http.post<AgendaResponseDTO>(this.baseUrl, data);
  }

  getById(publicId: string): Observable<AgendaResponseDTO> {
    return this.http.get<AgendaResponseDTO>(`${this.baseUrl}/${publicId}`);
  }

  getAll(): Observable<AgendaResponseDTO[]> {
    return this.http.get<AgendaResponseDTO[]>(this.baseUrl);
  }

  search(filters: {
      title?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }): Observable<AgendaResponseDTO[]> {
    return this.http.post<AgendaResponseDTO[]>(`${this.baseUrl}/search`, filters);
  }

  update(publicId: string, data: AgendaRequestDTO): Observable<AgendaResponseDTO> {
    return this.http.put<AgendaResponseDTO>(`${this.baseUrl}/${publicId}`, data);
  }

  delete(publicId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${publicId}`);
  }

  markAsCompleted(publicId: string): Observable<AgendaResponseDTO> {
    return this.http.post<AgendaResponseDTO>(`${this.baseUrl}/${publicId}/complete`, {});
  }

  setReminder(publicId: string, reminder: string): Observable<AgendaResponseDTO> {
    return this.http.post<AgendaResponseDTO>(`${this.baseUrl}/${publicId}/reminder?reminder=${reminder}`, {});
  }
}
