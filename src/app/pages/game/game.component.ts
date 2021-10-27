import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public flippedCards: Array<number> = [];
  public cards: Array<string> = [];
  public icons: Array<string> = [];
  public nIcons: Array<number> = [];
  public openedCard = ""
  public iOpenedCard = 0
  public blocked = false
  
  constructor() { 
    
    for(let i=0; i<16; i++){
      this.flippedCards.push(0);
      this.cards.push("")
    }

    this.icons = [
      'bxs-sun',
      'bxs-moon',
      'bxs-cloud',
      'bxs-bolt',
      'bxs-hot',
      'bxs-plane',
      'bx-world',
      'bxs-tree',
    ]    

    this.reset()
    this.setCards()

    setTimeout(()=>{
      for(let i=0; i<16; i++){
        this.flippedCards[i] = 1;
      }
  
      this.unflipCards(1700, 1700)
    }, 1000)
  }

  reset(){
    for(let i=0; i<8; i++){      
      this.nIcons.push(0)
    }
  }

  setCards() {    
    for(let i=0; i<16; i++){      
      this.cards[i] = this.getIcon()
    }

  }

  getIcon(): string {
    let i = 0
    do{
      i = this.generateRandomInteger(); 
    }while(this.nIcons[i]>=2)

    this.nIcons[i]++;

    return this.icons[i]
  }

  generateRandomInteger() {
    return Math.floor(Math.random() * 8) ;
  }

  ngOnInit(): void {
  }

  unflipCards(time: number, timeBlocked: number){
    this.blocked = true

    setTimeout(()=>{
      this.openedCard = ""          
      this.blocked = false
    }, timeBlocked)

    setTimeout(()=>{
      for(let i=0; i<16; i++){      
        if(this.flippedCards[i]==1){
          this.flippedCards[i] = 0
        }
      }      
    }, time);
  }

  blockCards(time: number){

  }

  openCard(index: number){
    if(!this.blocked){
      if(this.openedCard==""){
        this.iOpenedCard = index
        this.openedCard = this.cards[index]
        this.flippedCards[index] = 1
      }
      else{
        if(this.openedCard == this.cards[index]){
          this.flippedCards[index] = 2
          this.flippedCards[this.iOpenedCard] = 2
        }
        else{
          this.flippedCards[index] = 1
        }
        this.unflipCards(800, 250)
      }
    }
  }
}
