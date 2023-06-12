import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],
})
export class ReservesPage implements OnInit {

  reserves: any;

  constructor(private apiService: ApiService,
     private utilities: UtilitiesService,
     private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){ 
    this.showLoading();    
    this.showReserves();    
  }

  showReserves() {
    this.apiService.getReserves()
    .subscribe(response => {
        this.reserves=response;
        console.log(response);
      }, error => {
        console.log(error);
      });
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando platos...',
      duration: 2000,
    });

    loading.present();
  }  
  
}
