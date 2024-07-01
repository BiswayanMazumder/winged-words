import React from 'react';
import { Link } from 'react-router-dom';

export default function Posts() {
  const selectedTab = (tab) => {
    console.log(tab);
  };

  return (
    <>
      <div className="posts">
        <div className="logomobile">
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
            </g>
          </svg>
        </div>
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
