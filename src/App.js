import Home from './Components/Home';
import Followingpage from './Components/followingpage';
import Login from './Components/login';
import Loginpage from './Components/loginpage';
import Signup from './Components/signup';
import FollowingpageUI from './followingpageUI';
import './home.css';
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    // https://www.adobe.com/express/learn/blog/media_19a6320255f0ee0bf15d2e9937607b9fa757a20cc.jpeg?width=1200&format=pjpg&optimize=medium
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
      </Routes>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Routes>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      <Routes>
        <Route path='/following' element={<Followingpage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
