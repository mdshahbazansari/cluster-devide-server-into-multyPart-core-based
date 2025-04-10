# 🚀 Node.js Express Server – Single vs Cluster Mode

## 👨‍💻 Author  
**Shahbaz**  
📧 mdshahbaz8298@gmail.com

This project demonstrates how to run an Express.js server in two modes:

1. **Single Process Mode** – A basic server using one CPU core.  
2. **Cluster Mode** – A scalable server using all available CPU cores via Node.js `cluster` module.

---

## 🧪 1. Normal Express Server (Single Core)

This is the simplest way to create an Express server using a single process:

## 🧪 2. Clustered Express Server (Multi-Core)

This setup uses Node.js's cluster module to fork the server into multiple workers, one for each CPU core:

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
      console.log(`Server started on port 8080 || Worker PID: ${process.pid}`)
    })

    app.get('/', (req, res) => {
      res.send('Hello from Clustered Server! Process ID: ' + process.pid)
    })
  } catch (error) {
    console.log('Cluster creation failed!', error.message)
  }
}

#OUPUT

##  OUTPUT-1 - server-single.js
Server started!
Process ID: 14832
Parent Process ID: 7420

##  OUTPUT-2 - server-cluster.js
Worker 1 started with PID 10124
Worker 2 started with PID 10126
Worker 3 started with PID 10128
Worker 4 started with PID 10130


