const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItMark = require("markdown-it-mark");
const markdownItSub = require("markdown-it-sub");
const markdownItSup = require("markdown-it-sup");
const markdownItContainer = require("markdown-it-container");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js"); 
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/lang");
  eleventyConfig.addPassthroughCopy("src/assets/files");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  
  const cacheBusterOptions = {
    outputDirectory: "_site",
    hashParameter: "v"
  };
  eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));

  eleventyConfig.addPlugin(sitemap, {
    lastModifiedProperty: "updated",
    sitemap: {
      hostname: "https://truechristmasproject.schalx.xyz"
    }
  })




  eleventyConfig.addCollection("all", function(collection) {
    return collection.getAll();
  });

  const options = {
    html: true,
    breaks: true,
    linkify: true,
  }

  const markdownLib = markdownIt(options)
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItMark)
    .use(markdownItSub)
    .use(markdownItSup)
    .use(markdownItContainer, "block", {
      render: function(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          return `<div class="block">\n`;
        } else {
          return `</div>\n`;
        }
      }
    });
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",  
      output: "_site", 
      includes: "_includes",
      data: "_data"
    }
  };
};