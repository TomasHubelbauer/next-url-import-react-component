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
