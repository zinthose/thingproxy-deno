// Use the local copy
// import { phetch } from "./mod.ts";

// pull from GitHub master branch
import { phetch } from "https://raw.githubusercontent.com/zinthose/thingproxy-deno/master/mod.ts";

const response = await phetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2"); 
console.log(response.status); 
// e.g. 200 console.log(response.statusText); 
// e.g. "OK" const jsonData = await response.json();