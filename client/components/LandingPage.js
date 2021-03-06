import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  InfoBox,
} from "@react-google-maps/api";
import AllEventsView from "./AllEventsView";
import { NewEventForm } from "./NewEventForm";
import { useSelector } from "react-redux";
import {
  Button,
  Popover,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Paper,
} from "@material-ui/core";
import Welcome from "./Welcome";
import Login from "./Login";
import InfoModal from "./InfoModal";

//FEELING WILD
import uniqueRandomizer from "../../script/uniqueRandomizer";
import MapSingleEvent from "./MapSingleEvent";

const LandingPage = () => {
  //DISPLAY STATE HANDLER
  const [wildMode, setWildMode] = useState(false);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  //WILD MODE HANDLER
  const allEvents = useSelector((state) => state.events.events);
  const [randomOrder, setRandomOrder] = useState([]);
  useEffect(() => {
    setRandomOrder(uniqueRandomizer(allEvents.length));
  }, [allEvents, wildMode]);
  const wildModeHandler = () => {
    setAnchor(null);
    setWildMode(!wildMode);
  };
  const wildModeOff = () => {
    setWildMode(false);
  };

  //SCREEN SIZE HANDLER
  const [scrnAnchrLeft, setScrnAnchrLeft] = useState(
    Math.floor((window.innerWidth / 100) * 3)
  );
  window.addEventListener("resize", function (event) {
    setScrnAnchrLeft(Math.floor((window.innerWidth / 100) * 3));
  });

  //MODAL HANDLER
  const [showInfoModal, setShowInfoModal] = useState(false);
  const openInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  //NEW EVENT FORM HANDLER
  const [newEvtPosition, setNewEvtPosition] = useState({});
  const cancelNewEvt = () => {
    setNewEvtPosition({});
  };

  // POPOVER OPEN/CLOSE HANDLER
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.target);
  };
  const closePopover = () => {
    setAnchor(null);
  };

  return (
    <div>
      {showInfoModal ? <InfoModal setShowInfoModal={setShowInfoModal} /> : null}
      <LoadScript
        mapIds={["3f2b11fd3ce1fda"]}
        googleMapsApiKey={"AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"}
      >
        <GoogleMap
          onClick={() => {
            [setNewEvtPosition({}), setWildMode(false)];
          }}
          onDblClick={(e) => {
            isLoggedIn
              ? setNewEvtPosition({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                })
              : null;
          }}
          mapContainerStyle={{ height: "100vh", width: "100vw" }}
          zoom={13}
          center={{ lat: 40.7589, lng: -73.9851 }}
          options={{
            mapId: "3f2b11fd3ce1fda",
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            disableDoubleClickZoom: true,
          }}
        >
          <div>
            <button className="infoWindowButton" onClick={openInfoModal}>
              ?
            </button>

            {wildMode ? (
              <MapSingleEvent
                randomOrder={randomOrder}
                wildModeOff={wildModeOff}
              />
            ) : (
              <div>
                <AllEventsView />

                {/* NEW EVENT START */}

                {newEvtPosition.lat && (
                  <Marker position={newEvtPosition}>
                    {newEvtPosition.lat && (
                      <InfoWindow
                        position={{
                          lat: parseFloat(newEvtPosition.lat),
                          lng: parseFloat(newEvtPosition.lng),
                        }}
                        onCloseClick={cancelNewEvt}
                      >
                        <div>
                          <NewEventForm position={newEvtPosition} />
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                )}

                {/* NEW EVENT END */}
              </div>
            )}

            <div>
              <Button
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FFFFFF",
                  marginTop: `${scrnAnchrLeft + 10}px`,
                  marginLeft: `${scrnAnchrLeft + 10}px`,
                  height: "60px",
                  width: "60px",
                }}
                variant="contained"
                size="large"
                color="#FFFFFF"
                onClick={(e) => {
                  setNewEvtPosition({});
                  openPopover(e);
                }}
              >
                {isLoggedIn ? (
                  <img
                    style={{
                      borderRadius: 10,
                      height: 65,
                      width: 65,
                    }}
                    align="center"
                    src="/usericon.gif"
                  />
                ) : (
                  <Typography color="000000">LOGIN</Typography>
                )}
              </Button>
              <Popover
                open={Boolean(anchor)}
                anchorReference="anchorPosition"
                anchorPosition={{
                  top: `${scrnAnchrLeft}`,
                  left: `${scrnAnchrLeft}`,
                }}
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
                {isLoggedIn ? (
                  <div>
                    <Welcome
                      closePopover={closePopover}
                      wildModeHandler={wildModeHandler}
                    />
                  </div>
                ) : (
                  <Login />
                )}
              </Popover>
            </div>

            <Button
              style={{
                transform: "translate(-6%, -72%)",
                float: "right",
                display: "inline-block",
              }}
            >
              <img src="/URBAN_ICON.png" height="100" />
            </Button>
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LandingPage;
