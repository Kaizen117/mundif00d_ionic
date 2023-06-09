import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { confirmPassword } from 'src/app/utils/utils';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: any;
  userId: number;
  form: FormGroup;
  isLoading: boolean = true;
  //isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.userId=0;
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(1), Validators.maxLength(25), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      surname1: ['', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]],  
      surname2: ['', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      telephone: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}$')]],
      address: ['', [Validators.minLength(1), Validators.maxLength(150)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6), Validators.maxLength(30)]],
    });
  }

  ngOnInit() {
    
  }

  async ionViewWillEnter(){
    await this.getUserData();
  }
  
  async getUserData() {
    // this.apiService.getUserData(this.userId)
    // .subscribe(
    //   (      response: { id: number; }) => {
    //     this.userId = response.id; // Asigna el ID del usuario recibido desde el servidor
    //   },
    //   (      error: any) => {
    //     console.error('Error al obtener el ID del usuario:', error);
    //   }
    // );
    // try {
    //   const response: any = await this.apiService.getUserData(this.userId).toPromise();
    //   this.userId = response.id; // Asigna el ID del usuario recibido desde el servidor
    // } catch (error) {
    //   console.error('Error al obtener el ID del usuario:', error);
    //   // Manejo de errores
    // }
    
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

  
  /*
    
    this.apiService.getEntity('user').subscribe((user: User) => {
      this.user = user;
      console.log(this.user);      
      this.form.patchValue(user);
      this.isLoading = false;
    }, error => {
      this.utilities.showToast("Error obteniendo el usuario");
      this.isLoading = false;
    });

  }*/

  public submitForm(): void {
    console.log(this.form.valid);
    console.log(this.form.value);

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
