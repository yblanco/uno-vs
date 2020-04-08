module.exports = {
  rank: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, body, models, socket, jwt, decode  } = req;
      const { environments = {} } = constants;
      const { rank_limit:limit = 1 } = environments;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { users } = models;
      await users.rank(limit)
        .then(rank => {
          const isUserRanked = rank.filter(item => item.id === id).length > 0;
          if(isUserRanked){
            return rank;
          }
          return users.userRank(id)
            .then(position => {
              const userRank = {
                ...decode,
                ...position,
                iat: undefined,
                exp: undefined,
              }
              return rank.concat(userRank);
            })
        })
        .then(ranks => emitEvent(events.update_all_rank, ranks)
          .then(() => {
            response = jwt.encodeRequest({ ranks });
            success = true;
          }));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
