import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'ToDo';
	author = 'LuisEdoPR';
	listTasks = [ 'attend the boot camp', 'do the homework', 'bring candy to Juan', 'participate' ];

	onKeyPressInput() {
		alert('enter');
	}
}
