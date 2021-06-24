import { AuthenticationService } from './../../../shared/services/authentication.service';
import { AppConfig } from 'src/app/shared/services/app.config';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import {formatDate } from '@angular/common';
import { element, logging } from 'protractor';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnyARecord } from 'dns';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';
import { CategoryService } from 'src/app/shared/services/category-list.service';
import { profile_details } from 'src/app/shared/services/profile_image.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { defaultCoreCipherList } from 'constants';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
// import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class BlogsComponent implements OnInit {
  blogList: any;
  commentList: any;
  currentDate ;
  blog_age: string;
  author_image_path: Array<string> = [];
  user_image;
  params;
  params_name;
  categoryList;
  // category_name;
  num_of_followers;
  category_index;
  // blog_aurthor_image;
  i:any;
  var:any;
  truth =true;
  isShow=false;
  cookie_id : any;
  // login : boolean = false;
  bookmarkTruth = true;
  // user_data: any;
  http: HttpClient;
  user_details: any = this.AuthenticationService.get_user_info();
  current_user_id = '';
  is_comment_available:Boolean =false;
  is_reply_available:Boolean =false;
  show_more_clicked:boolean = false;
  post_content_show_more:boolean = false;
  category1 = ['Update Blog','Turn Off Notification','Delete Blog'];
  category2  = ['Follow User','Turn Off Notification','Report Blog'];


  constructor(private blogService: BlogsListService,
              private AuthenticationService: AuthenticationService,
              public https: HttpClient,
              private router: Router,
              private activate_route: ActivatedRoute,
              private CategoryService: CategoryService,
              private dialogue: MatDialog,) { }


  public ngAfterViewChecked(): void { }

           ngOnInit(): void {
    this.activate_route.queryParams.filter(params =>params.category).subscribe(params => {
      // console.log(params);
      this.params = params.category;
      this.blogService.get_selected_category_blogs(this.params).subscribe(
        data => {
          this.blogList = data;
          // console.log(data);
          this.CategoryService.getCategoriesData().subscribe(
            data =>
            {
              this.categoryList = data;
              for(var i=0;i<this.categoryList.length;i++)
              {
                if(this.params === this.categoryList[i]._id){
                  this.params_name = this.categoryList[i].name
                  this.num_of_followers = this.categoryList[i].num_of_followers
                  this.category_index = i;
                }
              }
            }
          )
          for(let datas of data)
          {
            this.AuthenticationService.getCurrentUserImage(datas.user_id).subscribe(
              data => {
                this.author_image_path.push(data.data.profile_image_path);
              }
            )
          }

        }
      )
      })

    if(this.params === undefined){
    this.blogService.getBlogsData().subscribe(
      data => {
        for(let datas of data)
        {
          this.AuthenticationService.getCurrentUserImage(datas.user_id).subscribe(
            data => {
              this.author_image_path.push(data.data.profile_image_path);
            }
          )
        }

        this.blogList = data;
      },
      (error) => {
        console.log(error);
      }
    )
    };
    if(this.AuthenticationService.isLoggedIn()){
    this.AuthenticationService.getCurrentUserImage(this.user_details.authdata.user_id).subscribe(
      data =>
      {
        this.user_image = data.data.profile_image_path;
      }
    )
           }
  }


  blog_life(publishedOn)
  {
    this.currentDate = formatDate(Date() ,'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    let current_year = this.currentDate[0]+this.currentDate[1]+this.currentDate[2]+this.currentDate[3];
    let published_year = publishedOn[0]+publishedOn[1]+publishedOn[2]+publishedOn[3];
    let current_month = this.currentDate[5]+this.currentDate[6];
    let published_month = publishedOn[5]+publishedOn[6];

    let current_date = this.currentDate[8]+this.currentDate[9];
    let published_date = publishedOn[8]+publishedOn[9];
    if(current_year == published_year)
    {
      if(current_month == published_month)
      {
        if( current_date == published_date)
          {
              let current_hr = this.currentDate[11]+this.currentDate[12];
              let published_hr = publishedOn[11]+publishedOn[12];
              if(current_hr == published_hr)
              {
                    let current_min = this.currentDate[14]+this.currentDate[15];
                    let published_min = publishedOn[14]+publishedOn[15];
                    if( current_min == published_min)
                    {
                      let current_sec = this.currentDate[17]+this.currentDate[18];
                      let published_sec = publishedOn[17]+publishedOn[18];
                      return current_sec - published_sec + " seconds ago.";
                    }
                    else
                    {
                      return current_min - published_min + " minutes ago."
                    }
              }
              else
              {
                 return current_hr - published_hr + " hrs ago."
              }
          }
          else if(current_date - published_date < 7)
          {
            return current_date - published_date + " days ago."
          }
          else if( current_date - published_date < 14)
          {
            return "A week ago."
          }
      }
    }

      return publishedOn.slice(0,10);
  }

  unselect_category(){
    this.params = undefined
    // this.router.navigateByUrl("/courses")
    this.router.navigateByUrl("/blogs")
    this.blogService.getBlogsData().subscribe(
      data => {
        for(let datas of data)
        {
          this.AuthenticationService.getCurrentUserImage(datas.user_id).subscribe(
            data => {
              this.author_image_path.push(data.data.profile_image_path);
            }
          )
        }

        this.blogList = data;
      },
      (error) => {
        console.log(error);
      }
    )

    // location.reload()
    // this.ngOnInit();


    // location.reload();


  }
  go_to_blog(id){
    // this.blogService.get_particular_blog(id);
    this.router.navigate(["/show-blog"],{ queryParams: { id: id}});
    // this.router.navigateByUrl("/show-blog"); //navigated to selected tab

  }

  check_cookie_name(name)
  {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      this.cookie_id = match[2];
    }
    else{
         console.log('--something went wrong---');
    }
 }

 Issame(author_id){
  if(this.AuthenticationService.isLoggedIn()){
  if(parseFloat(this.AuthenticationService.get_user_info().authdata.user_id) === parseFloat(author_id)){
    return true
  }
  return false
}
}

