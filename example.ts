import { phetch } from "./mod.ts";

const response = await phetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2"); 
console.log(response.status); 
// e.g. 200 console.log(response.statusText); 
// e.g. "OK" const jsonData = await response.json();