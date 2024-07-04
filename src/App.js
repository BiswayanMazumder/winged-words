import Home from './Components/Home';
import Account from './Components/account';
import Followingpage from './Components/followingpage';
import Login from './Components/login';
import Loginpage from './Components/loginpage';
import Signup from './Components/signup';
import Aiva from './aiva';
import FollowingpageUI from './followingpageUI';
import './home.css';
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import Otherusertweets from './Components/otherusertweets';
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
      <Routes>
        <Route path='/account' element={<Account/>}/>
      </Routes>
      <Routes>
        <Route path='/AIVA' element={<Aiva/>}/>
      </Routes>
      <Routes>
        <Route path='/other' element={<Otherusertweets/>}/>
      </Routes>
      <Analytics />
    </BrowserRouter>
    
  )
}

export default App;
