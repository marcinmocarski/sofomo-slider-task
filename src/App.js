import './App.scss';
import Slider from './components/Slider/Slider';
import sliderData from './data/sliderData';

function App() {
  return (
    <div className="App">
      <Slider slidesData={sliderData} />
    </div>
  );
}

export default App;
