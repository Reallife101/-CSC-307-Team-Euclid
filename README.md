# Team Euclid - "Poly Cards"(TBD)

For Cal Poly Students to develop effective study strategies and to learn difficult course material. The “Poly Cards” is an online website that supplies specific class-related flashcards. Unlike Quizlet, our product does not require permissions and account access to the class specific cards for Cal Poly students.

## Developed by

Ryan Ngoon

Nate Ball

Casey Koiwai

Jimmy Liu

![alt text](https://github.com/Reallife101/CSC-307-Team-Euclid/blob/master/System%20Architecture.png "System Architecture")

Style Guide: https://google.github.io/styleguide/jsguide.html


## Set Up
### Downloads
To begin setting up the project for development, the following should be installed:

1. A Text editor (we recommend [Sublime](https://www.sublimetext.com/3), but everything from Notepad++ to TextEdit works too)
2. [Git](https://git-scm.com/downloads)
3. [Node.js](https://nodejs.org/en/download/)
4. [Heroku](https://devcenter.heroku.com/articles/heroku-cli)

### Setting up the Environment
First, set up the repository by cloning it to your workspace. Make sure you can open all files in the pages folder with your preferred text editor. Then, ensure node js is installed by running ```node index.js``` and seeing if it runs the website locally. If not, refer to the node js help pages for assistance.

### Organization
The pages folder holds all of the separate pages of the website. Each page is represented by a folder containing its front end and back end components. All style sheets should be within the style_sheets folder.

We generally prefer that you work on your own branch. This way, we can develop things simultaneously more easily. Once your code has been tested and you would like to merge, open up a pull request and request a review, supplying all necessary information. Generally, we prefer squash commits because they make the history cleaner, but we have already nuked our history once, so it is understandable if you'd like to do something else.

###Continuous Integration
Continuous integration was not used for our HTML and CSS because they are markdown languages and will not crash the website.
