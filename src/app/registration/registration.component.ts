import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MyServicesService } from '../Services/my-services.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageServiceService } from '../Services/image-service.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: any = FormGroup;
  selectedFile: File | null = null;
  invalidDimensions = false;
  showInput: boolean = true;
  inputValue: string = '';
  myTag: any;

  myData: any = {}
  imageBase64: any;
  myData2: any = {};
  myVal: any;
  imageUrl: string | undefined;
  imageUrl_2: string | undefined;

  fname: any
  constructor(public dialogRef: MatDialogRef<RegistrationComponent>, private formBuilder: FormBuilder, private myServices: MyServicesService, private http: HttpClient, private imageSharingService: ImageServiceService, private dialog: MatDialog) {
    this.myVal = 0
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fname: [null, [Validators.required, Validators.pattern(/^[A-Z]{1,20}$/)]],
      lname: [null, [Validators.required, Validators.pattern(/^[A-Z]{1,20}$/)]],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      age: [null, [Validators.required,]],
      state: [null, [Validators.required,]],
      country: [null, [Validators.required,]],
      homeaddone: [null],
      homeaddtwo: [null],
      companyaadone: [null],
      companyaadtwo: [null],
      tags: this.formBuilder.array([this.createTag()]),
      image: [null, [Validators.required]]
    })
    this.myStates();
    this.myCountry();
    this.getImage();
  }

  showInputBox() {
    this.showInput = true;
  }
  hideInputBox() {
    this.showInput = false;
    this.inputValue = '';
  }
  createTag(): FormGroup {
    return this.formBuilder.group({
      tagName: ['', Validators.required]
    });
  }

  addTag(): void {
    const tagsArray = this.registerForm.get('tags') as FormArray;
    tagsArray.push(this.createTag());
  }

  removeTag(index: number): void {
    const tagsArray = this.registerForm.get('tags') as FormArray;
    tagsArray.removeAt(index);
  }
  openSecondDialog(): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      data: { image: this.imageSharingService.getImageData() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


  }


  setImage(): void {
    const imageData: any = this.imageUrl;
    this.imageSharingService.setImageData(imageData);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  formatLabel(event: any) {
    this.myVal = event.value;
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

      this.registerForm.patchValue({
        image: this.imageUrl
      });
      img.onload = () => {
        if (img.width !== 512 || img.height !== 512) {
          this.invalidDimensions = true

        } else {
          this.invalidDimensions = false;

        }
      };



    }
  }
  submitForm() {

    if (this.registerForm.valid) {
      var forData = this.registerForm.value;
      const formData: FormData = new FormData();
      var data = {
        fname: forData.fname,
        lname: forData.lname,
        email: forData.email,
        age: forData.age,
        state: forData.state,
        homeaddone: forData.homeaddone,
        homeaddtwo: forData.homeaddtwo,
        companyaadone: forData.companyaadone,
        companyaadtwo: forData.companyaadtwo,
        country: forData.country,
        tags: forData.tags,
        image: forData.image

      }
      this.myServices.setFname(data.fname)
      this.myServices.setLname(data.lname);
      this.myServices.setEmail(data.email);
      this.myServices.setAge(data.age);
      this.myServices.setState(data.state);
      this.myServices.setCountry(data.country);
      this.myServices.setHome1(data.homeaddone);
      this.myServices.setHome2(data.homeaddtwo);
      this.myServices.setComp1(data.companyaadone);
      this.myServices.setComp2(data.companyaadtwo);
      for (let i = 0; i < data.tags.length; i++) {
        this.myTag = data.tags[i].tagName;

      }
      this.myServices.setTag(this.myTag);
      this.imageSharingService.setImageData(data.image)
    } else {
      alert("Please fill in all required fields correctly")
    }

  }








  myStates() {
    this.myServices.getState().subscribe((response: any) => {
      this.myData = response
    })
  }

  myCountry() {
    this.myServices.getCountry().subscribe((response: any) => {
      this.myData2 = response
    })
  }

  getImage() {
    this.myServices.getImage().subscribe((respone: any) => {
      this.imageUrl_2 = respone[0].image;
      console.log(respone[0].image);
    }, (error) => {

      if (error.error?.message) {
        alert("Data error")
      } else {
        alert("error")
      }


    })
  }
}
