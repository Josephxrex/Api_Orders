import fs from 'fs';
import path from 'path';
import IRepository from './IRepository';
import Order from './order';

export default class OrderReposity implements IRepository<Order> {
  private orders: Order[] = [];

  private static readonly ORDERS_FILE_PATH = path.join(
    __dirname,
    'data/orders.json'
  );

  public constructor() {
    this.load();
  }

  public list(): Order[] {
    return this.orders;
  }

  public get(idOrder: string): Order {
    return <Order>this.orders.find((order) => order.idOrder === idOrder);
  }

  public add(entity: Order): Order {
    this.orders.push(entity);
    this.save();
    return entity;
  }

  public update(entity: Order): Order {
    this.orders = this.orders.reduce((accumulation: Order[], currentOrder) => {
      if (currentOrder.idOrder === entity.idOrder) {
        accumulation.push(entity);
      } else {
        accumulation.push(currentOrder);
      }
      return accumulation;
    }, []);
    this.save();
    return entity;
  }

  public delete(idOrder: string): void {
    this.orders = this.orders.reduce((acommulation: Order[], currentOrder) => {
      if (currentOrder.idOrder !== idOrder) {
        acommulation.push(currentOrder);
      }
      return acommulation;
    }, []);
    this.save();
  }

  private load(): void {
    const peopleJson = fs.readFileSync(OrderReposity.ORDERS_FILE_PATH);
    this.orders = <Order[]>JSON.parse(peopleJson.toString());
  }

  private save(): void {
    const peopleJson = JSON.stringify(this.orders);
    fs.writeFileSync(OrderReposity.ORDERS_FILE_PATH, peopleJson);
  }
}
