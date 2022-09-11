import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {ServerService} from './server.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { OptionsComponent } from './options/options.component';
import { FoodComponent } from './food/food.component';
import { FinalComponent } from './final/final.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent,
    OptionsComponent,
    FoodComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
