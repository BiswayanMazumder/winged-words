import React from 'react';
import { Link } from 'react-router-dom';

export default function Posts() {
  const selectedTab = (tab) => {
    console.log(tab);
  };

  return (
    <>
      <div className="posts">
        <div className="tablist">
          <div className="foryou" onClick={() => selectedTab('For you')}>
            For you
            <div className="headingselected"></div>
          </div>
          <Link to="/following" className="following" onClick={() => selectedTab('Following')}>
            Following
          </Link>
        </div>
        <div className="divider"></div>
      </div>
    </>
  );
}
