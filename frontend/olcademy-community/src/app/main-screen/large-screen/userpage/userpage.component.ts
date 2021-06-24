import { AuthenticationService } from './../../../shared/services/authentication.service';
import { AppConfig } from './../../../shared/services/app.config';
import { Component, OnInit, ViewChild,Inject, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { lyl,WithStyles, StyleRenderer, ThemeVariables, ThemeRef } from '@alyle/ui';
import { STYLES as CROPPER_STYLES,LyImageCropper, ImgCropperConfig,ImgCropperEvent,ImgCropperErrorEvent,ImgCropperLoaderConfig } from '@alyle/ui/image-cropper';
import { Platform } from "@angular/cdk/platform";
import {MatDialogModule} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InterestService } from 'src/app/shared/services/interest.service';
import { CategoryService } from 'src/app/shared/services/category-list.service';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';
import { ProfileImagePopupComponent } from 'src/app/popups/profile-image-popup/profile-image-popup.component';
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss'],
})
export class UserpageComponent implements OnInit, AfterViewInit {
  editBio:Boolean=false;
  User
  experience: any;
  education: any;
  fY = 0;
  fX = 5;
  research: any;
  certificate: any;
  social: any;
  skill: any;Categories: any;
  interests: any;
  interestsUser: any[];
  isfollow:Boolean=true;
  isUser=true;
  iseditUser=true;
  isExperience:Boolean=false
  isEducation:Boolean=false
  isResearch:Boolean=false
  isCertificate:Boolean=false
  isSocial:Boolean=false
  isSkill:Boolean=false
  isInterest:Boolean=false
  isDetails:Boolean=false
  isAbout:Boolean=false

;
  user: any;
  profileImageUrl: any;
  constructor(private interestService:InterestService, private CategoryService:CategoryService,public dialog: MatDialog,
    private authentication: AuthenticationService ) { }
  ngOnInit(): void {
    this.interestService.get_user_data().subscribe(
      data=>{
        this.User = data.userData
        this.isDetails =true
        this.isAbout=true
      }
    )
    this.interestService.get_experience().subscribe(
      data=>{
        this.experience = data
        for(let exp of this.experience.data){
          exp.isEdit = false;
        }
        this.isExperience =true
      }
    )
    this.interestService.get_education().subscribe(
      data=>{
        this.education = data
        for(let exp of this.education.data){
          exp.isEdit = false;
        }
        this.isEducation = true
      }
    )
    this.interestService.get_research().subscribe(
      data=>{
        this.research = data
        for(let exp of this.research.data){
          exp.isEdit = false;
        }
        this.isResearch = true
      }
    )
    this.interestService.get_certifications().subscribe(
      data=>{
        this.certificate = data
        for(let exp of this.certificate.data){
          exp.isEdit = false;
        }
        this.isCertificate = true;
      }
    )
    this.interestService.get_social().subscribe(
      data=>{
        this.social = data
        for(let exp of this.social.data){
          exp.isEdit = false;
        }
        this.isSocial = true
      }
    )
    this.interestService.get_skills().subscribe(
      data=>{
        this.skill = data
        this.isSkill=true;
      }
    )
    this.CategoryService.getCategoriesData().subscribe(
      data => {
        this.Categories = data;
      }
      )
    this.interestService.get_interest().subscribe(
      data => {
        this.interests = data

            let array =[]
            for(var x=0;x<this.interests.msg.length;x++){
              for(var y=0;y<this.Categories.length;y++){
                  if(this.interests.msg[x] == this.Categories[y]._id){
                    array.push(this.Categories[y].name);
                  }
              }
            }
            this.interestsUser = array
            this.isInterest =true


      }
    )
    if(this.authentication.isLoggedIn()) {
      this.user = this.authentication.get_user_info();
      this.authentication.getCurrentUserImage(this.user.authdata.user_id).subscribe(data => {
        this.profileImageUrl = data.data.profile_image_path;
      })
    }
  }
  ngAfterViewInit(): void{

  }
  selectedIndex = 0;
  profileCategoryList = [ {name: "About Me", tag: "ABOUT-ME"}, {name: "Experience", tag: "EXPERIENCE"}, {name: "Education", tag: "EDUCATION"}, {name: "Research", tag: "RESEARCH"}, {name: "Certifications", tag: "CERTIFICATE"}, {name: "Social Profiles", tag: "SOCIAL"}, {name: "Skills", tag: "SKILL"}, {name: "Interests", tag: "INTEREST"}, {name:"Following", tag: "FOLLOW"} ];
  // profileCategoryList = ["About Me", "Experience", "Education", "Research", "Certifications", "Social Profiles", "Skills", "Interests", "Following"];
  // tags = ["ABOUT-ME", "EXPERIENCE", "EDUCATION", "RESEARCH", "CERTIFICATE", "SOCIAL", "SKILL", "INTEREST", "FOLLOW"]
  followList = [{name:"Naman",type:"Instructor",no:"20"},{name:"Ankit",type:"Student",no:"15"},{name:"Swati",type:"Instructor",no:"105"},{name:"Prasna",type:"Student",no:"5"},{name:"Ashutosh",type:"Student",no:"15"},{name:"Prasna",type:"Student",no:"5"},{name:"Ashutosh",type:"Student",no:"15"},{name:"Naman",type:"Instructor",no:"20"},{name:"Ankit",type:"Student",no:"15"},{name:"Swati",type:"Instructor",no:"105"},{name:"Naman",type:"Instructor",no:"20"},{name:"Ankit",type:"Student",no:"15"},{name:"Swati",type:"Instructor",no:"105"},{name:"Naman",type:"Instructor",no:"20"},{name:"Ankit",type:"Student",no:"15"}]
  checkbo(event){
  }
  swipe(op){
    this.isfollow = false;
    if(this.fY < 10 && (op == 'plus')){
      this.fY += 5;
      this.fX += 5;
    this.isfollow = true;

    }
    else if(this.fY>0&&op == 'minus'){
      this.fY -= 5;
      this.fX -= 5;
      this.isfollow = true;
    }
    this.isfollow = true;

  }
  setIndex(i) {
    this.selectedIndex = i;
  }

