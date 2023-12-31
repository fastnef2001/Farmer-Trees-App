import { useState, useEffect } from 'react';
import paypalApi from './paypalAPI';
import queryString from 'query-string';
import { Database } from '../../database/database';

export function UseLogic() {
  const { chekIsPayment, isPayment, updateIsPayment } = Database();
  const [isModalPayment, setIsModalPayment] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState<any>(null || '');
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  useEffect(() => {
    chekIsPayment();
  }, [chekIsPayment]);

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken(); // Create token from PayPal API
      const res: any = await paypalApi.createOrder(token); // Create order from PayPal API
      setAccessToken(token);
      setLoading(false);
      if (res?.links) {
        // Get the link from the response
        const findUrl = res.links.find(
          (data: { rel: string }) => data?.rel == 'approve',
        );
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  // Function to handle when URL changes in webview
  const onUrlChange = (webviewState: any) => {
    // Check if URL contains 'cancel'
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    // Check if the URL contains information about payment completion
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      setIsModalSuccess(true);
      const { token } = urlValues.query;
      if (token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async (id: any) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken);
      updateIsPayment();
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return {
    isModalPayment,
    setIsModalPayment,
    onPressPaypal,
    paypalUrl,
    isLoading,
    accessToken,
    onUrlChange,
    isPayment,
    isModalSuccess,
    setIsModalSuccess,
  };
}
