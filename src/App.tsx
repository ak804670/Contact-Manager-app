import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from './pages/Layout';
import Contacts from './pages/Contacts';
import Charts from './pages/Charts';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Maps from './pages/Maps';


  const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div >
      <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/contacts" />} />
              <Route path="/contacts" element={<Layout><Contacts/></Layout>} />
              <Route path="/charts" element={<Layout><Charts/></Layout>} />
              <Route path="/maps" element={<Layout><Maps/></Layout>} />
            </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
