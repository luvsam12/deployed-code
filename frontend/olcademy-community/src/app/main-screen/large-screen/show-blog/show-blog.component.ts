import { ConfirmationComponent } from './../../../popups/confirmation/confirmation.component';
import { AppConfig } from 'src/app/shared/services/app.config';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {formatDate } from '@angular/common';
import 'rxjs/add/operator/filter';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.scss']
})
export class ShowBlogComponent implements OnInit {
  isShow:boolean = false;
  blog_data;
  commentList;
  author_profile_path ;
  user_profile_path = "";
  currentDate ;
  author_name ;
  // blog_age: string;
  // blog_id;
  params;
  var:any;
  truth =true;
  i:any;
  login:boolean= this.AuthenticationService.isLoggedIn();
  // blogList: any;
  // author_image_path: Array<string> = [];
  category1 = ['Update Blog','Turn Off Notification','Delete Blog'];
  category2  = ['Follow User','Turn Off Notification','Report'];
  categoryFunction =" reportSpam()";
  // blog_aurthor_image;
  bookmarkTruth = true;
  // user_data: any;
  // user_details: any = this.AuthenticationService.get_user_info();
  current_user_id;
  is_data_available: boolean = false;
  is_comment_available: boolean = false;
  is_reply_available: boolean = false;
  displayComment = 5;

  constructor(private AuthenticationService: AuthenticationService,
              private BlogsListService: BlogsListService,
              private route: ActivatedRoute,
              private dialog:MatDialog,
              private router : Router) { }

              ngOnInit(): void {
                this.route.queryParams.filter(params =>params.id).subscribe(params => {
                  // console.log(params);
                  this.params = params.id;
                })
                this.BlogsListService.get_particular_blog(this.params).subscribe(
                  data => {
                    this.AuthenticationService.getCurrentUserImage(data.user_id).subscribe(
                      data => {
                        this.author_profile_path = data.data.profile_image_path;
                        this.is_data_available = true;
                      }
                    )
                    this.BlogsListService.getCommentsData(data._id).subscribe(
                    bata => {
                      this.commentList = bata;
                      // console.log(bata);
                      for(let comment of this.commentList.comments){
                        this.BlogsListService.getReplyData(comment._id).subscribe(
                          reply => {
                            // console.log(i)
                            comment.reply = reply;
                            this.is_reply_available= true;
                            // console.log(reply);
                          }
                        )

                      }

                      data.comment = this.commentList;
                      // console.log(data.comment.comments);
                      this.is_comment_available = true;
                  // console.log(data.comment+"ccccc");
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                  // console.log(data.comment+"ccccc");


                    // this.AuthenticationService.getCurrentUserImage(this.AuthenticationService.get_user_info().authdata.user_id).subscribe(
                    //   data => {
                    //     this.user_profile_path = AppConfig.PROFILE_IMAGE_PATH + data.profileImg;
                    //     console.log(this.user_profile_path)
                    //   }
                    // )
                    this.blog_data = data
                  },
                  (error) => {
                    console.log(error);
                  }
                )
                if(this.AuthenticationService.isLoggedIn()){
                  this.author_name= this.AuthenticationService.get_user_info().authdata.full_name;
                  this.current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
                }
              }


  Issame(author_id){
    if(this.AuthenticationService.isLoggedIn()){
    if(parseFloat(this.AuthenticationService.get_user_info().authdata.user_id) === parseFloat(author_id)){
      // console.log("same")
      return true
    }
  }
    return false
  }

  go_to_profile(){
    this.router.navigateByUrl("/user-page")
  }

  go_back(){
    window.history.back()
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
                      return current_sec - published_sec + " seconds ago";
                    }
                    else
                    {
                      return current_min - published_min + " minutes ago"
                    }
              }
              else
              {
                 return current_hr - published_hr + " hrs ago"
              }
          }
          else if(current_date - published_date < 7)
          {
            return current_date - published_date + " days ago"
          }
          else if( current_date - published_date < 14)
          {
            return "A week ago"
          }
      }
    }

    return publishedOn[8]+publishedOn[9]+publishedOn[7]+publishedOn[5]+publishedOn[6]+publishedOn[4]+publishedOn[0]+publishedOn[1]+publishedOn[2]+publishedOn[3];
  }



  postComment(id){
    if(this.AuthenticationService.isLoggedIn()){
    this.BlogsListService.post_comment(id,(<HTMLInputElement>document.getElementById("post-comment")).value,this.author_name).subscribe(
     data => {
      //  console.log(data);
   this.is_comment_available = false;
   this.is_reply_available= false;
       this.BlogsListService.getCommentsData(this.blog_data._id).subscribe(
         bata => {
           this.commentList = bata;
          //  console.log(bata);
           // this.BlogsListService.getReplyData(this.commentList.comments[0]._id).subscribe(
           //   reply => {
           //     this.commentList.comments[0].reply = reply;
           //     console.log(reply);
           //   }
           // )
           for(let comment of this.commentList.comments){
             this.BlogsListService.getReplyData(comment._id).subscribe(
               reply => {
                 // console.log(i)
                 comment.reply = reply;
                 this.is_reply_available= true;
                //  console.log(reply);
               }
             )

           }

           this.blog_data.comment = this.commentList;
          //  console.log(this.blog_data.comment.comments);
           this.is_comment_available = true;
           (<HTMLInputElement>document.getElementById("post-comment")).value = "";
           document.getElementById("comment-holder").style.display = "block";
       // console.log(data.comment+"ccccc");
         },
         (error) => {
           console.log(error);
         }
       );
     }
   )
    }
    else{
      const dialogRef = this.dialog.open(SigninPopupComponent);
    }

 }

 postReply(id,post_id){
  if(this.AuthenticationService.isLoggedIn()){

  this.BlogsListService.post_reply(id,(<HTMLInputElement>document.getElementById("post-comment"+id)).value,post_id,this.author_name).subscribe(
   data => {
    //  console.log(data);
     this.BlogsListService.getCommentsData(this.blog_data._id).subscribe(
      bata => {
        this.commentList = bata;
        // console.log(bata);

        for(let comment of this.commentList.comments){
          this.BlogsListService.getReplyData(comment._id).subscribe(
            reply => {
              // console.log(i)
              comment.reply = reply;
              this.is_reply_available= true;
              // console.log(reply);
            }
          )

        }

        this.blog_data.comment = this.commentList;
        // console.log(this.blog_data.comment.comments);
        this.is_comment_available = true;
        document.getElementById("comment-holder").style.display = "block";
        (<HTMLInputElement>document.getElementById("post-comment"+id)).value = "";
    // console.log(data.comment+"ccccc");
      },
      (error) => {
        console.log(error);
      }
    );
   }
 )
}
else{
  const dialogRef = this.dialog.open(SigninPopupComponent);
}
}

