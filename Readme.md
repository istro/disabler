## What:

Add "enable" and "disable" methods to jQuery. Chainable, and can take callbacks.

## Why:

In our project I noticed we enable and disable various interactive elements. So I thought: "wouldn't it be neat if I could just call `.disable()` and `.enable()` on them?". So now I can. And you can, too.

## How:

What it actually does:
 1. adds/removes a class "disabled"
 2. sets/unsets attribute "disabled" on an element.
 3. deals with fake buttons (spans, divs) by wrapping them & inserting a "masking" div that catches and blocks click events.

## Contribute:

I'm a novice! Help me make it better :)
Fork & pull-request.
