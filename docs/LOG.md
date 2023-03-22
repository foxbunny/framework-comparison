# Introduction

The framework comparison project is my own learning exercise. Can I learn 
all popular frameworks at the same time (or re-learn in case of React), and 
how does that compare to vanilla, which is how I prefer to work these days.

## The frameworks

The following frameworks will participate in this comparison:

- Angular
- Astro
- React
- SolidJS
- Svelte (SvelteKit)
- React (NextJS)
- VueJS

Additionally, I will also code the same app using vanilla JS, and a full 
progressively enhanced app using Django and vanilla JS.

### Why is framework X not included?

First, there's only one of me. 😂 Secondly, I only included the frameworks I 
keep hearing about. If yours wasn't included, it's because I either haven't 
heard about it, or haven't *kept* hearing about it. This isn't (necessarily) 
a list of "good" frameworks. It's a list of the most popular ones from my 
perspective.

## The app

The application is a small product list management app. It's an internal 
tool used by an imaginary shop to manage their inventory.

It will have two pages (or "pages" in case of SPAs). It will list products 
stored in a SQLite database and served by a REST server.

### Screen 1

The first screen is a typical CRUD interface. It will allow us to:

- View a list of products
- Edit product details
- Add a product
- Delete a product

Additionally, it will allow the user to:

- Search for a particular product or SKU
- Filter products by price range
- Visualize the price distribution using a charting library
- Sort in both direction by price and update date
- Navigate the paginated list

The screen also has a drop target and a modal dialog which allow the user to 
create and modify the product highlight list. Products from the main list 
can be dropped onto a small drop target on the page. Clicking the drop 
target opens a modal dialog that displays the highlighted products, and 
allows the user to reorder them using keyboard shortcuts and drag & drop 
gesture.

### Screen 2

The second screen is a login form. It has the username and password fields.

Authentication system consists of user log-in and log-out. There is no 
sign-up feature as this is an internal app. Accounts are created by the 
super-admin using hte Django's admin interface.

### Session management

To avoid managing the user session on the client side, we will use a session 
cookie, a feature that comes with Django out of the box.

### Styling

Although we won't go overboard with styling, we will add some basic styling 
as well as the styling necessary to provide the necessary UI cues. We will 
apply the rule of least power, and will not implement in JavaScript things 
that can be done in CSS. In cases where JavaScript needs to provide 
information about styling, we will do that using CSS custom properties set 
through the element's style attribute/property.

### Device support

The application is desktop-only.

## Judging the framework performance

We will judge the framework performance according to the following criteria:

- The amount of code written by the developer
- The amount of non-coding work required of the developer
- The bundle size
- Lighthouse metrics
- Build time
- Code maintenance:
  - Number of dependencies
  - Ability to make changes to different parts without affecting other parts
  - Ability to develop separate parts of the application in parallel
  - Ability to scaffold the interfaces first, and fill in the blanks later
- Flexibility:
  - Ability to swap out different parts of the framework and granularity thereof
  - Ability to accommodate foreign code and methods

## Ground rules

We will adhere to the following rules:

- We always do things with the least amount of work (code written) possible
- We do not resort to using additional 3rd party libraries except for 
  visualization
- To the best of our ability, we will adhere to the practices recommended by 
  the official documentation.
- If the official recommendation will put the framework at a disadvantage in any
  way, we will explore our options and use the most optimal method we can 
  come up with.

## Workflow

We will first develop the Django backend, and also the progressively 
enhanced app. Then we'll develop apps in each of the frameworks (plus 
vanilla) in alphabetical order starting with Astro, and ending with VueJS.

We will adhere to the following workflow:

- Plan the UI structure
- Plan the state management strategy
- Create the basic page structure in HTML (or view)
- Add interaction
- Add styling

For content-oriented web pages, we would do the last two in the reverse 
order, but for app-like pages, I prefer to do them in this order because 
the more complex interaction may require additional visual cues.

I will not bother creating designs up-front. I will simply use the final design
of the first app (the Angular one) as the basis for other apps, and otherwise 
design on the fly using CSS.

# Day 1: Scaffolding the projects

We scaffold projects using the framework's documented method. If given a 
choice, we scaffold without test tools, and we always opt into using a router,
plain CSS, TypeScript, and ESLint, but not Prettier. For everything else, we 
go with the defaults.

For all projects, we use `npm` as that is the first documented package 
manager in most frameworks' documentation.

### Angular

Angular provides a script for scaffolding new projects. It is tightly 
coupled with TypeScript, so we are given no other option during scaffolding.

