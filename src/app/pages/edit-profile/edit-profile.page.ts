import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { confirmPassword } from 'src/app/utils/utils';
import { User } from 'src/app/interfaces/interfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
    
    //form: FormGroup;
    /*form = this.formBuilder.group({
    name: ['', [Validators.minLength(1), Validators.maxLength(25), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
    surname1: ['', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]],  
    surname2: ['', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
    telephone: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}$')]],
    address: ['', [Validators.minLength(1), Validators.maxLength(150)]],
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(6), Validators.maxLength(30)]],
  });*/ 
  
  form=new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    //username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9\s\u00E0-\u00FC\u00f1]*$/i)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    c_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  user: any;
  isLoading: boolean = true;

  constructor(
    //private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private utilities: UtilitiesService
  ) {  }

  ngOnInit() {    
  }

  async ionViewWillEnter(){
    await this.getUserData();
  }
  
  async getUserData() {
    this.apiService.getUserData()
      .then((data: any) => {
        //console.log(data);
        this.user=data;
        console.log(this.user);     
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario.");
    });
  }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('password').value;
  //   const repeatPassword = formGroup.get('repeatPassword').value;
  //   if (password !== repeatPassword) {
  //     formGroup.get('repeatPassword').setErrors({ passwordMismatch: true });
  //   } else {
  //     formGroup.get('repeatPassword').setErrors(null);
  //   }
  // }

 

  public submitForm(): void {
    console.log(this.form.valid);
    console.log(this.form.value);

     /*public submitForm(): void {
    this.apiService.updateUser(this.form.value).subscribe((user: User) => {
      this.utilities.showToast('Usuario actualizado correctamente');
    }, (error: any) => {
      this.utilities.showToast(codeErrors(error));
    });
  }*/

    this.apiService.updateUs(this.user).subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    }, (error: any) => {
      console.log("Error: ", error);
      //this.utilities.showToast("Error obteniendo el usuario");
    });
    
    //this.isSubmitted = true;

    // if (this.userId) {
    //   this.apiService.updateUser(this.userId)
    //     .subscribe(
    //       async (response: any) => {
    //       // (          response: any) => {
    //         console.log('Campo actualizado correctamente');
    //         // Realiza cualquier acción adicional necesaria
    //       },
    //       (          error: any) => {
    //         console.error('Error al actualizar el campo:', error);
    //         // Manejo de errores
    //       }
    //     );
    // }
    // if (!this.form.valid) {
    //   console.log('Please provide all the required values');
    // } else {
    //   const updatedUserData = {
    //     name: this.form.value.name || this.user.name, // Conserva el nombre actual si no se rellena el campo
    //     email: this.form.value.email || this.user.email, // Conserva el email actual si no se rellena el campo
    //     password: this.form.value.password, // Incluye la contraseña aunque esté en blanco
    //   };
    //   this.apiService.updateUser(updatedUserData).subscribe(
    //     (response) => {
    //       console.log('Usuario actualizado satisfactoriamente.', response);
    //       this.router.navigate(["/profile"]);
    //     },
    //     (error) => {
    //       console.error('Error, no se pudo actualziar el usuario', error);
    //     }
    //   );
    // }

/*
    this.apiService.updateUser(this.form.value).subscribe((response) => {
      this.utilities.showToast('Usuario actualizado correctamente');
      this.router.navigate(["/profile"]);
    }, (error) => {
      this.utilities.showToast(codeErrors(error));
    });*/
  }


}
