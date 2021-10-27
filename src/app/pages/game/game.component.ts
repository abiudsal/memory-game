import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

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
  public time = 30
  public timer: number = 0;
  public blocked = false
  public gameOver = false;
  public startedGame = false;  
  public showBigButton = true
  public difficulty = 1
  public victory: boolean = false;
  
  constructor(
    private routes: ActivatedRoute
  ) { 

    /* routes.queryParams.subscribe(params => {
      console.log(params)
    }) */
    routes.params.subscribe((p)=>{      
      //const d = p.dif
      this.difficulty = p.dif      
    })

    this.setTimeByDifficulty()

    
    
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
  }

  setTimeByDifficulty() {
    if(this.difficulty == 2){
      this.time = 45
    }
    else if(this.difficulty == 3){
      this.time = 30      
    }
    else{
      this.time = 1000
    }
  }

  onStartGame(){
    this.startGame()
  }

  /* timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } */

  showCardsFirstTime(intervalTime: number){
    const int = interval(intervalTime);
    const subs = int.subscribe( () =>{
      for(let i=0; i<16; i++){
        this.flippedCards[i] = 1;
      }
      this.unflipCards(1500);
      subs.unsubscribe()      
    })
  }

  enableClick(intervalTime: number){
    //this.startedGame = true;
    this.showBigButton = false
    const int = interval(intervalTime);
    const subs = int.subscribe( () =>{
      this.timer = this.time;
      subs.unsubscribe()      
    })
  }

  endGame(intervalTime: number){
    const int = interval(intervalTime);
    const subs = int.subscribe( () =>{
      console.log("que haces aqui")      
      this.unflipCardsOpened()
      this.blocked = true;
      this.gameOver = true
      this.startedGame = false;
      subs.unsubscribe()      
    })
  }

  startGame(){
    const delayAtStart = 100
    const showingCards = 1500
    this.showCardsFirstTime(delayAtStart)
    this.enableClick(delayAtStart + showingCards)

    if(this.difficulty>1){
      setTimeout(()=>{
        this.setTimer()
        this.startedGame = true
        console.log("aaaa")
      },delayAtStart + showingCards)
      

      this.endGame(delayAtStart + showingCards + this.time*1000)
    }
  }

  setTimer() {
    const remainingTime = interval(1000);
    const subscription = remainingTime.subscribe( () =>{
      this.timer --
      if(this.timer==0){
        subscription.unsubscribe()
      }
    })
  }

  restartGame(){
    this.reset()
    this.setCards()
    this.startGame()
    this.gameOver = false
    this.blocked = false
  }

  reset(){
    this.nIcons = []
    for(let i=0; i<8; i++){      
      this.nIcons.push(0)
    }    
  }

  setCards() {    
    for(let i=0; i<16; i++){      
      this.cards[i] = this.getIcon()
    }
  }

  getIndexIcon(i: string): string{
    return this.icons.findIndex((icon)=>icon==i).toString()
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

  unflipCardsOpened(){
    for(let i=0; i<16; i++){      
      if(this.flippedCards[i]==1){
        this.flippedCards[i] = 0
      }
    } 
  }

  unflipCards(time: number){
    this.blocked = true

    const remainingTime = interval(time);
    const subscription = remainingTime.subscribe( () =>{
      this.unflipCardsOpened()       
      this.openedCard = ""          
      this.blocked = false
      subscription.unsubscribe()      
    })
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
        this.unflipCards(800)
      }
      this.victory = this.checkVictory()
    }
  }

  checkVictory(){
    for(let i=0; i<16; i++){      
      if(this.flippedCards[i]!=2){
        return false;
      }
    }    
    return true;
  }

}
