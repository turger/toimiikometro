const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const GtfsRealtimeBindings = require('gtfs-realtime-bindings')
const request = require('request')
const _ = require('lodash')

const hslReq = {
  url: 'https://api.digitransit.fi/realtime/service-alerts/v1/',
  encoding: null
}

exports.getAlerts = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }

    request(hslReq, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const feed = GtfsRealtimeBindings.FeedMessage.decode(body)
        const alerts = []
        feed.entity.forEach(entity => {
          if (entity.alert) {
            const routeType = _.get(entity.alert, 'informed_entity[0].route_type')
            if (routeType === 1 || routeType === 400) alerts.push(entity.alert)
          }
        })
        return res.json(alerts)
      } else {
        return res.status(error.code).json({
          message: `Something went wrong. ${error.message}`
        })
      }
    })

    return new Error('Something went wrong.')
  })
})