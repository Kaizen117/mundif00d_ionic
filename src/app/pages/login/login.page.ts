import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';


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
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController   
  ) { 
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 ngOnInit() {
  
 }

  async login_real(){
    this.values=this.formLogin.value;
    
    this.login={
      email: this.values.email,
      password: this.values.password
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      duration: 500,
    });
    loading.present();
    
    this.apiService.login_real(this.formLogin.value.email, this.formLogin.value.password)
    .then(data => {
      //console.log(data);
      this.user=data;
      console.log(this.user);
      console.log("activated: ", this.user.data.user.activated);
 
      if(this.user.data.user.activated===1){
        if(this.user.data.user.type==='waiters'){
          this.showAlert('Éxito', 'Camarero logeado satisfactoriamente.');
          this.router.navigate(['/reserves']);
        }else if(this.user.data.user.type==='users'){
          this.showAlert('Éxito', 'Usuario logeado satisfactoriamente.');            
          this.router.navigate(['/home']);
        }else{
          this.showAlert('Error', 'El administrador debe loguearse por medio de la página web.');
        }
      }else{
        this.showAlert('Alerta', 'Un administrador necesita reactivar su cuenta, por favor, inténtelo en otro momento.');
      }     
    }, err => {
      console.log(err);
      this.showAlert('Error', 'El email o la contraseña no son correctos, inténtelo de nuevo.');
    });
  }
  
  async showAlert(header: string, message: string){      
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }  
}
