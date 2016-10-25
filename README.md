# Code Challenge: Magical Bedroom Products

You're charged with building a purchase page and mini-cart for a store that sells magical bedroom products. You'll build a product listing page with a minicart.

## Guidelines

UX sketches for the page can be found in `designs` folder.

The list of products is located in `data/db.json`. We recommend using [json-server](https://github.com/typicode/json-server) to mimic the backend API response. You'll need to install the module globally with `npm install json-server -g`.

To start the sever run `json-server --watch data/db.json`.

  * http://localhost:3000/products: Products for the listing page
  * http://localhost:3000/cart_order: Use this endpoint as the "storage" for minicart.

Please do not use any frameworks such as Ember, Backbone, Bootstrap or Foundation. You are free to use front-end tooling libraries such as Autoprefixer, Underscore, or Gulp. You can use jQuery, Zepto, or vanilla JS.

You can use any flavor of CSS, from Sass to Post to Less to vanilla CSS with CSS variables.

We recommend using an HTML templating language to keep your code DRY. For example, a product listing can be one template that you iterate through. A product item in the minicart could be another.

This product page must work in latest two versions of Firefox, Chrome, Safari, IE.

Lastly, please complete the questions in the recap before submitting your test.

## Feature Stories

As a Customer
I want to see a list of all the magical products
So that I can learn about them and add them to my cart to purchase

When I buy a product
Then it will be added to the minicart
And the minicart should show the product name and price (without a page refresh)
And the minicart should allow me to remove the product
And the minicart total should reflect price of the product in the cart
And the minicart count should update to reflect total number of products

When I buy a second product
Then it will be added to the minicart
And the minicart should show two products (without a page refresh)
And the minicart count should update to reflect total number of products
And the minicart total should reflect the cost of both products
And the minicart should allow me to remove each product individually

When I remove an item from the minicart
Then the total will update to reflect
And the cart count will update
And all changes should happen without page refresh


## Recommendations

* Assume you are working on this puzzle as part of the team not just an individual code puzzle
* Take care to organize your directory structure logically
* Add documentation where you think is best to help your team members understand your feature
* Create a repo with the zip file code. Treat your work like feature development, make meaningful commits.
* Mobile first ++

### N.B.

This test is designed for all frontend proficiencies and specializations. It is designed to allow you to showcase your expertise. It is intentionally open ended.

If you have design skills, we hope you'll show us with a more stylized page.

If you love animations, we hope you'll add delight to the page.

If you're not comfortable with templating or working with external data, then hardcode the information in `data/db.json`.

If you've never written tests, but want to try—go for it!

If JavaScript is not your forte, put your time into HTML and CSS. We would expect your test to be fully responsive.

This is your opportunity to show us what you love about the web and how you write code.

## Timeline

You have a week a to complete the test. If you need more time, please let April and/or Claudina know.

If you have any questions along the way, reach out to claudina@casper.com.
