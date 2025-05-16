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
    this.evaluadoresService
      .getEvaluadores()
      .subscribe((evaluadoresDB: Evaluador[]) => {
        this.evaluadores = evaluadoresDB;
      });
  }

  addEvaluador() {
    if (this.evaluador.id) {
      alert(
        'No puede agregar mientras esta editando un evaluador. Use el boton "Actualizar".');
      return;
    }
    if (!this.esFormularioValido()) {
      alert(
        'Por favor, agregue un nombre completo y al menos un número de cuenta.');
      return;
    }

    this.evaluadoresService.addEvaluador(this.evaluador).then(() => {
      this.resetEvaluador();
    });
  }

  guardarEvaluador() {
    if (!this.evaluador.id) {
      alert('No hay ningun evaluador para guardar');
      return;
    }
    if (!this.esFormularioValido()) {
      alert(
        'Por favor, ingrese un nombre completo y al menos un número de cuenta.'
      );
      return;
    }
    this.evaluadoresService.editEvaluador(this.evaluador).then(() => {
      this.resetEvaluador();
      this.getEvaluadores();
    });
  }

  resetEvaluador() {
    this.evaluador = {
      nombreCompleto: '',
      numerosCuentaParticipantes: ['', '', '', '', ''],
    };
  }

  editEvaluador(evaluador: Evaluador) {
    this.evaluador = evaluador;
  }

  deleteEvaluador(evaluador: Evaluador) {
    this.evaluadoresService.deleteEvaluador(evaluador).then(() => {
      this.getEvaluadores();
    });
  }

  private esFormularioValido(): boolean {
    const nombreLleno = this.evaluador.nombreCompleto.trim() !== '';
    const alMenosUnCuenta = this.evaluador.numerosCuentaParticipantes.some(
      (cuenta) => cuenta.trim() !== ''
    );
    return nombreLleno && alMenosUnCuenta;
  }

  formatNumerosCuenta(numerosCuenta: string[]): string {
    return (numerosCuenta || []).filter(cuenta => cuenta.trim() !== '').join(', ');
  }
}
