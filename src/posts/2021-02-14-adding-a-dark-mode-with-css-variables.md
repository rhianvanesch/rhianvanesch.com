---
title: Adding a dark mode with CSS custom properties
description: TODO
date: 2021-02-14
permalink: false
eleventyExcludeFromCollections: true
---

## 1. Create your colour palette

### Audit your colours

{% tip %}
If you're starting a project from scratch, you can skip this step.
{% endtip %}

Find all the colours in your project and make a list in a scratch file, making a note of where they're used. Include:

- hex colours
  - if you can search for regular expressions in your IDE, try this: `/#([a-f0-9]{3}){1,2}\b/` (in Visual Studio Code, omit the starting and ending `/` characters)
- `rgb` and `rgba` colours
- `hsl` colours
- CSS colour keywords (e.g. `white`, `black`, `mediumseagreen`)

This is a good time to remove or combine any similar colours.

### Create your CSS custom properties

In a CSS file, begin writing out your CSS custom properties. They must be prefixed with two dashes (`--`). Custom properties are scoped to the element on which they're created - since we want our colours to be globally available, a convention is to scope them to the `:root` element:

```css
:root {
  --body-background: #f2f2f2;
}
```

Think about the naming of your custom properties - avoid names that reference a specific colour or shade that may change in dark mode. `--body-background` will still make sense in light mode and dark mode. However, `--body-white` would be confusing since it will be set to a darker colour in dark mode.

### Using Sass variables with CSS custom properties

I often use Sass variables to set up a colour palette, and you can use them together with CSS custom properties. The key is to make sure you wrap the Sass variable with `#{}`:

```scss
$brand-white: #f2f2f2;

:root {
  --body-background: #{$brand-white};
}
```

You can also use Sass methods with CSS custom properties - again, wrap the method with `#{}`:

```scss
$brand-white: #f2f2f2;

:root {
  --body-background: #{$brand-white};
  --body-text: #{invert($brand-white)};
}
```

[Read more about using Sass variables with CSS custom properties](https://sass-lang.com/documentation/style-rules/declarations#custom-properties).

## 2. Find/replace the old colours

Now, replace all the colours you found in step 1 with the equivalent CSS custom properties. At this stage you may find you need to adjust the names a little so they make sense.

To use a variable in a CSS declaration, use the [`var()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/var):

```css
body {
  background-color: var(--body-background);
  color: var(--body-text);
  padding: 0;
  margin: 0;
}
```

Then make sure your styles and colours are all working as expected.

In the Developer Tools for Chrome, Firefox and Edge (Chromium), you can see the list of available custom properties at the bottom of the Styles pane.

{% image "/images/posts/2020/2020-01-21-root-devtools.png" "" %}

## 3. Create the dark mode variables

Now that the CSS custom properties are scoped to the root element, we can override them under certain conditions - e.g. when a class is applied to the root element.

We'll use the class `.dark-mode` and will override the custom properties when this class is present. At this stage, we'll just copy our previous colours.

```scss
$brand-white: #f2f2f2;

:root {
  --body-background: #{$brand-white};
  --body-text: #{invert($brand-white)};
}

.dark-mode {
  --body-background: #{$brand-white};
  --body-text: #{invert($brand-white)};
}
```

## 4. Create a button for toggling dark mode

### Button HTML

We'll use a `button` element and some JavaScript to add and remove the `.dark-mode` class.

```html
<button id="dark-mode-toggle">Toggle dark mode</button>
```

#### Why a `button` element?

For accessibility reasons, a `button` element is the best choice for this use case. It can be interacted with and focused using the keyboard, has a `button` role which is understood by screen readers, and doesn't navigate the user anywhere. ([Read more about buttons vs links on Marcy Sutton's blog](https://marcysutton.com/links-vs-buttons-in-modern-web-applications).) If you use a link, you'll have to override the default behaviour of a link (which is for navigating the user elsewhere) and if you use any other element, you will have to manage the keyboard focus, interactivity and screen reader compatibility yourself. Not recommended - just use a `button`!

#### Other accessibility considerations

On my site I decided I wanted the button to show different icons when dark/light mode is toggled. If you do this too, make sure you include some hidden text on the button (e.g. "Toggle dark mode") that can be read out by a screen reader.

You could also hide the button altogether from screen readers, but you're making an assumption that no screen reader users would benefit from a dark/light mode, which may not be the case.

### Button JavaScript

This piece of code needs to:

- get a reference to the button element (I prefer to use an `id`, as I don't use `id`s for CSS styles, but any selector will do)
- define a function that will toggle the `.dark-mode` class on the `html` element
- add an event listener to run the previously-defined function when the user clicks the button element

```js
const darkModeButton = document.getElementById(
  "dark-mode-toggle"
)

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode")
}

darkModeButton.addEventListener("click", toggleDarkMode)
```

{% tip %}
Bonus points: because our dark mode is a JS-only solution, you could add the button to the <abbr title="Document Object Model">DOM</abbr> with JavaScript, so that it will only be available if the user has successfully downloaded your JavaScript.
{% endtip %}

At this stage, make sure your class is correctly being added/removed from the `html` element, and that the colours are correct with and without the class.

## 5. Define the dark mode colours

With the `dark-mode` class applied, you should be able to see the dark mode custom properties in your Developer Tools overriding the custom properties on the `:root` element.

In Chrome, you can modify these colours on the fly by clicking the coloured square next to the colour. I find this to be a very useful way to test out a dark colour palette. Note that it doesn't persist across page loads, so copy them into your editor when you're happy with the result.

Often you can just invert the light mode colours (Sass users can use the `invert` method for this) but equally often they need to be manually adjusted.

{% tip %}
Don't forget to check the contrast ratio for these new colours to make sure they're readable.
{% endtip %}

## 6. Make your dark mode persistent

Currently, dark mode resets itself when you navigate to a new page. We need to make it persistent across page views. To do this, we can save a Boolean flag to `localStorage` and check for it on page load.

TODO

Split into two pieces of code: one to apply dark mode ASAP after page load, and one to handle the toggle button and run at low priority.

When using `setItem`, make sure to `catch` any errors as an exception could be thrown if the storage is full, or in some browsers in private mode.

## 7. `prefers-color-scheme`

https://caniuse.com/#feat=css-variables
https://caniuse.com/#feat=prefers-color-scheme
