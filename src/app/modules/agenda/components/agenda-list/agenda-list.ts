import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../services/agenda';
import { AgendaResponseDTO, AgendaRequestDTO } from '../../models/agenda.model';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.html'
})
export class AgendaList implements OnInit {
  agendas: AgendaResponseDTO[] = [];

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    this.loadAgendas();
  }

  loadAgendas(): void {
    this.agendaService.getAll().subscribe({
      next: (data) => this.agendas = data,
      error: (err) => console.error('Erro ao carregar agendas', err)
    });
  }
}