increaseComment(number){
  if(number>this.displayComment){
    this.is_comment_available = false;
    this.displayComment = this.displayComment+5;
    this.is_comment_available = true;
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

reportSpam(id,type){
  if(this.AuthenticationService.isLoggedIn()){

  const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
    width: "500px",
    data: {type: type,id:id,report:"blog",commentId:""}
  });
}
else{
  const dialogRef = this.dialog.open(SigninPopupComponent);
}
}

reportComment(id,type,blogId){
  if(this.AuthenticationService.isLoggedIn()){

  const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
    width: "500px",
    data: {type: type,id:blogId,commentId:id,report:"comment"}
  });
}
else{
  const dialogRef = this.dialog.open(SigninPopupComponent);
}
}
reportReply(id,type,blogId){
  if(this.AuthenticationService.isLoggedIn()){

  const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
    width: "500px",
    data: {type: type,id:blogId,commentId:id,report:"reply"}
  });
}
else{
  const dialogRef = this.dialog.open(SigninPopupComponent);
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

  option_function(category,id,type)
  {
    if(category === 'Delete Blog')
    {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: "500px",
        data: {type: "Delete",id:id,confirmation_line:'Are you sure you want to delete the Blog?',first_btn:'Yes',second_btn:'Cancle'}
      });
    }
    else if(category === 'Update Blog')
    {
      this.router.navigate(["/text-editor"],{ queryParams: { id: id}});
    }
    else if(category === 'Report')
    {
      if(this.AuthenticationService.isLoggedIn()){
      const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
        width: "500px",
        data: {type: type,id:id}
      });
    }
    else{
      const dialogRef = this.dialog.open(SigninPopupComponent);
    }

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
    }
    return "fas fa-bookmark";
  }

thumsUp(kudos,x){
  if(this.AuthenticationService.isLoggedIn()){

  // console.log()
    let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
    for(var s=0;s<kudos.length;s++){
      if(current_user_id == kudos[s]){

  // console.log(kudos)
        return "fas fa-thumbs-up selected";
      }
    }
  }
    return "fas fa-thumbs-up";

}

