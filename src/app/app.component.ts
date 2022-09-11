import {Component, OnInit, TemplateRef} from '@angular/core';
import {ServerService} from './server.service';
import {ToasterService} from './toaster.service';
// import "@angular/compiler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'zachekin';
  private server: ServerService;
  private toaster: ToasterService;
  public state: any = {state: 'MAIN'};
  public pnr: any;
  public lastName: any;

  constructor(server: ServerService, toaster: ToasterService) {
    this.server = server;
    this.toaster = toaster;

  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  ngOnInit() {
    this.server.login().subscribe((response) => {
      console.log(response);
      this.state = response;
      try {
        this.pnr = this.state.booking.pnr;
        this.lastName = this.state.lastName;
      } catch (ignored) {
      }

    });
  }
}
