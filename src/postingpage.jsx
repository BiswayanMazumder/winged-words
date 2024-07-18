import React from 'react'
import Navbar from './Components/navbar'
import Aivachatscreenui from './aivachatscreenui'
import Homepagethirdsection from './Components/homepagethirdsection'
import Postpageui from './postpageui'

export default function Postingpage() {
  return (
    <>
        <div className="homebody">
                <Navbar />
                <Postpageui/>
                <Homepagethirdsection/>
            </div>
    </>
  )
}
