import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
//import { AuthenticationService } from 'src/app/services/authentication.service';
//import { UtilitiesService } from 'src/app/services/utilities.service';
//import { codeErrors } from 'src/app/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /*formLogin=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });*/

  formLogin: FormGroup;
  
  credentials = {
    email: '',
    password: ''
  };

  user: any;
  login: any;
  values: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    //private utilitiesService: UtilitiesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router
    //private auth: AuthenticationService,  
   
  ) { 
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 ngOnInit() {
  
  }

  /*verPlatos(){
    this.apiService.get_Companies()
      .then(data => {
          this.dishes=data;
          console.log(this.dishes); //para llamar esta funcion, en home page html crear un boton con la funcion <ion-button (click)="verUsuarios()">Ver usuarios</ion-button>
      });
  }

  getData() {
    this.apiService.getData()
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
      }, (error) => {
        console.error(error);
      });
  }

  postData() {
    const requestBody = { name: 'John Doe', email: 'john@example.com' };
    this.apiService.postData(requestBody)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.error(error);
      });
  }

  postWithAuth() {
    const requestBody = { name: 'John Doe', email: 'john@example.com' };
    this.apiService.postWithAuth(requestBody)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.error(error);
      });
  }*/

  /*logueo(){
    console.log(this.formLogin);
    if (this.formLogin.valid) {
      const emailValue = this.formLogin.value.email ? this.formLogin.value.email.toString() : '';
      const passwordValue = this.formLogin.value.password ? this.formLogin.value.password.toString() : '';
      console.log(emailValue);
      console.log(passwordValue);      

      if (emailValue && passwordValue) {
        this.credentials.email = emailValue;
        this.credentials.password = passwordValue;    
        this.apiService.logueo(this.credentials)
        .subscribe(
          async (response) => {
            // Manejar la respuesta exitosa del inicio de sesión
            const data= await this.apiService.login_real(this.credentials.email , this.credentials.password);
            this.user=data;
            console.log(this.user);
            console.log(response);
          },
          (error) => {
            // Manejar el error del inicio de sesión
            console.error(error);
          }        
        );
      }
    }
  }*/
  async login_real(){
    this.values=this.formLogin.value;
    
    this.login={
      email: this.values.email,
      password: this.values.password
    }
    
    this.apiService.login_real(this.formLogin.value.email, this.formLogin.value.password)
    .then(data => {
      console.log(data);
      this.user=data;
      console.log(this.user);
      /*this.user=this.user.data;
      console.log(this.user);*/
      //if(this.user.email_confirmed==0){        
        if(this.user.data.user.activated===1){//&& this.user.deleted==0
          if(this.user.data.user.type==='waiters'){
            this.showAlert('Éxito', 'Camarero logeado satisfactoriamente.');
            this.router.navigate(['/userslist']);
          }else{
            this.showAlert('Éxito', 'Usuario logeado satisfactoriamente.');            
            this.router.navigate(['/gameslist']);
          }
        }else{
          this.showAlert('Alerta', 'Un administrador necesita reactivar su cuenta, por favor, inténtelo en otro momento.');
        }      
      /*}else{
        this.showAlert('Error', 'Confirme el email en su bandeja de entrada');
      }*/
    }, err => {
      //this.showAlert('Error', 'Las credenciales no coinciden');
      console.log(err);
      this.showAlert('Error', 'El email o la contraseña no son correctos, inténtelo de nuevo.');
    });
  }
 
  // async login_real(){
  //   this.values=this.formLogin.value;
  //   //console.log(this.values);

  //   this.login={
  //     email: this.values.email,
  //     password: this.values.password
  //   }
  //   console.log(this.login);
    
  //   const email = this.formLogin.value.email ? this.formLogin.value.email.toString() : '';
  //   const password = this.formLogin.value.password ? this.formLogin.value.password.toString() : '';
  //   console.log(email);
  //   console.log(password);
  //   try{
  //     const data= await this.apiService.login_real(email, password);
  //     this.user=data;
  //     console.log(this.user);
  //     //if(this.user.email_confirmed==0){
  //       //if(this.user.activated==1){//&& this.user.deleted==0
  //         if(this.user.type==='waiters'){
  //           console.log(this.user.type);
  //           this.showAlert('Éxito', 'Camarero logeado satisfactoriamente.');
  //           this.router.navigate(['/reserves']);
  //         }else{
  //           console.log(this.user.type);
  //           this.showAlert('Éxito', 'Usuario logeado satisfactoriamente.');            
  //           this.router.navigate(['/dishes']);
  //         }
  //       //}else{
  //         //this.showAlert('Alerta', 'Un administrador necesita reactivar su cuenta, por favor, inténtelo en otro momento.');
  //       //}      
  //     //}
  //   }catch(error){
  //     console.log(error);
  //     this.showAlert('Error', 'El email o la contraseña no son correctos, inténtelo de nuevo.');
  //   /*
  //   //this.apiService.login_real(this.formLogin.value.email, this.formLogin.value.password)
  //   .then((data: any) => {
  //     this.user=data;
  //     this.user=this.user.data;
  //     console.log(this.user);
  //     //if(this.user.email_confirmed==0){
  //       if(this.user.activated==1){//&& this.user.deleted==0
  //         if(this.user.type==='c'){
  //           this.showAlert('Éxito', 'Camarero logeado satisfactoriamente.');
  //           this.router.navigate(['/reserves']);
  //         }else{
  //           this.showAlert('Éxito', 'Usuario logeado satisfactoriamente.');            
  //           this.router.navigate(['/gameslist']);
  //         }
  //       }else{
  //         this.showAlert('Alerta', 'Un administrador necesita reactivar su cuenta, por favor, inténtelo en otro momento.');
  //       }      
  //     /*}else{
  //       this.showAlert('Error', 'Confirme el email en su bandeja de entrada');
  //     }
  //   }, err => {
  //     //this.showAlert('Error', 'Las credenciales no coinciden');
  //     console.log(err);
  //     this.showAlert('Error', 'El email o la contraseña no son correctos, inténtelo de nuevo.');
  //   });*/
  //   }
  // }
  
  async showAlert(header: string, message: string){      
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
  /*public submitForm(): void {
    console.log(this.form.valid);
    //console.log(this.form.value); OK->descomentar
    //this.utilitiesService.showLoading("Entrando...");
    
    this.apiService.login(this.form.value).subscribe((user: User) => {
    
    //this.utilitiesService.dismissLoading();
    console.log(user);
    
    //Ahora aplicamos la cabecera devuelta a las siguientes peticiones
    //this.apiService.setTokenToHeaders(user.api_token);
    
    //Emitimos el evento de login
    //this.events.publish('user:login');
    
    //Vamos a inicio
    //this.auth.login(user.api_token);
  
    this.navCtrl.navigateRoot('/home-sin');
   }, (error) => {    
    /*this.utilitiesService.dismissLoading();
    this.utilitiesService.showToast(codeErrors(error));
   });
    
  }*/

}
