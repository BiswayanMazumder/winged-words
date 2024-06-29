import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Components/navbar';
export default function FollowingpageUI() {
    const selectedTab = (tab) => {
        console.log(tab);
      };
    return (
        <>
          <div className="posts">
            <div className="tablist">
              <Link  to="/home" className="following" onClick={() => selectedTab('For you')}>
                For you
                
              </Link>
              <div className="foryou" onClick={() => selectedTab('Following')}>
                Following
                <div className="headingselected"></div>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        </>
      );
}
