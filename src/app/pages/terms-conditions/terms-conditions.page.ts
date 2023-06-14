import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {

  @Input() type: any;
  user: any;

  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,

    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.apiService.getUserData()
      .then((data: any) => {
        //console.log(data);
        this.user=data;
        this.type=data.data.type;
        console.log(this.user);
        console.log(this.type);  
    }, (error: any) => {
      console.log("Error: ", error);
      this.utilities.showToast("Error obteniendo el usuario");
    });
  } 
}
