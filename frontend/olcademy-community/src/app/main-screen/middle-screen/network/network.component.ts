// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-network',
//   templateUrl: './network.component.html',
//   styleUrls: ['./network.component.scss']
// })
// export class NetworkComponent implements OnInit {
//   num = [1, 2, 3, 3, 4, 4, 5, 5];



//   currentNetwork = "suggestions";

//   constructor() { }

//   ngOnInit(): void {
//   }

//   showSuggestions() {
//     document.querySelector('#suggestions-btn').classList.add("active");
//     document.querySelector('#request-received-btn').classList.remove("active");
//     document.querySelector('#request-sent-btn').classList.remove("active");
//     document.querySelector('#connections-btn').classList.remove("active");
//     this.currentNetwork = "suggestions"
//   }

//   showRequestsReceived() {
//     document.querySelector('#suggestions-btn').classList.remove("active");
//     document.querySelector('#request-received-btn').classList.add("active");
//     document.querySelector('#request-sent-btn').classList.remove("active");
//     document.querySelector('#connections-btn').classList.remove("active");
//     this.currentNetwork = "requestsReceived"
//   }

//   showRequestsSent() {
//     document.querySelector('#suggestions-btn').classList.remove("active");
//     document.querySelector('#request-received-btn').classList.remove("active");
//     document.querySelector('#request-sent-btn').classList.add("active");
//     document.querySelector('#connections-btn').classList.remove("active");
//     this.currentNetwork = "requestsSent"
//   }

//   showConnections() {
//     document.querySelector('#suggestions-btn').classList.remove("active");
//     document.querySelector('#request-received-btn').classList.remove("active");
//     document.querySelector('#request-sent-btn').classList.remove("active");
//     document.querySelector('#connections-btn').classList.add("active");
//     this.currentNetwork = "connections"
//   }

// }
