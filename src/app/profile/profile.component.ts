import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyServicesService } from '../Services/my-services.service';
import { ImageServiceService } from '../Services/image-service.service';
import { RegistrationComponent } from '../registration/registration.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public myService: MyServicesService, public image: ImageServiceService, public dialogRef: MatDialogRef<ProfileComponent>, public dialogRef_2: MatDialogRef<RegistrationComponent>, private route: Router) { }

  onCloseClick(): void {
    this.dialogRef.close();
    this.dialogRef_2.close();
  }

  submitData() {
    var data = {
      fname: this.myService.getFname(),
      lname: this.myService.getLname(),
      email: this.myService.getEmail(),
      age: this.myService.getAge(),
      state: this.myService.getmyState(),
      country: this.myService.getMyCountry(),
      home_address_1: this.myService.gethome1(),
      home_address_2: this.myService.gethome2(),
      comp_address_1: this.myService.getcomp1(),
      comp_address_2: this.myService.getcomp2(),
      tags: this.myService.getTag(),
      image: this.myService.getImage()
    }
    this.myService.submitData(data).subscribe((response: any) => {
      alert("data submitted");
    }, (error) => {
      alert(error)
    })
  }
}