  editInfo(type,i){
    if(type=="exp"){
      if(this.experience.data[i].isEdit){
        this.experience.data[i].isEdit = false;
      }
      else{
      this.experience.data[i].isEdit = true;
      }
    }
    else if(type=="edu"){
      if(this.education.data[i].isEdit){
        this.education.data[i].isEdit = false;
      }
      else{
      this.education.data[i].isEdit = true;
      }
    }
    else if(type=="res"){
      if(this.research.data[i].isEdit){
        this.research.data[i].isEdit = false;
      }
      else{
      this.research.data[i].isEdit = true;
      }
    }
    else if(type=="cer"){
      if(this.certificate.data[i].isEdit){
        this.certificate.data[i].isEdit = false;
      }
      else{
      this.certificate.data[i].isEdit = true;
      }
    }
    else if(type=="soc"){
      if(this.social.data[i].isEdit){
        this.social.data[i].isEdit = false;
      }
      else{
      this.social.data[i].isEdit = true;
      }
    }
  }

  newExperience(com,rol,start,end){
    this.isExperience =false
    this.interestService.post_experience(com,rol,start,end).subscribe(
      data=>{
        this.interestService.get_experience().subscribe(
          dat=>{
            this.experience = dat
            for(let exp of this.experience.data){
              exp.isEdit = false;
            }
            this.isExperience =true
            this.isExperience =true

          }
        )
      }
    )
  }
  NewEducation(com,rol,start,end,grade){
    this.isEducation =false
    this.interestService.post_education(com,rol,start,end,grade).subscribe(
      data=>{
        this.interestService.get_education().subscribe(
          dat=>{
            this.education = dat
            for(let exp of this.education.data){
              exp.isEdit = false;
            }
            this.isEducation =true

          }
        )
      }
    )
  }
  NewResearch(topic,date){
    this.isResearch =false
    this.interestService.post_research(topic,date).subscribe(
      data=>{
        this.interestService.get_research().subscribe(
          dat=>{
            this.research = dat
            for(let exp of this.research.data){
              exp.isEdit = false;
            }
            this.isResearch =true

          }
        )
      }
    )
  }
  NewCertificate(firm,topic,date){
    this.isCertificate =false
    this.interestService.post_certification(firm,topic,date).subscribe(
      data=>{
        this.interestService.get_certifications().subscribe(
          dat=>{
            this.certificate = dat
            for(let exp of this.certificate.data){
              exp.isEdit = false;
            }
            this.isCertificate =true

          }
        )
      }
    )
  }
  NewSocial(firm,topic,date){
    this.isSocial =false
    this.interestService.post_social(firm,topic,date).subscribe(
      data=>{
        this.interestService.get_social().subscribe(
          dat=>{
            this.social = dat
            for(let exp of this.social.data){
              exp.isEdit = false;
            }
            this.isSocial =true

          }
        )
      }
    )
  }
  NewSkill(){
    this.isSkill =false
    this.interestService.post_skills((<HTMLInputElement>document.getElementById("skilled")).value).subscribe(
      data=>{
        this.interestService.get_skills().subscribe(
          dat=>{
            this.skill = dat
            for(let exp of this.skill.data){
              exp.isEdit = false;
            }
            this.isSkill =true

          }
        )
      }
    )
  }
  NewInterest(name){
    let id;
    this.isInterest =false;
    for(var y=0;y<this.Categories.length;y++){
      if((<HTMLInputElement>document.getElementById(name)).value== this.Categories[y].name){
       id= this.Categories[y]._id
      }
    }
    this.interestService.post_interest(id).subscribe(
      bata => {
        this.interestService.get_interest().subscribe(
          data => {
            this.interests = data

                let array =[]
                for(var x=0;x<this.interests.msg.length;x++){
                  for(var y=0;y<this.Categories.length;y++){
                      if(this.interests.msg[x] == this.Categories[y]._id){
                        array.push(this.Categories[y].name);
                      }
                  }
                }
                this.interestsUser = array
                this.isInterest = true;


          }
        )
      }
    )
  }
  deleteData(id,type){
    if(type=="exp"){
      this.isExperience =false
      this.interestService.delete_experience(id).subscribe(
        data=>{
        this.interestService.get_experience().subscribe(
          dat=>{
            this.experience = dat
            for(let exp of this.experience.data){
              exp.isEdit = false;
            }
            this.isExperience =true

          }
        )
        }
      )
    }
    else if(type=="edu"){
      this.isEducation =false
      this.interestService.delete_education(id).subscribe(
        data=>{
        this.interestService.get_education().subscribe(
          dat=>{
            this.education = dat
            for(let exp of this.education.data){
              exp.isEdit = false;
            }
            this.isEducation =true

          }
        )
        }
      )
    }
    else if(type=="res"){
      this.isResearch =false
      this.interestService.delete_research(id).subscribe(
        data=>{
        this.interestService.get_research().subscribe(
          dat=>{
            this.research = dat
            for(let exp of this.research.data){
              exp.isEdit = false;
            }
            this.isResearch =true

          }
        )
        }
      )
    }
    else if(type=="cer"){
      this.isCertificate =false
      this.interestService.delete_certification(id).subscribe(
        data=>{
        this.interestService.get_certifications().subscribe(
          dat=>{
            this.certificate = dat
            for(let exp of this.certificate.data){
              exp.isEdit = false;
            }
            this.isCertificate =true

          }
        )
        }
      )
    }
    else if(type=="soc"){
      this.isSocial =false
      this.interestService.delete_social(id).subscribe(
        data=>{
        this.interestService.get_social().subscribe(
          dat=>{
            this.social = dat
            for(let exp of this.social.data){
              exp.isEdit = false;
            }
            this.isSocial =true

          }
        )
        }
      )
    }
  }
  deleteInterest(name){
    let id;
    this.isInterest =false;
    for(var y=0;y<this.Categories.length;y++){
      if( name == this.Categories[y].name){
       id= this.Categories[y]._id
      }
    }
    this.interestService.delete_interest(id).subscribe(
      bata => {
        this.interestService.get_interest().subscribe(
          data => {
            this.interests = data

                let array =[]
                for(var x=0;x<this.interests.msg.length;x++){
                  for(var y=0;y<this.Categories.length;y++){
                      if(this.interests.msg[x] == this.Categories[y]._id){
                        array.push(this.Categories[y].name);
                      }
                  }
                }
                this.interestsUser = array
                this.isInterest = true;


          }
        )
      }
    )
  }
  deleteSkill(id){
    this.isSkill =false
    this.interestService.delete_skills(id).subscribe(
      data=>{
        this.interestService.get_skills().subscribe(
          dat=>{
            this.skill = dat
            for(let exp of this.skill.data){
              exp.isEdit = false;
            }
            this.isSkill =true

          }
        )
      }
    )
  }
  editUserName(id1,id2){
    this.isDetails = false
    this.interestService.put_user_data((<HTMLInputElement>document.getElementById(id1)).value,(<HTMLInputElement>document.getElementById(id2)).value).subscribe(
      data=>{
        this.interestService.get_user_data().subscribe(
          dat=>{
            this.User = dat.userData;
            this.isDetails = true;
            this.iseditUser = true
          }
        )
      }
    )
  }
  editAbout(address,country,dob,bio){
    this.isAbout = false;
    this.interestService.put_user_data2((<HTMLInputElement>document.getElementById(dob)).value,(<HTMLInputElement>document.getElementById(country)).value,(<HTMLInputElement>document.getElementById(address)).value,(<HTMLInputElement>document.getElementById(bio)).value).subscribe(
      data=>{
        this.interestService.get_user_data().subscribe(
          dat=>{
            this.User = dat.userData;
            this.isAbout = true;
            this.editBio = false
          }
        )
      }
    )
  }
  editExperience(id){
    this.isExperience =false
    this.interestService.put_experience((<HTMLInputElement>document.getElementById(id+"-company")).value,(<HTMLInputElement>document.getElementById(id+"-title")).value,(<HTMLInputElement>document.getElementById(id+"-start")).value,(<HTMLInputElement>document.getElementById(id+"-end")).value).subscribe(
      data=>{
        this.interestService.get_experience().subscribe(
          dat=>{
            this.experience = dat
            for(let exp of this.experience.data){
              exp.isEdit = false;
            }
            this.isExperience =true
            this.isExperience =true

          }
        )
      }
    )
  }
  editEducation(id){
    this.isEducation =false
    this.interestService.put_education((<HTMLInputElement>document.getElementById(id+"-company")).value,(<HTMLInputElement>document.getElementById(id+"-title")).value,(<HTMLInputElement>document.getElementById(id+"-start")).value,(<HTMLInputElement>document.getElementById(id+"-end")).value,(<HTMLInputElement>document.getElementById(id+"-degree")).value).subscribe(
      data=>{
        this.interestService.get_education().subscribe(
          dat=>{
            this.education = dat
            for(let exp of this.education.data){
              exp.isEdit = false;
            }
            this.isEducation =true
          }
        )
      }
    )
  }
  editResearch(id){
    this.isResearch =false
    this.interestService.put_research((<HTMLInputElement>document.getElementById(id+"-company")).value,(<HTMLInputElement>document.getElementById(id+"-title")).value).subscribe(
      data=>{
        this.interestService.get_research().subscribe(
          dat=>{
            this.research = dat
            for(let exp of this.research.data){
              exp.isEdit = false;
            }
            this.isResearch =true
          }
        )
      }
    )
  }
  editCertificate(id){
    this.isCertificate =false
    this.interestService.put_certification((<HTMLInputElement>document.getElementById(id+"-company")).value,(<HTMLInputElement>document.getElementById(id+"-title")).value,(<HTMLInputElement>document.getElementById(id+"-start")).value).subscribe(
      data=>{
        this.interestService.get_certifications().subscribe(
          dat=>{
            this.certificate = dat
            for(let exp of this.certificate.data){
              exp.isEdit = false;
            }
            this.isCertificate =true
          }
        )
      }
    )
  }
  editSocial(id){
    this.isSocial =false
    this.interestService.put_social((<HTMLInputElement>document.getElementById(id+"-company")).value,(<HTMLInputElement>document.getElementById(id+"-title")).value,(<HTMLInputElement>document.getElementById(id+"-start")).value).subscribe(
      data=>{
        this.interestService.get_social().subscribe(
          dat=>{
            this.social = dat
            for(let exp of this.social.data){
              exp.isEdit = false;
            }
            this.isSocial =true
          }
        )
      }
    )
  }

  editbio(){
    if(!this.editBio){
      this.editBio = true;
    }
    else{
    this.editBio = false;
    }
  }
  editUser(){
    if(!this.iseditUser){
      this.iseditUser = true;
    }
    else{
    this.iseditUser = false;
    }
  }
  NewData(a,b,c){

  }

  addData(id){
    if(document.getElementById(id).style.display=='flex'){
      document.getElementById(id).style.display = 'none';
    }
    else{
      document.getElementById(id).style.display = 'flex';
    }
  }
  openProfileImagePopup() {
    this.dialog.open(ProfileImagePopupComponent, {
      data: {imageURL: this.profileImageUrl},
      width: "550px",
      height: "500px"
    })
  }

  go_back(){
    window.history.back()
  }
}
