# Possible Bug

This repo contains a simple demo app to show a bug happening in `ie11` and `edge` with `react-dom` **v16.9.0** due some change introduced, might be in `scheduler` **v0.15.0**.

## Notes

- The above mentioned problem appears in this new version, and just in mode `production` (`development` is ok) and in `ie11` and `edge` (while `chrome` does not show any problem in both modes).

- The app includes, first, a polyfill `core-js/stable`.

- This demo app mimic a more complex application `react-styleguidist` whith a similar code construction.

- Downgrading to `v16.8.6` "resolves" the problem.

- Webpack config constains `devtool: 'eval'` (other might work or not).

- I have manually modified the `scheduler.production.min.js` to `bind` the methods used from `windows` (e.g., `requestAnimationFrame`, `setTimeout`) and this change works for ie/edge and any other.

```text
// minified code for production

// from
v=window.setTimeout,w=window.clearTimeout,x=window.requestAnimationFrame,y=window.cancelAnimationFrame

// to
v=window.setTimeout.bind(window),w=window.clearTimeout.bind(window),x=window.requestAnimationFrame.bind(window),y=window.cancelAnimationFrame.bind(window)
```

## Run

Start the dev-server in production mode and you should see `works!` printed on screen, if it is not the case, check the console for the error.

```sh
# dev server mode production
yarn start:production

# dev server mode development
yarn start:development

# build mode production
yarn build
```
