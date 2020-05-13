import React from 'react';
import RenderReview from './RenderReview.js'

class Review extends React.Component {
  constructor(props){
    super(props)
    this.state =({
      review : []
    })
  }

  fetchReview = (result) => {
    this.setState({
      review : result
    }
  )}


  componentDidMount() {
      fetch(`https://developers.zomato.com/api/v2.1/reviews?res_id=${this.props.resID}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "user-key": "813e45c728695a8eb0b5a8c4dbe6b02c"
        }
      })
      .then(res => res.json())
      .then(
        result =>
          this.fetchReview(result.user_reviews)
        )
      .catch(err => { console.log(err);
      });
    }

  render() {
    return (
      <div>
        <div className="container">
          { this.state.review.length > 1 && (<RenderReview review= {this.state}/>)}
        </div>
      </div>
    );
  }
}

export default Review;
