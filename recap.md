# Recap

What went well?

Nice to use the flux architecture in a situation where one might typically keep state in the DOM. Allowed for easier testing and local debugging.

What were the snags/gotchas?

Not using a data binding framework required a lot of manual DOM manipulation. Initial rendering of client templates the first time with Nunjucks and context from flux stores was easy but on updates requires manual DOM manipulation because I chose not to re-render entire Nunjucks client side templates.

What would you improve given/more time resources?

- tests: Add unit tests rather than just integration test. My Karma tests are testing broad functionality rather than isolating specific function. Also, would write end to end tests as it works using `gulp selenium --desktop=chrome` if you have Java intalled but I didn't have time to write these tests.

- javascript: I would extract common functionality for JS components into a super class, i.e. functionality such as adding observers and DOM listeners. State comparisons and data binding with observers is extremely naive and manual and would like to extract this functionality into some sort of data structure/utility function. On top of this elements that are removed from the cart and re-added are created from scratch, should probably cache these internally to the Cart component. Also, images between the products and the cart do not correspond, should add the image to the products store and extract it in the cart action. I also would cleanup how I would handle cart actions/reducer, i.e. the way I'm calculating quantity, total, and count is a little wonk because it relies on a relation ship between the products and cart store.

= css: The UI is also kind of bare bones and I didn't do anything fancy with animations or CSS sizing (i.e not using ems). Also, I hacked around with floats and flex-box for the products button/price, would probably clean this up, was just trying to avoid duplicating components in the DOM and didn't immediately see an easy way to do this with flexbox.

Do you have any feedback on the challenge (what would you change, improve, keep…)?

Not using a JS framework was a bit inhibiting, and I chose to use Redux for data flow just because I thought it would make this challenge more fun.
