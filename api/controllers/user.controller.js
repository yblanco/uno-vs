module.exports = {
  rank: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, models, socket, jwt, decode  } = req;
      const { environments = {} } = constants;
      const { user_limit:limit = 1 } = environments;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { users } = models;
      // await users.rank(limit)
      //   .then(rank => {
      //     const isUserRanked = rank.filter(item => item.id === id).length > 0;
      //     if(isUserRanked){
      //       return rank;
      //     }
      //     return users.userRank(id)
      //       .then(position => {
      //         const userRank = {
      //           ...decode,
      //           ...position,
      //           iat: undefined,
      //           exp: undefined,
      //         }
      //         return rank.concat(userRank);
      //       })
      //   })
      //   .then(ranks => emitEvent(events.update_all_rank, ranks)
      //     .then(() => {
      //       response = jwt.encodeRequest({ ranks });
      //       success = true;
      //     }));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  search: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, models, jwt, decode  } = req;
      const { environments = {} } = constants;
      const { user_limit:limit = 1 } = environments;
      const { users } = models;
      const { id, string } = decode;
      await users.search(id, string)
        .then(searched => {
          response = jwt.encodeRequest({ searched });
          success = true;
        })
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  friend_add: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, models, jwt, decode, socket  } = req;
      const { environments = {} } = constants;
      const { user_limit:limit = 1 } = environments;
      const { users } = models;
      const { id, user } = decode;
      const { emitEvent, events } = socket;
      await users.addFriend(id, user)
        .then(({ me, they }) => emitEvent(id, me)
          .then(() => emitEvent(user, they)
            .then(() => {
              response = jwt.encodeRequest(me);
              success = true;
            })));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  friend_reject: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, models, jwt, decode, socket  } = req;
      const { environments = {} } = constants;
      const { user_limit:limit = 1 } = environments;
      const { users } = models;
      const { id, user } = decode;
      const { emitEvent, events } = socket;
      await users.rejectFriend(id, user)
        .then(({ me, they }) => emitEvent(me.id, me)
          .then(() => emitEvent(they.id, they)
            .then(() => {
              response = jwt.encodeRequest(they);
              success = true;
            })));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  friend_block: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, models, jwt, decode, socket  } = req;
      const { environments = {} } = constants;
      const { user_limit:limit = 1 } = environments;
      const { users } = models;
      const { id, user } = decode;
      const { emitEvent, events } = socket;
      await users.blockFriend(id, user)
        .then((me) => emitEvent(id, me)
            .then(() => {
              response = jwt.encodeRequest(me);
              success = true;
            }));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
