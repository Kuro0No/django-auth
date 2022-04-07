import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/homePage';
import Login from './pages/Login';

function App() {
  const {user} = useAuth()
  const navigate = useNavigate()
  return (
    <div className="App">
      <Header/>
      
      <Routes>
        <Route element={<Login/>} path='/login'/>
        <Route element={!user ? <Navigate to='/login'/> : <HomePage/>} path='/'/>
      </Routes>
    </div>
  );
}

export default App;
