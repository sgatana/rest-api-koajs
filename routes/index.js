const Router = require('koa-router');
const db = require('../models');
const router = new Router();
const BASE_URL = `/api/v1/houses`

// get all items
router.get(`${BASE_URL}`, async (ctx) => {
    try {
        const allHouses = await db.house.findAll()
        console.log(allHouses.length)
        if (allHouses) {
            ctx.status = 200
            ctx.body = {
                status: 'success',
                message: allHouses,
                length: allHouses.length
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                error: 'sorry, no vacant house found in that location'
            }
        }

    }
    catch (err) {
        console.log(err)
        return err
    }

})
// get single house
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        // const _id = ctx.params.id
        const house = await db.house.findById(ctx.params.id);
        console.log(house)
        if (house) {
            ctx.status = 200;
            ctx.body = {
                house: house
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                error: 'sorry, no house found with that name'
            }
        }
    }
    catch (err) {
        ctx.throw(err)
    }

});
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const _id = ctx.params.id;
        const deleteHouse = await db.house.destroy({
            where: {
                id: _id
            }
        });
        if (deleteHouse) {
            ctx.status = 200;
            ctx.body = {
                message: "house successfully removed"
            }
        }
        else {
            ctx.status = 404;
            ctx.body = {
                error: 'sorry, no house found with that name'
            }
        }
    } catch (err) {
        ctx.throw(err)
    }


});

router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const _id = ctx.params.id;
        let getHouse = await db.house.findById(_id);
        if (getHouse) {
            try {
                const updateHouse = await db.house.update({
                    name: ctx.request.body.name,
                    rooms: ctx.request.body.rooms,
                    rent: ctx.request.body.rent,
                    location: ctx.request.body.location,

                },
            {
                where:{id: _id}
            });

            ctx.status = 200,
            ctx.body = {
                message: `house has been successfully updates`
            }
            } catch (error) {
                ctx.throw(error);
            }
        }
        else{
            ctx.status = 404;
            ctx.body = {
                error: 'sorry, no house found with that name'
            }
        }

    } catch (err) {
        ctx.throw(err)
    }


});


router.post(BASE_URL, async (ctx) => {
    try {
        let data = {
            rooms: ctx.request.body.rooms,
            name: ctx.request.body.name,
            rent: ctx.request.body.rent,
            location: ctx.request.body.location

        }
        let name = await db.house.findAll({
            where: {
                name: data.name
            }
        });
        if (name.length) {
            ctx.status = 409
            ctx.body = {
                error: 'house already exist'
            }
        }
        else {
            const addHouse = await db.house.create(data);
            ctx.status = 201
            ctx.body = {
                status: "success",
                message: `${data.name} has been successfully added`

            }
        }

    }
    catch (err) {
        ctx.throw(500, err)
    }
})
module.exports = router;