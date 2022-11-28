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

