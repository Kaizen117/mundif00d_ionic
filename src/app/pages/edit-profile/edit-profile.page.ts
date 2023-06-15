import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { confirmPassword } from 'src/app/utils/utils';
import { User } from 'src/app/interfaces/interfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { LoadingController } from '@ionic/angular';

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
    name: new FormControl('', [Validators.minLength(1), Validators.maxLength(25), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname1: new FormControl('', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    surname2: new FormControl('', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[A-Z][a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
    telephone: new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}$')]),
    address: new FormControl('', [Validators.minLength(1), Validators.maxLength(150)]),
    email: new FormControl('', [ Validators.email, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    //username: new FormControl('', [Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9\s\u00E0-\u00FC\u00f1]*$/i)]),
    password: new FormControl('', [Validators.minLength(6)]),
    password_confirmation: new FormControl('', [Validators.minLength(6), confirmPassword])
  });

  values: any;
  user: any;
  update: any;

  isLoading: boolean = true;

  constructor(
    //private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingCtrl: LoadingController
  ) {  }

  ngOnInit() {    
  }

  async ionViewWillEnter(){
    this.showLoading();
    this.getUserData();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos...',
      duration: 500,
    });

    loading.present();
  }
  
  async getUserData() {
    this.apiService.getUserData()
      .then((data: any) => {
        this.user=data;
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario.");
    });
  }

  public submitForm(): void {
    console.log("Form valido: "+this.form.valid);
    console.log(this.form.value);    
    this.values=this.form.value;
    this.update={
      //id: this.user.data.id,
      name: this.values.name,
      surname1: this.values.surname1,
      surname2: this.values.surname2,
      address: this.values.address,
      telephone: this.values.telephone,
      email: this.values.email,
      password: this.values.password,
      password_confirmation: this.values.password_confirmation
    }
    console.log(this.update);
    console.log(this.user.data);
    this.apiService.updateUser(this.update)
    .then(data => {
      //this.user = data;
      //console.log(this.user);
      this.utilities.showToast("Éxito. Perfil actualizado satisfactoriamente.");
    }, error => {
      console.log("Error: ", error);
      this.utilities.showToast("Error actualizando el usuario");
    });    
  }
}
