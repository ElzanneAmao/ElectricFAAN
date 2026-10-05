# ElectricFAAN

An interactive 3D pedestal fan that follows the power from the wall socket to the breeze. You can change the speed, switch oscillation on and off, see inside the motor housing, explode the fan into its parts, and step through a nine-part walkthrough of how it works.

The whole site is one file, `index.html`. It loads Three.js r147 and Google Fonts from public CDNs, so it needs an internet connection but no build step.

## Mobile

On screens narrower than 760px the controls stack into two rows under the 3D view and the walkthrough card sits below them. Drag to orbit, pinch to zoom, and tap any part to see what it does. The layout respects notches and home-indicator areas (`viewport-fit=cover` with safe-area insets) and uses `100dvh` so mobile browser toolbars don't cover the controls.

## Publishing with GitHub Pages

1. In the repository on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, and save.
3. After a minute the site is live at `https://<your-username>.github.io/ElectricFAAN/`.
