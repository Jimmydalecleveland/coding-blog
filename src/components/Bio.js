import React from 'react'

import { rhythm } from '../utils/typography'
import profilePic from '../assets/profile-pic.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt="Jimmy Cleveland"
          style={{
            borderRadius: '50%',
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Jimmy Cleveland</strong>, an everlearning
          Javascript developer and D&amp;D hobbyist.
        </p>
      </div>
    )
  }
}

export default Bio
