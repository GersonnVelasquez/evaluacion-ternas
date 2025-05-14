import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantesService } from '../../services/participantes.service';
import { Participante } from '../../models/participante.model';

 declare const bootstrap: any;

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss'
})
export class ParticipantesComponent implements OnInit {

 

  participantesService = inject(ParticipantesService);
  participantes: Participante[] = [];
  participanteForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.participanteForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      numeroCuenta: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombreProyecto: ['', Validators.required],
      tipoProyecto: ['PP', Validators.required], 
      enlaceDocumentoTesis: ['', Validators.required],
      notaParcialFase2: [null, Validators.required],
      nombreCatedraticoFase2: ['', Validators.required]
    });

    this.getParticipantes();
  }

  getParticipantes() {
    this.participantesService.getParticipantes().subscribe((data) => {
      this.participantes = data;
    });
  }

  addParticipante() {
    if (this.participanteForm.valid) {
      const participante = this.participanteForm.value;
      this.participantesService.addParticipante(participante).then(() => {
        this.getParticipantes();
        this.reset();
      });
    } else {
      const modal = new bootstrap.Modal(document.getElementById('modalFormularioInvalido'));
      modal.show();
    }
  }
  editarParticipante(item : Participante) {
    this.participanteForm.patchValue({
      nombreCompleto: item.nombreCompleto,
      numeroCuenta: item.numeroCuenta,
      nombreProyecto: item.nombreProyecto,
      tipoProyecto: item.tipoProyecto,
      enlaceDocumentoTesis: item.enlaceDocumentoTesis,
      notaParcialFase2: item.notaParcialFase2,
      nombreCatedraticoFase2: item.nombreCatedraticoFase2
    });
  }

  eliminarParticipante(item: Participante) {
    if (!confirm('¿Está seguro de que desea eliminar este participante?')) {
      return;
    }
    // this.participantesService.deleteParticipante(item).then(() => {
    //   this.getParticipantes();
    // });
  } 

  reset() {
    this.participanteForm.reset({
      nombreCompleto: '',
      numeroCuenta: null,
      nombreProyecto: '',
      tipoProyecto: 'PP',
      enlaceDocumentoTesis: '',
      notaParcialFase2: null,
      nombreCatedraticoFase2: ''
    });
  }
}
