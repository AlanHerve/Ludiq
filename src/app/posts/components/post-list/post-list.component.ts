import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {PostService} from "../../services/post.service";

// PostListComponent definition
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // Input property to receive list of posts
  @Input() postsDTO: PostDTO[] = [];

  // Constructor to inject post service
  constructor(private postsService: PostService) {
    // Subscribe to the delete state and delete post when event emitted
    this.postsService.currentDeleteState.subscribe({
      next: (id_to_delete) => {
        let index_to_delete: number;
        if((index_to_delete = this.findIndexToDeleteById(id_to_delete))!=-1){
          this.postsDTO.splice(index_to_delete, 1);
        }
      }
    });

    // Subscribe to the add post state and add post when event emitted
    this.postsService.currentneedAddPost.subscribe({
      next: (response) => {
        this.postsDTO.push(response);
      }
    })
  }

  // Lifecycle hook for component initialization
  ngOnInit(): void {
  }

  // Function to find the index of the post to delete
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
