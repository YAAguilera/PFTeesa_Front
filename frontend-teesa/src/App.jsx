//React Router Dom:
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
//Components
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Landing from './views/Landing/Landing';
import Detail from './Components/Detail/Detail';
import Login from './Components/Login/Login';
import Services from './views/Services/Services';
import Contact from './Components/Contact/Contact';
import About from './views/About/About';
import Register from './views/Register/Register';
import Pagination from './Components/Pagination/Pagination';
import HomePrueba from './Components/Prueba/HomePrueba';
import Error404 from './views/Error404/Error404';

function App() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isRegister=location.pathname === '/signup'
  const isError404 = location.pathname === '/error404';

  return (
    
    <div>
      {!isLanding && !isRegister && <Navbar />}
      {!isLanding && !isError404 && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='home' element={<Home />} />
        <Route path='home/:id' element={<Detail />} />
        <Route path='login' element={<Login />} />
        <Route path='services' element={<Services />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='/signup' element={<Register />} />
        <Route path='pagination' element={<Pagination />} />
        <Route path='homeprueba' element={<HomePrueba />} />
        <Route path='error404' element={<Error404 />} />

        <Route path='*' element={<Navigate to='error404' />} />
      </Routes>
    </div>
  );
}

export default App;
