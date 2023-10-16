import { Component, OnDestroy, OnInit } from '@angular/core';
import axios from "axios"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  apiAvailable: boolean | null = null
  apiCheckInterval: number | undefined = undefined

  ngOnInit(): void {
    axios.get("/api").then(() => {
      this.apiAvailable = true
    }).catch(() => {
      this.apiAvailable = false
    })

    this.apiCheckInterval = setInterval(() => {
      axios.get("/api").then(() => {
        this.apiAvailable = true
      }).catch(() => {
        this.apiAvailable = false
      })
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.apiCheckInterval)
  }


}
