'use client'

import React from 'react'
import Script from 'next/script'

export default function ThumbtackWidget() {
  return (
    <div className="widget" id="tt-review-widget-one">
      <img 
        src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg" 
        alt="Thumbtack" 
        className="tt-logo"
        style={{ height: '18px', marginBottom: '10px' }}
      />
      <div id="tt-dynamic">
        <div className="tt-left">
          <img src="https://cdn.thumbtackstatic.com/fe-assets-web/_assets/images/release/components/avatar/images/legacy-default-avatar-50x50.25cbe35c0002a2eef6cbc5f1c4f271545eafbb59.png" alt="Avatar" />
        </div>
        <div className="tt-right">
          <div className="tt-name">Mansher G.</div>
          <div className="tt-stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <img 
                key={i}
                src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" 
                alt="Star"
              />
            ))}
            <span>6 reviews</span>
            <span>12d ago</span>
          </div>
          <p>This was our first time doing a family shoot, and the folks over at Studio 37 nailed it! They worked with us on short notice, brought lighting and other equipment to help us get the best-quality shots, and made the experience very seamless. I definitely intend to work with them again on future family shoots.</p>
          <a target="_blank" href="https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097" rel="noreferrer">See all reviews</a>
        </div>
        <br/>
      </div>
      <Script 
        src="https://www.thumbtack.com/profile/widgets/scripts/?service_pk=552295631777284097&widget_id=review&type=one" 
        strategy="lazyOnload"
      />
      <style jsx>{`
        .widget {
          font-family: "Mark", "Avenir", "Helvetica", "Arial", sans-serif;
          background-color: #fff;
          border: 1px solid #e2e2e2;
          border-radius: 4px;
          padding: 20px;
          max-width: 100%;
          box-sizing: border-box;
        }
        .tt-left {
          float: left;
          margin-right: 10px;
        }
        .tt-left img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .tt-right {
          overflow: hidden;
        }
        .tt-name {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 4px;
        }
        .tt-stars {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .tt-stars img {
          width: 16px;
          height: 16px;
          margin-right: 2px;
        }
        .tt-stars span {
          color: #676d73;
          font-size: 14px;
          margin-left: 8px;
        }
        .widget p {
          margin: 0 0 10px;
          font-size: 14px;
          line-height: 1.5;
          color: #2f3033;
        }
        .widget a {
          color: #009fd9;
          text-decoration: none;
          font-size: 14px;
          font-weight: bold;
        }
        .widget a:hover {
          text-decoration: underline;
        }
        #tt-dynamic {
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
