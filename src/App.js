import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar';
import Signin from './signin/signin';
import Signup from './signup/signup';
import Details from './components/details';
import Resume from './components/resume';
import ProtectedRoutes from './protectedroutes/protectedroutes';
import { BallTriangle } from "react-loader-spinner";
import { useSelector } from 'react-redux'; // Import the useSelector hook

function App() {
  // Use the useSelector hook to get the loading state from the Redux store
  const loading = useSelector(state => state.loading.loading);

  return (
    <>
      {loading ? (
        <div className="loading-overlay">
          <BallTriangle color="maroon" height={100} width={100} />
        </div>
      ) : (
        <ToastContainer />
      )}

      <BrowserRouter>
        <Navbar /> {/* Moved Navbar outside Routes for it to always show */}
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Details /></ProtectedRoutes>} index />
          <Route path="/resume" element={<ProtectedRoutes><Resume /></ProtectedRoutes>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
