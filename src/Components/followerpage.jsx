import React from 'react'
import AccountTweets from './accounttweets'
import Navbar from './navbar'
import Homepagethirdsection from './homepagethirdsection'
import Followerpageui from './followerpageui'

export default function Followerpage() {
  return (
    <>
         <div className="homebody">
                <Navbar />
                <Followerpageui/>
                <Homepagethirdsection/>
            </div>
    </>
  )
}
