import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">Welcome to ECOM-SPA</h1>
        <p className="text-lg">Tailwind CSS is working perfectly!</p>
        <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
