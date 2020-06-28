Phetch a resource from the network through a running [thingproxy](https://github.com/zinthose/thingproxy) ([Docker Image Available](https://hub.docker.com/r/zinthose/thingproxy)). 
It returns a Promise that resolves to the Response to that request, 
whether it is successful or not.

*Syntax is identical to Fetch*

## Why?
This method was created to act as a temporary workaround to the Deno TLS protocol issue: 
"[error trying to connect: tls handshake eof #6427](https://github.com/denoland/deno/issues/6427)"

Setting of thingproxy is done via the `.env` file.
## Example .env
```sh
THINGPROXY=http://localhost:3000/fetch/
```

## Example Code
```typescript 
const response = await phetch("https://postman-echo.com/get?foo1=bar1&oo2=bar2"); 
console.log(response.status); 
// e.g. 200 console.log(response.statusText); 
// e.g. "OK" const jsonData = await response.json();
```