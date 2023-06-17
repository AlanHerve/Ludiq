import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {apiUrl} from "../../services/urls";
import {PostDTO} from "../models/post-dto";
import {map} from "rxjs/operators";
import {CommentDTO} from "../models/comment-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private needDelete = new Subject<number>();
  currentDeleteState = this.needDelete.asObservable();

  private needDeleteComment = new Subject<number>();
  currentDeleteStateComment = this.needDeleteComment.asObservable();

  private needAddComment = new Subject<CommentDTO>();
  currentneedAddComment = this.needAddComment.asObservable();

  constructor(private http: HttpClient) {
  }

  newPost(formData: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${apiUrl}/post.php`, formData);
  }

  getAllPosts(): Observable<PostDTO[]> {
    const params = new HttpParams()
      .set('type', 'home');
    return this.http.get<PostDTO[]>(`${apiUrl}/post.php`, {params});
  }

  getHobbyPosts(id_hobby: number): Observable<PostDTO[]> {
    const params = new HttpParams()
      .set('type', 'hobby')
      .set('id_hobby', id_hobby);
    return this.http.get<PostDTO[]>(`${apiUrl}/post.php`, {params});
  }

  likePost(postId: number): Observable<any> {
    const options = {'type': 'like', 'id_post': postId}
    return this.http.post<any>(`${apiUrl}/post.php`, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  unlikePost(postId: number): Observable<any> {
    const options = {'type': 'unlike', 'id_post': postId}
    return this.http.post<any>(`${apiUrl}/post.php`, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  addComment(comment: CommentDTO): Observable<string> {
    const params = {
      type: "addComment",
      comment: comment
    }
    return this.http.post<string>(`${apiUrl}/comment.php`, params).pipe(
      map((response) => {
        this.needAddComment.next(comment);
        return response;
      })
    );
  }

  getAllComments(postID: number): Observable<CommentDTO[]> {
    const params = new HttpParams()
      .set('type', 'all_comments')
      .set('postID', postID);
    return this.http.get<CommentDTO[]>(`${apiUrl}/comment.php`, {params});
  }

  deleteComment(comment_id:number): Observable<number> {
    const params =  {
      type: 'deleteComment',
      id_comment: comment_id
    };

    return this.http.post<any>(`${apiUrl}/comment.php`, params).pipe(
      map(response => {
        if(response == "success")
        this.needDeleteComment.next(comment_id);
        return comment_id;
        }
      )
    );
  }

  getThreeComments(postID: number): Observable<CommentDTO[]> {
    const params = new HttpParams()
      .set('type', 'three_comments')
      .set('postID', postID)
    return this.http.get<CommentDTO[]>(`${apiUrl}/comment.php`, {params});
  }

  findPostById(postID: number): Observable<PostDTO> {
    const params = new HttpParams()
      .set('type', 'find_post')
      .set('postID', postID)
    return this.http.get<PostDTO>(`${apiUrl}/post.php`, {params});
  }

  deletePost(postId: number): Observable<string> {
    const params =  {
      type: 'deletePost',
      id_post: postId
    };

    return this.http.post<string>(`${apiUrl}/post.php`, params).pipe(
      map(response => {
        console.log("attempted");
        this.needDelete.next(postId);
        return response;
      })
    );
  }
}
