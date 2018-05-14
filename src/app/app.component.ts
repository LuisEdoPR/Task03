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
	title = 'Todo - LuisEdoPR';
	listTasks: Item[];
	optionSelectedAll = true;
	globalStatusSelected = 'ALL';
	itemStatusActive = 'A';
	itemStatusComplete = 'C';

	urlDataIni = 'https://gist.githubusercontent.com/jdjuan/165053e6cb479a840c88e3e94b33e724/raw/4542ef950b2b32fbe2eea0b3df0338ffe67eae12/todo.json';

	constructor(private http: HttpClient) {
		this.listTasks = new Array<Item>();
		this.http.get<any>(this.urlDataIni).subscribe((obj) =>
			obj.forEach((item) => {
				this.listTasks.push(new Item(uuid(), item, this.itemStatusActive));
			})
		);
	}

	onKeyPressInput($event) {
		if ($event.target.value.trim()) {
			this.listTasks.push(
				new Item(uuid(), $event.target.value.trim(), this.itemStatusActive)
			);
			$event.target.value = '';
			this.optionSelectedAll = true;
		}
	}

	onRemoveItem(item: Item) {
		this.listTasks = this.listTasks.filter((obj) => obj.itemId !== item.itemId);
	}

	onChangeSelectedItem($event) {
		this.optionSelectedAll = true;
		if (this.getItemsLeft() === 0) {
			this.optionSelectedAll = false;
		}
	}

	clickOptionSelectedAll() {
		this.listTasks.map(
			(itemTaskList) =>
				(itemTaskList.itemStatus = this.optionSelectedAll
					? this.itemStatusComplete
					: this.itemStatusActive)
		);
		this.optionSelectedAll = !this.optionSelectedAll;
	}

	onMouseLeave($event) {
		$event.target.style.backgroundColor = null;
	}

	onMouseEnter($event) {
		$event.target.style.backgroundColor = 'lightblue';
	}

	onClickClearComplete() {
		this.listTasks = this.listTasks.filter((obj) => obj.itemStatus !== this.itemStatusComplete);
	}

	onClickComplete() {
		this.globalStatusSelected = this.itemStatusComplete;
	}

	onClickActive() {
		this.globalStatusSelected = this.itemStatusActive;
	}

	onClickAll() {
		this.globalStatusSelected = 'ALL';
	}

	showButtonClealAll() {
		return !(
			this.listTasks.filter((task) => task.itemStatus === this.itemStatusComplete).length > 0
		);
	}

	private getItemsLeft() {
		return (
			document.querySelectorAll('[id=checkbox]').length -
			document.querySelectorAll('[id=checkbox]:checked').length
		);
	}
}
