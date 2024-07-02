import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from '../cliente/cliente.component';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatTableModule, MatProgressBarModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'dataNascimento', 'actions'];
  dataSource!: MatTableDataSource<Cliente>;
  isLoading: boolean = false;

  constructor(private dialog: MatDialog, private service: ClientesService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  applyFilter(event: Event) {
  }

  listarClientes() {
    this.isLoading = true;

    this.service.listarClientes().subscribe({
      next: (clientes) => {
        this.dataSource = new MatTableDataSource(clientes);

        this.isLoading = false;
      }
    });
  }

  excluirCliente(id: string) {
    if (!confirm('Tem certeza de que deseja excluir o cliente?'))
      return;

    this.service.excluirCliente(id).subscribe({
      next: () => {
        this.listarClientes();
      }
    });
  }

  openIncluirClienteDialog() {
    const dialogRef = this.dialog.open(ClienteComponent);

    this.mapDialogRefAfterClosed(dialogRef);
  }

  openEditarClienteDialog(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteComponent, { data: cliente });

    this.mapDialogRefAfterClosed(dialogRef);
  }

  private mapDialogRefAfterClosed(dialogRef: MatDialogRef<ClienteComponent>) {
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (!val) return;

        this.listarClientes();
      }
    });
  }
}
