import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import User from "./PopUpWindowLogin";
import { connect, useSelector } from "react-redux";
import { logout } from "../store";
import { setUserRSVP } from "../store/usersEvents";
import PopUpWindowLogin from "./PopUpWindowLogin";
import PopUpWindowSignUp from "./PopUpWindowSignUp";
import PopUpWindowLogged from "./PopUpWindowLogged";
import { Link } from "react-router-dom";
import { Grid, Popover } from "@material-ui/core";
import { useFrontEndStyles } from "../theme";
import UserProfileForm from "./UserProfileForm";
import { NewEventForm } from "./NewEventForm";

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

const MapContainer = ({
  isLoggedIn,
  handleClick,
  handleClickLogout, // may not need this
  firstname,
  confirmUserRSVP,
  usersEvents,
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUserComponent, setShowUserComponent] = useState(false);
  const [events, setEvents] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const classes = useFrontEndStyles();

  //const [event, setUsersEventRSVP] = useState(null);

  const [popoverLogin, setPopoverLogin] = useState(false);
  const toggleLogin = () => setPopoverLogin(!popoverLogin);

  const [popoverSignup, setPopoverSignup] = useState(false);
  const toggleSignup = () => setPopoverSignup(!popoverSignup);

  const onMarkerClick = (idx, lat, lng) => {
    //console.log(lat);
    const floatLat = parseFloat(lat);
    const floatLng = parseFloat(lng);
    setSelectedEvent(idx);
  };

  const openPopover = (event) => {
    setAnchor(event.target);
  };

  const onRSVPClick = (event) => {
    confirmUserRSVP(event);
  };

  //Get client location - (need to incorporate ask permission)
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await axios.get("/api/events");
        setEvents(events.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, []);

  const [newEvtPosition, setNewEvtPosition] = useState({});
  const handleDblClick = (e) => {
    console.log("DoubleClickEvent!!!!!!!!", e);
    setNewEvtPosition(e);
  };

  const [innerWidth, setInnerWidth] = useState(window.innerWidth * 0.8);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight * 0.15);

  window.addEventListener("resize", function (event) {
    setInnerWidth(Math.floor(window.innerWidth * 0.8));
    setInnerHeight(Math.floor(window.innerHeight * 0.15));
  });

  const popHeight = innerHeight * 1.6;
  const popWidth = innerWidth * 1.08;

  const buttonStyle = {
    marginTop: innerHeight,
    marginLeft: innerWidth,
    height: "60px",
    width: "60px",
  };
  console.log(innerHeight, popHeight, "****", innerWidth, popWidth, "--------");
  return (
    <div>
      <Container maxWidth="xl" sx={{ marginY: 12 }}>
        <Grid container spacing={5} style={{ justifyContent: "space-around" }}>
          <LoadScript
            mapIds={["61b5009386a6596e"]}
            googleMapsApiKey={"AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"}
          >
            <GoogleMap
              onClick={() => setSelectedEvent(null)}
              onDblClick={(e) =>
                handleDblClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
              }
              mapContainerStyle={mapStyles}
              zoom={13}
              center={mapCenter}
              options={{
                mapId: "61b5009386a6596e",
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {events
                ? events.map((event, idx) => {
                    return (
                      <Marker
                        key={idx}
                        id={idx}
                        position={{
                          lat: parseFloat(event.eventLat),
                          lng: parseFloat(event.eventLng),
                        }}
                        onClick={() => onMarkerClick(idx, event.lat, event.lng)}
                      >
                        {selectedEvent === idx ? (
                          <InfoWindow
                            position={{
                              lat: parseFloat(event.eventLat),
                              lng: parseFloat(event.eventLng),
                            }}
                            onCloseClick={() => setSelectedEvent(null)}
                          >
                            <div>
                              <div>{event.shortDesc}</div>
                              <div>
                                {event.datePart} from {event.timePart}
                              </div>
                              {console.log("API events", events)}
                              <button onClick={() => onRSVPClick(event)}>
                                RSVP
                              </button>
                            </div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    );
                  })
                : null}
              {newEvtPosition.lat && (
                <Marker position={newEvtPosition}>
                  {newEvtPosition.lat && (
                    <InfoWindow
                      position={{
                        lat: parseFloat(newEvtPosition.lat),
                        lng: parseFloat(newEvtPosition.lng),
                      }}
                      onCloseClick={() => setSelectedEvent(null)}
                    >
                      <div>
                        <NewEventForm position={newEvtPosition} />
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              )}
              {isLoggedIn ? (
                <div>
                  {/* <Popover
                  open={true}
                  >
                  <Card>
                  <CardActions> */}
                  <Button
                    style={{
                      backgroundColor: "#FFFFFF",
                      marginTop: 130, // was set to 70 in main
                      marginLeft: 46,
                      height: "60px",
                      width: "60px",
                    }}
                    variant="contained"
                    size="large"
                    color="#FFFFFF"
                    onClick={openPopover}
                  >
                    {firstname[0].toUpperCase()}
                  </Button>
                  {/* </CardActions>
                    </Card>
                  </Popover> */}
                  <Popover
                    open={Boolean(anchor)}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 200, left: 50 }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={() => setAnchor(null)}
                  >
                    <PopUpWindowLogged events={events} />
                  </Popover>
                </div>
              ) : (
                <div>
                  <Button
                    style={{
                      backgroundColor: "#FFFFFF",
                      marginTop: 130, // was set to 70 in main
                      marginLeft: 46,
                      height: "60px",
                      width: "60px",
                    }}
                    variant="contained"
                    size="large"
                    color="#FFFFFF"
                    onClick={openPopover}
                  >
                    LOGIN
                  </Button>
                  {/* </Box> */}
                  <Popover
                    open={Boolean(anchor)}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 200, left: 50 }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={() => setAnchor(null)}
                  >
                    <Card
                      elevation={3}
                      className={classes.popover}
                      variant="elevation"
                      style={{ background: "#FFFFFF" }}
                    >
                      <CardContent>
                        <CardHeader
                          align="center"
                          title={<Typography>Welcome!</Typography>}
                        />
                      </CardContent>

                      {popoverLogin ? (
                        <Popover
                          open={Boolean(anchor)}
                          anchorReference="anchorPosition"
                          isOpen={popoverLogin}
                          target="Login"
                          anchorPosition={{ top: 200, left: 50 }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={() => setAnchor(null)}
                        >
                          <PopUpWindowLogin />
                        </Popover>
                      ) : popoverSignup ? (
                        <Popover
                          open={Boolean(anchor)}
                          anchorReference="anchorPosition"
                          isOpen={popoverSignup}
                          target="Signup"
                          anchorPosition={{ top: 200, left: 50 }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={() => setAnchor(null)}
                        >
                          <PopUpWindowSignUp />
                        </Popover>
                      ) : (
                        <CardActions>
                          <Button
                            id="Login"
                            style={{
                              margin: "0 auto",
                              display: "flex",
                              background: "#94C973",
                            }}
                            onClick={toggleLogin}
                          >
                            Login
                          </Button>
                          <Button
                            id="Signup"
                            style={{
                              margin: "0 auto",
                              display: "flex",
                              background: "#68BBE3",
                            }}
                            onClick={toggleSignup}
                          >
                            Sign Up
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                  </Popover>
                </div>
              )}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Container>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    usersEvents: state.usersEvents,
    firstname: state.auth.firstname,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    confirmUserRSVP(event) {
      dispatch(setUserRSVP(event));
    },
  };
};

export default connect(mapState, mapDispatch)(MapContainer);
