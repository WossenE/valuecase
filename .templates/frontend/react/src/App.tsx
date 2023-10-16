import {useEffect, useState} from 'react'
import ValuecaseLogo from "./assets/valuecase_logo_plain_back.png"
import './App.css'
import axios from "axios";
import FileUploadExample from "./FileUploadExample";

function App() {
  const [apiAvailable, setApiAvailable] = useState<boolean | undefined>(undefined)

  useEffect(() => {
      let stopped = false

      axios.get("/api").then(() => {
          if ( stopped ) return
          setApiAvailable(true)
      }).catch(() => {
          if ( stopped ) return
          setApiAvailable(false)
      })

      const interval = setInterval(() => {
        axios.get("/api").then(() => {
            setApiAvailable(true)
        }).catch(() => {
            setApiAvailable(false)
        })
      }, 1000)

      return () => {
          stopped = true
          clearInterval(interval)
      }
  })

  return (
      <div className={"centeringContainer"}>
          <div className={"card"}>
              <img className={"logo"} src={ValuecaseLogo}/>
              <div className={"welcome"}>Tech Challenge – React ⚛️</div>
              <hr/>
              <div>API available: {apiAvailable === undefined ? '⏳' : apiAvailable ? '✅' : '❌'}</div>

              {apiAvailable && <>
                  <hr />
                  <FileUploadExample />
              </>}
          </div>
      </div>
  )
}

export default App
