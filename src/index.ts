import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import OrderReposity from './OrderRepository';
import respond from './respond';
import Order from './order';

const app = express();
app.use(json());
app.use(cors());

app.get('/orders', (req, res) => {
  const orderRepository = new OrderReposity();
  const orders = orderRepository.list();
  respond(res, 200, orders);
});
app.get('/orders/:idOrder', (req, res) => {
  const id = req.params.idOrder;

  const orderRepository = new OrderReposity();

  const order = orderRepository.get(id);
  if (!order) {
    respond(res, 404);
    return;
  }
  respond(res, 200, order);
});
app.post('/orders', (req, res) => {
  const order = new Order(
    req.body.idOrder,
    req.body.clientName,
    req.body.size,
    req.body.pizzaName,
    req.body.ingredients,
    req.body.price,
    req.body.soda
  );
  const orderRepository = new OrderReposity();
  orderRepository.add(order);

  respond(res, 200, order);
});
app.put('/orders', (req, res) => {
  const order = new Order(
    req.body.idOrder,
    req.body.clientName,
    req.body.size,
    req.body.pizzaName,
    req.body.ingredients,
    req.body.price,
    req.body.soda
  );
  const orderRepository = new OrderReposity();
  orderRepository.update(order);
  respond(res, 200, order);
});

app.delete('/orders/:idOrder', (req, res) => {
  const id = req.params.idOrder;

  const orderRepository = new OrderReposity();
  orderRepository.delete(id);

  respond(res, 200);
});
app.listen(3001, () => {
  console.log('App started on port 3001');
});
