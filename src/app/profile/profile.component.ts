import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyServicesService } from '../Services/my-services.service';
import { ImageServiceService } from '../Services/image-service.service';
import { RegistrationComponent } from '../registration/registration.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { Router } from '@angular/router';
import { EditComponentComponent } from '../edit-component/edit-component.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isChecked: any;
  lastdataValue: any;
  profileForm: any = FormGroup
  myResponse: any = [];
  imageUrl: string | undefined;
  invalidDimensions = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public myService: MyServicesService, public image: ImageServiceService, public dialogRef: MatDialogRef<ProfileComponent>, public dialogRef_2: MatDialogRef<RegistrationComponent>, private route: Router, private dialog: MatDialog, private formBuilder: FormBuilder) {

    this.isChecked = myService.getIsChecked()

  }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      image: [null]
    })
    this.myService.getDetails().subscribe((response: any) => {
      this.myResponse = response
      this.lastdataValue = this.myResponse[this.myResponse.length - 1]
      console.log(this.myResponse)
    })
  }

  
  onFileSelected(event: any): void {

    const file = event.target.files[0] as File;
    const img = new Image();
    const reader = new FileReader();


    this.imageUrl = URL.createObjectURL(file);
    if (file) {

      reader.onload = () => {
        this.imageUrl = reader.result as string;
        img.src = reader.result as string
      };
      reader.readAsDataURL(file);

      this.profileForm.patchValue({
        image: this.imageUrl
      });
      img.onload = () => {
        if (img.width !== 310 || img.height !==325) {
          this.invalidDimensions = true

        } else {
          this.invalidDimensions = false;

        }
      };



    }
  }

  setImage(): void {
    const imageData: any = this.imageUrl;
    this.image.setImageData(imageData)
  }
  editDialog() {
    this.dialog.open(EditComponentComponent)
  }
  editPhoto() {

    const forData = this.profileForm.value
    var data = {
      fname: this.myService.getFname(),
      lname: this.myService.getLname(),
      email: this.myService.getEmail(),
      age: this.myService.getAge(),
      state: this.myService.getmyState(),
      country: this.myService.getMyCountry(),
      homeaddone: this.myService.gethome1(),
      homeaddtwo: this.myService.gethome2(),
      companyaadone: this.myService.getcomp1(),
      companyaadtwo: this.myService.getcomp2(),
      tags: this.myService.getTag(),
      image: forData.image==null ? this.image.getImageData():forData.image

    }
    this.image.setImageData(data.image)
    this.myService.update(this.lastdataValue.id, data).subscribe((response) => {
      alert("Data updated successefully")
      this.onCloseClick();
      


    }, (error) => {
      console.log("no updated")
    })

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
      isCheck: this.myService.getIsChecked(),
      image: this.myService.getImage(),

    }


  }
  onCloseClick(): void {
    this.dialogRef.close();
   
  }
}

