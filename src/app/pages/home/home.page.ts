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

  constructor(
    private apiService: ApiService,
    private utilities: UtilitiesService,
  ) {
    //this.showUsers();
  }

  ngOnInit() {
  }

   ionViewWillEnter(){
    this.apiService.getUserData()
      .then((data: any) => {
        //console.log(data);
        this.user=data;
        console.log(this.user);     
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario");
    });
  } 

  // showUsers(){
  //   this.apiService.getUsers()
  //   .then(user => {
  //     console.log(user);
  //     this.users=user;
  //     console.log(this.users);      
  //     //this.getUserData(this.users);
  //   });
  // }
}
