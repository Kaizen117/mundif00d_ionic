import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @Input() type: any;
  user: any;

  constructor(
    private apiService: ApiService,
    private utilities: UtilitiesService,
  ) {}

  ngOnInit() {    
  }

  ionViewWillEnter(){
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
