import React from 'react'
import Navbar from './Components/navbar'
import Posts from './Components/posts'
import Homepagethirdsection from './Components/homepagethirdsection'
import Otherusertweetsui from './Otherusertweetsui'
import Floatingpostbutton from './Components/floatingpostbutton'
import Aivachatscreenui from './aivachatscreenui'

export default function Aivachatscreen() {
  return (
    <>
         <div className="homebody">
                <Navbar />
                <Aivachatscreenui/>
                <Homepagethirdsection/>
            </div>
    </>
  )
}
