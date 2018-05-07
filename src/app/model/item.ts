export class Item {
	itemId: number;
	description: string;
	itemStatus: string;
	constructor(id: number, desc: string, status: string) {
		this.itemId = id;
		this.description = desc;
		this.itemStatus = status;
	}
}
