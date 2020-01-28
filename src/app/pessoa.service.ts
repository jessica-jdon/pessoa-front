import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoa } from './entity/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  pessoasUrl = "http://localhost:8080/pessoas";

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<any[]>(`${this.pessoasUrl}`);
  }

  // Obtem todos os carros
  buscaTodasPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.pessoasUrl}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  buscaPessoaPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}` + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  salvaPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.pessoasUrl}`, JSON.stringify(pessoa), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  excluiPessoa(pessoa: Pessoa) {
    return this.http.delete<Pessoa>(`${this.pessoasUrl}` + '/' + pessoa.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
