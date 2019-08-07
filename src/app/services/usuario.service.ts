import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators'
import { Usuario } from './../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  save(usuario: Usuario, key: string) {
    // return this.db.list<Usuario>("usuario").push(usuario);
    return this.db.object<Usuario>("usuario/" + key).set(usuario);
  }

  getAll() {
    return this.db.list("usuario").snapshotChanges()
      .pipe(
        map(noCopyIsDocs =>
          noCopyIsDocs.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
  }

  get(key: string) {
    return this.db.object<Usuario>("usuario/" + key).valueChanges()
  }

  update(usuario: Usuario, key: string) {
    return this.db.object("usuario/" + key).update(usuario);
  }

  remove(key: string) {
    return this.db.object("usuario/" + key).remove()
  }

}