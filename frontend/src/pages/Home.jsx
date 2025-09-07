import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      navigate('/login'); // redirect to login if not logged in
    }
  }, []);

  return (
    <div>
      <h2>Top Products</h2>
      {/* Product listing here */}
    </div>
  );
};

export default Home;
