import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from './../shared/services/authentication.service';
import { OnInit, ViewEncapsulation, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from './../app.state';
import { AppConfig } from './../shared/services/app.config';
import { InterestPopupComponent } from '../popups/interest-popup/interest-popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class HeaderComponent implements OnInit {
  routeDetails: any;
  routes: any;
  logoPath: any = AppConfig.LOGO_PATH;
  active: any = '';
  login : boolean = this.AuthenticationService.isLoggedIn();
  user_data: any = this.AuthenticationService.get_user_info();
  userimage :any;
  popup: boolean = false;
  categories = ["My Profile", "Settings", "Logout"]


  constructor( private router: Router,
               private store: Store<AppState>,
               private AuthenticationService: AuthenticationService,
               private dialogue: MatDialog)
    {

      //current route tab is selected
      var tabs = ["courses", "myfeed", "forum", "blogs", "network", "assessment","notification"];
      for(var i=0;i<tabs.length;i++)
      {
        var element = document.getElementById(tabs[i]);
        if(element)
          element.style.border = "thick solid $olcademy-community-white";
      }

      this.routeDetails = this.store.select("currentRoute");
      this.routeDetails.subscribe(
        (element) =>
        {
          let lastElementIndex = element.length - 1;
          this.routes = element[lastElementIndex];

          if(this.routes)
          {
            this.active = this.routes.name;
            document.getElementById(this.active).style.borderBottom = "thick solid #00ABF3";
          }
        })
    }     //closing of cunstructor.

    ngOnInit(): void
  {
    if(this.AuthenticationService.isLoggedIn())
    {
        this.AuthenticationService.getCurrentUserImage(this.user_data.authdata.user_id).subscribe(
          data =>
          {
            this.userimage = data.data.profile_image_path;
          })

        this.AuthenticationService.check_popup().subscribe(
          data =>
          {
            this.popup = data.showPopup;
            if(this.popup === true)
            {
              this.openDialogue();
            }
          })
    }
  }       // closing of ngOnInit.

  public ngAfterViewChecked(): void
  {
    document.getElementById('logo-image').innerHTML = '<img src="'+this.logoPath+'" class="logo" />'
    document.getElementById('courses-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")";
    document.getElementById('forum-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")";
    document.getElementById('blogs-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")";
    document.getElementById('assessment-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")";

    if(this.login)
    {   // this will restrict the browser to reach this code if the user is not logged in and will not show error of null.
      document.getElementById('myfeed-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")"
      document.getElementById('network-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")";
      document.getElementById('notification-icon').style.backgroundImage = "url("+AppConfig.CSS_SPRITES+")";
    }
  }     //closing of ngAfterViewChecked.




  enterKey(event)
  {
    if(event.keyCode === 13)
    {
      event.preventDefault();
      document.getElementById("search-btn").focus(); //to change the color on enter button clicked
    }
  }


  home()
  {
    this.router.navigateByUrl("");
  }

  navigate(to)
  {
    var tabs = ["courses", "myfeed", "forum", "blogs", "network", "tests", "notification"];
    for(var i=0;i<tabs.length;i++)
    {
      var element = document.getElementById(tabs[i]);
      if(element)
        element.style.border = "none";
    }

    document.getElementById(to).style.borderBottom = "thick solid #00ABF3";
    this.router.navigateByUrl('/'+to); //navigated to selected tab
  }

  openDialogue()
  {
    const dialogRef = this.dialogue.open(InterestPopupComponent);
  }

  gotoProfile()
  {
    this.router.navigateByUrl("/user-page")
  }
  go_to_signup()
  {
    this.router.navigateByUrl("/signup")
  }
  go_to_login()
  {
    this.router.navigateByUrl("/login")
  }

  options(category)
  {
    if(category === "My Profile")
    {
      this.router.navigateByUrl("/user-page")
    }
    else if(category === "Settings")
    {
      this.router.navigateByUrl("/settings")
    }
    else if(category === "Logout")
    {
      this.AuthenticationService.logout();
      location.reload();
    }
  }
}
