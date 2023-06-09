import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any;
  data: any;
  
  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private utilities: UtilitiesService,
    // private toast: ToastController
  ) { }

  ionViewWillEnter(){
    //this.apiService.getEntity('user').subscribe((user: User) => {
      this.apiService.getUserData()
      .then(data => {
        console.log(data);
        this.user=data;
        console.log(this.user);     
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario");
    });
  }

  async showAdvertisement() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Estás seguro de querer eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Click en Cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Click en Aceptar');
            console.log("USER ID: " ,this.user.data.user.id);
            this.apiService.deleteUser(this.user.id);
            this.utilities.showToast("CUENTA ELIMINADA CON ÉXITO");
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

  /*public async showToast(message: string) {
    const toast=await this.toast.create({
      message: message,
      duration: 5000,
      buttons:['OK']
    });
    toast.present();
  }*/

}
