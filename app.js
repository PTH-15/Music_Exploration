const prisma = require("./utils/prisma");
const express = require(`express`)
const app = express()
const path = require('path')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/',(req,res)=>{
    res.render('landing')
})
app.get('/Explore-artists', (req, res) => {
  res.render('Explore-artists');
});

async function testDB() {
    try {
        const artists = await prisma.artist.findMany();
        console.log("✅ Database Connected");
        console.log(artists);
    } catch (err) {
        console.error(err);
    }
}

testDB();
app.listen(3000)