```shell
npm init @angular angular
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS
```

The project is created with the source code in `src/`, with dependencies 
installed, and with integration for EditorConfig, TypeScript, and VSCode.

### Astro

Astro provides a scaffolding script. It has an option to use TypeScript, and 
unlike other frameworks it gives us an option to specify the desired 
strictness. We will go with strict, though, which is the same as the 
defaults for other frameworks. It also provides an option to select 
different types of templates, including a blog template.

```shell
npm create astro@latest astro
 astro   v2.1.5 Launch sequence initiated.
  tmpl   How would you like to start your new project?
         Include sample files
  deps   Install dependencies?
         Yes
    ts   Do you plan to write TypeScript?
         Yes
   use   How strict should TypeScript be?
         Strict
   git   Initialize a new git repository?
         No
```

The scaffolded project comes with Astro and TypeScript configuration.

### React (Next.js)

React does not offer itself as a stand-alone framework anymore, but instead 
delegates to one of the more fully-featured ones like Next.js, Remix, Gatsby,
and openly recommends going that route. In this comparison, we will use Next.
js as it is the most popular choice. The scaffolding script offered by Next 
gives us a choice of including TypeScript integration, as well as ESLint. It 
gives us an option to use the experimental `app` directory, which gives us 
features different than the default set-up, but we opted out of it as that's 
the default.

```shell
npx create-next-app react
√ Would you like to use TypeScript with this project? ... Yes
√ Would you like to use ESLint with this project? ... Yes
√ Would you like to use `src/` directory with this project? ... No
√ Would you like to use experimental `app/` directory with this project? ... No
√ What import alias would you like configured? ... @/*
```

The Next app is scaffolded with Next configuration and TypeScript configuration.

### SolidJS

SolidJS does not have an app for scaffolding the project. It, instead, uses 
[degit](https://github.com/Rich-Harris/degit).

```shell
npx degit solidjs/templates/ts solidjs
cd solidjs
npm install
```

The project directory is created with TypeScript and Vite configuration files.

### Svelte (SvelteKit)

Like React, Svelte recommends using SvelteKit, a fully-featured framework 
developed by the Svelte developers. The scaffolding script offered by 
SvelteKit gives us an option to use TypeScript, and several additional 
options like using ESLint (selected), Prettier and testing frameworks. It 
also provides several templates. We went with the default one, which is the 
demo app.

```shell
npm create svelte@latest svelte
<  Which Svelte app template?
|  SvelteKit demo app
<  Add type checking with TypeScript?
|  Yes, using TypeScript syntax
<  Select additional options (use arrow keys/space bar)
|  Add ESlint for code linting
```

The project is scaffolded noticeably more quickly than the other frameworks 
(except SolidJS which uses degit). The notable files that are included by 
default are ESLint, Svelte, Vite and TypeScript config files.

### Vanilla

Vanilla JS does not have (or need) any scaffolding. We merely create a set of 
three files (I will probably add more later), and we use the stock browser 
technologies (plain HTML, plain CSS, plain JavaScript). We also do not use 
any routing, and instead will rely on file names for that.

The naming convention for files is as follows:

- `index.*` is always the root of hte site
- `*.screen.css` for screen CSS (basically `*.(media target).css`)
- `*.client.js` for JavaScript files (if I ever upgrade to a SSR setup, I 
  might also have `*.server.js` modules)

```shell
mkdir vanilla
touch vanilla/index.html
touch vanilla/index.screen.css
touch vanilla/index.client.js
```

Edit `index.html`

Add the basic HTML5 skeleton:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Product List</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" media="screen" href="index.screen.css">
    <script defer src="index.client.js"></script>
  </head>
  <body>
    <h1>Product List</h1>
  </body>
</html>
```

Edit `index.client.js` and make it an empty block.

```javascript
{
  'use strict'

}
```

Edit CSS to include (for now) a simple reset:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

label, button {
  cursor: pointer;
}

button, input, textarea, select {
  font: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
  font-size: inherit;
}
```

### VueJS

```shell
npm init vue@latest vuejs
√ Add TypeScript? ... Yes
√ Add JSX Support? ... No
√ Add Vue Router for Single Page Application development? ... Yes
√ Add Pinia for state management? ... No
√ Add Vitest for Unit Testing? ... No
√ Add an End-to-End Testing Solution? » No
√ Add ESLint for code quality? ... Yes
√ Add Prettier for code formatting? ... No
```

VueJS project scaffolds with VSCode, TypeScript, and ESLint integration. It 
also includes Vite configuration.
