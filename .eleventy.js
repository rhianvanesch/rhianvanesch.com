const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItGithubHeadings = require("markdown-it-github-headings");

const { getDayMonth, getYear, toFullDate } = require("./src/filters/date.js");

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addCollection("last5Posts", collection =>
    collection
      .getFilteredByTag("posts")
      .slice(0, 4)
      .reverse()
  );

  eleventyConfig.addFilter("getDayMonth", getDayMonth);
  eleventyConfig.addFilter("getYear", getYear);
  eleventyConfig.addFilter("slug", input => {
    if (!input) {
      return false;
    }
    const options = {
      replacement: "-",
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true
    };

    return slugify(input, options);
  });
  eleventyConfig.addFilter("toFullDate", toFullDate);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready(err, bs) {
        const page404 = fs.readFileSync("dist/404.html");

        bs.addMiddleware("*", (req, res) => {
          res.write(page404);
          res.end();
        });
      }
    }
  });

  const markdownOptions = {
    html: true,
    linkify: true
  };

  const githubHeadingsOptions = {
    className: "heading-anchor",
    prefixHeadingIds: false
  };

  const markdownLib = markdownIt(markdownOptions).use(
    markdownItGithubHeadings,
    githubHeadingsOptions
  );

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      input: "src",
      output: "dist"
    },
    passthroughFileCopy: true
  };
};
