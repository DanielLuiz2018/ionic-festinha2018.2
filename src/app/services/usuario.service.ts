import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { Usuario } from './../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  save(usuario: Usuario): any {
    throw new Error("Method not implemented.");
  }

  constructor(
    public db: AngularFireDatabase
  ) { }

  seve(usuario: Usuario){
    return this.db.list("usuario").push(usuario);
  }
}
