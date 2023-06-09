import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Dish } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  users: any;
  platos: Dish[] = [];
  dishes?: Dish[];
  dishesImages: string[] = [];

  constructor(
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    //this.showUsers();
    //this.getUserData();
    this.showDishes();
  }

  ngOnInit() {
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

  // ionViewWillEnter(){
  //   this.getUserData(this.user);    
  // }

  // ionViewWillEnter(){
  //   //this.apiService.getEntity('user').subscribe((user: User) => {
  //     this.apiService.getUserData()
  //     .then(data => {
  //       console.log(data);
  //       this.user=data;
  //       console.log(this.user);     
  //   }, (error: any) => {
  //     console.log("Error: ", error);
  //     this.utilities.showToast("Error obteniendo el usuario");
  //   });
  // }

  showDishes(){
    this.apiService.obtenerPlatos()
    .subscribe(dishes => {
      this.dishes = dishes;
    }, error => {
      console.log(error);
    });    
  }

  showUsers(){
    this.apiService.getUsers()
    .then(user => {
      console.log(user);
      this.users=user;
      console.log(this.users);      
      //this.getUserData(this.users);
    });
  }
  /*getUserData(){

    const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.get('http://localhost:8000/api/user/26', { headers }).subscribe(
    (response) => {
      this.user = response;
    },
    (error) => {
      console.error(error);
    }
  );*/

  getUserData(){
    
    this.apiService.getUserData()
    .then(user => {
      console.log(user);
      this.user=user;
      console.log(this.user);
    });
  }

  getImage(){
    return ("");
  }


    /*this.apiService.getUserData(this.user.id)
    .then((data: any) => {
      console.log(data);
      const user = data.User[0]; // Obtener el primer elemento del arreglo User
      console.log(user);
    });  */     

}
