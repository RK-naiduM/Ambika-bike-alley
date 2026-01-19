import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { 
  useGetOrderDetailsQuery, 
  usePayOrderMutation, 
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation // <--- 1. Import the Deliver Hook
} from '../store/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  // --- DATA FETCHING ---
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation(); // <--- 2. Init Deliver Hook
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
  
  const { userInfo } = useSelector((state) => state.auth);
  
  // --- PAYPAL SCRIPT MANAGEMENT ---
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  // --- HANDLERS ---
  
  // 1. PayPal Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        alert('Payment Successful!');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    });
  };

  // 2. PayPal Creation
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { 
            value: Number(order.totalPrice).toFixed(2), 
          },
        },
      ],
    });
  };

  // 3. Mark as Delivered (Admin Only)
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch(); // Refresh the page to show Green Delivered Box
      alert('Order Delivered');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <div>{error?.data?.message || error.error}</div>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            
            {/* SHIPPING INFO */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> {order.user.email}</p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div className='alert alert-success'>Delivered on {order.deliveredAt}</div>
              ) : (
                <div className='alert alert-danger'>Not Delivered</div>
              )}
            </ListGroup.Item>

            {/* PAYMENT INFO */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong> {order.paymentMethod}</p>
              {order.isPaid ? (
                <div className='alert alert-success'>Paid on {order.paidAt}</div>
              ) : (
                <div className='alert alert-danger'>Not Paid</div>
              )}
            </ListGroup.Item>

            {/* ORDER ITEMS */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* ORDER SUMMARY */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Items</Col><Col>${order.itemsPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Shipping</Col><Col>${order.shippingPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Tax</Col><Col>${order.taxPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Total</Col><Col>${order.totalPrice}</Col></Row>
              </ListGroup.Item>
              
              {/* PAYPAL BUTTONS */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <p>Loading Payment...</p>}
                  {isPending ? (
                    <p>Loading PayPal...</p>
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={(err) => alert(err)}
                    />
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED BUTTON (Admin Only) */}
              {loadingDeliver && <ListGroup.Item>Loading...</ListGroup.Item>}
              
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
              {/* END ADMIN BUTTON */}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;