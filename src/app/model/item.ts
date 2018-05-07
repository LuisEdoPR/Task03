export class Item {
	itemId: string;
	description: string;
	itemStatus: string;
	constructor(id: string, desc: string, status: string) {
		this.itemId = id;
		this.description = desc;
		this.itemStatus = status;
	}
}
