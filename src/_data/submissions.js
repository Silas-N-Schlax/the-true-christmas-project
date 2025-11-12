
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Path to the submissions directory (edit this)
const submissionsDir = path.join(__dirname, '../content/submissions');


const files = fs.readdirSync(submissionsDir).filter(f => f.endsWith('.md'));

const submissions = files.map(file => {
  const filePath = path.join(submissionsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);

  let publishedDate = parsed.data.published ? new Date(parsed.data.published) : new Date(0);

  return {
    ...parsed.data,
    publishedDate
  };
});

submissions.sort((a, b) => {
  const titleCompare = a.page_title.localeCompare(b.page_title);
  if (titleCompare !== 0) return titleCompare;
  return b.publishedDate - a.publishedDate;
});

console.log(submissions)
module.exports = submissions;
