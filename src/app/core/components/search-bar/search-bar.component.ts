import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
  onToggleMenuAnimation() {
    const textarea = document.querySelector('.explorer') as HTMLTextAreaElement;
    const menu = document.querySelector('.menu') as HTMLElement;

    if (textarea.value.trim() !== '') {
      // Ajouter une classe pour activer l'animation d'ouverture du menu
      menu.classList.add('open');
    } else {
      // Supprimer la classe pour désactiver l'animation d'ouverture du menu
      menu.classList.remove('open');
    }

    textarea.addEventListener('input', this.onToggleMenuAnimation);
  }

}
