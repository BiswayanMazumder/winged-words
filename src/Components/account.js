import React from 'react'
import Navbar from './navbar'
import Homepagethirdsection from './homepagethirdsection'
import Floatingpostbutton from './floatingpostbutton'
import FollowingpageUI from '../followingpageUI'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Posts from './posts'
import AccountTweets from './accounttweets'
export default function Account() {
  return (
    <>
            <div className="homebody">
                <Navbar />
                <AccountTweets/>
                <Homepagethirdsection/>
                <Floatingpostbutton/>
            </div>
        </>
  )
}
