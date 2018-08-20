'use strict'

module.exports = {
  endpoint: process.env.API_ENDPOINT || 'http://api.ricardoromo.co',
  serverHost: process.env.SERVER_HOST || 'http://robotica.ricardoromo.co',
  mqttHost: process.env.MQTT_HOST || 'mqtt://api.ricardoromo.co',
  apiToken: process.env.API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsYXR6aSIsImFkbWluIjp0cnVlLCJwZXJtaXNzaW9ucyI6WyJtZXRyaWNzOnJlYWQiXSwiaWF0IjoxNTAyMzkzNDExfQ.XMKKy9sgqA0TDKjCcgA4_784H2wP7RVQocttSTE-RTU'
}
