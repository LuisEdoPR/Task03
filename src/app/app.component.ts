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
		this.listTasks.push(new Item(this.getItemId(), 'attend the boot camp', 'A'));
		this.listTasks.push(new Item(this.getItemId(), 'do the homework', 'A'));
		this.listTasks.push(new Item(this.getItemId(), 'bring candy to Juan', 'A'));
		this.listTasks.push(new Item(this.getItemId(), 'participate', 'A'));
	}

	onKeyPressInput($event) {
		if ($event.target.value.trim()) {
			this.listTasks.push(new Item(this.getItemId(), $event.target.value.trim(), 'A'));
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

	onMouseLeave($event) {
		$event.target.style.backgroundColor = null;
	}

	onMouseEnter($event) {
		$event.target.style.backgroundColor = 'lightblue';
	}

	onClickClearComplete() {
		const listTasksTmp = document.querySelectorAll('[id=itemList]');
		for (let index = 0; index < listTasksTmp.length; index++) {
			if (listTasksTmp[index].firstElementChild.checked) {
				this.listTasks = this.listTasks.filter(
					(obj) => obj.itemId !== parseInt(listTasksTmp[index].firstElementChild.name)
				);
			}
		}
	}

	onClickComplete() {
		const listTasksTmp = document.querySelectorAll('[id=itemList]');
		for (let index = 0; index < listTasksTmp.length; index++) {
			if (listTasksTmp[index].firstElementChild.checked) {
				listTasksTmp[index].style.display = '';
			} else {
				listTasksTmp[index].style.display = 'none';
			}
		}
	}

	onClickActive() {
		const listTasksTmp = document.querySelectorAll('[id=itemList]');
		for (let index = 0; index < listTasksTmp.length; index++) {
			if (listTasksTmp[index].firstElementChild.checked) {
				listTasksTmp[index].style.display = 'none';
			} else {
				listTasksTmp[index].style.display = '';
			}
		}
	}

	onClickAll() {
		const listTasksTmp = document.querySelectorAll('[id=itemList]');
		for (let index = 0; index < listTasksTmp.length; index++) {
			listTasksTmp[index].style.display = '';
		}
	}

	private getItemsLeft() {
		return (
			document.querySelectorAll('[id=checkbox]').length -
			document.querySelectorAll('[id=checkbox]:checked').length
		);
	}
}
