import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public difficulty: number = 1;
  public descriptions: Array<string> = [];
  
  constructor(
    private router: Router
  ) { 
    this.descriptions.push("Encuentra los pares de tarjetas con el mismo símbolo.")
    this.descriptions.push("Encuentra las pares de tarjetas con el mismo símbolo. Dispones de un tiempo limitado para completar el juego.")
    this.descriptions.push("Encuentra los pares de tarjetas con el mismo símbolo. Dispones de un tiempo limitado para completar el juego, cada vez que te equivocas se reduce tu tiempo.")
  }

  ngOnInit(): void {
  }

  navigate(){    
    this.router.navigateByUrl(`/game/${this.difficulty}`);
  }

}
