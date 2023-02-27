/*
npm run deploy
via
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f
*/
// import InstancedGraph from './components/InstancedGraph'; // Playground for implementing Instances
// import Graph0Component from './components/Graph0Component'; // Debugging + Refactor Graph
// import NodeSlider from './components/NodeSlider'; // Debugging for Sliders + Node Count
// import SimpleGraph from './components/SimpleGraph'; // Debugging for Sliders + Animations
import WordGraph from './components/WordGraph'; // Working Prototype of WordVec + Edge Visualizations

function App() {
  return (
    <div id="App">
      {/* <Graph0Component /> */}
      {/* <InstancedGraph /> */}
      {/* <NodeSlider /> */}
      {/* <SimpleGraph /> */}
      <WordGraph />
    </div>
  );
}

export default App;
