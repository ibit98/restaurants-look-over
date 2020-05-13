import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'


const RenderReview = (props) => {

  const Review = props.review;
  const options = Review.review.map( r =>
  <div><br></br><Card className="text-center" class="card">
  <Card.Header>
  <Button variant="primary">
  <Badge variant="light">{r.review.rating}</Badge> Star
  <span className="sr-only">unread messages</span>
</Button>
  </Card.Header>
  <Card.Body>
    <Card.Title>{r.review.rating_text}</Card.Title>
    <Card.Text>
      {r.review.review_text}
    </Card.Text>
    <Image src={r.review.user.profile_image} roundedCircle />
    <br></br>
    <br></br>
    <Button variant="primary">{r.review.user.name}</Button>
  </Card.Body>
  <Card.Footer className="text-muted">{r.review.review_time_friendly}</Card.Footer>
</Card><br></br></div>);
  return (
    <div> {options}</div>
  )
}

export default RenderReview
