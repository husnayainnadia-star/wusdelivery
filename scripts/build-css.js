/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const s = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');

async function buildCss() {
  const root = path.resolve(__dirname, '..');
  const inputPath = path.join(root, 'src', 'app', 'globals.css');
  const outputPath = path.join(root, 'src', 'app', 'tailwind-built.css');

  const css = fs.readFileSync(inputPath, 'utf8');
  const compiler = await s.compile(css, {
    from: inputPath,
    base: root,
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [{ base: root, pattern: 'src/**/*.{ts,tsx,js,jsx}', negated: false }],
  });

  const candidates = scanner.scan();
  const compiled = compiler.build([...candidates]);

  fs.writeFileSync(outputPath, compiled, 'utf8');
  console.log(`[build-css] Compiled ${candidates.size || candidates.length} classes into ${outputPath} (${compiled.length} bytes)`);
}

buildCss().catch(err => {
  console.error('[build-css] Error:', err);
  process.exit(1);
});
