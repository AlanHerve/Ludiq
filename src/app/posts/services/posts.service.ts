import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { apiUrl } from "../../services/api-url";
import { PostDTO } from "../models/post-dto";
import { map } from "rxjs/operators";
import { HobbyDTO } from "../../models/hobby-dto";
import { HobbyPostDTO } from "../../models/hobby-post-dto";
import { RequestDTO } from "../../models/request-dto";

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
    const params = new HttpParams().set('postId', postId.toString());
    return this.http.put<any>(`${apiUrl}/posts/like`, {}, { params });
  }

  unlikePost(postId: number): Observable<any> {
    const params = new HttpParams().set('postId', postId.toString());
    return this.http.delete<any>(`${apiUrl}/posts/unlike`, { params });
  }

  addComment(postId: number, comment: string): Observable<any> {
    const body = { postId: postId, comment: comment };
    return this.http.post<any>(`${apiUrl}/comments`, body);
  }

}
