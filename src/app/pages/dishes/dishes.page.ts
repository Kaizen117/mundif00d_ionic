import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Dish } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  dishes: any;
  dishesCategory: any;

  fav: Dish[] = [];
  enable=true;
  
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll | undefined;

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController,
    // private storage: Storage
    ) { }

  ngOnInit() {
    //this.loadFavorites();
  }

  async ionViewWillEnter(){ 
    this.showLoading();
    //this.showDishes();
    this.showDishesByCategory();
    //await this.storage['create']();
  }

    //todos los platos
    showDishes(){
      this.apiService.getAllDishes()
      .subscribe(dishes => {
        this.dishes = dishes;
      }, error => {
        console.log(error);
      });    
    }
  
    //platos por categoria (mejor opcion)
    showDishesByCategory() {    
      this.apiService.getDishesByCategory().subscribe(
          (response) => {
            this.dishesCategory=response;
            console.log(response);
          },
          (error) => {          
            console.error(error);
          }
      );
    }  

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando platos...',
      duration: 2000,
    });

    loading.present();
  }  

  async loadFavorites(){
    /*if(this.fav.length>0){
      this.fav=JSON.parse(localStorage.getItem('fav'));
      console.log(this.fav);
    }*/
    const plato=await localStorage.getItem('fav');
    if(plato){
      this.fav=JSON.parse(plato);
    }
    console.log(plato);
  }

  saveFav(fav: Dish/*, event*/){    
    //console.log(fav);
    /*let boton=event.srcElement.name;
    boton=boton.substring(9);
    console.log(boton);*/
    //this.isFavorite();
    this.fav.push(fav);
    console.log('favoritos', this.fav);
    fav.liked=!fav.liked;
    localStorage.setItem('fav', JSON.stringify(this.fav));   
    this.refresh();
  }

  async refresh(){
    const loading=await this.loadingCtrl.create({});
    loading.present();
    setTimeout(() => {
      loading.dismiss();      
      //window.location.reload();
    }, 100);
  }

  // loadData(event: { target: { complete: () => void; }; }) {
  //   console.log('Cargando los siguientes platos...');
  //   setTimeout(() => {      
  //     this.dishes.push(...this.platos.splice(0,20));
  //     if(this.platos.length==0) {
  //       event.target.complete();
  //       this.infiniteScroll.disabled = true;
  //       return;
  //     }
  //     event.target.complete();
  //    }, 1000);
  //  }


}