show_text(media,i){
  var content = ""
  content = document.getElementById("thread-desc-"+i).textContent
   document.getElementById("short-content-"+i).textContent = content
   if(media.length > 0){
   document.getElementById("short-content-first-media-"+i).innerHTML = media[0]
   }
   else{
    document.getElementById("short-content-first-media-"+i).style.background = "grey"
   }
   if(content.length >270){
    document.getElementById("post-content-show-more-"+i).style.display = "block"
    document.getElementById("post-content-show-more-"+i).style.position = "absolute"
    document.getElementById("post-content-show-more-"+i).style.marginLeft = "40%"
    document.getElementById("post-content-show-more-"+i).style.boxShadow = "-10px 0px 10px white"

  }
}

go_to_profile(){
  this.router.navigateByUrl("/user-page")
}


write_a_blog(){
  if(this.AuthenticationService.isLoggedIn())
  {
    this.router.navigateByUrl("/text-editor")
  }
else{
  const dialogRef = this.dialogue.open(SigninPopupComponent);
}

}

commentDisplay(id,i){
  if(!(document.getElementById("comment"+id).style.display === "block")){
    document.getElementById("comment"+id).style.display = "block";
    this.blogService.getCommentsData(id).subscribe(
      bata => {
         this.commentList = bata;
        for(let comment of this.commentList.comments){
          this.blogService.getReplyData(comment._id).subscribe(
            reply => {
              comment.reply = reply;

            }
          )

        }
        this.blogList[i].comment = this.commentList;
      }

    );
    this.blogList[i].commentShow = true
  }
  else{
    document.getElementById("comment"+id).style.display = "none";

    this.blogList[i].commentShow = false
  }

}

reportSpam(id){
  if(this.AuthenticationService.isLoggedIn()){
  const dialogRef = this.dialogue.open(ReportSpamPopupComponent, {
    width: "500px",
    data: {type: "comment",id:id}
  });
}
else{
  const dialogRef = this.dialogue.open(SigninPopupComponent);
}

}

check_number(value){
  if(value === 0){
    return ""
  }
  else if(value > 999999){
    return (value/1000000).toFixed(1) +"M"
  }
  else if(value > 999){
    return (value/1000).toFixed(1) +"K"
  }
  else{
    return value
  }
}

