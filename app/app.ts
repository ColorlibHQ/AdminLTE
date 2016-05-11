import {Component, OnInit} from 'angular2/core';
declare var $: any;

@Component({
    selector: 'app',
    templateUrl: 'app/app.html'
})

export class AppComponent implements OnInit {
    ngOnInit() {
        //Easy access to options
        var o = $.AdminLTE.options;

        //Activate the layout maker
        $.AdminLTE.layout.activate();

        //Enable control sidebar
        if (o.enableControlSidebar) {
            $.AdminLTE.controlSidebar.activate();
        }
    }
}