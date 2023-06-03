import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  
  //public loading?: HTMLIonLoadingElement;
  
  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    //private platform: Platform,
    private toast: ToastController) { }

  /*async showLoading(message?: string, duration?: number) {
    this.loading= await this.loadingCtrl.create({
      message: message ? message : null,
      duration: duration ? duration : null
    });
    return this.loading.present();
  }
  

  public dismissLoading() {
    this.loading.dismiss().then(() => { return true; })
  }*/

  async showAlert(header: any, message: any){      
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
