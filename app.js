// Cinfugures Express

const prisma = require("./utils/prisma");
const express = require(`express`)
const app = express()
const path = require('path')
const authRoute = require('./routes/authRoute')
const artistRoutes = require('./routes/artistsRoutes')
const genreRoute = require('./routes/genreRoutes')
const albumRoute = require('./routes/albumRoute')
const songRoute = require('./routes/songRoute')
const playlistRoute = require('./routes/playlistRoute')
const  logoutRoute  = require("./routes/logoutRoute");
const { renderExploreArtists, renderArtistPage, renderAlbumPage } = require("./controllers/pageController");
const session = require('express-session')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/artists", artistRoutes)
app.use('/api/genres',genreRoute)
app.use('/api/albums',albumRoute)
app.use('/api/songs',songRoute)
app.use('/api/playlists',playlistRoute)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60*24
    }
}))
app.use('/api/auth',logoutRoute)
app.use("/api/auth",authRoute)
app.use(express.static(path.join(__dirname, 'public')))
app.get('/',(req,res)=>{
    res.render('landing')
})
app.get("/explore-artists", renderExploreArtists)
app.get("/artist/:slug", renderArtistPage)
app.get("/album/:slug", renderAlbumPage)

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});
app.get('/genres', (req, res) => {
  res.render('genres');
});

app.get('/genre/:slug', (req, res) => {
  const genre = {
    name: 'Hip-Hop',
    slug: req.params.slug,
    icon: '🎤',
    tone: 'a',
    description: 'Rhythmic beats, sharp lyricism, and a culture built from the streets up.',
    songCount: 340,
    artists: [
      { name: 'Kr$na', slug: 'krsna', profileImage: '/images/krsna.jpg', albumCount: 45, songCount: 120 },
    ],
  };
  res.render('genre', { genre });
});


const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware)
app.listen(3000)