option_function(category,id){
  if(this.AuthenticationService.isLoggedIn()){
  if(category === 'Delete Blog'){
    const dialogRef = this.dialogue.open(ConfirmationComponent, {
      width: "500px",
      data: {type: "Delete",id:id,confirmation_line:'Are you sure you want to delete the Blog?',first_btn:'Yes',second_btn:'Cancle'}
    });
  }
  else if(category === 'Update Blog'){
    this.router.navigate(["/text-editor"],{ queryParams: { id: id}});
  }
  else if(category === 'Report Blog'){
    const dialogRef = this.dialogue.open(ReportSpamPopupComponent, {
      width: "500px",
      data: {type: "Blog",id:id}
    });
  }
}
else{
  const dialogRef = this.dialogue.open(SigninPopupComponent);
}
}

bookmarkCheck(bookmarks){
  if(this.AuthenticationService.isLoggedIn()){
    let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
    for(var s=0;s<bookmarks.length;s++){
      if(current_user_id == bookmarks[s]){
        return "fas fa-bookmark selected";
      }
    }
    return "fas fa-bookmark";
  }
  else{
    return "fas fa-bookmark ";
  }

}

thumsUp(kudos,id){
  if(this.AuthenticationService.isLoggedIn()){
    let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

    for(var s=0;s<kudos.length;s++){
      if(current_user_id == kudos[s]){


        return "fas fa-thumbs-up selected";
      }
    }

    return "fas fa-thumbs-up ";
  }
  else{
    return "fas fa-thumbs-up ";
  }

}

expand(id){
  if(document.getElementById("expand"+id).style.display !== "block"){
   document.getElementById("expand"+id).style.display = "block";
   document.getElementById("expandS"+id).style.display = "none";
  }
  else{
   document.getElementById("expand"+id).style.display = "-webkit-box";
   document.getElementById("expandS"+id).style.display = "block";
  }
}

checkShow(id){
  if(document.getElementById("expand"+id).textContent.length > 218){
    return true
  }
  else{
    return false
  }
}

postReply(id,post_id,i){
  if(this.AuthenticationService.isLoggedIn()){
  this.blogService.post_reply(id,(<HTMLInputElement>document.getElementById("post-comment"+id)).value,post_id,this.user_details.authdata.full_name).subscribe(
   data => {
     this.blogService.getCommentsData(this.blogList[i]._id).subscribe(
      bata => {
        this.commentList = bata;
        for(let comment of this.commentList.comments){
          this.blogService.getReplyData(comment._id).subscribe(
            reply => {
              comment.reply = reply;
              this.is_reply_available= true;
            }
          )

        }

        this.blogList[i].comment = this.commentList;
        this.is_comment_available = true;
        (<HTMLInputElement>document.getElementById("post-comment"+id)).value = ""
      },
      (error) => {
        console.log(error);
      }
    );
   }
 )
  }
  else{
    const dialogRef = this.dialogue.open(SigninPopupComponent);
 }
}

commentInput(id){
  if(!(document.getElementById("comment-reply"+id).style.display === "block")){
    document.getElementById("comment-reply"+id).style.display = "block";
  }
  else{
    document.getElementById("comment-reply"+id).style.display = "none";
  }
}

postComment(id,i){
  if(this.AuthenticationService.isLoggedIn()){
  this.blogService.post_comment(id,(<HTMLInputElement>document.getElementById("post-comment"+i)).value,this.user_details.authdata.full_name).subscribe(
   data => {
 this.is_comment_available = false;
 this.is_reply_available= false;
     this.blogService.getCommentsData(this.blogList[i]._id).subscribe(
       bata => {
         this.commentList = bata;
         for(let comment of this.commentList.comments){
           this.blogService.getReplyData(comment._id).subscribe(
             reply => {
               comment.reply = reply;
               this.is_reply_available= true;
             }
           )

         }

         this.blogList[i].comment = this.commentList;
         this.is_comment_available = true;
         (<HTMLInputElement>document.getElementById("post-comment"+i)).value = ""
       },
       (error) => {
         console.log(error);
       }
     );
   }
 )
  }
  else{
    const dialogRef = this.dialogue.open(SigninPopupComponent);
 }
}

