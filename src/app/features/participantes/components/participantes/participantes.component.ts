import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantesService } from '../../services/participantes.service';
import { Participante } from '../../models/participante.model';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss',
})
export class ParticipantesComponent implements OnInit {
  participantesService = inject(ParticipantesService);
  fb = inject(FormBuilder);

  participantes: any = [];
  participanteForm!: FormGroup;
  busqueda: string = '';
  isEditando = false ;


  ngOnInit(): void {
    this.participanteForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      numeroCuenta: [null, [Validators.required, Validators.min(10000000)]],
      nombreProyecto: ['', Validators.required],
      tipoProyecto: ['PP', Validators.required],
      enlaceDocumentoTesis: ['', Validators.required],
      notaParcialFase2: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      nombreCatedraticoFase2: ['', Validators.required],
    });

    this.getParticipantes();
  }

  getParticipantes() {
    this.participantesService.getParticipantes().subscribe((data) => {
      this.participantes = data;
    });
  }

limpiarFormulario() {
  this.participanteForm.reset({ tipoProyecto: 'PP' });
  if (this.participanteForm.contains('uuid')) {
    this.participanteForm.removeControl('uuid');
  }
  this.isEditando = false;
  this.getParticipantes(); 
}

  addParticipante() {
    if (this.participanteForm.invalid) {
      this.participanteForm.markAllAsTouched();
      const modal = new bootstrap.Modal(
        document.getElementById('formErrorModal')!
      );
      modal.show();
      return;
    }

    const data: Participante = this.participanteForm.value;

    this.participantesService.addParticipante(data).then(() => {
      this.getParticipantes();
      this.participanteForm.reset({ tipoProyecto: 'PP' });
    });
  }

  guardarCambios() {
  if (this.participanteForm.invalid) {
    this.participanteForm.markAllAsTouched();
    const modal = new bootstrap.Modal(document.getElementById('formErrorModal')!);
    modal.show();
    return;
  }

  const data: Participante = this.participanteForm.value;

  this.participantesService.updateParticipante(data).then(() => {
    this.limpiarFormulario();
  });
}

  editarParticipante(p: Participante) {
    this.isEditando = true;
    this.participanteForm.patchValue(p);
     this.participanteForm.addControl('uuid', this.fb.control(p.uuid));
    
  }

  eliminarParticipante(p: Participante) {
    this.participantesService.deleteParticipante(p);
  }

  get participantesFiltrados(): Participante[] {
    return this.participantes.filter((p:Participante) =>
      p.nombreCompleto
        .toLowerCase()
        .includes(this.busqueda?.toLowerCase() || '')
    );
  }
}
