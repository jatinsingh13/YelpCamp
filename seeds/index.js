const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//finding random element form an array seedHelper in order to set different names
const sample = array => array[Math.floor(Math.random() * array.length)];

//function to seed the database

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        
        const camp = new Campground({
            // cities[random1000] gives us a city and then we extract city and state from it using `${cities[random1000].city}, ${cities[random1000].state}`
            author:'60aa3012f5b3850ff0c4987d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry : { "type" : "Point",
                        "coordinates" : [ 75.84722, 22.72056 ] 
            },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/jsr1358/image/upload/v1622347005/YelpCamp/zteinen22bkd7relimfw.jpg',
                  filename: 'YelpCamp/qg48uizclydenj3hz9po'
                },
                {
    
                  url: 'https://res.cloudinary.com/jsr1358/image/upload/v1622347005/YelpCamp/sj6iemozgr147o3lgf0t.jpg',
                  filename: 'YelpCamp/pj4lf4veiobzngpd1sht'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price

        })
        await camp.save();
    }
}

//close the mongodb connextion
seedDB().then(() => {
    mongoose.connection.close();
})
