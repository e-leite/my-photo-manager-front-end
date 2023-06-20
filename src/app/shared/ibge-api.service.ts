import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IbgeApiService {
  constructor(private httpCliente: HttpClient) {}

  getStates(): Observable<{}> {
    return this.httpCliente
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
      )
      .pipe(take(1));
  }

  getCitiesByState(uf: string): Observable<{}> {
    return this.httpCliente
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .pipe(take(1));
  }
}
