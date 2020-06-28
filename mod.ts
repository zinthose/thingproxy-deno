import { config as envConfig } from "https://deno.land/x/dotenv/mod.ts";


interface EnvConfig {
  THINGPROXY?: string
}

// Load .env values
const config : EnvConfig = envConfig()

/**
 * Phetch a resource from the network through a running thingproxy. 
 * It returns a Promise that resolves to the Response to that request, 
 * whether it is successful or not.
 * 
 * *Syntax is identical to Fetch*
 * 
 * @remarks
 * ## Why?
 * This method was created to act as a temporary workaround to the Deno TLS protocol issue: 
 * "[error trying to connect: tls handshake eof #6427](https://github.com/denoland/deno/issues/6427)"
 * 
 * Setting of thingproxy is done via the `.env` file.
 * ## Example .env
 * ```sh
 * THINGPROXY=http://localhost:3000/fetch/
 * ```
 * 
 * ## Example Code
 * ```typescript 
 * const response = await phetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2"); 
 * console.log(response.status); 
 * // e.g. 200 console.log(response.statusText); 
 * // e.g. "OK" const jsonData = await response.json();
 * ```
 */
export async function phetch(input: string | Request | URL, init?: RequestInit | undefined): Promise<Response> {
  if (config && config["THINGPROXY"]) {
    if ( typeof input === 'string' ) {
      return await fetch((input as string), init)
    } else if (input instanceof Request) {
      const newRequest = new Request(config["THINGPROXY"]+(input as Request).url, (input as Request))
      return await fetch(newRequest, init)
    } else if (input instanceof URL) {
      const newURL = new URL(input as URL)
      newURL.href = config["THINGPROXY"]+newURL.href
      return await fetch(newURL, init)
    } else {
      throw new Error('phetch input type unexpected.  It should be: string | Request | URL');
    }
  } else {
    return await fetch(input, init)
  }
}