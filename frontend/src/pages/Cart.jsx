useEffect(() => {
  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userId;

    if (!userId) {
      alert('Please login to view your cart.');
      return;
    }

    try {
      const res = await API.get(`/cart?userId=${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      alert('Failed to load cart.');
    }
  };

  fetchCart();
}, []);

