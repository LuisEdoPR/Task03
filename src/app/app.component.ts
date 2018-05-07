import { element } from 'protractor';
import { Component } from '@angular/core';
import { Item } from './model/item';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'ToDo';
	author = 'LuisEdoPR';
	listTasks: Item[];
	itemId = 1;
	selectAll = true;

	constructor() {
		this.listTasks = new Array<Item>();
		this.listTasks.push(new Item(this.getItemId(), 'attend the boot camp'));
		this.listTasks.push(new Item(this.getItemId(), 'do the homework'));
		this.listTasks.push(new Item(this.getItemId(), 'bring candy to Juan'));
		this.listTasks.push(new Item(this.getItemId(), 'participate'));
	}

	onKeyPressInput($event) {
		if ($event.target.value.trim()) {
			this.listTasks.push(new Item(this.getItemId(), $event.target.value.trim()));
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

	getItemId(): number {
		const currentId = this.itemId;
		this.itemId = this.itemId + 1;
		return currentId;
	}

	clickSelectAll() {
		const listTasksTmp = document.querySelectorAll('[id=checkbox]');
		for (let index = 0; index < listTasksTmp.length; index++) {
			listTasksTmp[index].checked = this.selectAll;
		}
		this.selectAll = !this.selectAll;
	}

	private getItemsLeft() {
		return (
			document.querySelectorAll('[id=checkbox]').length -
			document.querySelectorAll('[id=checkbox]:checked').length
		);
	}
}
