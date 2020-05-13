import React,{Suspense} from 'react';
import './App.css';
import Navbars from './Navbars'
import Review from './Review'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state =({
      resID : '',
      reviewToggle : false
    })
  }

  stateHandler = (ID)=> {
    this.setState({
      resID : ID
    })
  }

  containHandler = () => {
    this.setState({
      reviewToggle : true
    })
  }

  render() {
    return (<div className="App">
       <Navbars resMethod = {this.stateHandler} reviewMethod = {this.containHandler}/>
       <div >
      { this.state.resID &&(
        <Suspense fallback={<div>Loading...</div>}>
          <Review resID = {this.state.resID}/>
        </Suspense>
      )}
    </div>
    </div>);
  }
}

export default App;
