---
title: Title Case Function in JS
date: 2020-02-29
language: en
tags:
  - javascript
---

Ugh. It is still frustrating to capitalize first letter of
each word in a string. Here's a copy-paste function (ES6):

```js
const titleCase = word => (
    word.charAt(0).toUpperCase() + word.slice(1)
)

const titleCaseSentence = str => (
  str.split(" ").map(word => titleCase(word)).join(" ")
)
```