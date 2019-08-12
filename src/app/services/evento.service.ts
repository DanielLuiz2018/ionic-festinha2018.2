import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators'
import { Evento } from './../model/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  update(evento: Evento, key: string): any {
    throw new Error("Method not implemented.");
  }

  constructor(
    public db: AngularFireDatabase
  ) { }

  save(evento: Evento){
    return this.db.list("evento").push(evento);
  }

  getAll() {
    return this.db.list("evento").snapshotChanges()
    .pipe(
      map(noCopyIsDocs =>
        noCopyIsDocs.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    )
  }

  get(key: string){
    return this.db.object<Evento>("evento/" + key).valueChanges()
  }
}
