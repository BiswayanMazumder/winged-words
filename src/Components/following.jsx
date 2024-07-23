import React from 'react'
import AccountTweets from './accounttweets'
import Navbar from './navbar'
import Homepagethirdsection from './homepagethirdsection'
import Followerpageui from './followerpageui'
import FollowingpageUI from '../followingpageUI'
import Followingpagedesign from '../followingpagedesign'

export default function Following() {
  return (
    <>
         <div className="homebody">
                <Navbar />
                <Followingpagedesign/>
                <Homepagethirdsection/>
            </div>
    </>
  )
}
