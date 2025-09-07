useEffect(() => {
  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      alert('Please login to view your cart.');
      return;
    }

    try {
      const res = await API.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      alert('Failed to load cart.');
    }
  };

  fetchCart();
}, []);

     
