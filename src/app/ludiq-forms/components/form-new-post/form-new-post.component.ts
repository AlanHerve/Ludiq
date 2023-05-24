import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-new-post',
  templateUrl: './form-new-post.component.html',
  styleUrls: ['./form-new-post.component.css']
})
export class FormNewPostComponent implements OnInit {
  previousRoute: string = '';

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    // We assign the previous route of the url
    this.previousRoute = this.getPreviousRoute();
  }

  /**
   * Method that closes the pop-up by clicking on the cross
   */
  onClose(): void {
    // Coming back to the previous section
    if (this.previousRoute) {
      this.router.navigateByUrl(this.previousRoute);
    }
  }

  /**
   * Method that returns the previous route of the current url
   * @private
   */
  private getPreviousRoute(): string {
    const currentUrl = this.location.path();

    return currentUrl.slice(0, currentUrl.lastIndexOf('/'));
  }
}
