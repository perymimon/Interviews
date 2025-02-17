Task Overview:
Implement the following component, using any library of your choice. The component should
include:
1. Filter Buttons:
   ○ Three toggleable buttons labeled: Planets, People, and Films.
   ○ Each button can be selected or deselected.
2. Search Input:
   ○ An input field for entering search text.
   ○ A loader indicator (or a dedicated loader component) should be displayed next to
   the search field.
   ○ When the user types, the loader should appear until the new search results are
   fully fetched and displayed, regardless of whether data fetching has started.

3. Results List:
   ○ A list that displays search results (name field or title field if name not exist).
   ○ As the user types in the search bar, the list should update with autocomplete
   suggestions based on the currently selected button category.
   ○ Clicking on an item in the list should display the complete JSON object for that
   item.

● Ensure that the data fetching is efficient. There is no need to implement caching or
virtualization techniques.
- Please note that styling or “pixel perfect” is not the primary focus of this task. We
  are more interested in seeing how you divide components, leverage React features,
  and ensure efficient search performance when using the external API.
  Use starwars api for search https://swapi.dev/# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
