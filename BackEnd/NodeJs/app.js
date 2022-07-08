const express = require("express")

const app = express()
const port = 3000

app.get("/", (req,res)=> res.send('Hello, Express !'))

app.get('/api/pokemons/:id',(req,res)=> {
    const id = req.params.id
res.send(`Vous avez demander le pokémon n°${id}`)
})


app.listen(port,()=> console.log(`Notre application node est démarrée sur : http://localhost:${port}`))