commentLike(event,post ,x,y){
  if(this.AuthenticationService.isLoggedIn()){
   for(this.i=0;this.i<y;this.i = this.i + 1){
     if(this.current_user_id == x[this.i]&& this.truth){
       event.target.style.color = "grey";
       this.var = y-1;
       if(y==1){
         document.getElementById("c"+post).textContent = this.var;
       }
       else{
         document.getElementById("c"+post).textContent = this.var  ;
       }

       this.BlogsListService.delete_kudos_c(post).subscribe(
         data => {
          //  console.log(data);
         }
       )
       this.truth =false;
       break;
     }
     else if(this.current_user_id == x[this.i]){
       // console.log("ssssssssssssssss")
       event.target.style.color = "rgb(0, 171, 243)";
       // this.var = y-1;
       document.getElementById("c"+post).textContent =this.var;
       this.BlogsListService.post_likes_comment(post).subscribe(
        data => {
          // console.log(data);
        }
      )
       this.truth=true;
       break;
      }
  }
  if(event.target.style.color == "rgb(0, 171, 243)"&&this.i==y){
   event.target.style.color = "grey";
   // console.log(",,,,,,,,,,,,,,,,,,,,,"+y);
   this.var = y-1;
   if(y==0){
     document.getElementById("c"+post).textContent =y;
   }
   else{
     document.getElementById("c"+post).textContent = (this.var);
   }
   this.BlogsListService.delete_kudos_c(post).subscribe(
     data => {
      //  console.log(data);
     }
   )
  }
 else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
    event.target.style.color = "rgb(0, 171, 243)";
    if(y==0){
     document.getElementById("c"+post).textContent = "1";
    }
    else{
      // console.log("----------------------------------------------------"+y);
     document.getElementById("c"+post).textContent = (y+1)
    }

    this.BlogsListService.post_likes_comment(post).subscribe(
      data => {
        // console.log(data);
      }
    )
 }
  }
  else{
    const dialogRef = this.dialog.open(SigninPopupComponent);
  }
}


kudos(event,post ,x,y){
  if(this.AuthenticationService.isLoggedIn()){
      for(this.i=0;this.i<y;this.i = this.i + 1){
        if(this.current_user_id == x[this.i]&& this.truth){
          event.target.style.color = "grey";
          this.var = y;
          if(y==1){
            document.getElementById(post).textContent =" Like";
          }
          else{
            document.getElementById(post).textContent = (this.var-1) + " Likes";
          }

          this.BlogsListService.delete_kudos(post).subscribe(
            data => {
              // console.log(data);
            }
          )
          this.truth =false;
          break;
        }
        else if(this.current_user_id == x[this.i]){
          // console.log("ssssssssssssssss")
          event.target.style.color = "rgb(0, 171, 243)";
          // this.var = y-1;
          document.getElementById(post).textContent =this.var+ " Like";
          this.BlogsListService.post_likes(post).subscribe(
            data => {
              // console.log(data);
            }
          )
          this.truth=true;
          break;
         }
     }
     if(event.target.style.color == "rgb(0, 171, 243)"&&this.i==y){
      event.target.style.color = "grey";
      // console.log(",,,,,,,,,,,,,,,,,,,,,"+y);
      this.var = y;
      if(y==0){
        document.getElementById(post).textContent =" Like";
      }
      else{
        document.getElementById(post).textContent = (this.var) + " Likes";
      }
      this.BlogsListService.delete_kudos(post).subscribe(
        data => {
          // console.log(data);
        }
      )
     }
    else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
       event.target.style.color = "rgb(0, 171, 243)";
       if(y==0){
        document.getElementById(post).textContent = "1 Like";
       }
       else{
        //  console.log("----------------------------------------------------"+y);
        document.getElementById(post).textContent = (y+1) + " Like"
       }

      this.BlogsListService.post_likes(post).subscribe(
        data => {
          // console.log(data);
        }
      )
    }
     }
     else{
      const dialogRef = this.dialog.open(SigninPopupComponent);
    }
   }

  commentDisplay(){
    if(!(document.getElementById("comment-holder").style.display === "block")){
      document.getElementById("comment-holder").style.display = "block";
    }
    else{
      document.getElementById("comment-holder").style.display = "none";
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

  bookmark(event,post ,x,y){
    if(this.AuthenticationService.isLoggedIn()){
      let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
      // console.log(current_user_id);
      // console.log(x);

      for(this.i=0;this.i<y;this.i = this.i + 1){
         if(current_user_id == x[this.i]&&this.bookmarkTruth){
        event.target.style.color = "grey";
        document.getElementById("bookmark").textContent = " Bookmark";
           this.BlogsListService.delete_bookmark(post).subscribe(
             data => {
              //  console.log(data);
             }
           )
           this.bookmarkTruth =false;
           break;
         }
         else if(current_user_id == x[this.i]){
           this.bookmarkTruth =true;
           event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById("bookmark").textContent = " Bookmark"; //ed

       this.BlogsListService.post_bookmark(current_user_id,post).subscribe(
         data => {
          //  console.log(data);
         }
       )
       break;
         }
      }
      if(this.i==y&&event.target.style.color == "rgb(0, 171, 243)"){
        event.target.style.color = "grey";
          document.getElementById("bookmark").textContent = " Bookmark";
          this.BlogsListService.delete_bookmark(post).subscribe(
            data => {
              // console.log(data);
            }
          )
      }
      else if(this.i==y && event.target.style.color !== "rgb(0, 171, 243)"){
        event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById("bookmark").textContent = " Bookmark";  //ed

       this.BlogsListService.post_bookmark(current_user_id,post).subscribe(
         data => {
          //  console.log(data);
         }
       )
     }


    }
    else{
      const dialogRef = this.dialog.open(SigninPopupComponent);
    }

  }
}
