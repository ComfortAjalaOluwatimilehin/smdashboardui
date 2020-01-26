export interface IOrder {
    _id: string
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
    orderproducts: IOrderProduct[]
    customer_fullname: string
}

export interface IOrderProduct {
    product_id: string;
    quantity: number;
    name: string
    product_name: string,
    product_unit_price: number

}

export interface ICreateOrderProduct {
    product_id: string;
    quantity: number;
    name: string
}

export interface ICreateOrder1 {
    full_name: string;
    phone_number: number;
    addresses: string[];
    orderproducts: ICreateOrderProduct[],
    delivery_address: string,
    delivery_date: string
}

export interface ICreateOrder2 {
    orderproducts: ICreateOrderProduct[],
    customer_id: string,
    addresses: string[],
    delivery_address: string,
    delivery_date: string
}