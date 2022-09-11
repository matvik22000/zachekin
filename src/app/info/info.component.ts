import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() state;
  @Output() stateChange = new EventEmitter();
  buttons = [];

  // buttons = {NEVERMIND: 'всё равно', WINDOW: 'у окна', AISLE: 'у прохода', IN_A_ROW: 'в ряд'};

  constructor(private server: ServerService) {
  }

  getBtn(value) {
    for (const btn of this.buttons) {
      if (btn.constName === value) {
        return btn;
      }
    }
  }

  choose(value) {
    this.state.state = 'SELECT_LOYALTY_PASSENGER';
    this.state.seatPref = value;
    this.server.setSeatPref(value).subscribe((res) => {
      console.log(res);
    });
    this.stateChange.emit(this.state);
  }

  ngOnInit(): void {
    for (const seatPref of this.state.possibleSeatPref) {
      if (seatPref === 'NEVERMIND') {
        this.buttons.push({text: 'всё равно >>', value: 1, constName: 'NEVERMIND'});
      }
      if (seatPref === 'WINDOW') {
        this.buttons.push({text: 'в ряд у окна', value: 2, constName: 'WINDOW'});
      }
      if (seatPref === 'AISLE') {
        this.buttons.push({text: 'у прохода', value: 3, constName: 'AISLE'});
      }
      if (seatPref === 'IN_A_ROW') {
        this.buttons.push({text: 'в ряд', value: 4, constName: 'IN_A_ROW'});
      }
    }
  }

}
