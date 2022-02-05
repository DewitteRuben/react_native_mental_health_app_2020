# React Native front end of PsyTrack

More information on this project can be found on my website [here](https://www.rubendewitte.com/projects/mheapp).

The ReactJS frontend (Web portal) of this project can be found [here](https://github.com/DewitteRuben/reactjs_mental_health_portal).

The NodeJS backend (API) of this project can be found [here](https://github.com/DewitteRuben/backend_nodejs_ts_mental_health_app_2020).


## Setup
### API
Create a .env.json file, in the root of this project, that includes the following:

```json
{ "BASE_API_LOCAL": "http://192.168.178.34:3000/api" }
```

Replace the value of the 'BASE_API_LOCAL' with the host and port where the NodeJS backend is running on, appended with "/api".

## Build

### Expo

By simply running:

```
npm install
expo r -c
```

The project will launch in development mode (thanks to Expo).
