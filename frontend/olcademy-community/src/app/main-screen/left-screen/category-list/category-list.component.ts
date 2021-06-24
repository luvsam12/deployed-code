import { CategoryService } from 'src/app/shared/services/category-list.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { BlogsData } from 'src/app/shared/services/blogs_data.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList: any;
  selected_category_blogs;
  params: any;
  color1: string[] = ['#FFBD33', '#0084C5', '#FF5733', '#A368FD', '#FFF267', '#ABFF85', '#87D9FE', '#FE5E59', '#454544', '#33B0FF', '#C6F91F', '#FECC48', '#02DC61'];

  constructor(private categoryService: CategoryService,
              private BlogsListService: BlogsListService,
              private activate_route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activate_route.queryParams.filter(params =>params.category).subscribe(params => {
      // console.log(params);
      this.params = params.category;
    })
    this.categoryService.getCategoriesData().subscribe(
      data => {
        this.categoryList = data;
        // console.log(data)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // ngAfterViewChecked(){
  //   for(var i=0;i<this.categoryList.length;i++){
  //     document.getElementById(i.toString()).style.borderLeft = "thick solid transparent";
  //   }
  //   if(this.params !== undefined){
  //     for(var i=0;i<this.categoryList.length;i++){
  //       document.getElementById(i.toString()).style.borderLeft = "thick solid transparent";
  //       if(this.params === this.categoryList[i]._id){
  //         var element = document.getElementById(i.toString());
  //         element.style.borderLeft = "thick solid"
  //         element.style.borderColor = this.color1[i];
  //       }
  //     }
  //   }

  // }

  selectedCategory(i,category) {
      // this.BlogsListService.get_selected_category_blogs(category).subscribe(
      //   data => {
      //     this.selected_category_blogs = data;
      //     console.log(data);
      //   }
      // )
      for(var j=0;j<this.categoryList.length;j++){
        document.getElementById(j.toString()).style.borderLeft = "thick solid transparent";
      }

      //selecting category
      var element = document.getElementById(i);
      element.style.borderLeft = "thick solid"
      element.style.borderColor = this.color1[i];

      this.router.navigate(["/blogs"],{ queryParams: {category: category}}); //navigated to selected tab
  }

}
