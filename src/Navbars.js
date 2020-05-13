import React from 'react';
import Suggestions from './Suggestions.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


class Navbars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '...',
      city: '...',
      flagURL : 'https://img.favpng.com/21/1/16/iphone-5s-ios-progress-bar-icon-png-favpng-iwpsy6xNDUHuUWVLMP7mHcxTj.jpg',
      latitude : '',
      longitude:  '',
      restaurant : '',
      suggestions : [],
      suggToggle: false
    };
    this.textInput = React.createRef();
    ///this.textInput.current.focus(); to be done later

  }

  setPosition = (position) => {
    this.setState({
      latitude : position.coords.latitude,
      longitude: position.coords.longitude
    },()=>{
        fetch(`https://developers.zomato.com/api/v2.1/cities?lat=${this.state.latitude}&lon=${this.state.longitude}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "user-key": "813e45c728695a8eb0b5a8c4dbe6b02c"
          }
        })
        .then(res => res.json())
        .then(
          result =>
            this.setState({
              country : result.location_suggestions[0].country_name,
              city : result.location_suggestions[0].name,
              flagURL : result.location_suggestions[0].country_flag_url
            })
        )
        .catch(err => { console.log(err);
        });
    })
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setPosition(position);
      })
    }


    renderSuggestions = () => {
      fetch(`https://developers.zomato.com/api/v2.1/search?q=${this.state.restaurant}&lat=${this.state.latitude}&lon=${this.state.longitude}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "user-key": "813e45c728695a8eb0b5a8c4dbe6b02c"
        }
      })
      .then(res => res.json())
      .then(
        result =>
          this.setState({
            suggestions : result.restaurants,
            suggToggle : true
          })
      )
      .catch(err => { console.log(err);
      });
    }

    handleInputChange = (event)=>{
      this.setState({
        restaurant : event.target.value
      });
      this.renderSuggestions();
    }

    selectedSuggestion = (choice) =>{
      this.setState({
        restaurant : choice.name,
        suggToggle : false
      });
      this.props.resMethod(choice.id);
    }

  render() {
    return (
      <Navbar className='container' bg="light" expand="lg">
  <Navbar.Brand href="#home"><img src= {this.state.flagURL} alt="National Flag"height="20" width="30"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link className = "Container" href="#">Country: {this.state.country}</Nav.Link>
      <Nav.Link href="#">City: {this.state.city}</Nav.Link>
    </Nav>
    <Form inline  >
      <div>
        <FormControl type="text" placeholder="Search..." ref={this.textInput} className="mr-sm-2" value={this.state.restaurant} onChange={this.handleInputChange}/>
        <div className = "show-up">  {this.state.suggToggle && (
        <Suggestions results={this.state.suggestions} method={this.selectedSuggestion}/>)}
        </div>
      </div>
      <Button  variant="outline-primary">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    )
  }
};



export default Navbars;
