import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ServerService} from '../server.service';
import {createViewChild} from '@angular/compiler/src/core';

// import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})

export class FinalComponent implements OnInit {
  @Input state;
  readonly VAPID_PUBLIC_KEY = 'BEFPGPQb7sP4fmLU9F8rfSt95u4Uwjref-qd5bhT33RueIjEXdUtgYEXMIHswE0NRGtobofiGSpdkwaaPMu6Uo0';
  emails: Array<string> = [];

  // test(swPush: SwPush) {
  //   if (swPush.isEnabled) {
  //     swPush
  //       .requestSubscription({
  //         serverPublicKey: this.VAPID_PUBLIC_KEY,
  //       })
  //       .then(subscription => {
  //         console.log(subscription);
  //       })
  //       .catch(console.error);
  //   }
  // }
// , private swPush: SwPush
  constructor(private server: ServerService) {
    // this.test(swPush);
  }

  choseEmail(email){
    document.getElementById('email_input').value = email

  }

  keyPressed(event) {
    if (event.key === 'Enter') {

    }
  }

  ngOnInit(): void {
    this.server.finish().subscribe();
    document.getElementById('final').scrollIntoView({behavior: 'smooth'});
    for (let i = 0; i < this.state.booking.passengers.length; i++) {
      if (this.state.booking.passengers[i].email !== "") {
        this.emails.push(this.state.booking.passengers[i].email);
        // this.emails.push('test');
      }
    }
    console.log(this.emails);

  }

}
