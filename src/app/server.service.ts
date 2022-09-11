import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ToasterService} from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private url: string;
  private toaster: ToasterService;

  constructor(private httpClient: HttpClient, toaster: ToasterService) {
    this.url = 'http://192.168.88.223:9090';
    this.toaster = toaster;
  }

  BookingSearchException = (e: HttpResponse<string>) => {
    console.log('error');
    this.toaster.show('бронирование не найдено!', {classname: 'bg-danger m-1 text-light p-1'});
    return throwError(e);
  }


  login() {
    return this.httpClient.post(this.url + '/api/login', null, {withCredentials: true});
  }

  searchBooking(pnr, lname) {
    const params = new FormData();
    params.append('pnr', pnr);
    params.append('lastName', lname);
    return this.httpClient.post(this.url + '/api/searchBooking', params, {withCredentials: true}).pipe(catchError(this.BookingSearchException));
  }

  setSeatPref(seatPref) {
    const params = new FormData();
    params.append('seatPref', seatPref);
    return this.httpClient.post(this.url + '/api/setSeatsPref', params, {withCredentials: true});

  }

  partners() {
    return this.httpClient.get(this.url + '/api/partners', {withCredentials: true});
  }

  setLoyalty(refNumber, loyalty, loyaltyNumber) {
    const params = new FormData();
    params.append('passengerRefNumber', refNumber);
    params.append('loyalty', loyalty);
    params.append('loyaltyNumber', loyaltyNumber);
    return this.httpClient.post(this.url + '/api/setLoyalty', params, {withCredentials: true});
  }

  meal(segmentNumber) {
    const params = new HttpParams().set('segmentNumber', segmentNumber);
    return this.httpClient.get(this.url + '/api/meal', {params, withCredentials: true});
  }

  setMeal(refNumber, code, segmentNumber) {
    const params = new FormData();
    params.append('passengerRefNumber', refNumber);
    params.append('mealCode', code);
    params.append('segmentNumber', segmentNumber);
    return this.httpClient.post(this.url + '/api/setMeal', params, {withCredentials: true});
  }

  finish() {
    return this.httpClient.post(this.url + '/api/saveCheckin', null, {withCredentials: true});
  }

}
