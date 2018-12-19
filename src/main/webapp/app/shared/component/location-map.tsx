import './location-map.scss';
import React, { createRef, Component } from 'react';
import { Button } from 'reactstrap';
import { Map, TileLayer, Marker, Popup, ZoomControl, withLeaflet } from 'react-leaflet';
import Control from 'react-leaflet-control';
import { ReactLeafletSearch } from 'react-leaflet-search';
import hash from 'object-hash';

export interface ILocMapState {
  latlng: { lat: number, lng: number };
  address: string;
}

export interface IPointMapProps {
  latlng?: { lat: number, lng: number };
  onLocationPickEnd: Function;
}

class PointMap extends React.Component<IPointMapProps, ILocMapState> {

  public static defaultProps: Partial<IPointMapProps> = {
    latlng: { lat: 23.8103, lng: 90.4125 }
  };

  state: ILocMapState = {
    latlng: this.props.latlng,
    address: ''
  };

  mapRef = createRef<Map>();
  markerRef = createRef<Marker>();

  handleLocateMe = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  }

  handleReset = () => {
    this.setState({
      latlng: this.props.latlng,
      address: ''
    });
    this.props.onLocationPickEnd(this.props.latlng, '');
  }

  handleLocationFound = e => {
    this.setState({
      latlng: e.latlng,
      address: ''
    });
    this.props.onLocationPickEnd(e.latlng, '');
  }

  handleMarkerDragging = e => {
    const marker = this.markerRef.current;
    if (marker != null) {
      this.setState({
        latlng: marker.leafletElement.getLatLng(),
        address: ''
      });
      this.props.onLocationPickEnd(marker.leafletElement.getLatLng(), '');
    }
  }

  handlePopup = searchInfo => {
    this.setState({
      latlng: { lat: searchInfo.latLng[0], lng: searchInfo.latLng[1] },
      address: searchInfo.info
    });
    this.props.onLocationPickEnd({ lat: searchInfo.latLng[0], lng: searchInfo.latLng[1] },
            searchInfo.info);
  }

  render() {
    const CustomMarker = ({ address }) =>
      <Marker
        position={this.state.latlng}
        draggable
        onDragend={this.handleMarkerDragging}
        ref={this.markerRef}>
        <Popup>{address}</Popup>
      </Marker>;

    const WrappedReactLeafletSearch = withLeaflet(ReactLeafletSearch);

//    :{LATITUDE},{LONGITUDE}
    const SearchComponent = props => (
      <WrappedReactLeafletSearch
        openSearchOnLoad
        closeResultsOnClick={false}
        inputPlaceholder="Please search your addresses here"
        position="topleft"
        zoom={10}
        showMarker
        showPopup
        popUp={ this.handlePopup }
        provider="OpenStreetMap"
        providerOptions={{ region: 'bd' }} />
    );

    return (
      <Map center={this.state.latlng}
        animate
        length={4}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}
        zoomControl={false}
        zoom={13}>
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchComponent />
        <Control position="bottomright" >
          <Button color="primary" onClick={this.handleLocateMe}>
            Locate me!
          </Button>
        </Control>
        <Control position="bottomright" >
          <Button color="primary" onClick={this.handleReset}>
            Reset!
          </Button>
        </Control>
        <CustomMarker address={this.state.address}/>
      </Map>
    );
  }
}

export default PointMap;
