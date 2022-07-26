import type { IncomingMessage, ServerResponse } from 'http'
import axios from 'axios'

export default async function (req: IncomingMessage, res: ServerResponse) {
  // const {src, url} = req;
  const options = {
    responseType: 'stream',
    headers: {
      referer: String('http://www.nettruyenco.com'),
    },
  } as const

  const response = await axios.get(String('https://i338.ntcdntempv3.com/data/images/50543/778810/001.jpg?data=net'), options)

  return response.data.pipe(res)
}
