export interface IOrder {

    customer_id: object;
    manager_id: object;
    order_date: Date;
    order_status: string;
    date_created: Date;
    delivery_address: string;
    delivery_date: Date;
    manager_note: string;
    valid: boolean;
    completed: boolean;
}

export interface IOrderProduct {
    product_id: string;
    quantity: number;
    name: string

}

export interface ICreateOrder1 {
    full_name: string;
    phone_number: number;
    addresses: string[];
    orderproducts: IOrderProduct[],
    delivery_address: string,
    delivery_date: string
}

export interface ICreateOrder2 {
    orderproducts: IOrderProduct[],
    customer_id: string,
    addresses: string[],
    delivery_address: string,
    delivery_date: string
}