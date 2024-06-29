import React, { useState } from 'react';

export default function Posts() {
  const selectedTab = (tab) => {
    console.log(tab);
  }

  return (
    <>
      <div className="posts">
        <div className="tablist">
          <div className="foryou" onClick={() => selectedTab('For you')}>
            For you
            <div className="headingselected"></div>
          </div>
          <div className="following" onClick={() => selectedTab('Following')}>
            Following
            
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </>
  );
}
