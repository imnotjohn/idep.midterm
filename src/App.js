/*
npm run deploy
via
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f
*/
// import Graph from './components/Graph';
// import PrimitiveGraph from './components/PrimitiveGraph';
// import InstancedGraph from './components/InstancedGraph';
// import Graph0Component from './components/Graph0Component';
// import NodeSlider from './components/NodeSlider';
// import WordGraph from './components/WordGraph';
import SimpleGraph from './components/SimpleGraph';

function App() {
  return (
    <div id="App">
      {/* <Graph0Component /> */}
      {/* <InstancedGraph /> */}
      {/* <NodeSlider /> */}
      {/* <WordGraph /> */}
      <SimpleGraph />
    </div>
  );
}

export default App;
