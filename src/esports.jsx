import React from 'react'
import Navbar from './Components/navbar'
import Posts from './Components/posts'
import Homepagethirdsection from './Components/homepagethirdsection'
import Esportsui from './esportsui'

export default function Esports() {
  return (
    <div className="homebody">
                <Navbar />
                <Esportsui/>
                <Homepagethirdsection/>
            </div>
  )
}
