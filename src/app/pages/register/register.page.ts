import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister=new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150), Validators.pattern(/^[a-zA-Z0-9\s\u00E0-\u00FC\u00f1]*$/i)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9\s\u00E0-\u00FC\u00f1]*$/i)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    c_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  values: any;
  user: any;
  registro: any;

  constructor(private ApiService: ApiService, private utilitiesService:UtilitiesService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {   
  }

  /*public incrementarPuntos(){

    this.ApiService.registerUser(this.user).subscribe((user)=>{
      console.log(user);
    }, (error: any) => {
          console.log(error);
        });
  
  }*/

  async submitForm(){
    /*this.ApiService.getDishes()
    .subscribe(dishes=>{
      console.log(dishes);
    });*/

    /*const promise=this.ApiService.getDishes();
    const observable=from(promise);
    observable.subscribe(

    );*/

    /*this.ApiService.register(this.user)
      .subscribe(
        (response) => {
          // Manejar la respuesta exitosa del registro
          console.log(response);
        },
        (error) => {
          // Manejar el error del registro
          console.error(error);
        }
      );
  }*/


    console.log(this.formRegister);
    this.values=this.formRegister.value;
    console.log(this.values);
    this.user = {                      
        name: this.values.name,
        surname1: this.values.surname1,
        surname2: this.values.surname2,
        telephone: this.values.telephone,
        address: this.values.address,
        email: this.values.email,
        username: this.values.username,
        password: this.values.password,
        c_password: this.values.c_password,
        type: 'users',
        activated: 0
      }      
           
    console.log(this.user);
    if(this.values.name=="" || this.values.surname1=="" || this.values.surname2=="" || this.values.telephone=="" || this.values.address=="" || this.values.email=="" ||
     this.values.username=="" || this.values.password=="" || this.values.c_password==""){
      this.showAlert('Error', 'Debe rellenar todos los campos.');
    }else if(this.values.password!==this.values.c_password){
      this.showAlert('Alerta', 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    }else{
      this.ApiService.registerUser(this.user)
      .then(data => {
        this.registro=data;
        this.registro=this.registro.data;
        console.log(this.registro);
        this.showAlert('Confirmación', 'Su cuenta ha sido creada.');//Un administrador activará su cuenta, esto puede tardar un tiempo.
        this.router.navigate(['/']);
      }, err => {
        this.showAlert('Error', 'El email ya existe. Por favor, elija otro.');
      });      
    }
  }

  async showAlert(header: string, message: string){      
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
