import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../../services/api-url";
import {PostDTO} from "../models/post-dto";
import {map} from "rxjs/operators";
import {HobbyDTO} from "../../models/hobby-dto";
import {HobbyPostDTO} from "../../models/hobby-post-dto";
import {PostComment} from "../components/comment/comment";
import {UserService} from "../../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private userService: UserService) {}

  newPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${apiUrl}/post.php`, formData);
  }

  getAllPosts(): Observable<PostDTO[]> {
    const params = new HttpParams()
      .set('type', 'home');
    return this.http.get<PostDTO[]>(`${apiUrl}/post.php`, {params});
  }

  newHobbyPost(hobbyPostDTO: HobbyPostDTO) {
    return this.http.post<HobbyDTO>(`${apiUrl}/hobbies.php`, hobbyPostDTO).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImage(imageName: string): Observable<Blob> {
    const options = { responseType: 'arraybuffer' as 'json' };
    const params = new HttpParams().set('imageName', imageName);
    return this.http.get<Blob>(`${apiUrl}/images.php`, { params, ...options }).pipe(
      map(response => new Blob([response], { type: 'image/jpeg' }))
    );
  }

  likePost(postId: number, userId: number): Observable<any> {
    const options = {'type': 'like', 'id_post': postId, 'id_user': userId}
    return this.http.post<any>(`${apiUrl}/post.php`, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  unlikePost(postId: number, userId: number): Observable<any> {
    const options = {'type': 'unlike', 'id_post': postId, 'id_user': userId}
    return this.http.post<any>(`${apiUrl}/post.php`, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  addComment(comment: PostComment): Observable<any> {
    return this.http.post<any>(`${apiUrl}/comment.php`, comment);
  }


  /*getPost(postId: string): Observable<PostDTO> {
    return this.http.get<PostDTO>(`${apiUrl}/posts/${postId}`);
  }*/


  hasLiked(postId: number): Observable<boolean> {
    const userId = this.userService.getCurrentId();
    const params = new HttpParams()
      .set('type', 'hasLiked')
      .set('id_user', userId)
      .set('id_post', postId);
    return this.http.get<boolean>(`${apiUrl}/post.php`, {params});
  }




}
