import { SettingsComponent } from './main-screen/large-screen/settings/settings.component';
import { DefaultMyfeedComponent } from './main-screen/middle-screen/myfeed/default-myfeed/default-myfeed.component';
import { UserpageComponent } from './main-screen/large-screen/userpage/userpage.component';
import { ShowBlogComponent } from './main-screen/large-screen/show-blog/show-blog.component';
import { TextEditorComponent } from './main-screen/large-screen/text-editor/text-editor.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { InterestPopupComponent } from './popups/interest-popup/interest-popup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookmarkedComponent } from './main-screen/middle-screen/myfeed/bookmarked/bookmarked.component';
import { MyPostsComponent } from './main-screen/middle-screen/myfeed/my-posts/my-posts.component';
import { InterestsComponent } from './main-screen/middle-screen/myfeed/interests/interests.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentComponent } from './main-screen/middle-screen/assessment/assessment.component';
import { BlogsComponent } from './main-screen/middle-screen/blogs/blogs.component';
import { CoursesComponent } from './main-screen/middle-screen/courses/courses.component';
import { ForumComponent } from './main-screen/middle-screen/forum/forum.component';
import { MyfeedComponent } from './main-screen/middle-screen/myfeed/myfeed.component';
import { MyNetworkComponent } from './main-screen/middle-screen/myfeed/my-network/my-network.component';
import { ForumDetailComponent } from './main-screen/large-screen/show-forum/forum-detail.component';
import { EditForumComponent } from './main-screen/large-screen/edit-forum/edit-forum.component';
import { SignupComponent } from './main-screen/large-screen/signup/signup.component';
import { NotificationComponent } from './main-screen/middle-screen/notification/notification.component';
import { SolvedQuestionsComponent } from './main-screen/middle-screen/assessment/solved-questions/solved-questions.component';
import { MyAttemptsComponent } from './main-screen/middle-screen/assessment/my-attempts/my-attempts.component';
import { UploadQuestionsComponent } from './main-screen/middle-screen/assessment/upload-questions/upload-questions.component';



const routes: Routes = [
  { path: "", component: MainScreenComponent, data:{breadcrumb: 'Courses',large:false}, children: [
      { path: "", component: CoursesComponent, data:{breadcrumb: 'Courses',large:false}},
      { path: "courses", component: CoursesComponent, data:{breadcrumb: 'Courses',large:false} },
      { path: "myfeed", component: MyfeedComponent, data:{breadcrumb: 'My Feed',large:false}, children:[
        { path : "", component: DefaultMyfeedComponent},
        { path : "default-myfeed", component: MyPostsComponent, data:{breadcrumb: 'My Feed',large:false} },
        { path : "myposts", component: MyPostsComponent, data:{breadcrumb: 'My Post',large:false} },
        { path : "mynetwork", component: MyNetworkComponent, data:{breadcrumb: 'My Network',large:false}, children:[
          { path : "", component: MyNetworkComponent, data:{breadcrumb: 'Sugestion',page:"suggestions",large:false} },
          { path : "suggestions", component: MyNetworkComponent, data:{breadcrumb: 'Sugestion',page:"suggestions",large:false} },
          { path : "received_request", component: MyNetworkComponent, data:{breadcrumb: 'Request received',page:"suggestions",large:false} },
          { path : "sent_request", component: MyNetworkComponent, data:{breadcrumb: 'Request sent',page:"suggestions",large:false} },
          { path : "connections", component: MyNetworkComponent, data:{breadcrumb: 'Connection',page:"suggestions",large:false} },
        ]},
        { path : "bookmarked", component: BookmarkedComponent, data:{breadcrumb: 'Bookmarked',large:false} },
        { path : "interest", component : InterestsComponent, data:{breadcrumb: 'Interest',large:false} }
      ]},
      { path: "blogs", component: BlogsComponent, data:{breadcrumb: 'Blogs'} },
      { path: "network", component: MyNetworkComponent, data:{breadcrumb: 'Network',large:false} , children:[
        { path : "", component: MyNetworkComponent, data:{breadcrumb: 'Sugestion',page:"suggestions",large:false} },
        { path : "suggestions", component: MyNetworkComponent, data:{breadcrumb: 'Sugestion',page:"suggestions",large:false} },
        { path : "received_request", component: MyNetworkComponent, data:{breadcrumb: 'Request received',page:"suggestions",large:false} },
        { path : "sent_request", component: MyNetworkComponent, data:{breadcrumb: 'Request sent',page:"suggestions",large:false} },
        { path : "connections", component: MyNetworkComponent, data:{breadcrumb: 'Connection',page:"suggestions",large:false} },
      ]},
      { path: "tests", component: AssessmentComponent, data:{breadcrumb: 'Tests',large:false}, children: [
        {path: "", component: SolvedQuestionsComponent, data:{breadcrumb: 'Tests',large:false}},
        {path: "solved-questions", component: SolvedQuestionsComponent, data:{breadcrumb: 'Solved-Questions'}},
        {path: "upload-questions", component: UploadQuestionsComponent, data:{breadcrumb: 'Upload-Questions'}},
        {path: "my-attempts", component: MyAttemptsComponent, data:{breadcrumb: 'My-Attempts'}}
      ] },
      { path: "forum", component: ForumComponent, data:{breadcrumb: 'Forum',large:false} },
      { path: "notification", component: NotificationComponent, data:{breadcrumb: 'notification',large:false} },

    ]
  },
  { path: "", component: MainScreenComponent, data:{breadcrumb: 'Courses',large:true}, children: [
    { path: "text-editor", component: TextEditorComponent,data:{large:true}},
  ]
},
{ path: "", component: MainScreenComponent, data:{breadcrumb: 'Courses',large:true}, children: [
  { path: "show-blog", component: ShowBlogComponent ,data:{large:true}},

]
},
{ path: "", component: MainScreenComponent, data:{large:true,bread:false}, children: [
  { path: "user-page", component: UserpageComponent ,data:{breadcrumb: 'My Profile'}},
]
},
{ path: "forum-detail", component: MainScreenComponent, data:{breadcrumb: 'Courses',large:true}, children: [
  { path: ":id", component: ForumDetailComponent,data:{large:true}},
  { path: ":id/edit", component: EditForumComponent,data:{large:true} },
]
},
{ path: "settings", component: MainScreenComponent, data:{breadcrumb: 'Courses',large:true}, children: [
    { path: "", component: SettingsComponent,data:{large:true}},
]
},
    { path: "signup", component: SignupComponent, data:{page: 'signup',large:true}},
    { path: "login", component: SignupComponent, data:{page: 'login',large:true}},
    { path: "**", component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
