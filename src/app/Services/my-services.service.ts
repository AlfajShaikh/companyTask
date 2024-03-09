import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class MyServicesService {

  fname: any;
  private _lname: any;

  email: any;
  age: any;
  state: any;
  country: any;
  home1: any;
  home2: any;
  comp1: any;
  comp2: any;
  tag: any;
  isCheked: any;
  DIALOGREF_1!: MatDialogRef<RegistrationComponent>;
  DIALOGREF_2!: MatDialogRef<ProfileComponent>;

  url = "http://localhost:3000/";
  constructor(private http: HttpClient) { }
  submitData(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "posts", data, {
      headers
    })
  }
  getState() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "states", {
      headers
    })
  }


  getCountry() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "countries", {
      headers
    })
  }

  getImage() {

    return this.http.get(this.url + "posts", {
    })
  }

  getFname(): string {
    return this.fname
  }

  setFname(name: String) {
    this.fname = name;
  }

  setLname(name: String) {
    this._lname = name
  }

  setEmail(name: String) {
    this.email = name
  }

  setAge(age: String) {
    this.age = age;
  }

  setState(state: String) {
    this.state = state
  }

  setIsChecked(name: String) {
    this.isCheked = name;
  }
  setCountry(name: String) {
    this.country = name
  }
  setHome1(name: String) {
    this.home1 = name
  }

  setHome2(name: String) {
    this.home2 = name
  }
  setComp1(name: string) {
    this.comp1 = name
  }
  setComp2(name: String) {
    this.comp2 = name
  }

  setTag(name: String) {
    this.tag = name;
  }

  getLname() {
    return this._lname;
  }
  getEmail() {
    return this.email
  }
  getAge() {
    return this.age
  }
  getmyState() {
    return this.state
  }

  getMyCountry() {
    return this.country;
  }

  gethome1() {
    return this.home1
  }

  gethome2() {
    return this.home2
  }

  getIsChecked() {
    return this.isCheked
  }
  getcomp1(): String {
    return this.comp1
  }

  getcomp2(): String {
    return this.comp2
  }

  getTag(): string {
    return this.tag
  }

  closeDialogs(): any {
    if (this.DIALOGREF_1) {
      this.DIALOGREF_1.close()
    }
    if (this.DIALOGREF_2) {
      this.DIALOGREF_2.close()
    }
  }
}
