import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';
import { CommonModule } from '@angular/common';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { GenericValidators } from '../../validators/generic.validators';
import { ClientesService } from '../../services/clientes/clientes.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective
  ],
  providers: [
    provideNativeDateAdapter(),
    provideNgxMask(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {

  graduacoes = [
    { key: 1, value: 'Analfabeto' },
    { key: 2, value: 'Fundamental' },
    { key: 3, value: 'Médio' },
    { key: 4, value: 'Superior' }
  ];

  formulario!: FormGroup;

  isSubmiting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientesService,
    private dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private cliente: Cliente) {

    this.formulario = formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, GenericValidators.isValidCpf()]),
      dataNascimento: '',
      graduacao: 1,
      genero: ''
    });
  }
  ngOnInit(): void {
    if (!this.cliente) return;

    this.formulario.patchValue(this.cliente);
  }

  onFormSubmit() {
    if (this.formulario.invalid){
      this.formulario.markAsTouched();
      return;
    }

    this.isSubmiting = true;

    if (this.cliente)
      this.service.alterarCliente(this.cliente.id, this.formulario.value).subscribe(this.serviceCallSubscriber());
    else
      this.service.incluirCliente(this.formulario.value).subscribe(this.serviceCallSubscriber());
  }

  serviceCallSubscriber() {
    return {
      next: (val: any) => {
        this.dialogRef.close(true);
      }
    };
  }

  campoInvalido(campo: string) {
    let field = this.formulario.get(campo);

    if (!field)
      return false;

    return field.invalid && (field.dirty || field.touched);
  }
}
