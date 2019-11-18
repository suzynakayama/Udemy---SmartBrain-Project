import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '7ce24b0ab2d14df6962c26ff0ab428ca'
 });
 

const particlesParams = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "density.value_area_": 800,
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "speed": 4,
        "size_min": 0.3
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "random": true,
      "speed": 1,
      "direction": "top",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
    },
  "modes": {
    "bubble": {
      "distance": 250,
      "duration": 2,
      "size": 0,
      "opacity": 0
    },
  }
}
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      input: "",
      imageUrl: "",
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input
      )
      .then(response => this.displayFaceBox (this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className="App">
        <Particles params={particlesParams} className="particles"/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
          box={this.state.box} 
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
