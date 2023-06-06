import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {apiUrl} from "../../services/api-url";
import {PostDTO} from "../models/post-dto";
import {map} from "rxjs/operators";
import {HobbyDTO} from "../../models/hobby-dto";
import {HobbyPostDTO} from "../../models/hobby-post-dto";
import {RequestDTO} from "../../models/request-dto";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

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

  likePost(postId: number): Observable<any> {
    const params = new HttpParams()
      .set('type', "like")
      .set('id_post', postId);
    return this.http.post<any>(`${apiUrl}/post.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  unlikePost(postId: number): Observable<any> {
    const params = new HttpParams()
      .set('function_to_call', "unlike")
      .set('id_post', postId);
    return this.http.post<any>(`${apiUrl}/post.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }
}
