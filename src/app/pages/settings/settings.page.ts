import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @Input() type: any;
  user: any;  
  
  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter(){
      this.apiService.getUserData()
      .then((data: any) => {
        console.log(data);
        this.user=data;
        this.type=data.data.type;
        console.log(this.user);     
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario");
    });
  }

  async showAdvertisement1() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: 'Va a cerrar su sesión, ¿continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Click en Cancelar');
            console.log("USER ID: " ,this.user.data.id);
            console.log(this.user);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Click en Aceptar');
            console.log("USER ID: " ,this.user.data.id);
            console.log(this.user);
            try{
              this.utilities.showToast("Éxito, sesión cerrada.");
              this.loading();
              //this.router.navigate(['/login']);
            }catch(Exception){
              this.utilities.showToast("No se pudo cerrar su sesión correctamente.");
            }           
          }
        }
      ]
    });
    await alert.present();
  }

  async showAdvertisement2() {
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
            console.log("USER ID: " ,this.user.data.id);
            console.log(this.user);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Click en Aceptar');
            // console.log("USER ID: " ,this.user.data.id);
            // console.log(this.user);
            try{
              this.apiService.deleteUser(this.user.data.id);
              this.utilities.showToast("CUENTA ELIMINADA CON ÉXITO");
              this.router.navigate(['/login']);
            }catch(Exception){
              this.utilities.showToast("No se pudo eliminar la cuenta.");
            }           
          }
        }
      ]
    });
    await alert.present();
  }

  async loading(){      
    const loading = await this.loadingCtrl.create({
      message: 'Cerrando sesión...',
      duration: 500,
    });

    loading.present();
    this.logout();
  }

  logout(){
    this.router.navigate(['/login']);
  }
  

  ngOnInit() {
  } 

}
