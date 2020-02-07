import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { rhythm } from '../utils/typography'

const Bio = () => {
  const data = useStaticQuery(PROFILE_IMAGE_QUERY)

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(2.5),
      }}
    >
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt="Jimmy Cleveland"
        style={{
          flexShrink: '0',
          borderRadius: '50%',
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: 70,
          height: 70,
        }}
      ></Img>
      <p>
        Written by <strong>Jimmy Cleveland</strong>, an everlearning Javascript
        developer and D&amp;D hobbyist.
      </p>
    </div>
  )
}

export default Bio

const PROFILE_IMAGE_QUERY = graphql`
  query profileImageQuery {
    file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
