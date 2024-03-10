import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyServicesService } from '../Services/my-services.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
  myVal: any;
  data: any;
  myData: any = {};
  myData2: any = {};
  myResponse: any = [];
  lastdataValue: any;
  myTags: any = []


  showInput: boolean = true;
  inputValue: string = '';
  editForm: any = FormGroup

  constructor(private dialogRef: MatDialogRef<EditComponentComponent>, private formBuider: FormBuilder, private myServices: MyServicesService) {


  }
  ngOnInit(): void {

    this.editForm = this.formBuider.group({
      fname: [[Validators.required, Validators.pattern(/^[A-Z]{1,20}$/)]],
      lname: [null, [Validators.required, Validators.pattern(/^[A-Z]{1,20}$/)]],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      age: [null, [Validators.required,]],
      state: [null, [Validators.required,]],
      country: [null, [Validators.required,]],
      homeaddone: [null],
      homeaddtwo: [null],
      companyaadone: [null],
      companyaadtwo: [null],
      tags: this.formBuider.array([this.createTag()]),
      isChecked: [false],
      image: [null, [Validators.required]]
    })

    this.myVal = 0
    this.myStates();
    this.myCountry()
    this.submitForm();
    this.getAlltags();



  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  createTag(): FormGroup {
    return this.formBuider.group({
      tagName: ['', Validators.required]
    });
  }
  removeTag(index: number): void {
    const tagsArray = this.editForm.get('tags') as FormArray;
    tagsArray.removeAt(index);
  }
  formatLabel(event: any) {
    this.myVal = event.value;
  }
  addTag(): void {
    const tagsArray = this.editForm.get('tags') as FormArray;
    tagsArray.push(this.createTag());
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
  showInputBox() {
    this.showInput = true;
  }
  hideInputBox() {
    this.showInput = false;
    this.inputValue = '';
  }
  submitForm() {

    this.myServices.getDetails().subscribe((response: any) => {
      this.myResponse = response
      this.lastdataValue = this.myResponse[this.myResponse.length - 1]
      console.log(this.myResponse)
    })
  }



  getAlltags() {
    this.myServices.getDetails().subscribe((response) => {
      this.myTags = response;

    })
  }

  update() {

    var forData = this.editForm.value;
    var data =
    {
      fname: forData.fname,
      lname: forData.lname,
      email: forData.email,
      age: forData.age,
      state: forData.state,
      country: forData.country,
      homeaddone: forData.homeaddone,
      homeaddtwo: forData.homeaddtwo,
      companyaadone: forData.companyaadone,
      companyaadtwo: forData.companyaadtwo,
      tags: forData.tags,
      // isChecked: [false],

    }

    this.myServices.update(this.lastdataValue.id, data).subscribe((response) => {
     alert("Profile updated succsessfully")
     this.onCloseClick()

    }, (error) => {
      console.log("no updated")
    })

    this.myServices.setFname(data.fname)
    this.myServices.setLname(data.lname);
    this.myServices.setEmail(data.email);
    this.myServices.setAge(data.age);
    this.myServices.setState(data.state);
    this.myServices.setCountry(data.country);
    this.lastdataValue.tags.forEach((tags: any) => {
      this.myTags = tags


    })



    this.myServices.setTag(this.myTags);
  }




}
