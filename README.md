# Tic-Tac-Toe

This project is based off the React tutorial [React Tutorial](https://reactjs.org/tutorial.html). The game has been refactored into Typescript components and hooks, providing a more stable, readable, and recomposable experience.
 
## Project Structure and Features
 ### Components
 The original tutorial consists of some 145 lines of code in `index.js`. While this is perfectly fine for an introductory tutorial, it is difficult to read and make effective changes to the code. In this version, each component is its own Typescript FunctionComponent with explicit type properties.


 ### State
While we can keep state in a class, such as the original `Game` class, this gets very confusing very quickly. So, state variables, such as the board tiles, are constructed and set with `useState`.

 ### Hooks
Hooks are used to efficiently register changes to the board. With `useCallBack()` , changes are only made when any of the dependencies update, saving resources. While this isn't quite a priority for a simple game like this one, it's still good practice. To calculate the winner, the calculate function is called with a `useEffect()` wrapper. If the board tiles change, then the winner is recalculated.

### Future Work
## Improvements
This is still a work in progress, and there are many ways to improve this:
- (re)implementing time travel
- AI/computer option
- utilizing game buttons (as opposed to writing distinct buttons each time)