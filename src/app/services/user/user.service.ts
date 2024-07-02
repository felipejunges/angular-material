import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { TokenService } from '../token/token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private tokenService: TokenService) {
    var token = tokenService.getToken();

    if (token == null)
      return;

    this.decodeJwt(token);
  }

  decodeJwt(token: string) {
    const user = jwtDecode(token) as Usuario;
    this.userSubject.next(user);
  }

  retornarUser() : Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }

  logout() {
    this.tokenService.remove();
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  getTokenWithRefresh(): { token: string | null, refreshToken: string | null } {
    return this.tokenService.getTokenWithRefresh();
  }
}
