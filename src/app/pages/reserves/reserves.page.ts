import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],

})
export class ReservesPage implements OnInit {
  
  @Input() type: any;

  user: any;  
  reserves: any[]=[];

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){ 
    this.showLoading();
    this.apiService.getUserData()
      .then((data: any) => {
        //console.log(data);
        this.user=data;
        this.type=data.data.type;
        console.log(this.user);
        console.log(this.type);  
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario");
    });
    this.showReserves();
  }
  
  /*todas las reservas
  reserves() {
    this.apiService.getReserves()
    .subscribe(data => {
      this.reserves=data;      
      console.log(this.reserves);
    }, error => {
      console.log(error);
    });
  }*/

  showReserves(){
    this.apiService.getReserves().subscribe(
      data => {
        this.reserves = data.sort((a, b) => {
          // funcion javascript para ordenar valores
          const dateA = new Date(a.date + ' ' + a.hour);
          const dateB = new Date(b.date + ' ' + b.hour);
          return dateA.getTime() - dateB.getTime();
        });
      });
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando reservas...',
      duration: 2000,
    });

    loading.present();
  }  
  
}
