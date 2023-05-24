import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post = new Post('', ''); // Initialisation par défaut avec une instance vide de Post
  @Output() postLiked: EventEmitter<Post> = new EventEmitter<Post>();

  likePost() {
    this.postLiked.emit(this.post);
  }
}
