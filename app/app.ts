import {Component, OnInit} from 'angular2/core';
declare var jQuery: any;

@Component({
    selector: 'app',
    templateUrl: 'app/app.html'
})

export class AppComponent implements OnInit {
    ngOnInit() {
        jQuery.AdminLTE.layout.activate();
    }
}