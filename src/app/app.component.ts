import { element } from 'protractor';
import { Component } from '@angular/core';
import { Item } from './model/item';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'Todo';
	author = 'LuisEdoPR';
	listTasks: Item[];
	selectAll = true;
	statusShow = 'ALL';
	urlDataIni = 'https://gist.githubusercontent.com/jdjuan/165053e6cb479a840c88e3e94b33e724/raw/4542ef950b2b32fbe2eea0b3df0338ffe67eae12/todo.json';

	constructor(private http: HttpClient) {
		this.listTasks = new Array<Item>();
		this.http.get<any>(this.urlDataIni).subscribe((obj) =>
			obj.forEach((item) => {
				this.listTasks.push(new Item(uuid(), item, 'A'));
			})
		);
		// this.listTasks.push(new Item(uuid(), 'attend the boot camp', 'A'));
		// this.listTasks.push(new Item(uuid(), 'do the homework', 'A'));
		// this.listTasks.push(new Item(uuid(), 'bring candy to Juan', 'A'));
		// this.listTasks.push(new Item(uuid(), 'participate', 'A'));
	}

	onKeyPressInput($event) {
		if ($event.target.value.trim()) {
			this.listTasks.push(new Item(uuid(), $event.target.value.trim(), 'A'));
			$event.target.value = '';
			this.selectAll = true;
		}
	}

	onRemoveItem(item: Item) {
		this.listTasks = this.listTasks.filter((obj) => obj.itemId !== item.itemId);
	}

	onChangeSelectedItem($event) {
		this.selectAll = true;
	}

	clickSelectAll() {
		for (let index = 0; index < this.listTasks.length; index++) {
			this.listTasks[index].itemStatus = this.selectAll ? 'C' : 'A';
		}
		this.selectAll = !this.selectAll;
	}

	onMouseLeave($event) {
		$event.target.style.backgroundColor = null;
	}

	onMouseEnter($event) {
		$event.target.style.backgroundColor = 'lightblue';
	}

	onClickClearComplete() {
		this.listTasks = this.listTasks.filter((obj) => obj.itemStatus !== 'C');
	}

	onClickComplete() {
		this.statusShow = 'C';
	}

	onClickActive() {
		this.statusShow = 'A';
	}

	onClickAll() {
		this.statusShow = 'ALL';
	}

	private getItemsLeft() {
		return (
			document.querySelectorAll('[id=checkbox]').length -
			document.querySelectorAll('[id=checkbox]:checked').length
		);
	}
}
