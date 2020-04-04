import {Environment, GoogleMap, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps'
import Coords from '@/types/Coords'

export default class Map {

  static zoom = 16

  map: GoogleMap
  origin: Coords
  markers: Marker[] = []
  isInput: boolean

  constructor({element, origin, isInput}: { element: string, origin: Coords, isInput: boolean }) {
    this.origin = origin
    this.isInput = isInput
    Environment.setBackgroundColor('#FFFFFF')
    this.map = GoogleMaps.create(element, {
      camera: {
        target: {
          lat: origin.lat,
          lng: origin.lng
        },
        zoom: Map.zoom
      },
      controls: {
        myLocationButton: true
      }
    });

    this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(this.myLocationClicked.bind(this))

    if (isInput) {
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.mapClicked.bind(this))
    }
  }

  public addMarker(position: Coords) {
    const marker = this.map.addMarkerSync({
      icon: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary-shade'),
      animation: 'DROP',
      position: {
        lat: position.lat,
        lng: position.lng
      }
    });
    this.markers.push(marker)
  }

  public getSelectedPosition(): Coords {
    return this.markers[0].getPosition()
  }

  private mapClicked(params) {
    this.positionSelected(params[0])
  }

  private myLocationClicked() {
    this.map.getMyLocation()
      .then((location) => {
        if (this.isInput) {
          this.positionSelected(location.latLng)
        }
        this.moveCamera(location.latLng)
      })
  }

  public positionSelected(position: Coords) {
    this.markers.splice(0, 1)[0].remove()
    this.addMarker(position)
  }

  public moveCamera(position) {
    this.map.animateCamera({
      zoom: Map.zoom,
      target: position,
      duration: 500
    })
  }
}
