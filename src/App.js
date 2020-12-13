import './App.scss';
import Slider from './components/Slider/Slider';
import sliderData from './data/sliderData';

function App() {
  return (
    <div className="App">
      <Slider slidesData={sliderData} title={"SPRING 2019"} subtitle={"Lorem ipsum dolor sit amet consectetur adipiscing elit"} />
    </div>
  );
}

export default App;
