import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { NgForm } from '@angular/forms';
import { Pessoa } from '../entity/pessoa';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  pessoa = {} as Pessoa;
  pessoas: Pessoa[];

  constructor(private pessoaService: PessoaService) {}
  
  ngOnInit() {
    this.buscarPessoas();
  }

  salvarPessoa(form: NgForm) {
      this.pessoaService.salvaPessoa(this.pessoa).subscribe(() => {
        this.limparForm(form);
      });
  }

  buscarPessoas() {
    this.pessoaService.buscaTodasPessoas().subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });
  }

  excluirPessoa(pessoa: Pessoa) {
    this.pessoaService.excluiPessoa(pessoa).subscribe(() => {
      this.buscarPessoas();
    });
  }

  editaPessoa(pessoa: Pessoa) {
    this.pessoa = { ...pessoa };
  }

  // limpa o formulario
  limparForm(form: NgForm) {
    this.buscarPessoas();
    form.resetForm();
    this.pessoa = {} as Pessoa;
  }
}
