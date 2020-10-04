import express from 'express'
import {PORT} from './confs.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import {Router} from './router.js'

import axios from 'axios'

let pokemons = {}

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