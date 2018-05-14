import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Item } from './../model/item';

@Component({
	selector: 'app-items',
	templateUrl: './items.component.html',
	styleUrls: [ './items.component.scss' ]
})
export class ItemsComponent implements OnInit {
	@Input() task;
	@Output() removeItem = new EventEmitter<Item>();
	@Output() changeSelectedItem = new EventEmitter();
	@Input() globalStatusSelected;
	itemStatusActive = 'A';
	itemStatusComplete = 'C';
	constructor() {}

	onRemoveItem(item: Item) {
		this.removeItem.emit(item);
	}

	onSelectItem(item: Item, $event) {
		if (item.itemStatus === this.itemStatusActive) {
			item.itemStatus = this.itemStatusComplete;
		} else {
			item.itemStatus = this.itemStatusActive;
		}
		this.changeSelectedItem.emit($event);
	}

	ngOnInit() {}
}
