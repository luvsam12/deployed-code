import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { UploadMediaPopupComponent } from 'src/app/popups/upload-media-popup/upload-media-popup.component';
import { ForumListService } from 'src/app/shared/services/forum-list.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  @ViewChild('f', {static: true}) formData: NgForm;
  @ViewChild('topicName', {static: true}) topicName: ElementRef;
  @ViewChild('tagName', {static: true}) tagName: ElementRef;
  tags: string[] = [];
  imageAddress;
  forumsList = [];
  valid: boolean = false;
  menuHidden: boolean = true;
  sortByDropdownHidden: boolean = true;

  constructor(private dialog: MatDialog, 
              private forumService: ForumListService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.forumService.get_forums());
    this.forumsList = this.forumService.get_forums();
  }

  showPost(postId) {
    this.route.navigate(['/forum-detail', +postId]);
  }

  
  addTag() {
    if(this.tagName.nativeElement.value === '') {
      return
    }else{
      const index = this.tags.findIndex(eachTag => eachTag === `#${this.tagName.nativeElement.value}`);
      if(index === -1){
        this.tags.push(`# ${this.tagName.nativeElement.value}`);
        console.log(this.tags);
      }else{
        return;
      }
    }
  }

  onChange() {
    if(this.topicName.nativeElement.value = '') {
      this.topicName.nativeElement.textContent = "Select a topic name";
    }
  }

  onBtnCLick() {
    if(this.formData.valid) {
      this.valid = true;
      return !this.valid;
    }else{
      this.valid = false;
      return !this.valid
    }
  }

  onSubmit() {
    console.log("Form Data", this.formData);
    // this.formData.reset();
  }

  openUploadImage() {
    const dialogRef = this.dialog.open(UploadMediaPopupComponent)
  }

  onShowMenu() {
    if(this.menuHidden) {
      this.menuHidden = false;
    }else{
      this.menuHidden = true;
    }
  }

  isHidden() {
    return !this.menuHidden;
  }

  openReportPopup() {
    const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
      backdropClass: "transparent",
      width: "500px",
      data: {type: "thread"}
    })
  }

  isSortByDropdownHidden() {
    return !this.sortByDropdownHidden;
  }

  showSortByDropdown() {
    this.sortByDropdownHidden = !this.sortByDropdownHidden
  }
}