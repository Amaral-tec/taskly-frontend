import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CalendarRequestDTO, CalendarResponseDTO } from '../models/calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = `${environment.apiUrl}/api/calendar`; 

  constructor(private http: HttpClient) {}

  create(data: CalendarRequestDTO): Observable<CalendarResponseDTO> {
    return this.http.post<CalendarResponseDTO>(this.baseUrl, data);
  }

  getById(publicId: string): Observable<CalendarResponseDTO> {
    return this.http.get<CalendarResponseDTO>(`${this.baseUrl}/${publicId}`);
  }

  getAll(): Observable<CalendarResponseDTO[]> {
    return this.http.get<CalendarResponseDTO[]>(this.baseUrl);
  }

  search(filters: {
      title?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }): Observable<CalendarResponseDTO[]> {
    return this.http.post<CalendarResponseDTO[]>(`${this.baseUrl}/search`, filters);
  }

  update(publicId: string, data: CalendarRequestDTO): Observable<CalendarResponseDTO> {
    return this.http.put<CalendarResponseDTO>(`${this.baseUrl}/${publicId}`, data);
  }

  delete(publicId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${publicId}`);
  }

  markAsCompleted(publicId: string): Observable<CalendarResponseDTO> {
    return this.http.post<CalendarResponseDTO>(`${this.baseUrl}/${publicId}/complete`, {});
  }

  setReminder(publicId: string, reminder: string): Observable<CalendarResponseDTO> {
    return this.http.post<CalendarResponseDTO>(`${this.baseUrl}/${publicId}/reminder?reminder=${reminder}`, {});
  }
}
