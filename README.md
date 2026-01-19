# Star Wars Heroes List App
[Task](https://docs.google.com/document/d/1BsMWsckJKm0Hf_5ViuRyk3HVv3bAwbjDV57ANN-NHhc/edit?tab=t.0)
# This project was created with Vite + TypeScript.

[Demo Link](https://vasyl-zhyliakov.github.io/starnavi-test-task/)

# Technologies used

- HTML5
- Sass(SCSS)
- TypeScript
- Vite
- React
- React router
- Redux toolkit
- React Flow
- ViTest

# Follow these steps to run the project locally:

- Clone the repository:
  git clone https://github.com/Vasyl-Zhyliakov/starnavi-test-task.git
- Navigate to the project directory:
  cd Tako
- Install the dependencies (Make sure you have Node.js installed):
  npm install
- Start the development server:
  npm run dev
- You should see a local server link like:
  http://localhost:5173
  Open it in your browser to view the app.

## Main Page

- On the first launch, a request is made to the API and all character information is stored in the Redux store; further operations are done locally.
- The page displays a paginated list of characters. Pagination logic disables the «Previous» and «Next» buttons when on the first or last page.
- The current page is stored in the Redux store, so when returning from a character window, the correct pagination page is restored.
- The search box filters displayed characters, and pagination resets to the first page.

## Hero Page

- When navigating to a character page, a request is made to the API to fetch the list of films and starships associated with that character.
- Using React Flow, a graph is generated with three layers: character → films they appeared in → starships they used in those films.
