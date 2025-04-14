import {Provider} from "react-redux";
import './App.css'
import store from './store';
import Pokemons from "./components/Pokemons";


function App() {
  
  return (
    <Provider store={store}>
      <div>
        <h1>REDUX-SAGA</h1>
        <Pokemons/>
      </div>
    </Provider>
  )
}

export default App;
