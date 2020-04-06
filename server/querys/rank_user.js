db.getCollection('users').aggregate([
    { $match: { status: true, mail: 'yeinso_jbm@hotmail.com' }},
    { $addFields: { rank: { $multiply: ['$level', { $sum: [{$multiply: ['$money', 4]}, { $multiply: [2, '$diamonds']}] }]  } } },
]);