export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
};

export enum InventoryMovementType {
	ADD = "ADD",
	SUB = "SUB",
}

export type InventoryMovement = {
	id: string;
	productId: string;
	type: InventoryMovementType;
	quantity: number;
};
