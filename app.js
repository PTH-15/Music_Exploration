// Cinfugures Express

const prisma = require("./utils/prisma");
const express = require(`express`)
const app = express()
const path = require('path')
const artistRoutes = require('./routes/artistsRoutes')
const genreRoute = require('./routes/genreRoutes')
const albumRoute = require('./routes/albumRoute')
const songRoute = require('./routes/songRoute')
const playlistRoute = require('./routes/playlistRoute')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/artists", artistRoutes)
app.use('/api/genres',genreRoute)
app.use('/api/genres',albumRoute)
app.use('/api/genres',songRoute)
app.use('/api/genres',playlistRoute)
app.use(express.static(path.join(__dirname, 'public')))
app.get('/',(req,res)=>{
    res.render('landing')
})
app.get('/Explore-artists', (req, res) => {
  res.render('Explore-artists');
});

const errorMiddleware = require('./middleware/errorMiddleware')
app.use(errorMiddleware)
app.listen(3000)