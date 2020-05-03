import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

const categories = [
  'Arcane Mysteries',
  'Trinkets and Baubles',
  'Random Encounter',
  "Dungeoneer's Pack",
  'Coding Cantrips',
]

const Sidebar = () => {
  const data = useStaticQuery(CATEGORY_QUERY)
  const posts = data.allMarkdownRemark.edges

  return (
    <aside className="sidebar" style={{ paddingLeft: rhythm(2.5) }}>
      <h3>Posts by Category</h3>
      <p className="sidebar-description">
        The category for each post is themed in the spirit of rpg &amp; tabletop
        gaming. Just a bit of flavor for fun.
      </p>
      {categories.map(category => (
        <section key={category}>
          <h3 className="sidebar-category">{category}</h3>
          {posts.map(({ node }) => {
            if (node.frontmatter.category === category) {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <Link
                  key={title}
                  className="sidebar-link"
                  to={node.fields.slug}
                >
                  {title}
                </Link>
              )
            }
          })}
        </section>
      ))}
    </aside>
  )
}

export default Sidebar

export const CATEGORY_QUERY = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            category
          }
        }
      }
    }
  }
`
