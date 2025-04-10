import express from 'express'
import os from 'os'
import cluster from 'cluster'
import process from 'process'

// // for single server creation
// const app = express()
// app.listen(8080, () => {
//   console.log('server started !')
//   console.log('Process id', process.pid)
//   console.log('Preprocess id !', process.ppid)
// })

// app.get(() => {
//   console.log('Hello')
// })

// // for cluster server creation -  devide server into multiple core
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
