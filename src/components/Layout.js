import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import sword from '../assets/images/sword.svg'

// Import typefaces
import 'typeface-crimson-text'
import 'typeface-fira-mono'
import 'typeface-fira-sans'

import { rhythm, scale } from '../utils/typography'
import Sidebar from './Sidebar'

const queryParamsFjord = /\?source=parallaxfjord/

const Layout = props => {
  const data = useStaticQuery(BACKROUND_IMAGE_QUERY)
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header


  if (location.pathname === rootPath) {
    header = (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <h1
          style={{
            ...scale(1.4),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            flex: '0 0 40px',
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
        <div className="sword-wrapper"
          style={{
            transform: queryParamsFjord.test(location.search) ? 'translate(150px, -270px)' : '',
            animation: queryParamsFjord.test(location.search) ? '0.5s cubic-bezier(.76,.05,.86,.06) 1s 1 normal forwards running swordFlyIn' : '',
          }}
        >
          <img src={sword} alt="swashbuckling sword" style={{ width: '40px', transform: 'rotate(20deg)', flex: '0 0 40px' }} />
        </div>
      </div>
    )
  } else {
    header = (
      <h3
        style={{
          marginTop: 0,
          marginBottom: rhythm(0.6),
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to={'/'}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(40),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Img
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        fluid={data.file.childImageSharp.fluid}
        alt="stone wall background"
      />
      <main
        style={{ flex: 2 }}
      >
        {header}
        {children}
      </main>
      <Sidebar />
    </div>
  )
}

export default Layout
// Photo by daniel james on Unsplash

const BACKROUND_IMAGE_QUERY = graphql`
  query backgroundImageQuery {
    file(relativePath: { eq: "brick-bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
