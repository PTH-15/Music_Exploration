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
app.get('/song/:slug', async (req, res) => {
  try {
    const song = await prisma.song.findUnique({
      where: { slug: req.params.slug },
      include: {
        artists: {
          include: {
            songs: {
              select: { title: true, slug: true },
              take: 5
            }
          }
        },
        albums: true,
        genres: true,
        playlists: true
      }
    });
 
    if (!song) {
      return res.status(404).render('404');
    }
 
    res.render('song', { song });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong loading this song.');
  }
});
// Add this route to app.js

app.get('/search', async (req, res) => {
  const q = (req.query.q || '').trim();

  if (!q) {
    return res.render('search', {
      query: '',
      artists: [], albums: [], songs: [], playlists: []
    });
  }

  try {
    const [artists, albums, songs, playlists] = await Promise.all([
      prisma.artist.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        take: 20
      }),
      prisma.album.findMany({
        where: { title: { contains: q, mode: 'insensitive' } },
        include: { artists: { select: { name: true, slug: true } } },
        take: 20
      }),
      prisma.song.findMany({
        where: { title: { contains: q, mode: 'insensitive' } },
        include: { artists: { select: { name: true, slug: true } } },
        take: 20
      }),
      prisma.playlist.findMany({
        where: {
          title: { contains: q, mode: 'insensitive' },
          visibility: 'PUBLIC'
        },
        include: { creator: { select: { username: true } } },
        take: 20
      })
    ]);

    res.render('search', { query: q, artists, albums, songs, playlists });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong running that search.');
  }
});
// Add these routes to app.js

// Browse playlists — Recently Added is real (sorted by createdAt).
// "Trending" needs a play-count/likes field on Playlist before it can be real.
app.get('/playlists', async (req, res) => {
  try {
    const recent = await prisma.playlist.findMany({
      where: { visibility: 'PUBLIC' },
      include: {
        creator: { select: { username: true } },
        songs: { select: { id: true } },
        genres: { select: { name: true, slug: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 24
    });

    res.render('playlists', { recent });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong loading playlists.');
  }
});

// Single playlist
app.get('/playlist/:slug', async (req, res) => {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { slug: req.params.slug },
      include: {
        creator: { select: { username: true, avatar: true, profileImage: true } },
        songs: {
          include: {
            artists: { select: { name: true, slug: true } },
            albums: { select: { title: true, slug: true, coverImage: true } }
          }
        },
        genres: true
      }
    });

    if (!playlist) {
      return res.status(404).render('404');
    }

    res.render('playlist', { playlist });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong loading this playlist.');
  }
});


const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware)
app.listen(3000)
