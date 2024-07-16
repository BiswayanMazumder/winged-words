import React from 'react'
import Navbar from './navbar'
import Homepagethirdsection from './homepagethirdsection'
import Posts from './posts'
import Explorepageui from './explorepageui'

export default function ExploreUI() {
  return (
    <>
    <div className="homebody">
    <Navbar/>
    <Explorepageui/>
    <Homepagethirdsection/>
    </div>
    </>
  )
}
