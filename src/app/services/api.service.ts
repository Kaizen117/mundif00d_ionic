import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/interfaces';
import { Dish } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
  public userChanges = new Subject<User>();

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toast: ToastController,
    private loadingCtrl: LoadingController
  ) { }  

  registerUser(user: any): Promise<any> {
    console.log(user);
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.apiUrl + '/register', {
        name: user.name,
        surname1: user.surname1,
        surname2: user.surname2,
        telephone: user.telephone,
        address: user.address,
        email: user.email,
        username: user.username,
        password: user.password,
        c_password: user.c_password,
        type: 'users',
        activated: 0
      }).subscribe(data => {
          resolve(data);
          this.showToast("Registro realizado con éxito.");
          console.log(data);
        },
        error => {
          reject(error);
          console.log('Error en registro', error);
        }
      );
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
    //console.log(n_email, " ", n_password);
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
        console.log("token ", this.token);
        console.log(data);
        this.user=data;
        //this.showToast("Inicio de sesión realizado con éxito");
      }, err=> {
        console.log('Error en el login ' +err);
        this.showToast("Acceso denegado.");
        this.validateLogin();
      });
    });
  } 

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

  getUserData(){
    //console.log(id);
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/userData', {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        data=this.user;
        resolve(data);
        //this.user = data;
        console.log(data);
        console.log(this.token);
      }, err => {
        console.log('Error al obtener los datos del usuario ' +err);
      });
    });
  }

  getUser() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    console.log(headers);
    return this.http.get(`${this.apiUrl}/userData`, { headers }).toPromise();
  }

  // updateUser(id: number){
  //   return new Promise(resolve => {
  //     this.http.post(this.apiUrl+'/profile', {user_id: id}, {
  //       headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
  //     }).subscribe(data => {        
  //       resolve(data);
  //       console.log(data);
  //     }, err => {
  //       console.log('Error al actualizar el usuario ' +err);
  //     });
  //   });
  // }

  updateUser(user: any){
    //console.log(this.token);
    //console.log(id);
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/profile/'+user.id,
        {
          name: user.name,
          surname1: user.surname1,
          surname2: user.surname2,
          address: user.address,
          telephone: user.telephone,
          email: user.email,
          password: user.password          
        },
        {        
         headers: new HttpHeaders().set('Authorization','Bearer '+this.token)      
      }).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log('Error al actualizar el usuario ' +err);
        this.showToast("No se ha podido actualizar el usuario.");
      });
    });
  }

  updateU(id: number){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/profile', {user_id: id}, {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {        
        resolve(data);
        console.log(data);
      }, err => {
        console.log('Error al actualizar el usuario ' +err);
        this.showToast("No se ha podido actualizar el usuario.");
      });
    });
  }

  public updateUs(user: User): any {
    this.userChanges.next(user);
    return this.http.post<User>(this.apiUrl+'/profile/',{
      headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
    });
  }

  deleteUser(id: number){
    //console.log(id);
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/user/delete/'+id,
       {
        user_id: id
       },
       {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log('Error al eliminar usuario ' +err);
        this.showToast("No se ha podido eliinar la cuenta de usuario.");
      });
    });
  } 

  /*getDishes(){
    return this.http.get(this.apiUrl + '/dishes');
 }*/

 obtenerPlatos(): Observable<Dish[]> {
  return this.http.get<any>(this.apiUrl+'/dishes').pipe(
    map((response: { dishes: any; }) => response.dishes)
  );
}  
 
  getDishes(){
    return new Promise(resolve => {
      this.http.get<Dish>(this.apiUrl+'/dishes', {
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

  /*getData() {
    return this.http.get('/assets/imgs/dishes');
  }*/

  // getCompanies(){
  //   return new Promise(resolve => {
  //     this.http.get<Dish>(this.apiUrl+'/dishes')
  //     .subscribe(data => {
  //       resolve(data)
  //       console.log(data);
  //     }, err => {
  //       console.log(err)
  //     });
  //   });
  // }

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
