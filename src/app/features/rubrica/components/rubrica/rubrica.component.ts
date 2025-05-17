import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RubricaService } from '../../services/rubrica.service';
import { Rubrica } from '../../models/rubrica.model';


@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrl: './rubrica.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RubricaComponent {
rubricaService = inject(RubricaService);
rubrica: Rubrica = { evaluacionId: 1, criterios: [] };
selectedRubrica: Rubrica | null = null;
criterio: string = '';
editIndex: number | null = null;

constructor() {
  this.loadRubrica();
}

async loadRubrica() {
  this.rubricaService.getRubrica(1).then((rubrica) => {
    if (rubrica) {
      this.rubrica = rubrica;
    }
  });
}

addCriterio() {
  if (this.criterio.trim() === '') {
    alert('Por favor, ingrese un criterio.');
    return;
  }
  if (this.editIndex !== null) {
    this.rubrica.criterios[this.editIndex] = this.criterio;
    this.editIndex = null;
  } else {
    this.rubrica.criterios.push(this.criterio);
  }
  this.criterio = '';
  this.saveRubrica();
}

editCriterio(index: number) {
  this.criterio = this.rubrica.criterios[index];
  this.editIndex = index;
}

deleteCriterio(index: number) {
  this.rubrica.criterios.splice(index, 1);
  this.saveRubrica();
}

async saveRubrica(){
  await this.rubricaService.saveRubrica(this.rubrica);
}

async selectRubrica(rubrica: Rubrica) {
  this.selectedRubrica = await this.rubricaService.getRubrica(rubrica.evaluacionId);
}
}