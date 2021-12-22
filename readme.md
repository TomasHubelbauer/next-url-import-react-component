# NextJS URL Import React Component

In this repository, I am attempting to test out a hypothesis:

In NextJS, URL imports are supported. This means, generic React components can
be imported from outside of the main application source base without making them
into NPM packages.

However, to develop the React component, it is useful to have a playground for
it that provides React and allows running it, debugging it and testing it
without having to use it in the main application to do those tasks. To be able
to develop it in isolation.

In this repo, I will create two Next applications, one is the main application
and the other is another Next application serving as the component playground.

Both give me easy access to React and bootstrap the processes to debug with the
support of live reloading. This means that even though the intended consumer of
the component is the main app, its development will be isolated into the
playground app.

URL imports require serving the file with the correct MIME type, this is not
possible with the GitHub raw URL endpoint, so I'll enable GitHub Pages in the
root of the repository and that way the file will be HTTP-accessible with the
correct MIME type.

I will do this in JavaScript first and then try to do it once more in TypeScript
where I am not sure if a different MIME type will be needed or not.

## JavaScript Prototype

In the JavaScript case, the component could be imported using URL imports, but
the JSX syntax in the file would not be transpiled and Next wouldn't apply the
transformations it applies to local imports to the file at the URL import.

It's possible to configure next to apply a specific loader to the URL import by
tweaking the Webpack config:

```javascript
module.exports = {
  // …
  webpack: (config) => {
    config.module.rules.push({
      test: /\.jsx/,
      use: {
        loader: 'babel-loader', // Note: `npm install babel-loader` needs to be installed
        options: {
          presets: ['@babel/preset-react'] // Note: `npm install @babel/preset-react` needs to be installed
        }
      }
    })

    return config
  }
}
```

With this new Webpack rule, the URL import will become a subject to the loader
configured in this adjusted configuration. This means JSX will be transpiled to
call to `React.createElement` making the file a valid JavaScript file.

Next local imports will still be treated the same way as they are by default,
this new rule does not apply to them and their implicit loaders/Webpack config.

At runtime, this transpiled URL import will not see a global instance of React,
because in Next, React is not set to the global scope, instead during bundling
all components will get a referenced to React bundled with them.

To fix this, it is possible to export React globally in `_app.js` like so:

```javascript
global.React = React
```

This will make the setup work.

## `next.lock`

Next will create this directory as a cache of URL imports and it will keep a
manifest file in `lock.json`. The cached files do not get updated after the
source changes or the Next app rebuilds, the only way to update them that I
found is to remove the record in `lock.json` and save it to make it rebuild
itself.

This could be solvable by using Nodemon to change `lock.json` to an empty object
literal to cause it to rebuild the cache and live reload could be solved by
having the same script that watches `component-app` touch `index.js` after each
change to make it as though a change occured in the `app` project itself.

## To-Do

### Investigate **Prop `disabled` did not match. Server: "null" Client: "true"**

### Look into live reload of URL imports using Nodemon hacks

https://nextjs.org/docs/api-reference/next.config.js/url-imports#lockfile

This says that when the file is served with the `Cache-Control: no-cache`
response header, the lock file is skipped and the file is fetched anew each
time.

This would alleviate the need for Nodemon to keep resetting the cache, but it
would not solve the problem with generating a live reload event in the call-site
app. Nodemon would still be needed for that.

### Retry this in TypeScript mode and see what loader changes are needed

Since in JavaScript, JS files have an implicit Webpack loader applied to them
and the URL imported file doesn't, it is likely that in the case of Next
TypeScript template, an implicit Webpack configuration used to support TS and
TSX files will also not be applied to URL imports meaning we will need to find
a TypeScript loader capable of transpiling TSX as well.
