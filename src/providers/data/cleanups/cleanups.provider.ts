import Cleanup from '@/types/Cleanup'
import CleanupFilters from '@/types/CleanupFilters'
import {AxiosInstance} from 'axios'
import Location from '@/types/Location'
import Coords from '@/types/Coords'

export class CleanupsProvider {

  cleanups: { [key: string]: Cleanup } = {}

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  fetch(filters: CleanupFilters, origin: Coords): Promise<Cleanup[]> {
    const cleanups = [{
      "id": "a",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Azuqueca de Henares",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.53226431380108, "lng": -3.287590562345416}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "b",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Campo Real",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.35360852704833, "lng": -3.3721001112904148}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "c",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Carranque",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.18944296090534, "lng": -3.903682194266521}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "d",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Villatobas",
          "state": "Castilla-La Mancha",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 39.864767404504335, "lng": -3.311014641615202}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "e",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Rielves",
          "state": "Castilla-La Mancha",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 39.95067230441768, "lng": -4.202965952748309}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "f",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({

          "city": "Villaseca de la Sagra",
          "state": "Castilla-La Mancha",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 39.987743090263734, "lng": -3.896110308596872}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "g",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Moraleja de Enmedio",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.263330888127925, "lng": -3.8677678236919473}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "h",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Paracuellos de Jarama",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.47488356297338, "lng": -3.512124454237034}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "i",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location(
        {
          "city": "Batres",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.25000750102505, "lng": -3.9440685614065742}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }]

    this.cleanups = cleanups.reduce((acc, c) => ({
      ...acc, [c.id]: c
    }), {})

    return Promise.resolve(cleanups)
  }

  fetchOne(id: string): Promise<Cleanup> {
    return new Promise(resolve => {
      setTimeout(() =>
        resolve(this.cleanups[id]), 1000)
    })
  }

  fetchFromUser(userId: string): Promise<Cleanup[]> {
    return Promise.resolve([])
    return Promise.resolve([{
      "id": "a",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Azuqueca de Henares",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.53226431380108, "lng": -3.287590562345416}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "b",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Campo Real",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.35360852704833, "lng": -3.3721001112904148}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "c",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Carranque",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.18944296090534, "lng": -3.903682194266521}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "d",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Villatobas",
          "state": "Castilla-La Mancha",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 39.864767404504335, "lng": -3.311014641615202}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "e",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Rielves",
          "state": "Castilla-La Mancha",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 39.95067230441768, "lng": -4.202965952748309}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "f",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({

          "city": "Villaseca de la Sagra",
          "state": "Castilla-La Mancha",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 39.987743090263734, "lng": -3.896110308596872}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "g",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Moraleja de Enmedio",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.263330888127925, "lng": -3.8677678236919473}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "h",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location({
          "city": "Paracuellos de Jarama",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.47488356297338, "lng": -3.512124454237034}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": false,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }, {
      "id": "i",
      "user": {"username": "@lester_pr", "email": "", "picture": "/img/user-placeholder.png"},
      "description": "Shkodër is a town in the north of Albania. We stopped here to do a cleanup on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\n\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.",
      "weight": 2,
      "location": new Location(
        {
          "city": "Batres",
          "state": "Comunidad de Madrid",
          "country": "España",
          "countryCode": "ES"
        }, {"lat": 40.25000750102505, "lng": -3.9440685614065742}
      ),
      date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
      "done": true,
      "pictures": ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"]
    }])
  }

  publish(cleanup: Cleanup): Promise<void> {
    return Promise.resolve()
  }

}

