import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-new-post',
  templateUrl: './form-new-post.component.html',
  styleUrls: ['./form-new-post.component.css']
})
export class FormNewPostComponent implements OnInit {
  previousRoute: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer la route parente
    // @ts-ignore
    this.previousRoute = this.route.parent?.snapshot.url.map(segment => segment.path).join('/');

  }

  /**
   * Fonction fermant la Pop-up lors du clic sur la croix
   */
  onClose(): void {
    /*
    Nous récupérons la route actuelle où nous nous trouvons, pour rediriger l'utilisateur sur
    la même route dans laquelle il a ouvert la pop-up
     */
    /*
    On redirige l'utilisateur sur la route d'origine
     */
    if (this.previousRoute) {
      this.router.navigate(['/', this.previousRoute]);
    }
  }


}
