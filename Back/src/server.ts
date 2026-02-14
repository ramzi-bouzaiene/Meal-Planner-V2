import app from './app'
import { config } from './config/dotenvConfig'

const port = config.port || 5000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
