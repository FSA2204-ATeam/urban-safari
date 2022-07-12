import React, { useState, useEffect, useReducer } from "react";
import {
  setUserEvents,
  removeUsersEvent,
  fetchUserReviews,
} from "../store/usersEvents";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Box,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Container,
} from "@material-ui/core";
import MyEventReview from "./MyEventReview";
import SingleEvent from "./SingleEvent";

const MyEvents = () => {
  const user = useSelector((state) => state.auth);
  const myEvents = useSelector((state) => state.usersEvents.events);
  const myReviews = useSelector((state) => state.usersEvents.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserEvents(user.id));
    dispatch(fetchUserReviews());
  }, []);

  const onRemoveClick = (eventId, userId) => {
    dispatch(removeUsersEvent(eventId, userId));
  };

  const [onShowDetailsClick, setOnShowDetailsClick] = useState(null);
  const [onReviewClick, setOnReviewClick] = useState(null);

  console.log("MY REVIEWS", myReviews);
  return (
    <div>
      <h1>{`${user.username}'s Events`}:</h1>
      {myEvents.map((event, idx) => {
        return (
          <div key={event.id}>
            <Card
              elevation={3}
              variant="elevation"
              style={{ background: "lightGray" }}
            >
              <h1>{event.name}</h1>
              <p>
                {event.datePart} from {event.timePart}
              </p>
              <Button
                onClick={() => {
                  onShowDetailsClick !== null && onShowDetailsClick === idx
                    ? setOnShowDetailsClick(null)
                    : setOnShowDetailsClick(idx);
                  onReviewClick !== null && onShowDetailsClick !== onReviewClick
                    ? null
                    : setOnReviewClick(null);
                }}
              >
                Details
              </Button>
              <Button
                onClick={() => {
                  onReviewClick !== null && onReviewClick === idx
                    ? setOnReviewClick(null)
                    : setOnReviewClick(idx);
                  onShowDetailsClick !== null &&
                  onReviewClick !== onShowDetailsClick
                    ? null
                    : setOnShowDetailsClick(null);
                }}
              >
                Review
              </Button>
              <Button onClick={() => onRemoveClick(event.id, user.id)}>
                Remove
              </Button>
              {onShowDetailsClick === idx ? (
                <SingleEvent props={event} />
              ) : null}
              {onReviewClick === idx ? <MyEventReview props={event} /> : null}
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MyEvents;
