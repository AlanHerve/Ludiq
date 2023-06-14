import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../../services/api-url";
import {PostDTO} from "../models/post-dto";
import {map} from "rxjs/operators";
import {CommentDTO} from "../models/comment-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  newPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${apiUrl}/post.php`, formData);
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

  getImage(image: string): Observable<Blob> {
    const options = {responseType: 'arraybuffer' as 'json'};
    const params = new HttpParams().set('image_name', image);
    return this.http.get<Blob>(`${apiUrl}/images.php`, {params, ...options}).pipe(
      map(response => new Blob([response], {type: 'image/jpeg'}))
    );
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

  addComment(comment: CommentDTO): Observable<any> {
    return this.http.post<any>(`${apiUrl}/comment.php`, comment);
  }

  getAllComments(postID: number): Observable<CommentDTO[]> {
    const params = new HttpParams()
      .set('type', 'all_comments')
      .set('postID', postID)

    return this.http.get<CommentDTO[]>(`${apiUrl}/comment.php`, {params});
  }


}
