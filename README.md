# 🚀 Node.js Express Server – Single vs Cluster Mode

👨‍💻 Author
Shahbaz
📧 mdshahbaz8298@gmail.com

This project demonstrates how to run an Express.js server in two ways:

1. **Single Process Mode** – A basic server using one CPU core.
2. **Cluster Mode** – A scalable server using all available CPU cores via Node.js `cluster` module.

---

## 🧪 1. Normal Express Server (Single Core)

This is the simplest way to create an Express server using a single process:

```js
// server-single.js

import express from 'express'
import process from 'process'

const app = express()

app.listen(8080, () => {
  console.log('Server started!')
  console.log('Process ID:', process.pid)
  console.log('Parent Process ID:', process.ppid)
})

app.get('/', (req, res) => {
  res.send('Hello from Single Server! Process ID: ' + process.pid)
})

##  OUTPUT For - Normal Express Server (Single Core) 
Server started!
Process ID: 14832
Parent Process ID: 7420
##-----------------------------------------------------------------------

🧩 2. Clustered Express Server (Multi-Core)
This setup creates a worker for each CPU core to handle requests concurrently:

// server-cluster.js

import express from 'express'
import os from 'os'
import cluster from 'cluster'
import process from 'process'

const cpuCore = os.cpus().length

if (cluster.isPrimary) {
  for (let i = 0; i < cpuCore; i++) {
    const worker = cluster.fork()
    console.log(`Worker ${worker.id} started with PID ${worker.process.pid}`)
  }
} else {
  try {
    const app = express()
    app.listen(8080, () => {
      console.log(`server started on 8080 ! || Process Id: ${process.pid}`)
    })
    app.get('/', (req, res) => {
      res.send(process.pid)
    })
  } catch (error) {
    console.log('cluster creation failed !', error.message)
  }
}

##  OUTPUT For - Clustered Express Server (Multi-Core)
Worker 1 started with PID 10124
Worker 2 started with PID 10126
Worker 3 started with PID 10128
Worker 4 started with PID 10130

