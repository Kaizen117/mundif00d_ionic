import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister=new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),//mayusculas, minusculas, espacios, caracteres especiales (ñ, tildes), *$ marca el final del pattern y /i que no distinga mayusculas o minusculas    
    surname1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9\s\u00E0-\u00FC\u00f1]*$/i)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    c_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  values: any;
  user: any;
  registro: any;

  constructor(private ApiService: ApiService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {   
  }

  async submitForm(){  
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
   
    this.ApiService.registerUser(this.user).then(response => {
      console.log('Registro exitoso:', response);
      this.showAlert('Confirmación', 'Su cuenta ha sido creada. Un administrador activará su cuenta, esto puede tardar un tiempo.');
      this.router.navigate(['/login']);
    }).catch(error => {
      const tlf=error.error.error.telephone;
      const email=error.error.error.email;
      const user=error.error.error.username;
      // Funciona correctamente: 
      // console.log(error);
      // console.log(error.error);
      // console.log(error.error.error);
      const msg=[tlf, email, user].join(', '); //extraigo del arbol el nodo exacto, en este caso los campos unicos que existen duplicados y los combino en una cadena separada para cargarlo correctamente al alert. La validacion se extrae desde lang/validation.php en laravel
      this.showAlert("Error", msg);
      console.log('Error durante el registro:', error);
    });
           
    // console.log(this.user);
    // if(this.values.name=="" || this.values.surname1=="" || this.values.surname2=="" || this.values.telephone=="" || this.values.address=="" || this.values.email=="" ||
    //  this.values.username=="" || this.values.password=="" || this.values.c_password==""){
    //   this.showAlert('Error', 'Debe rellenar todos los campos.');
    // }else if(this.values.password!==this.values.c_password){
    //   this.showAlert('Alerta', 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    // }else{
    //   this.ApiService.registerUser(this.user)
    //   .then(data => {
    //     this.registro=data;
    //     this.registro=this.registro.data;
    //     console.log(this.registro);
    //     this.showAlert('Confirmación', 'Su cuenta ha sido creada.');//Un administrador activará su cuenta, esto puede tardar un tiempo.
    //     this.router.navigate(['/login']);
    //   }, err => {
    //     this.showAlert('Error', 'El email ya existe. Por favor, elija otro.');
    //   });      
    // }
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
