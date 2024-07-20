import React from 'react'
import Navbar from './Components/navbar'
import Esportsui from './esportsui'
import Homepagethirdsection from './Components/homepagethirdsection'
import Alanwalkerui from './alanwalkerui'

export default function Alanwalker() {
  return (
    <div className="homebody">
    <Navbar />
    <Alanwalkerui/>
    <Homepagethirdsection/>
</div>
  )
}
