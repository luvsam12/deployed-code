import { filter } from 'rxjs/operators';
import { UploadsService } from 'src/app/shared/services/uploads.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormBuilder } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-upload-media-popup',
  templateUrl: './upload-media-popup.component.html',
  styleUrls: ['./upload-media-popup.component.scss']
})
export class UploadMediaPopupComponent implements OnInit {
  
  // all the variables are initialized here.
  files: File[] = [];
  images_adderss_container: Array<Text>;
  drop_event;
  address;
  media;
  media_list = [];
  uploading:boolean = false;

  constructor(private formBuilder: FormBuilder,
              private UploadsService: UploadsService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
             ) {  }

             // all the functions are defined here.
  getFiles()
  {
    return this.files;
  }

  onSelect(event) 
  {
    this.drop_event = event;
    this.files.push(...event.addedFiles);

    console.log(this.files);
  }

  onRemove(event) 
  {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
  }

  save_data() {
    this.uploading = true
    console.log(this.data)
    let formData = new FormData();
    if(this.data.name === 'images')
    {
      for(let item of this.files) 
      {
        formData.append('media', item);
      }
      this.UploadsService.image_upload(formData).subscribe(
        data => 
        {
          this.media = data;
          this.media_list = data[0]
          console.log(this.media);
          this.files = [];
        }
      )
    }

    else if(this.data.name === 'videos')
    {
      for(let item of this.files) 
      {
        formData.append('media', item);
      }
      this.UploadsService.video_upload(formData).subscribe(
        data => 
        {
          this.media = data;
          this.media_list = data[0]
          console.log(this.media);
          this.files = [];
        }
      )
    }

    else if(this.data.name === 'documents')
    {
      for(let item of this.files) 
      {
        formData.append('media', item);
      }
      this.UploadsService.document_upload(formData).subscribe(
        data => 
        {
          this.media = data;
          this.media_list = data[0]
          console.log(this.media);
          this.files = [];
        }
      )
    }
     
  }

  ngOnInit(): void { }
  
  
}
