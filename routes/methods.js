const db = require('../models');

module.exports = (createHouse, ctx) =>{
    const data ={
        name: ctx.request.body.name,
        location: ctx.request.body.location,
        rooms: ctx.request.body.rooms,
        rent: ctx.request.body.rent,
    }
    db.house.create(data)
}