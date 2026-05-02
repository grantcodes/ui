const fs = require('fs')

const html = fs.readFileSync('apps/astro/dist/accordion-html-content/index.html', 'utf8')
const requiredTokens = ['htmlContent', 'data-phase-18', 'Content-only accordion item']

for (const token of requiredTokens) {
  if (!html.includes(token)) {
    throw new Error('Missing serialized accordion token: ' + token)
  }
}
