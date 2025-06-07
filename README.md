# MineSweeper

Minesweeper is an interactive website where users can play a classic puzzle game.

[Deployed site](https://bics.github.io/MineSweeper/)

# Table of contents    

1. [UX](#ux)
2. [Features](#features)
    1. [Existing Features](#existing-features)
    2. [Future Features Consideration](#future-features-consideration)
3. [Technologies used](#technologies-used)
4. [Testing](#testing)
    1. [Manual Testing](#manual-testing)
    2. [Automated Testing](#automated-testing)
5. [Deployment](#deployment)
6. [Credits](#credits)
7. [Acknowledgements](#acknowledgements)

# UX

### User stories
* First Time Visitor Goals
    * First time users should be able to understand the purpose of the site.
    * They should be able to navigate the site without any issue.
    * The site should encourage users to interact with it.

* Returning Visitor Goals
    * Returning visitors should be able to notice any changes on the website.
    * The site should still encourage users to interact with it.

* Frequent User Goals
    * Frequent users should be able to take a break and challenge themselves with a cozy little game.
    * They should be able to dwelve into the history of the game.
    * They may spend some time solving the larger and harder puzzles.

### Design

Colour Scheme

Main colours used on the website\
![Color palette](/assets/images/Color_Palette_hex.png)

Typography
* Roboto font is used with a fallback value of sans-serif.

### Wireframes
<details>
<summary>Mobile</summary>

![Mobile wireframe](/assets/images/Wireframe_Mobile.png)

</details>
<details>
<summary>Tablet</summary>

![Tablet wireframe](/assets/images/Wireframe_Tablet.png)

</details>
<details>
<summary>Desktop</summary>

![Desktop wireframe](/assets/images/Wireframe_Desktop.png)

</details>

# Features

## Existing features

### Footer
The footer element is positioned and fixed at the bottom of the page.\
The element provides links to social media platforms, namely in order Facebook, X, Google and Github.

![Footer](/assets/images/Footer.PNG)

### Landing page 

The only page of the site.\
It features a distinct header and an interactable carousel.

#### Caruosel

The carousel consist two sections.\
The first element is the game options. This element helps the user choose the size of the field and the difficulty as well.\
On smaller screens only the smaller (10 * 10 and 15 * 15) sizes are available to be selected. On tablet screen size (above 767 pixels) the large grid will become available and on
larger desktop screens (above 1177 pixels) the last option will become active as well.

![GridSelectionSmallScreen](/assets/images/GridSmall.PNG)

![GridSelectionTabletScreen](/assets/images/GridTablet.PNG)

![GridSelectionLargeScreen](/assets/images/GridLarge.PNG)

The difficulty selector consist of four levels, each increases the placed mines by 5% starting with an initial difficulty of 10% on "Easy" level based on the grid size.\
For example a 10 * 10 dimension play field will have a total of 100 tiles. On easy difficulty there will be a total of 10 mines. On normal difficulty with the same size it the player will need to evade a total of 15 mines.

![Difficulty](/assets/images/MineCount.PNG)

The second element is the actual game field. On this field the users can play the game.\
On the top left the players can see the remaining amount of mines. Each time a flag is placed on the field this number will decrease.\
In the middle sits a button with a face on it. The button's function is to reset the game field with the currently selected grid size and difficulty. The face also chages it's "emotion" by the state of the game.\
It starts with a neutral happy face. When the player wins the game the face changes to an ecstatic smiling version. And in case there was a misstep and the game abruptly ended, the face will represent a sad emotion.\
On the top right there is button which shows the player the rules for the game and a couple tips for them.

![Fieldmenu](/assets/images/Field_header.PNG)

Below this menu is the actual game field. It has a distinct border around it.\
The tiles first represented as a button. Hovering over any button will highlight it for ease of use. Once clicked the tile transforms.\
If the tile clicked was empty, the nearby empty tiles and hints will be revealed. Hints should help the player locate any mine, and they all coloured differently. Hovering over this hints highligth its neighbour button tiles. If there are as many flags placed around a hint tile it represents, clicking the hint will reveal all tiles around itself.\
If the tile clicked was a mine, the game ends and all tiles are revealed.

![Gamefield](/assets/images/Game-field.PNG)

At the bottom the users can find a checkbox. This enables the "flagging" mode, which if enabled instead of revealing a tile places a flag on it. Flagged tiles will not be revealed by either clicking or automatically. To remove a flag the player should click the tile again in "flagging" mode.\
Below this is the "Reselect" button. It will bring back the previous grid and mine selection panel.

![Gamefieldbottom](/assets/images/Field_bottom.PNG)

#### About section

The about section is placed in a model. It has the game description and a bit of it's history, which could be found on [Wikipedia](https://en.wikipedia.org/wiki/Minesweeper_(video_game)).\
This modal can be accessed on the first part of the carousel.

#### How to play

This section is also placed in a modal. It consists the features currently implemented in the game and a couple hints for new players.

#### Endgame message

The message will pop-up as a [Bootstrap](https://getbootstrap.com) toast message, based on the outcome of the game(win/lose).

## Future features consideration

* For larger screens there could be a manual input field for grid sizes and mine count.
* The first step could be made "safe" to ensure the game is not too difficult.
* A win streak counter could be included to motivate players to play more.
* A timer and highscore chart could be added for competitiveness.
* Further color coding can be implemented for color impaired players.
* Sound effects can be played while interacting with the game field.

# Technologies used

* The core project is written in HTML5, CSS3 and Javascript.
* Used [Balsamiq](https://balsamiq.com) to create wriframes.
* Used [Visual Studio Code](https://code.visualstudio.com) as IDE.
* Used [Github](https://github.com) to store and deploy the repository.
* Used [Sourcetree](https://www.sourcetreeapp.com) for version control.
* Used [Opera](https://www.opera.com), [Mozilla](https://www.mozilla.org/en-GB/) and [Chrome](https://www.google.com/intl/en_uk/chrome/) browsers and their respective developer tools for testing.
* Used [ChatGPT](https://chatgpt.com) to help with the content, and a bit of debugging.
* Used [W3Schools](https://www.w3schools.com) to help to understand and write codes.
* Frequently visited [Stack Overflow](https://stackoverflow.com/questions) to understand some behaviours.
* Used [W3C](https://www.w3.org) to validate both html and css files.
* Used [Bootstrap](https://getbootstrap.com) as css.
* Used [Font Awesome](https://fontawesome.com) to display footer elements.
* Used [Google fonts](https://fonts.google.com) for typography.
* Used [Freepik](https://www.freepik.com), [Pixabay](https://pixabay.com) and [Transparent Textures](https://www.transparenttextures.com) to acquire free images.
* Used [Coolors](https://coolors.co) to create color palette.
* Used [Microsoft Windows](https://www.microsoft.com/en-gb/windows?r=1) in-built **Snippet** tool to capture images.
* Used [Vitest](https://vitest.dev) for unit testing.

# Testing

## Manual testing

## Automated testing

# Deployment

### Github pages

The project is deployed to Github Pages. In order to achieve this the following steps were taken:\
1. Sign into [Github](https://github.com/).
2. Locate the [Minesweeper](https://github.com/bics/MineSweeper) repository.
3. Locate the settings for the repository on the top navigation bar.
4. On the left hand side menu select the "Pages" option.
5. Under the "Branch" option select the main branch to deploy and press save.
6. Go to the "Code" window.
7. On the right hand side a new element should appear with the name "Deployments" which should reveal the deployed site url.

### Forking a repository

1. Sign into [Github](https://github.com/) (can be done later).
2. On [Github](https://github.com/) locate the [Minesweeper](https://github.com/bics/MineSweeper) repository.
3. On the top right hand side click on the "Fork" option.
4. Sign into [Github](https://github.com/) (not needed if step 1. was taken).
5. The repository should be present under your account's repositories.

### Download local repository

1. Navigate to the [Minesweeper](https://github.com/bics/MineSweeper) repository.
2. On the right side select the "Code" dropdown menu.
3. Download the repository as a .zip file.
4. Extract the downloaded file.
5. Open up your preferred IDE and add the extracted folder as a project.

### Clone a repository with Sourcetree

1. Import SSH key. If SSH key already imported skip these steps
    1. Acquire the SSH key, and password for this repository.
    2. Locate the "Tools" menu, and select the "Create or import SSH keys" option.
    3. In the dialog select "Load" and locate the acquired SSH key.
    4. If prompted sign in to [Github](https://github.com/) account and enter the password.
2. Click on the "+" icon to add a local repository.
3. Select the "Remote" option on the top navigation bar.
4. Search for the [Minesweeper](https://github.com/bics/MineSweeper) repository and hit clone.

# Credits

### Code

### Content

### Media

# Acknowledgements

Thank you to my mentor Benjamin Kavanagh for his continuous support and feedback during development.
Thank you to my friend Richárd Pónusz for his support and tips during development.
Thank you to Tom Cowen, our cohort leader, and the rest of the class for playtesting.

Description: https://en.wikipedia.org/wiki/Minesweeper_(video_game)

pics

mine: https://pixabay.com/vectors/mine-war-explosive-bomb-grenade-146747/

flag: https://pixabay.com/vectors/banner-flag-vector-white-blow-1486374/
downloaded and modified in Krita

game-face: https://pixabay.com/vectors/smile-emoji-happy-happiness-5840910/

win-face: https://pixabay.com/vectors/smile-emoji-happy-happiness-5865208/

lose-face: https://pixabay.com/vectors/smile-emoji-sad-sullen-sad-face-5872116/

tile-background: https://www.freepik.com/free-vector/decorative-premium-upholstery-sofa-pattern-dark-background-design_151611884.htm#fromView=search&page=2&position=23&uuid=ec661338-070e-4bf7-8d14-e9ad4dc0506c&query=dark+tile

bright-squares: https://www.transparenttextures.com/patterns/bright-squares.png by Waseem Dahman

Code snippet:
Toast snippet from official Bootstrap docs
Multiple js from ChatGPT
Enums by stackoverflow: https://stackoverflow.com/questions/44447847/enums-in-javascript-with-es6
Modal: https://getbootstrap.com/docs/5.3/components/modal/
Close button recolor from ChatGPT
Tooltip code: https://www.w3schools.com/css/tryit.asp?filename=trycss_tooltip_bottom
Tile background from https://www.transparenttextures.com

package.json was created using the official vitest guide and ChatGPT
vitest.config.js file was generated in ChatGPT



