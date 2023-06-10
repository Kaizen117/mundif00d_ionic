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

  //dishes: Dishes[] = [];  
  dishes: any;
  fav: Dish[] = [];
  enable=true;

  dishess: Dish[] = [];
  
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll | undefined;

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController,
    // private storage: Storage
    ) { }

  ngOnInit() {
    this.showDishes();
    this.loadFavorites();    

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
  //   console.log('Cargando los siguientes juegos...');
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

  async ionViewWillEnter(){ 
    this.showLoading();
    this.showDishes();
    //await this.storage['create']();

  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando platos...',
      duration: 2000,
    });

    loading.present();
  }

  /*showDishes(): Observable<Dishes[]>{
    //this.ApiService.getDishes();
    return this.http.get<Dishes[]>('localhost:8000/api/dishes');
  }*/
  
  showDishes(){
    this.apiService.obtenerPlatos()
    .subscribe(dishes => {
      this.dishes = dishes;
    }, error => {
      console.log(error);
    });    
  }

}
