import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from '@angular/fire/auth'

import { Evento } from './../../model/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.page.html',
  styleUrls: ['./add-evento.page.scss'],
})
export class AddEventoPage implements OnInit {

  public evento: Evento;
  preview: any;
  key: string;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public eventoService: EventoService,
    public activeRouter: ActivatedRoute,
    private camera: Camera,
    private afAuth:AngularFireAuth
  ) { }

  ngOnInit() {
    this.evento = new Evento;
    this.preview = null;
    this.key = this.activeRouter.snapshot.paramMap.get("key");
    if (this.key) {
      this.eventoService.get(this.key).subscribe(
        res =>{
         this.evento = res
         this.preview = res.foto
        },  
        err => this.key = null
      );
    }
  }

  onSubmit(form) {
    if (form.valid) {
      // console.log("Cadastrado", this.evento);
      this.eventoService.save(this.evento)
        .then(
          res => {
            this.presentAlert("Aviso", "Cadastrado!");
            form.reset();
            this.router.navigate(['/']);
          },
          err=>{
            this.presentAlert("Epa!", "Erro ao cadastrar!");
          }
        )
    }
  }
  
  async presentAlert(titulo:string, texto:string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}
