import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginRequest } from '../../interfaces/login-request';
import { LoginResponse } from '../../interfaces/login-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenService: TokenService, private userService: UserService) { }

  login(request: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.API_URL}api/Auth`, request)
      .pipe(
        map((response: LoginResponse) => {
          if (!response.sucesso) {
            return false;
          }

          this.tokenService.set(response.token, response.refreshToken);
          this.userService.decodeJwt(response.token);

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error during login:', error);
          return throwError(() => new Error('test'));
        })
      );
  }

  refresh(token: string, refreshToken: string): Observable<boolean> {
    return this.http.put<LoginResponse>(`${this.API_URL}api/Auth`, { token, refreshToken })
      .pipe(
        map((response: LoginResponse) => {

          if (!response.sucesso) {
            return false;
          }

          this.tokenService.set(response.token, response.refreshToken);
          this.userService.decodeJwt(response.token);

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error during refreshToken:', error);
          return throwError(() => new Error('test'));
        })
      );
  }
}
