import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  product: any;
  bread: any;
  user_login =  false;

  constructor(private activatedroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.product=data.large;
      this.bread = data.bread
      // console.log(this.product)
  })

  if(!sessionStorage.getItem("login")){
    this.user_login = false
    let name = prompt("Username","")
    if(name === "TCOE"){
      let pass = prompt("Password","")
        if(pass === "Community"){
          this.user_login = true;
          sessionStorage.setItem("login","true")
        }
        else{
          this.ngOnInit()
        }
      }
      else{
        this.ngOnInit()
      }
    }
    else{
      this.user_login = true
  this.activatedroute.data.subscribe(data => {
    this.product=data.large;
    this.bread = data.bread
    // console.log(this.product)
})
}
  }
}
