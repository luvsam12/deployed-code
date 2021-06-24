import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteConfirmPopupComponent } from 'src/app/popups/delete-confirm-popup/delete-confirm-popup.component';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { ShareOnFeedPopupComponent } from 'src/app/popups/share-on-feed-popup/share-on-feed-popup.component';
import { SharePopupComponent } from 'src/app/popups/share-popup/share-popup.component';
import { ForumListService } from 'src/app/shared/services/forum-list.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {
  @ViewChild('backdrop') backdrop: ElementRef;
  post;
  shareOptionHidden: boolean = true;
  menuHidden: boolean = true;
  answerPanel: boolean = false;
  nums = [1, 2, 3, 4];

  constructor(private route: Router, 
    private activatedRoute: ActivatedRoute, 
    private forumListService: ForumListService,
    private dialog:MatDialog) { }

  ngOnInit(){
    // console.log(this.activatedRoute.snapshot.params["id"]);
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.post = this.forumListService.get_post(+params['id']);
        if(this.post === undefined) {
          return this.route.navigate(['/forum']);
        }
      }
    )
  }

  deletePost() {
    const dialogRef = this.dialog.open(DeleteConfirmPopupComponent, {
      width: "500px",
      height: "200px",
      data: {postId: this.post.postId}
    });
  }

  editPost() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.route.navigate(['/forum-detail', id, 'edit']);
  }

  goBack() {
    this.route.navigate(['/forum']);
  }

  onShowMenu() {
    if(this.menuHidden) {
      this.backdrop.nativeElement.style.display = "block";
      this.menuHidden = false;
    }else{
      this.backdrop.nativeElement.style.display = "none";
      this.menuHidden = true;
    }
  }

  isHidden() {
    return !this.menuHidden;
  }

  closeSettings() {
    this.menuHidden = true;
    this.backdrop.nativeElement.style.display = "none";
  }

  reportSpam() {
    const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
      width: "500px",
      data: {type: "comment"}
    });
  }

  shareThread() {
    this.shareOptionHidden = !this.shareOptionHidden;
  }

  showShareOptions() {
    return !this.shareOptionHidden;
  }

  isAnswerPanelHidden() {
    return this.answerPanel;
  }
  
  toShowComment() {
    if(!this.answerPanel) {
      this.answerPanel = true;
    }
  }

  openSharePopup() {
    const dialogRef = this.dialog.open(SharePopupComponent, {
      width: "500px",
      height: "300px"
    });
  }
  openShareOnFeedPopup(id) {
    const dialogRef = this.dialog.open(ShareOnFeedPopupComponent, {
      width: "800px",
      height: "600px",
      data: { id: +id }
    })
  }
}
