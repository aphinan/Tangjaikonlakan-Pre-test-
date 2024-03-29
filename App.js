import Navbar from './Navbar';
import Products from './Products';
import {Routes, Route} from "react-router-dom"
import UserCreate from './UserCreate';
import UserUpdate from './UserUpdate';

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/create' element={<UserCreate/>}/>
          <Route path='/update/:id' element={<UserUpdate/>}/>
        </Routes>
    </div>
  );
}

export default App;
