---
title: Sorting GraphQL Groups In Gatsby
date: 2020-02-03
cover: ./cover.jpg
language: en
tags:
  - graphql
  - gatsby
---

During development of this blog with [Gatsby](https://www.gatsbyjs.org/),
I came across an interesting problem. I was trying to build the layout
for the blog listing page. The posts were supposed to be grouped by year
and then items in each group were to be  sorted in descending order based
on their dates. This part was easy using just GraphQL:

```graphql
query {
  allMdx(
    sort: { fields: frontmatter___date, order: DESC }
  ) {
    group(field: fields___dateYear) {
      fieldValue
      nodes {
        frontmatter {
          title
          date(formatString: "MMM DD")
        }
        fields {
          pageUrl
          dateYear
        }
      }
    }
  }
    }
```

_Note: I have created a custom field \`dateYear\`, which is being
used to group posts by year._

But if you take a look at the GraphiQL Explorer, you'll see there
is no option for sorting:

{{< image src="graphiql.jpg" alt="graphiql explorer" >}}
GraphiQL Explorer shows no 'sort' under group
{{</ image >}}

Fortunately, in my case, I was receiving the group array in
ascending order. All I needed was some javascript logic to
reverse the array and return the posts as list.

```jsx
...
<ul>
{
  data
    .reverse()
    .map(blogPost => {
      return (
        // Logic to display posts
      )
    })
}
</ul>
...
```

This looks okay, but causes a problem. Every-time a user navigates
back to the blog listing from any other page, the array is again
reversed due to React re-rendering the page.

Not Cool.

The solution I found was to create a shallow copy of the data
array and reverse that, which returns a new array, so it
doesn't get affected on re-render.

Finally:

```jsx {4}
...
<ul>
{
  data
    .slice(0)
    .reverse()
    .map(blogPost => {
      return (
        // Logic to display posts
      )
    })
}
</ul>
...
```

Voila!

You can check this logic out in the [blogpost.jsx](https://github.com/boxdox/blog/blob/master/src/pages/blog.jsx)
of this blog!
