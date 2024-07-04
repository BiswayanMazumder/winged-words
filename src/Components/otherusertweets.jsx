import React from 'react'
import Otherusertweetsui from '../Otherusertweetsui'
import Navbar from './navbar'
import Homepagethirdsection from './homepagethirdsection'
import Floatingpostbutton from './floatingpostbutton'

export default function Otherusertweets() {
  return (
    <>
        <div className="homebody">
                <Navbar />
                <Otherusertweetsui/>
                <Homepagethirdsection/>
                <Floatingpostbutton/>
            </div>
    </>
  )
}
