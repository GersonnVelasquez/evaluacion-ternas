import { Component, inject } from '@angular/core';
import { EvaluadoresService } from '../../services/evaluadores.service';
import { Evaluador } from '../../models/evaluador.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-evaluadores',
  templateUrl: './evaluadores.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './evaluadores.component.scss',
})

export default class EvaluadoresComponent {
  evaluadoresService = inject(EvaluadoresService);
  evaluadores: Evaluador[] = [];

  evaluador: Evaluador = {
    nombreCompleto: '',
    numerosCuentaParticipantes: ['', '', '', '', ''],
  };

  constructor() {
    this.getEvaluadores();
  }

  getEvaluadores() {
    this.evaluadoresService.getEvaluadores().subscribe((evaluadoresDB: Evaluador[]) => {
      this.evaluadores = evaluadoresDB;
    });
  }

  addEvaluador() {
    if (this.evaluador.nombreCompleto.trim() === '') return;

    this.evaluadoresService.addEvaluador(this.evaluador).then(() => {
      this.resetEvaluador();
    });
  }

  resetEvaluador() {
    this.evaluador = {
      nombreCompleto: '',
      numerosCuentaParticipantes: ['', '', '', '', ''],
    };
  }

}