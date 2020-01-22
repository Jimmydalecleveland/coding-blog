import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    let temp
    for (let i = 0; i < 100000; i++) {
      temp = i
    }

    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
        />
        <h1>Not Found</h1>
        <p>The page in your URL bar just cannot be found, despite our best efforts.</p>
        <h3>temp</h3>
        <img src="https://w.wallhaven.cc/full/83/wallhaven-836q9j.jpg" />
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`