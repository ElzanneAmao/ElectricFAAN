# ElectricFAAN

Interactive 3D models of everyday machines. The home page is a menu, and each machine has its own page where you can switch it on, see inside, explode it into its parts, and follow a step-by-step walkthrough of how it works.

| Machine | Page |
| --- | --- |
| Pedestal Fan | `fan/` |
| Robot Vacuum | `robot-vacuum/` |

Live site: https://elzanneamao.github.io/ElectricFAAN/

Every page is a single HTML file. Pages load Three.js r147 and Google Fonts from public CDNs, so they need an internet connection but no build step.

## Adding a machine

1. Make a folder named after the machine (for example `kettle/`) and put its page in it as `index.html`.
2. Add `<a class="back" href="../">&larr; All machines</a>` as the first line inside its `<header class="masthead">`, and copy the "Back-to-menu link" and "Mobile additions" style blocks from `robot-vacuum/index.html`.
3. Add a 720×540 preview image to `assets/`.
4. In the root `index.html`, copy one `<li>` inside `<ul class="grid">` and change the link, image, number, name and description.

## Mobile

On screens narrower than 760px the controls stack into rows under the 3D view and the walkthrough card sits below them. Drag to orbit, pinch to zoom, and tap any part to see what it does. Pages respect notches and home-indicator areas and use `100dvh` so mobile browser toolbars don't cover the controls.

## Publishing

GitHub Pages deploys from the `main` branch, root folder (Settings → Pages). Every push to `main` republishes the site.
