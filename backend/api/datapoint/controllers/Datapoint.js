const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async createUpdate(ctx) {
        if(ctx.request.body.genre=='' || ctx.request.body.director=='' || ctx.request.body.actors.length==0 ||  ctx.request.body.media_name=='' || ctx.request.body.actors.length=='' ){
            throw error;
        }
        // return ctx.request.body;
        let media_object = {
            actors:[]
        }
        //check for genre
        let fgenre = await strapi.services.genre.find({name:ctx.request.body.genre});
        if(fgenre.length==1) {
            //link genre
            media_object.genre = fgenre[0].id;
        }
        else{
            //create genre
            let genre = await strapi.query('genre').create({name: ctx.request.body.genre});
            fgenre.push(genre)
            // link genre
            media_object.genre = genre.id;
        }
        let director = await strapi.services.director.find({name:ctx.request.body.director});
        if(director.length==1) {
            //link genre
            media_object.director = director[0].id;
        }
        else{
            //create genre
            let new_director = await strapi.query('director').create({name: ctx.request.body.director});
            director.push(new_director)
            // link genre
            media_object.director = new_director.id;
        }
        let actors = ctx.request.body.actors;
        console.log(actors)
        for(let i =0 ;i < actors.length; i++){
            let find_actor = await strapi.services.actor.find({name:actors[i]});
            if(find_actor.length==1) {
                //link genre
                media_object.actors.push(find_actor[0].id);
            }
            else{
                //create genre
                let new_actor = await strapi.query('actor').create({name: actors[i]});
                media_object.actors.push(new_actor.id);
            // link genre
             
        }
        }
        media_object.name = ctx.request.body.media_name;
        if(ctx.request.body.type=="movie"){
            let existing_movie =  await strapi.services.movie.find({name: ctx.request.body.media_name});
            if(existing_movie.length==1){
                strapi.query('movie').update({id:existing_movie[0].id}, media_object);
            }else{
                let new_movie = await strapi.query('movie').create(media_object);
                return new_movie;
            }
        }else{
            let existing_tv =  await strapi.services['tv-show'].find({name: ctx.request.body.media_name});
            if(existing_tv.length==1){
                strapi.query('tv-show').update({id:existing_tv[0].id}, media_object);
            }else{
                let new_tv = await strapi.query('tv-show').create(media_object);
                return new_tv;
            }
        }

        return media_object;
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.restaurant.search(ctx.query);
        } else {
          entities = await strapi.services.restaurant.find(ctx.query);
        }
    
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.restaurant }));
      },
}