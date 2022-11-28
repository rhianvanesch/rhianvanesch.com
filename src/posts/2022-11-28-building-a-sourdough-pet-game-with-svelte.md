---
title: Building a browser-based sourdough pet game with Svelte
description: TODO
date: 2022-11-28
---

Back in 2021 I had a sudden burst of nostalgia for [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi). In my misspent youth, I owned a generation one Tamagotchi, and now that I code for a living, I thought it might be fun to make one in the browser. Along the way (possibly influenced by pandemic trends) I drifted away from the Tamagotchi idea and instead decided to make a sourdough starter pet.

My requirements:

- over time the sourdough starter gets hungry
- you can feed it to make it grow, once it's hungry enough
- once it's grown enough, you can use it to make a sourdough baked good
- you can unlock different baked goods by baking more

You can probably tell I'm not a game designer, because this isn't a very exciting game. However, I didn't let that stop me.

## Technology choices

This was a side project, and I wanted to try [Svelte](https://svelte.dev/). So it's written with Svelte.

If I was thinking more seriously about what to use, I would ask where this game would be seen (and deployed). It could be a full-blown SPA, but we don't need routing, and we might want to render some static content on the page around the interactive parts. We'd also likely want the resulting JavaScript to be as small as possible so people could comfortably load this on a mobile device, and also just to be a responsible internet citizen. This all actually makes Svelte a pretty good fit, but you can achieve the same with other frameworks (or no framework - vanilla JavaScript or web components would be perfectly valid options).

## Initial setup

At the time of writing, you can set up a Svelte app by running `npm create vite@latest myapp -- --template svelte` in your terminal, and then following the prompts. I also chose to add TypeScript, though that's optional. This is documented further in the [Svelte docs](https://svelte.dev/docs#getting-started).

Delete `./public/vite.svg`, `./assets/svelte.svg` and `./lib/Counter.svelte`.

Update the contents of `./src/App.svelte` to remove everything but `<script>` and `<main>`, plus a catchy title:

```
<script lang="ts">

</script>

<main>
  <h1>Sourdough starter game</h1>
</main>
```

## Feeding the sourdough starter

We just removed the `Counter.svelte` component &mdash; but in order to feed the starter, we're going to need something very similar. (Finally, a real-world use for counter components!)

In the game requirements, I wrote:

> you can feed it to make it grow

If it can grow, we'll need to track how big it is. So let's add a variable to track size in `./src/App.svelte`:

```js
let size = 1
```

And we'll output it on the page too:

```html
<main>
  {size}
</main>
```

Let's make that number bigger now by adding back the counter component we removed earlier:

```js
function feedStarter() {
  size++
}
```

```html
<main>
  {size}

  <button>Feed</button>
</main>
```

While clicking a button to increase a number might seem like the perfect game, we can do better.

## Making the sourdough starter hungry: the game loop

Resources:

- https://developer.mozilla.org/en-US/docs/Games/Anatomy#building_a_main_loop_in_javascript
- https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
- https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
- https://gablaxian.com/articles/creating-a-game-with-javascript/the-game-loop/

## Ready, set, bake

## Showing more than just numbers: fun with SVG

## Saving game state to `localStorage`

## Recap and conclusion