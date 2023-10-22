import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {

  constructor() { }

  @Input() name: string;
  @Input() question: string;
  
  showQuestion: boolean = false;
  haveBeenShown: boolean = false;

  @Input() lat: any;
  @Input() long: any;

  currentLat: any;
  currentLong: any;

  ngOnInit() {
  }

  click(): void {
    this.findMe();
  }
  
  
findMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.updateBasedOn(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

updateBasedOn(position) {
  this.currentLat = position.coords.latitude;
  this.currentLong = position.coords.longitude;

  console.log("click lat " + this.lat);
  console.log("click long " + this.long);

  console.log("click currentLat " + this.currentLat);
  console.log("click currentLong " + this.currentLong);
  let currentLat = this.currentLat + '';
  let currentLatTransformed = currentLat.split(".")[1].substring(0, 6);
  let currentLong = this.currentLong + '';
  let currentLongTransformed = currentLong.split(".")[1].substring(0, 6);
  console.log("currentLatTransformed " + currentLatTransformed);
  console.log("currentLongTransformed " + currentLongTransformed);

  console.log("Math.abs(currentLatTransformed - this.lat) " + Math.abs(Number(currentLatTransformed) - this.lat))
  console.log("Math.abs(currentLongTransformed - this.long) " + Math.abs(Number(currentLongTransformed) - this.long))

  if(this.haveBeenShown){
    this.toggelShowQuestion();
  }else{
    if(currentLatTransformed != null && currentLatTransformed != undefined && currentLongTransformed != null && currentLongTransformed != undefined){
      if(Math.abs(Number(currentLatTransformed) - this.lat) < 150 && Math.abs(Number(currentLongTransformed) - this.long) < 150)
        this.toggelShowQuestion();
    }
  }
}
toggelShowQuestion(){
  this.showQuestion = !this.showQuestion;
  this.haveBeenShown = true;
}

}
