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
import { SpeedInsights } from "@vercel/speed-insights/react"
import ExploreUI from './Components/explore';
import Aivachatscreen from './aivachatscreen';
import Postingpage from './postingpage';
import Esports from './esports';
import Alanwalker from './alanwalker';
import Followerpage from './Components/followerpage';
import Followingpagedesign from './followingpagedesign';
import Following from './Components/following';
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
      <Routes>
        <Route path='/Explore' element={<ExploreUI/>}/>
      </Routes>
      <Routes>
        <Route path='/welcome' element={<Aivachatscreen/>}/>
      </Routes>
      <Routes>
        <Route path='/Post' element={<Postingpage/>}/>
      </Routes>
      <Routes>
        <Route path='/ESports' element={<Esports/>}/>
      </Routes>
      <Routes>
        <Route path='/Sunburn Arena Ft. Alan Walker - Kolkata' element={<Alanwalker/>}/>
      </Routes>
      <Routes>
        <Route path='/followers' element={<Followerpage/>}/>
      </Routes>
      <Routes>
        <Route path='/followinguser' element={<Following/>}/>
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
    
  )
}

export default App;