kudos(event,post ,x,y){;
  if(this.AuthenticationService.isLoggedIn()){
    let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

      for(this.i=0;this.i<y;this.i = this.i + 1){

        if(current_user_id == x[this.i]&&this.truth){
          event.target.style.color = "grey";
          this.var = y;
          if(y==1){
            document.getElementById(post).textContent =" Like";
          }
          else{
            document.getElementById(post).textContent = (this.var-1) + " Like";
          }

          this.blogService.delete_kudos(post).subscribe(
            data => {
            }
          )
          this.truth =false;
          break;
        }
        else if(current_user_id == x[this.i]&&!this.truth){
          event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById(post).textContent =this.var+ " Like";
          this.blogService.post_likes(post).subscribe(
            data => {
            }
          )
          this.truth=true;

          break;
         }
     }
     if(event.target.style.color == "rgb(0, 171, 243)"&&this.i==y){
      event.target.style.color = "grey";
      this.var = y;
      if(y==0){
        document.getElementById(post).textContent =" Like";
      }
      else{
        document.getElementById(post).textContent = (this.var) + " Like";
      }
      this.blogService.delete_kudos(post).subscribe(
        data => {
        }
      )
     }
    else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
       event.target.style.color = "rgb(0, 171, 243)";
       if(y==0){
        document.getElementById(post).textContent = "1 Like";
       }
       else{
        document.getElementById(post).textContent = (y+1) + " Like"
       }

      this.blogService.post_likes(post).subscribe(
        data => {
        }
      )
    }
     }
     else{
        const dialogRef = this.dialogue.open(SigninPopupComponent);
     }
   }

   commentLike(event,post ,x,y){
    if(this.AuthenticationService.isLoggedIn()){
     for(this.i=0;this.i<y;this.i = this.i + 1){
       if(this.current_user_id == x[this.i]&& this.truth){
         event.target.style.color = "grey";
         this.var = y-1;
         if(y==1){
           document.getElementById("c"+post).textContent ="";
         }
         else{
           document.getElementById("c"+post).textContent = this.var ;
         }

         this.blogService.delete_kudos_c(post).subscribe(
           data => {
           }
         )
         this.truth =false;
         break;
       }
       else if(this.current_user_id == x[this.i]){
         event.target.style.color = "rgb(0, 171, 243)";
         document.getElementById("c"+post).textContent =this.var;
         this.blogService.post_likes_comment(post).subscribe(
          data => {
          }
        )
         this.truth=true;
         break;
        }
    }
    if(event.target.style.color == "rgb(0, 171, 243)"&&this.i==y){
     event.target.style.color = "grey";
     this.var = y;
     if(y==0){
       document.getElementById("c"+post).textContent ="";
     }
     else{
       document.getElementById("c"+post).textContent = (this.var);
     }
     this.blogService.delete_kudos_c(post).subscribe(
       data => {
       }
     )
    }
   else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
      event.target.style.color = "rgb(0, 171, 243)";
      if(y==0){
       document.getElementById("c"+post).textContent = "1";
      }
      else{
       document.getElementById("c"+post).textContent = (y+1)
      }

      this.blogService.post_likes_comment(post).subscribe(
        data => {
        }
      )
   }
    }
    else{
      const dialogRef = this.dialogue.open(SigninPopupComponent);
   }
  }


   bookmark(event,post ,x,y,z){
     if(this.AuthenticationService.isLoggedIn()){
      let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

      for(this.i=0;this.i<y;this.i = this.i + 1){
         if(current_user_id == x[this.i]&&this.bookmarkTruth){
        event.target.style.color = "grey";
        document.getElementById(z).textContent = " Bookmark";
           this.blogService.delete_bookmark(post).subscribe(
             data => {
             }
           )
           this.bookmarkTruth =false;
           break;
         }
         else if(current_user_id == x[this.i]){
           this.bookmarkTruth =true;
           event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById(z).textContent = " Bookmark";

       this.blogService.post_bookmark(current_user_id,post).subscribe(
         data => {
         }
       )
       break;
         }
      }
      if(this.i==y&&event.target.style.color == "rgb(0, 171, 243)"){
        event.target.style.color = "grey";
          document.getElementById(z).textContent = " Bookmark";
          this.blogService.delete_bookmark(post).subscribe(
            data => {
            }
          )
      }
      else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
        event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById(z).textContent = " Bookmark";

       this.blogService.post_bookmark(current_user_id,post).subscribe(
         data => {
         }
       )
     }


    }
    else{
      const dialogRef = this.dialogue.open(SigninPopupComponent);
   }
     }
}
