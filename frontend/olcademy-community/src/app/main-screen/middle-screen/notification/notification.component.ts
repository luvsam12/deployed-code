import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isShow:boolean = false;
  isShow_not:boolean = false;
  isShow_book:boolean = false;
  isShow_user:boolean = false;



  
  toggleDisplay(vari:string){
    if(!this.isShow){
    document.getElementById(vari).style.display = "block" ;
    document.getElementById(vari).style.opacity = "1" ;
    document.getElementById(vari).style.visibility = "visible" ;
    this.isShow = true;
    }
    else{
      document.getElementById(vari).style.display = "none" ;
      document.getElementById(vari).style.opacity = "0" ;
      document.getElementById(vari).style.visibility = "hidden" ;
      this.isShow = false;
      }
  }

  Bookmark(varia:string){ 
    if(!this.isShow_book){
      document.getElementById(varia).innerHTML = 'Remove Bookmark';
      this.isShow_book=true;
    }
    else{
      document.getElementById(varia).innerHTML = 'Bookmark this Post';
      this.isShow_book=false;
    }
  }

  Notify(varia:string){ 
  if(!this.isShow_not){
    document.getElementById(varia).innerText = 'Turn On Notification';
    this.isShow_not=true;
  }
  else{
    document.getElementById(varia).innerText = 'Turn Off Notification';
    this.isShow_not=false;
  }
}

Follow(varia:string){ 
  if(!this.isShow_user){
    document.getElementById(varia).innerHTML = 'Follow User';
    this.isShow_user=true;
  }
  else{
    document.getElementById(varia).innerHTML = 'Unfollow User';
    this.isShow_user=false;
  }
}

Remove(varia:string)
{
    document.getElementById(varia).style.display = "none" ;
    document.getElementById(varia).style.opacity = "0" ;
    document.getElementById(varia).style.visibility = "hidden" ;
}

}
