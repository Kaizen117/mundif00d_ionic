import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.page.html',
  styleUrls: ['./allergens.page.scss'],
})
export class AllergensPage implements OnInit {

  @Input() type: any;
  user: any;

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
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
  } 
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando alérgenos...',
      duration: 1000,
    });

    loading.present();
  }
}
