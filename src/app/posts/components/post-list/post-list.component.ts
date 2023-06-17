import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() postsDTO: PostDTO[] = [];

  constructor(private postsService: PostService) {
    this.postsService.currentDeleteState.subscribe({
      next: (id_to_delete) => {
        let index_to_delete: number;
        if((index_to_delete = this.findIndexToDeleteById(id_to_delete))!=-1){
          this.postsDTO.splice(index_to_delete, 1);
        }
      }
    });
  }

  ngOnInit(): void {
  }

  findIndexToDeleteById(id_to_delete: number) : number{
    let i = 0;
    while (this.postsDTO[i].id != id_to_delete){
      i++;
      if(i == this.postsDTO.length){
        i = -1;
        break;
      }
    }

    return  i;
  }

}
