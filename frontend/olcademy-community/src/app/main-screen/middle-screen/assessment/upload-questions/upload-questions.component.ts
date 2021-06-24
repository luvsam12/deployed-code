import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-questions',
  templateUrl: './upload-questions.component.html',
  styleUrls: ['./upload-questions.component.scss']
})
export class UploadQuestionsComponent implements OnInit {

  showMoreFilters: boolean = false;
  moreFilter = ["Categories", "Select", "Level"];

  constructor() { }

  ngOnInit(): void {
  }

  shouldShowMoreFilters() {
    return this.showMoreFilters;
  }

  toggleMoreFilters()
  {
    this.showMoreFilters = !this.showMoreFilters;
  }


  // JS Ts file C drive
  
  //question copy

  //submit

  //multiple
  
}
