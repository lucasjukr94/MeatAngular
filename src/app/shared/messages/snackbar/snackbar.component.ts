import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message:string = 'Hello there'

  snackVisibility:string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    const res = this.notificationService.notifier.pipe(
      tap((message:string) => {
        this.message = message
        this.snackVisibility = 'visible'
      }),//substitui o 'do' do 'rxjs'
      switchMap(() => timer(3000))
    )

    res.subscribe(timer => this.snackVisibility = 'hidden')
  }

  toggleSnack(){
    if(this.snackVisibility == 'hidden'){
      this.snackVisibility = 'visible'
    }else{
      this.snackVisibility = 'hidden'
    }
    
  }

}
