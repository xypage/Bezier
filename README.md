# Bezier
I wanted to write my own bezier function(s) so I could get a better feel for how they work, and I started with the recursive definition but I was in part inspired to do this by a YouTube video (https://www.youtube.com/watch?v=aVwxzDHniEw) where they also talk about polynomial representation, so I wanted to do that too.

First I had to figure out how exactly it worked, they show the expansion for it using 4 points, but my script was already setup to use as many as it wanted so I wanted to generalize it for that purpose. In order to do that I first wrote a python script (in hindsight, unnecessary, I thought about it too hard and confused myself away from the simple binomial expansion of it) which is pretty sketchy but I only needed it to help illustrate the relation for me, it isn't important past that so I felt ok rushing it.

After that, I went back to the JavaScript and wrote the directInterp function, which utilizes that. Note that the functions aren't called lerp or bezier, and instead interp, directInterp and bez because p5js (the library I'm using to draw to the canvas) already has lerp and bezier curve functions so I couldn't use those names.

# How to use it
Every click adds a point where the cursor is, when you press a button on your keyboard it'll switch between lerp functions which helps highlight the difference in performance between the recursive solution and the polynomial one. 

# What's next
- [ ] I intend to add a similar generalized function for the derivative, to get the normal from it and be able to give the curve width. 
- [ ] I want to update the distribution of t, in some places changing t results in big shifts and in others small, so linearly moving through 0-1 wastes some time in places where the difference won't be noticed and rushes other spots where you can find gaps between the points, so I want to find a better way to distribute them so that it'll be evenly spaced relatively to the curve, not to t.
- [ ] Making the interface nicer, allowing you to choose whether to have infinite points or a number you decide, using something besides the keyboard to switch between lerp functions, and letting you change the canvas size manually.
