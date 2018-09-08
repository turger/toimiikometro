import React from 'react'
import './Alerts.css'

const getAlertText = (alert, language) => {
  return alert.description_text.translation.filter(translation => translation.language === language)[0].text
}

const Alerts = ({alerts, language}) => (
  <div className="Alerts">
    { alerts.map((alert, i) =>
      <div className="Alerts__message" key={i}>
        {getAlertText(alert, language)}
      </div>
    )}
  </div>
)

export default Alerts