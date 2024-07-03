import React from 'react'
import Navbar from './Components/navbar'
import Homepagethirdsection from './Components/homepagethirdsection'
import AccountTweets from './Components/accounttweets'
import AIVAdetails from './AIVAdetails'

export default function Aiva() {
  return (
    <>
        <div className="homebody">
        <Navbar/>
        <AIVAdetails/>
        <Homepagethirdsection/>
        </div>
    </>
  )
}
