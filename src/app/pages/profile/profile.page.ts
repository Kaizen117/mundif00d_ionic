import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: any;
  //public form: FormGroup;
  //public isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private utilities: UtilitiesService,
    //public auth: AuthenticationService
  ) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   name: new FormControl(''),
    //   email: new FormControl(''),
    //   avatar: new FormControl('')
    // });

    // this.apiService.getUserData().subscribe((user: User) => {
    //   this.user = user;
    //   this.form.patchValue(user);
    //   this.isLoading = false;
    // }, error => {
    //   this.utilities.showToast("Error obteniendo el usuario");
    //   this.isLoading = false;
    // });
  }

  ionViewWillEnter(){ 
    this.showLoading();
    this.loadUserData();
  }



  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 500,
    });

    loading.present();
  }

  loadUserData(){
    this.apiService.getUserData()
      .then((data: any) => {
        console.log(data);
        this.user=data.data.user;
        console.log(this.user);     
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario");
    });
  }

  /*public submitForm(): void {
    this.apiService.updateUser(this.form.value).subscribe((user: User) => {
      this.utilities.showToast('Usuario actualizado correctamente');
    }, (error: any) => {
      this.utilities.showToast(codeErrors(error));
    });
  }*/

}
