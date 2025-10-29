import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';
import Layout from './components/Layout';

function App() {
  // Debug: Log the API URL being used
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('All env vars:', import.meta.env);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
