const fs = require("fs")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")

const {
  getDatetime,
  getDayMonth,
  getYear,
  toFullDate,
} = require("./src/filters/date.js")
const { slugifyText } = require("./src/filters/slug.js")

const position = {
  false: "push",
  true: "unshift",
}

const renderPermalink = (slug, opts, state, idx) => {
  const space = () =>
    Object.assign(new state.Token("text", "", 0), { content: " " })

  const linkTokens = [
    Object.assign(new state.Token("link_open", "a", 1), {
      attrs: [
        ["class", opts.permalinkClass],
        ["href", opts.permalinkHref(slug, state)],
      ],
    }),
    Object.assign(new state.Token("html_block", "", 0), {
      content: `<span aria-hidden="true" class="heading-anchor__symbol">#</span>
      <span class="screen-reader-only">Direct link to this section</span>`,
    }),
    new state.Token("link_close", "a", -1),
  ]

  if (opts.permalinkSpace) {
    linkTokens[position[!opts.permalinkBefore]](space())
  }
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/static")
  eleventyConfig.addPassthroughCopy("src/images")

  eleventyConfig.addCollection("last5Posts", (collection) =>
    collection.getFilteredByTag("posts").slice(0, 4).reverse()
  )

  eleventyConfig.addCollection("allPosts", (collection) =>
    collection.getFilteredByTag("posts").reverse()
  )

  eleventyConfig.addWatchTarget("./src/scss/")
  eleventyConfig.addWatchTarget("./src/js/")

  eleventyConfig.addFilter("getDatetime", getDatetime)
  eleventyConfig.addFilter("getDayMonth", getDayMonth)
  eleventyConfig.addFilter("getYear", getYear)
  eleventyConfig.addFilter("slug", slugifyText)
  eleventyConfig.addFilter("toFullDate", toFullDate)

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

  eleventyConfig.addLiquidShortcode(
    "image",
    (url, altText) => `<figure><img src="${url}" alt="${altText}"></figure>`
  )

  eleventyConfig.addPairedLiquidShortcode(
    "tip",
    (content) => `<p class="tip">${content}</p>`
  )

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready(err, bs) {
        const page404 = fs.readFileSync("dist/404.html")

        bs.addMiddleware("*", (req, res) => {
          res.write(page404)
          res.end()
        })
      },
    },
  })

  const markdownOptions = {
    breaks: true,
    html: true,
    linkify: true,
  }

  const markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: "heading-anchor",
    renderPermalink,
    slugify: slugifyText,
  }

  const markdownLib = markdownIt(markdownOptions).use(
    markdownItAnchor,
    markdownItAnchorOptions
  )

  eleventyConfig.setLibrary("md", markdownLib)

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  }
}
