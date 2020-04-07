module.exports = {
  rank: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, body, models, jwt, decode  } = req;
      const { id } = decode;
      await models.users.rank()
        .then(rank => {
          const isUserRanked = rank.filter(item => item.id === id).length > 0;
          if(isUserRanked){
            return rank;
          }
          return models.users.userRank(id)
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
        .then(ranks => {
          response = jwt.encodeRequest({ ranks });
          success = true;
        });
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
