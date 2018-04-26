import React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { Polyline, AnimatedRegion, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.8025259;
const LONGITUDE = -122.4351431;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var locations = [];
       

export default class ExploreScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        mapRegion: {
            latitude: 32.78,
            longitude: -96.76,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        lastLat: null,
        lastLong: null,
        should_refresh: true,
        matrix: [],
    };


    componentWillUnmount()
    {
        clearInterval(this.intervalID);
        navigator.geolocation.clearWatch(this.watchID);
    }
    
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
            5000
        );
    }

    tick()
    {   
        navigator.geolocation.getCurrentPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
              latitude:       this.state.mapRegion.latitude || position.coords.latitude,
              longitude:      this.state.mapRegion.longitude || position.coords.longitude,
              latitudeDelta:  this.state.mapRegion.latitudeDelta || LATITUDE_DELTA,
              longitudeDelta: this.state.mapRegion.longitudeDelta || LONGITUDE_DELTA
            }
            this.onRegionChange(region, position.coords.latitude, position.coords.longitude);
            locations = [...locations, [position.coords.latitude, position.coords.longitude]];
      
        },
          (error) => {Alert.alert(error.toString())},
          {
              enableHighAccuracy: true, 
              timeout:            1200, 
              maximumAge:         10000         
          });
        this.updateLocations();

        if(locations != null)
        {
            var matrix = this.listToMatrix(locations);
            this.setState({matrix: matrix});
        
            console.log(this.state.matrix);
        }
    }

    listToMatrix(list) {
        var matrix = [], i, k;
    
        for (i = 0; i < list.length / 2; i+=1) {
        
            matrix.push({latitude: list[i][0], longitude: list[i][1]});   
        }
    
        return matrix;
    }

      onMapPress(e) {
        Alert.alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
          this.setState({
            marker: [{ coordinate: e.nativeEvent.coordinate }]
          })
        }

        onRegionChange(region, lastLat, lastLong) {
            this.setState({
              mapRegion: region || this.state.mapRegion,
              // If there are no new values set the current ones
              lastLat: lastLat || this.state.lastLat,
              lastLong: lastLong || this.state.lastLong
            });
          }

        async sendLocation() {
            fetch('http://67.205.151.206/ehx.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify
                ({
                    latitude: this.state.lastLat,
                    longitude: this.state.lastLong,
                    time:  Date.now(),
                })
            }).then((response) => response.text()).then((responseFromServer) =>
            {
             //   alert(responseFromServer);
            }).catch((error) =>
            {
                console.error(error);
            });     
        }

        updateLocations = () => {
            this.sendLocation();
        }

        updateRegion = (region) => {
            this.setState({mapRegion: region});
        }

          render() {


            let line = null;
            
            if(locations)
            line = <Polyline
            coordinates={this.state.matrix.map(item => {
                return {
                    latitude: item.latitude,
                    longitude: item.longitude,
                }
            })}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={1}
            lineCap="round"
            geodesic={false}/>


            return (
              <View style={{flex: 1}}>
                <MapView
                  style={styles.map}
                  region={this.state.mapRegion}
                  onRegionChangeComplete={this.updateRegion}
                  showsUserLocation={true}
                  followUserLocation={true}>
                  {line}
                <MapView.Marker
                    coordinate={{
                      latitude: (this.state.lastLat) || 37.8025259,
                      longitude: (this.state.lastLong) || -122.4351431,     
                    }}
                    description="Your Position"
                    title="You Are Here"
                    >
                    </MapView.Marker>
                
                </MapView>
              </View>
            );
          }
}


var styles = StyleSheet.create({
    radius: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 112, 255, .3)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',  
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    map: {  
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
      },
      container: {
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
      }
});
