
const gridSelectors = document.getElementsByName("grid-selector");
const attributeDisabled = "disabled";
const indexesFromLarge = [2, 3];
const indexesFromXLarge = [3];
const tabletSize = 768;
const largeLaptopSize = 1178;

/* Inspired by stackoverflow*/
const ScreenSizes =
{
    Small: 0,
    Medium: 1,
    Large: 2
};

window.addEventListener("load", switchControls);
window.addEventListener("resize", switchControls);

/*** Remove disabled (needs bootstrap) attribute from input elements */
function enableControls()
{
    for (let i = 0; i < gridSelectors.length; i++)
    {
        gridSelectors[i].removeAttribute(attributeDisabled, "");
    }
}

/*** Add disabled (needs bootstrap) attribute from input elements */
function disableControls(indexes)
{
    for (let i = 0; i < indexes.length; i++)
    {
        gridSelectors[indexes[i]].setAttribute(attributeDisabled, "");
    }
}

/** Set current screensize from starting from the largest
 * Enable all controls first, then based on screensize disable unwanted ones
 */
function switchControls()
{
    let screenSize = ScreenSizes.Large;
    if (screen.width < largeLaptopSize)
    {
        screenSize = ScreenSizes.Medium;
    }
    if (screen.width < tabletSize)
    {
        screenSize = ScreenSizes.Small;
    }
    console.log(screenSize);
    enableControls();
    switch (screenSize)
    {
        case ScreenSizes.Small:
            disableControls(indexesFromLarge);
            break;
        case ScreenSizes.Medium:
            disableControls(indexesFromXLarge);
            break;
        default:
            break;
    }
}