import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ServerService} from '../server.service';
import {ToasterService} from '../toaster.service';
import {HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() state: any;
  @Output() stateChange = new EventEmitter();
  @Input() pnr: string;
  @Input() lastName: string;
  showWrongDataAlert = false;

  constructor(private server: ServerService) {
  }

  closeWrongDataAlert() {
    this.showWrongDataAlert = false;
  }

  search() {
    // TODO to upper case
    // TODO search on enter
    if (!(this.pnr === '' || this.pnr === undefined || this.lastName === '' || this.lastName === undefined)) {
      this.server.searchBooking(this.pnr, this.lastName).subscribe((res: HttpResponse<string>) => {
          console.log(res);
          this.stateChange.emit(res);
        }
      );
    } else {
      console.log('alert');
      this.showWrongDataAlert = true;
    }


  }

  ngOnInit(): void {

  }

}
