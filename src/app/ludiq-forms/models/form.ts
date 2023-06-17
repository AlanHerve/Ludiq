import {Router} from "@angular/router";
import {Location} from "@angular/common";

/**
 * Mother class that implements the methods of closing a form & navigation to its previous route
 */
export class Form {

  protected previousRoute: string = "";

  constructor(public router: Router, public location: Location) {
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
