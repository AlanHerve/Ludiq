import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../../posts/models/post-dto";
import {PostService} from "../../../../posts/services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, Observable, switchMap, tap} from "rxjs";
import {ActivityDTO} from "../../../../posts/models/activity-dto";

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.css', '../../../pages.css']
})
export class DetailedPostComponent implements OnInit {
  protected postDTO!: PostDTO;
  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    this.postService.currentDeleteState.subscribe({
      next: (response) => {
       this.router.navigateByUrl('/home');
      }
    });
    combineLatest([
      this.findPost()
    ]).subscribe((postResult) => {
      // Vérifiez que les résultats de findActivity et findUser sont disponibles
      if (postResult) {

      }
    });
  }

  // function to find the post by id
  private findPost(): Observable<PostDTO> {
    return this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.postService.findPostById(parseInt(params['id']));
      }),
      tap(response => {
        if (!response) {
          this.router.navigateByUrl('/home');
        }
        this.postDTO = response;
      })
    );
  }

}
