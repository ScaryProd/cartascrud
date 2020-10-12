import express from 'express'
import {PORT} from './confs.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import {Router} from './router.js'
import CardsDatasource from './datasources/cards_datasource.js'

import axios from 'axios'

let pokemons = {}

let cardsDataSource = new CardsDatasource()

async function getPokemon(pokemonValue) {
  try {
    let pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`);
    return pokemonData;
  } catch (error) {
    console.error(error);
  }
  
}

export class Server {
  constructor(){
    let app = express()

    let auth_middle_ware = (req, res, next) => {
      // do auth, if no auth handle the error
      next()
    }
    
    app.use(auth_middle_ware)
    app.use(cors())
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json());
    new Router({app})
    
    //get
    app.get('/card/:id', async (req, res) => {
      let card = await cardsDataSource.get({id: req.params.id, filter: req.query, body: req.body})
      res.send(card)
    })

    //getAll
    app.get('/cards/', async (req, res) => {
      let card = await cardsDataSource.get({filter: req.query})
      res.send(card)
    })

    //create
    app.post('/card/create/:id', async (req, res) => {
      // handle of req
    })

    //update
    app.put('/card/update/:id', async (req, res) => {

    })

    //delete
    app.delete('/card/delete/:id', async (req, res) => {

    })

    app.get('/:pokemonName', async (req,res) => {
      //console.log('recieved:')
      console.log(req.params.pokemonName)
      let pokemonValue = req.params.pokemonName
      let pokemon
      if(req.params.pokemonName in pokemons){
        console.log('found:')
        pokemon = pokemons[req.params.pokemonName]
      }
      else{
        try {
          console.log('awaiting:')
          pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`);
          pokemons[pokemonValue] = pokemon;
        } catch (error) {
          console.error(error);
        }
      }

      res.send(pokemon.data)
    })

    

    app.listen(PORT, () => {
      console.log('Example app')
    })
  }
}