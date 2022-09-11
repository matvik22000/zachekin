import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServerService} from '../server.service';
import {forEachComment} from 'tslint';
import {ToasterService} from '../toaster.service';
import {Loyalities} from './Loyalities';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() state;
  @Output() stateChange = new EventEmitter();
  partners: any = null;
  loyalties: Array<Loyalities>;

  constructor(private server: ServerService, private toaster: ToasterService) {
  }

  chooseLoyalty(code, passengerId) {
    // this.state.booking.passengers[passengerId].loyalty = code;
    this.loyalties[passengerId] = {code, number: null, disabled: false};
  }

  setLoyalty(passengerId) {
    if (this.loyalties[passengerId].number == null) {
      this.toaster.show('введите номер карты программы лояльности!', {classname: 'bg-danger m-1 text-light p-1'});
      return;
    }
    this.server.setLoyalty(this.state.booking.passengers[passengerId].refNumber, this.loyalties[passengerId].code, this.loyalties[passengerId].number).subscribe(() => {});
    this.loyalties[passengerId].disabled = true;
  }

  choose() {
    for (let i = 0; i < this.loyalties.length; i++) {
      if (this.loyalties[i].number) {
        this.state.booking.passengers[i].loyalty = this.loyalties[i].code;
        this.state.booking.passengers[i].loyaltyNumber = this.loyalties[i].number;
      } else {
        this.loyalties[i].code = null;
      }
      this.loyalties[i].disabled = true;
    }
    this.state.state = 'food';
    this.stateChange.emit(this.state);
  }


  ngOnInit(): void {
    this.loyalties = new Array(this.state.booking.passengers.length);
    // this.loyalties = new Array(this.state.booking.passengers.length);
    for (let i = 0; i < this.loyalties.length; i++) {
      console.log(this.state.booking.passengers[i].loyalty);
      this.loyalties[i] = {code: null, number: null, disabled: false};
      if (this.state.booking.passengers[i].loyalty) {
        this.loyalties[i].code = this.state.booking.passengers[i].loyalty;
        this.loyalties[i].number = this.state.booking.passengers[i].loyaltyNumber;
        this.loyalties[i].disabled = true;
      }
    }
    console.log(this.loyalties);
    this.server.partners().subscribe((res) => {

      this.partners = res;
    });
  }

}
