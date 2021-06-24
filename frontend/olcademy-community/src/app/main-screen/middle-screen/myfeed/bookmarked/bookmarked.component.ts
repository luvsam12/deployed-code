import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppConfig } from 'src/app/shared/services/app.config';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss']
})
export class BookmarkedComponent implements OnInit {
  blogList;
  author_image_path: Array<string> = [];
  currentDate ;

  constructor(private BlogsListService: BlogsListService,
              private AuthenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.BlogsListService.get_user_bookmarkes().subscribe(
      data => {
        for(var i=0;i<data.length;i++)
        {
          // this.AuthenticationService.getCurrentUserImage(data[i].user_id).subscribe(
          //   data => {
          //     data.profileImg = AppConfig.PROFILE_IMAGE_PATH + data.profileImg;
          //     this.author_image_path.push(data.profileImg);
          //     // console.log(this.author_image_path);
          //   }
          // )
        }
        this.blogList = data;
        console.log(this.blogList);
      },
      (error) => {
        console.log(error);
      }
    );
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
    
    return publishedOn[8]+publishedOn[9]+publishedOn[7]+publishedOn[5]+publishedOn[6]+publishedOn[4]+publishedOn[0]+publishedOn[1]+publishedOn[2]+publishedOn[3];
  }

  go_to_blog(id){
    this.router.navigate(["/show-blog"],{ queryParams: { id: id}}); //navigated to selected tab
  }



}