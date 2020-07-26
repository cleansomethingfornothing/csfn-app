import Activity from '@/types/Activity'
import ActivityFilters from '@/types/ActivityFilters'
import {AxiosInstance} from 'axios'
import Coords from '@/types/Coords'
import Location from '@/types/Location'
import {ActivityType} from '@/types/ActivityType'

export class ActivitiesProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  publish(cleanup: Activity): Promise<void> {
    return Promise.resolve()
  }

  fetch(filters: ActivityFilters, origin: Coords): Promise<Activity[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([{
        id: "1",
        type: ActivityType.alert,
        description: 'Shkodër is a town in the north of Albania. We stopped here to do a activity on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\\n\\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
        location: new Location({
            "city": "Azuqueca de Henares",
            "state": "Comunidad de Madrid",
            "country": "España",
            "countryCode": "ES"
          }, {"lat": 40.53226431380108, "lng": -3.287590562345416}
        ),
        date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
        pictures: ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"],
        "user": {"username": "@lester_prz", "email": "", "picture": "/img/user-placeholder.png"}
      }, {
        id: "2",
        type: ActivityType.alert,
        description: 'Shkodër is a town in the north of Albania. We stopped here to do a activity on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\\n\\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
        location: new Location({
            "city": "Campo Real",
            "state": "Comunidad de Madrid",
            "country": "España",
            "countryCode": "ES"
          }, {"lat": 40.35360852704833, "lng": -3.3721001112904148}
        ),
        date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
        pictures: ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"],
        "user": {"username": "@lester_prz", "email": "", "picture": "/img/user-placeholder.png"}
      }, {
        id: "3",
        type: ActivityType.alert,
        description: 'Shkodër is a town in the north of Albania. We stopped here to do a activity on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\\n\\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
        "location": new Location({
            "city": "Carranque",
            "state": "Comunidad de Madrid",
            "country": "España",
            "countryCode": "ES"
          }, {"lat": 40.18944296090534, "lng": -3.903682194266521}
        ),
        date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
        pictures: ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"],
        "user": {"username": "@lester_prz", "email": "", "picture": "/img/user-placeholder.png"}
      }, {
        id: "4",
        title: 'Let\'s clean something',
        type: ActivityType.event,
        description: 'Shkodër is a town in the north of Albania. We stopped here to do a activity on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\\n\\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
        location: new Location({
            "city": "Azuqueca de Henares",
            "state": "Comunidad de Madrid",
            "country": "España",
            "countryCode": "ES"
          }, {"lat": 40.53226431380108, "lng": -3.287590562345416}
        ),
        date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
        pictures: ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"],
        "user": {"username": "@lester_prz", "email": "", "picture": "/img/user-placeholder.png"}
      }, {
        id: "5",
        type: ActivityType.event,
        title: 'Clean together',
        description: 'Shkodër is a town in the north of Albania. We stopped here to do a activity on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\\n\\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
        location: new Location({
            "city": "Campo Real",
            "state": "Comunidad de Madrid",
            "country": "España",
            "countryCode": "ES"
          }, {"lat": 40.35360852704833, "lng": -3.3721001112904148}
        ),
        date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
        pictures: ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"],
        "user": {"username": "@lester_prz", "email": "", "picture": "/img/user-placeholder.png"}
      }, {
        id: "6",
        type: ActivityType.event,
        title: 'Clean something for nothing',
        description: 'Shkodër is a town in the north of Albania. We stopped here to do a activity on a small tributary of the river Bojana that leads to the Adriatic Sea as final destination.\\n\\nThis place is extremely dirty, we just took a bag of trash but it certainly needs many more to be clean.',
        "location": new Location({
            "city": "Carranque",
            "state": "Comunidad de Madrid",
            "country": "España",
            "countryCode": "ES"
          }, {"lat": 40.18944296090534, "lng": -3.903682194266521}
        ),
        date: new Date('Wed Jan 29 2020 00:00:00 GMT+0100 '),
        pictures: ["/img/placeholder.png", "/img/placeholder.png", "/img/placeholder.png"],
        "user": {"username": "@lester_prz", "email": "", "picture": "/img/user-placeholder.png"}
      }]), 1000)
    })
  }

  fetchOne(id: string): Promise<Activity> {
    return Promise.resolve(undefined)
  }

  update(action: Activity): Promise<void> {
    return Promise.resolve(undefined)
  }
}

