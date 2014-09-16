# node and mongo
## like lamb and tunafish
Node.js and MongoDB go well together. Here's a quick way to get started with some simple boilerplate stuff and progress to commmon app functionality. Every branch is called `step` something-or-other. You're on step 2 right now.

1. stand up a skeleton node app
	* `app.js` contains core server code and routing rules
	* `package.json` specifies app dependencies, e.g. **express** and **mongoose**
	* `/public` directory contains static assets

2. feature introduction, mongo connection and handlebars
	* we'll be creating a way for users to comment on a static image
	* `index.html` contains the layout and handlebars templates for rendering markup
	* `public/js/client-app.js` has some code for rendering a comment on the screen

3. mongoose connection, comment schema and create functionality