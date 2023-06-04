import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Dishes } from '../interfaces/dishes';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //public userChanges = new Subject<User>();
  dishes: any;
  apiUrl='http://localhost:8000/api';
  token: any;
  id: number=0;
  
  user: any;
  email: any;
  password: any;
  data: any;
  category: any;

  public loading?: HTMLIonLoadingElement;

  constructor(private http: HttpClient, private alertController: AlertController,
     private toast: ToastController,
     private loadingCtrl: LoadingController
  ) { }

  /*public obtenerPlatos(){
    //this.apiService.getEntity('dishes')
    .subscribe((dishes:Dishes)=>{console.log(dishes)});
    this.http.get(environment.apiUrl + "/dishes")
    .subscribe((response: any) => {
      this.dishes = response;
      this.http.get('http://localhost:8000/api/dishes')
      .subscribe((response: any) => {
        this.dishes = response;
      });
    });
  }*/

  /*register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logueo(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }*/

  registerUser(user: any){
    console.log(user);
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl+'/register', {
        name: user.name,
        surname1: user.surname1,
        surname2: user.surname2,
        telephone: user.telephone,
        address: user.address,        
        email: user.email,
        username: user.username,
        password: user.password,
        c_password: user.c_password
      }).subscribe(data => {      
        resolve(data); 
        console.log(data);       
      }, err => {
        console.log('Error durante el registro del usuario ' +err);
        //this.emailExists();
      });
    });
  }
  
  login(){//api
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: this.email, 
        password: this.password
      }).subscribe(data => {
        this.token = data.data.token;         
        resolve(data);             
        console.log(this.token); 
      });
    });
  }
  /*getData(): Observable<any> {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }

  // Solicitud POST con headers de autenticación
  postWithAuth(requestBody: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    console.log(this.token);
    return this.http.post(url, requestBody, { headers });
  }*/

  login_real(n_email: string, n_password: string){//login app
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: n_email, 
        password: n_password
      }).subscribe(data => {
        console.log(data);

        this.token=data.data.token;
        this.id=data.data.id;
        this.email=n_email;
        this.password=n_password;
        resolve(data);             
        console.log(data);
      }, err=> {
        console.log('Error en el login ' +err);
        this.validateLogin();
      });
    });
  }

  /*login_real(n_email: string, n_password: string) {    
      //console.log(n_email, " ", n_password);      
      return new Promise(resolve => {
        this.http.post<any>(this.apiUrl + '/login', {
          email: n_email,
          password: n_password
        }).subscribe({
          next: data => {
            //this.token = data['token'];
            //const { token } = data;
            this.token=data;
            //this.id = data['id'];
            this.email = n_email;
            this.password = n_password;
            console.log(this.token);
            //console.log(this.id);
            console.log(this.email);
            console.log(this.password);
            resolve(data);
            console.log("DATA: ",data);           
          },
          error: err => {
            console.log('Error en el login ' + err);
            this.validateLogin();
          }          
        });
      });    
  }*/

  async validateLogin(){
    const noValid=await this.alertController.create({
      header: 'Login Error',
      cssClass: 'loginCss',
      message: 'El email o la contraseña no son correctos, inténtelo de nuevo.',
      buttons: ['Aceptar']
    });
    await noValid.present();
  }

  getUsers(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users', {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        resolve(data);
        console.log(data);      
      }, err => {
        console.log('Error al mostrar los usuarios ' +err);
      });
    });
  }

  getUserData(id: number){
    console.log(id);
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user/'+id, {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        resolve(data)
        this.user = data;
        console.log(data);      
      }, err => {
        console.log('Error al obtener los datos del usuario ' +err)
      });
    });
  }

  updateUser(id: number){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/profile', {user_id: id}, {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {        
        resolve(data);
        console.log(data);
      }, err => {
        console.log('Error al actualizar el usuario ' +err);
      });
    });
  }

  /*get_Companies(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/dishes')
      .subscribe(data => {
        resolve(data)
        console.log(data);
      }, err => {
        console.log(err)
      });
    });
  }*/

  /*getDishes(){
    return this.http.get(this.apiUrl + '/dishes');
 }*/
 
  getDishes(){
    return new Promise(resolve => {
      this.http.get<Dishes>(this.apiUrl+'/dishes', {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        resolve(data);
        console.log(data);      
      }, err => {
        console.log("token: " , this.token);
        console.log('Error al mostrar los platos ' +err);
      });
    });
  }

  public async showToast(message: string) {
    const toast=await this.toast.create({
      message: message,
      duration: 5000,
      buttons:['OK']
    });
    toast.present();
  }

  /*async showLoading(message?: string, duration?: number) {
    this.loading=await this.loadingCtrl.create({
      message: message ? message : null,
      duration: duration ? duration : null
    });
    return this.loading.present();
  }*/

}
