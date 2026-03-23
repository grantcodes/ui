import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgPath = path.resolve(__dirname, '..', 'package.json')
const pkgRoot = path.dirname(pkgPath)
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const exports = pkg.exports

// All 34 component CSS files expected
const expectedComponentCss = [
  'accordion/accordion.styles.css',
  'app-bar/app-bar.styles.css',
  'avatar/avatar.styles.css',
  'badge/badge.styles.css',
  'breadcrumb/breadcrumb.styles.css',
  'button/button.styles.css',
  'button-group/button-group.styles.css',
  'card/card.styles.css',
  'code-preview/code-preview.styles.css',
  'container/container.styles.css',
  'cta/cta.styles.css',
  'dialog/dialog.styles.css',
  'dropdown/dropdown.styles.css',
  'dropzone/dropzone.styles.css',
  'feature-list/feature-list.styles.css',
  'footer/footer.styles.css',
  'footer/footer-column.styles.css',
  'form-field/form-field.styles.css',
  'gallery/gallery.styles.css',
  'hero/hero.styles.css',
  'icon/icon.styles.css',
  'loading/loading.styles.css',
  'logo-cloud/logo-cloud.styles.css',
  'media-text/media-text.styles.css',
  'newsletter/newsletter.styles.css',
  'notice/notice.styles.css',
  'pagination/pagination.styles.css',
  'pricing/pricing.styles.css',
  'sidebar/sidebar.styles.css',
  'stats/stats.styles.css',
  'tabs/tabs.styles.css',
  'testimonials/testimonials.styles.css',
  'toast/toast.styles.css',
  'tooltip/tooltip.styles.css',
]

describe('package.json exports', () => {
  describe('component CSS exports', () => {
    for (const cssFile of expectedComponentCss) {
      it(`has export for ./components/${cssFile}`, () => {
        const exportKey = `./components/${cssFile}`
        assert.ok(
          exports[exportKey] !== undefined,
          `Missing export for ${exportKey}`,
        )
      })

      it(`./components/${cssFile} points to an existing file`, () => {
        const exportKey = `./components/${cssFile}`
        const exportValue = exports[exportKey]
        // Handle both string and object export values
        const filePath =
          typeof exportValue === 'string' ? exportValue : exportValue?.import
        assert.ok(filePath, `No file path found for ${exportKey}`)
        const fullPath = path.resolve(pkgRoot, filePath)
        assert.ok(
          fs.existsSync(fullPath),
          `File does not exist: ${fullPath}`,
        )
      })
    }

    it('has all 34 component CSS exports', () => {
      const cssCmpExports = Object.keys(exports).filter(
        (k) => k.startsWith('./components/') && k.endsWith('.styles.css'),
      )
      assert.strictEqual(
        cssCmpExports.length,
        34,
        `Expected 34 component CSS exports, found ${cssCmpExports.length}: ${cssCmpExports.join(', ')}`,
      )
    })
  })

  describe('focus-ring shared styles export', () => {
    it('has export for ./styles/focus-ring.css', () => {
      assert.ok(
        exports['./styles/focus-ring.css'] !== undefined,
        'Missing export for ./styles/focus-ring.css',
      )
    })

    it('./styles/focus-ring.css points to an existing file', () => {
      const exportValue = exports['./styles/focus-ring.css']
      const filePath =
        typeof exportValue === 'string' ? exportValue : exportValue?.import
      assert.ok(filePath, 'No file path found for ./styles/focus-ring.css')
      const fullPath = path.resolve(pkgRoot, filePath)
      assert.ok(
        fs.existsSync(fullPath),
        `File does not exist: ${fullPath}`,
      )
    })
  })

  describe('existing exports preserved', () => {
    it('has root export (.)', () => {
      assert.ok(exports['.'], 'Missing root export')
      assert.ok(exports['.'].import, 'Missing root import')
    })

    it('has ./icons export', () => {
      assert.ok(exports['./icons'], 'Missing ./icons export')
    })

    it('has ./styles/base.css export', () => {
      assert.ok(exports['./styles/base.css'], 'Missing ./styles/base.css export')
    })

    it('has ./styles/themes/* export', () => {
      assert.ok(exports['./styles/themes/*'], 'Missing ./styles/themes/* export')
    })

    it('has ./components/* wildcard export', () => {
      assert.ok(exports['./components/*'], 'Missing ./components/* wildcard export')
    })

    it('has ./fonts/* export', () => {
      assert.ok(exports['./fonts/*'], 'Missing ./fonts/* export')
    })
  })
})
