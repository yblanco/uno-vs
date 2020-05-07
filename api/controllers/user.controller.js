module.exports = {
  rank: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, models, socket, jwt, decode  } = req;
      const { environments = {} } = constants;
      const { rank_limit:limit = 1 } = environments;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { users } = models;
      const rank_event_all = events.update_ranks;
      const rank_event_friends = `${events.update_friend_ranks}_${id}`;
      const rank_event_user = `${events.update_user_ranks}_${id}`;
      await users.rank(limit)
        .then(all => users.friendsRank(limit, id)
          .then(friends => users.userRank(id)
            .then((rank) => emitEvent(rank_event_all, all)
              .then(() => emitEvent(rank_event_friends, friends)
                .then(() => emitEvent(rank_event_user, rank)
                  .then(() => {
                    response = jwt.encodeRequest({ id });
                    success = true;
                  }))))));
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
