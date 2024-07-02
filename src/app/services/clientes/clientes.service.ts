import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfaces/cliente';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private API_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  listarClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.API_URL}/clientes`);
  }

  incluirCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/clientes`, cliente);
  }

  alterarCliente(id: string, cliente: Cliente): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/clientes/${id}`, cliente);
  }

  excluirCliente(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/clientes/${id}`);
  }
}