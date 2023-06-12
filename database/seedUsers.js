const client = require('./setup')

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
        await client.db('test').collection('users').drop()
        await client.db('test').collection('users').insertMany([
            { username: "a", password: "a"},
            { username: "b", password: "b"},
            { username: "c", password: "c"}
        ])
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()