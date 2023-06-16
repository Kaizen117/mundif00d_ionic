import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Reserve, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl='http://161.22.45.97/api';
  //apiUrl='http://192.168.0.16:8000/api';
  //apiUrl='https://mundifood-6bcd5.firebaseapp.com/api'
  
  token: any;
  id: number=0;
  email: any;
  password: any;  
  userId: number=0;

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

  getUserData(){//usuario logueado
    //console.log(id);
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/userData', {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {        
        resolve(data);        
        console.log(data);
        //console.log(this.token);
      }, err => {
        console.log('Error al obtener los datos del usuario ' +err);
      });
    });
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
    //console.log(id);
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'/profile/'+user.id,
        {
          id: user.id,
          name: user.name,
          surname1: user.surname1,
          surname2: user.surname2,
          address: user.address,
          telephone: user.telephone,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation
        },
        {        
         headers: new HttpHeaders().set('Authorization','Bearer '+this.token)      
      }).subscribe(data => {
        resolve(data);
        console.log(data);
        this.showLoading();
      }, err => {
        console.log('Error al actualizar el usuario ' +err);
        this.showToast("Error. Faltan campos o datos inválidos.");
      });
    });
  }

  deleteUser(id: number){
    //console.log(id);
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'/user/delete/'+id,       
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

  /*getAllDishes(): Observable<Dish[]> {
    return this.http.get<any>(this.apiUrl+'/dishes').pipe(
      map((response: { dishes: any; }) => response.dishes)
    );
  }*/
  
  getAllCategories(){
    return this.http.get<any>(this.apiUrl+'/categories').pipe(
      map((response: { categories: any; }) => response.categories)
    );
  }

  getDishesByCategory() {
    return this.http.get<any>(this.apiUrl+'/dishes').pipe(
      map((response: { dishes: any; }) => response.dishes)
    );
  }

  getDishesByOneCategory(category: string){
    return this.http.get<any>(this.apiUrl+'/dishes/'+category).pipe(
      map((response: { dishes: any; }) => response.dishes)
    );
  }

  getReserves() {
    return this.http.get<any[]>(this.apiUrl+'/reservesUser');
  }

  /*addReserve(reserve: any): Observable<any> {
    const url = `${this.apiUrl}/addReserve`;
    return this.http.post(url, reserve);
  }

  getReserve(id: number): Observable<any> {
    const url = `${this.apiUrl}/reserves/${id}`;
    return this.http.get(url);
  }

  updateReserve(id: number, reserve: any): Observable<any> {
    const url = `${this.apiUrl}/reserves/update/${id}`;
    return this.http.put(url, reserve);
  }

  deleteReserve(id: number): Observable<any> {
    const url = `${this.apiUrl}/reserves/delete${id}`;
    return this.http.delete(url);
  }*/
  
  /*getAllergens(): Observable<Allergen[]> {
    return this.http.get<any>(this.apiUrl+'/allergens').pipe(
      map((response: { allergens: any; }) => response.allergens)
    );
  }*/
 
  // getDishes(){
  //   return new Promise(resolve => {
  //     this.http.get<Dish>(this.apiUrl+'/dishes', {
  //       headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
  //     }).subscribe(data => {
  //       resolve(data);
  //       console.log(data);
  //     }, err => {
  //       console.log("token: " , this.token);
  //       console.log('Error al mostrar los platos ' +err);
  //     });
  //   });
  // }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos...',
      duration: 1000,
    });

    loading.present();
  }

  public async showToast(message: string) {
    const toast=await this.toast.create({
      message: message,
      duration: 5000,
      buttons:['OK']
    });
    toast.present();
  }

}
