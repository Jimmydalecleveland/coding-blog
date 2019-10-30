---
title: 'Arcane Mysteries — Creating your own Contentful UI Entry Extension'
date: '2019-10-29'
description: "A walkthrough for creating a Contentful UI Entry Extension for conditionally loaded fields, using their starter."
---

> Flavor text: Arcane Mysteries is a series where I attempt to dig deeper into the mysteries of the coding cosmere.

Contentful is a headless CMS that has been gaining adoption swiftly, and is a popular pairing for static site generators like Gatsby. Contentful's editing interface works very well out of the box, but there are times you'll need a little more customization for how you or your users input data. Fortunately, they have equipped us to do so through UI Extensions, which allow you to replace the default editing experience for a single Field, an entire Entry, and even the Sidebar.

This is really cool, and very powerful, but I did have some stumbles along the way so I figured I'd share my learnings since it was challenging for me to find current information on the process. I'll be walking through the entire setup of an Entry UI Extension. I'll be using Contentful's helpful [create-contentful-extension](https://github.com/contentful/create-contentful-extension) (a sort of `create-react-app`) which uses React, so you'll likely want a little familiarity with React. I'm also not going to walk through setting up a Contentful account or space, but they've made it extremely easy if you are using Gatsby through the [gatsby-contentful-starter](https://github.com/contentful-userland/gatsby-contentful-starter). Here is a [guide from Contentful](https://www.contentful.com/r/knowledgebase/gatsbyjs-and-contentful-in-five-minutes/) if you haven't set up a site, yet.

Still with me? Then let's get to it.

### Initial Setup
If you want to use a development environment specifically for your UI extension, you'll want to create that first so the CLI can pick it up during installation. Contentful uses "Environments" sort of like git branches. The main difference is that you don't merge an environment back into "master", so any content entries you want to keep should be done on the master branch. Creating an environment while developing a UI Extension or testing new Content Types is a good way to keep your production site from being affected and you can easily delete it like a git branch if things aren't working out.

Start by running this in the directory you want the folder created for the app:
```
npx @contentful/create-contentful-extension contentful-cta`
```
*Note: `npx` is a neat tool for running an npm package without installing it globally. That way you always have the latest version when running it.* 



? Select type of extension:
  Field extension
  Sidebar extension
❯ Entry editor extension
  Page extension
```
