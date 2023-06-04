import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  users: any;

  constructor(private apiService: ApiService,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertController: AlertController,
  ) {
    this.showUsers();
  }

  ngOnInit() {
  }

  // ionViewWillEnter(){
  //   this.getUserData(this.user);    
  // }

  showUsers(){
    this.apiService.getUsers()
    .then(user => {
      console.log(user);
      this.users=user;
      console.log(this.users);
      this.users=this.users.users.id;
      console.log(this.users);
      this.getUserData(this.users);
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

  getUserData(user: any){
    console.log(user);
    this.apiService.getUserData(user.id);
  }


    /*this.apiService.getUserData(this.user.id)
    .then((data: any) => {
      console.log(data);
      const user = data.User[0]; // Obtener el primer elemento del arreglo User
      console.log(user);
    });  */     

}
