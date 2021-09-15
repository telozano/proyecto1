const axios = require('axios');
const express = require('express');
const http = require('http');

const app = express();

app.set('view engine','ejs');

async function pokemon(path){
  try {
          const data = await axios.get(path);
          console.log(data);
          const pokemones = data;
          return pokemones;
  }catch(err){
          console.log(err);
  }

}

app.get('/:id?',(req,rest)=>{
     console.log(req.params);
     const path = (req.url == '/')?"https://pokeapi.co/api/v2/pokemon/":"https://pokeapi.co/api/v2/pokemon/"+req.params.id+"/";
     console.log('ruta:',path);
     const pokemones = pokemon(path);   
     pokemones.then((pokemones)=>{
     if(req.url=='/'){
      rest.status(200).render('pokemones',{pokemones: pokemones.data.results});
     }else{
      rest.status(200).render('pokemon',{pokemones: pokemones.data});
     }

    })
    .catch((error)=>{
      console.log("error");
    })
});

http.createServer(app).listen(8001,()=>{
    console.log("iniciando por el puerto 8001");
});
