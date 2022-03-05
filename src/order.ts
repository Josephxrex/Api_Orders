export default class order {
  public idOrder: string;

  public clientName: string;

  public pizzaName: string;

  public size: string;

  public ingredients: string[];

  public price?: number;

  public soda?: string;

  public constructor(
    idOrder: string,
    clientName: string,
    pizzaName: string,
    size: string,
    ingredients: string[],
    price?: number,
    soda?: string
  ) {
    this.idOrder = idOrder;
    this.clientName = clientName;
    this.pizzaName = pizzaName;
    this.size = size;
    this.ingredients = ingredients;
    this.price = price;
    this.soda = soda;
  }
}
