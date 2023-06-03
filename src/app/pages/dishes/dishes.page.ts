import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Dishes } from 'src/app/interfaces/dishes';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  //dishes: Dishes[] = [];  
  dishes: any;

  constructor(private ApiService: ApiService,  private http: HttpClient) { }

  ngOnInit() {
    this.showDishes();
  }

  /*showDishes(): Observable<Dishes[]>{
    //this.ApiService.getDishes();
    return this.http.get<Dishes[]>('localhost:8000/api/dishes');
  }*/
  
  showDishes(){
    this.ApiService.getDishes()
    .then(dish => {
      this.dishes=dish;
      this.dishes=this.dishes.data;
      console.log(this.dishes);
    });
  }

}
