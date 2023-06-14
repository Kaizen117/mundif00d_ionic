import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Dish } from 'src/app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  categories: string[] = [];
  dishes: any[] = [];
  filter = '';

  //images: string[]=[];

  fav: Dish[] = [];
  enable=true;

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll | undefined;

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController,
    // private storage: Storage
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){ 
    this.showLoading();
    this.getAllCategories();
    //this.loadFavorites();
    //this.getAssetImages();
    //await this.storage['create']();
  }

    //todos los platos
    /*showDishes(){
      this.apiService.getAllDishes()
      .subscribe(dishes => {
        this.dishes = dishes;
      }, error => {
        console.log(error);
      });    
    }*/
  
   //platos por categoria (mejor opcion) pero sin filtro
  showDishesByCategory() {    
    this.apiService.getDishesByCategory().subscribe(
      (data) => {
        this.dishes=data;
        console.log(data);
        },
        (error) => {          
          console.error(error);
        }
    );
  }

  getAllCategories() {
    this.apiService.getAllCategories().subscribe(
      (data: string[]) => {
        this.categories=data;
        console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  categoryFilter(category: string) {
    this.filter=category;
    console.log(this.filter);
    this.apiService.getDishesByOneCategory(category).subscribe(
      (data: any[]) => {
        this.dishes = data;
        console.log(this.dishes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  resetFilter() {
    this.filter='';
    this.dishes=[];
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando platos...',
      duration: 2000,
    });

    loading.present();
  }  

  // getAssetImages() {
  //   this.http.get<any>('http://localhost:8000/api/images/dishes')
  //   .subscribe(data => {
  //     this.images=data.images;
  //     console.log(this.images);
  //   });
  // }

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
