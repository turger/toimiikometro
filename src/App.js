import React, { Component } from 'react'
import axios from 'axios'
import Loader from './Loader'
import Alerts from './Alerts'
import './App.css'

const dataUrl = 'https://us-central1-toimiikometro.cloudfunctions.net/getAlerts'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      alerts: [],
      language: 'fi'
    }
  }

  componentDidMount() {
    axios.get(dataUrl)
      .then(response => response.data)
      .then((alerts) => {
          this.setState({
            alerts,
            loading: false
          })
        }
      ).catch(function (err) {
      console.error('Error:', err)
    })
  }

  render() {
    const {alerts, loading, language} = this.state
    console.log(alerts)
    return (
      <div className="App">
        <h1>Toimiiko metro?</h1>
        { loading &&
          <Loader/>
        }
        { alerts.length === 0 && !loading &&
          <div className="Metro__status Metro__status--working">Metro toimii! 🎉</div>
        }
        {
          alerts.length > 0 &&
            <div>
              <div className="Metro__status Metro__status--broken">Metro ricci 🙀</div>
              <Alerts alerts={alerts} language={language}/>
            </div>
        }
      </div>
    )
  }
}

export default App
