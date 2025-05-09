import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantesService } from '../../services/participantes.service';
import { Participante } from '../../models/participante.model';

@Component({
  selector: 'app-participantes',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss'
})
export class ParticipantesComponent {
  participantesService= inject(ParticipantesService)
  participantes: Participante[] = []

  participante: Participante = {
    nombreCompleto: '', 
    numeroCuenta: null,
    nombreProyecto: '',
    tipoProyecto: '',
    enlaceDocumentoTesis: '',
    notaParcialFase2: null,
    nombreCatedraticoFase2: ''
  }

  constructor() {
    this.getParticipantes()
  }
  getParticipantes() {
    this.participantesService.getParticipantes().subscribe((data) => {
      this.participantes = data
    })
  }
  addParticipante() {

    if (this.participante.nombreCompleto=== '') {
      alert('El nombre es obligatorio');
      return;
    }

    this.participantesService.addParticipante(this.participante).then(() => {
      this.getParticipantes()
       this.reset()
    })


  }
  reset() {
    this.participante = {
      nombreCompleto: '', 
      numeroCuenta: null,
      nombreProyecto: '',
      tipoProyecto: 'PP',
      enlaceDocumentoTesis: '',
      notaParcialFase2: null,
      nombreCatedraticoFase2: ''
    };
  }
  // deleteParticipante(participante: Participante) {
  //   this.participantesService.deleteParticipante(participante).then(() => {
  //     this.getParticipantes()
  //   })
  // }
  // updateParticipante(participante: Participante) {
  //   this.participantesService.updateParticipante(participante).then(() => {
  //     this.getParticipantes()
  //   })
  // }

}

