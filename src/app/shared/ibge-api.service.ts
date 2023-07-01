import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IbgeApiService {
  constructor(private httpCliente: HttpClient) {}

  getStates() {
    return this.httpCliente
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
      )
      .pipe(take(1));
  }

  getCitiesByState(uf: string) {
    return this.httpCliente
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .pipe(take(1));
  }
}
