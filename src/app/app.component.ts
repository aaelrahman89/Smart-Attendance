import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  showMenu$: Observable<boolean>;
  private defaultShowMenu = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService ) {

      this.showMenu$ = this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data),
        map(data => data.hasOwnProperty('showMenu') ? data.showMenu : this.defaultShowMenu),
      );



  }

  ngOnInit(){

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }






}
