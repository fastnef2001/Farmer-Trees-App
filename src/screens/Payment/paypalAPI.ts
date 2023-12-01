let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId =
  'AcZShnSu5qkcp40PU7VBYph4K32HHGcJ5i2LwdoUvN2HEO1oV1e0jRlDv8RVicEugJ3Tt2SE7SO7kcj7';
let secretKey =
  'EAMnXVPaXsMZNdyiPpmGZ_CYkMdH1cMKRkHnHg1ZTZv5En83LQ_PTLDNnnpvXRPEUZo1i2XRSJw7KZIX';
// Define order details to create in PayPal
let orderDetail = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      items: [
        {
          name: 'Chat with AI',
          description: 'Open chat with AI',
          quantity: '1',
          unit_amount: {
            currency_code: 'USD',
            value: '100.00',
          },
        },
      ],
      amount: {
        currency_code: 'USD',
        value: '100.00',
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: '100.00',
          },
        },
      },
    },
  ],
  application_context: {
    return_url: 'https://example.com/return', // URL to redirect to after payment success
    cancel_url: 'https://example.com/cancel', // URL to redirect to after payment failure
  },
};
// Function to create authentication token from PayPal API
const generateToken = () => {
  // Create headers containing authentication information to send requests
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append(
    'Authorization',
    `Basic ${base64.encode(`${clientId}:${secretKey}`)}`,
  );
  // Create a POST request to the PayPal API to get the authentication token
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };
  // Returns a Promise with the result from sending the request to get the token
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/v1/oauth2/token`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('result print', result);
        const { access_token } = JSON.parse(result);
        resolve(access_token); // Return the token
      })
      .catch(error => {
        console.log('error raised', error);
        reject(error);
      });
  });
};

const createOrder = (token: any = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/v2/checkout/orders`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('result print', result);
        const res = JSON.parse(result);
        resolve(res); // Return the order details
      })
      .catch(error => {
        console.log('error raised', error);
        reject(error);
      });
  });
};
// Function to confirm payment for a specific order based on the order id
const capturePayment = (id: any, token = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/v2/checkout/orders/${id}/capture`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('result print', result);
        const res = JSON.parse(result);
        resolve(res); // Returns details about the payment confirmation as received from the PayPal API
      })
      .catch(error => {
        console.log('error raised', error);
        reject(error);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
