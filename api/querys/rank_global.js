db.getCollection('users').aggregate([
    { $match: { status: true }},
    { $addFields: { rank: { $multiply: ['$level', { $sum: [{$multiply: ['$money', 4]}, { $multiply: [2, '$diamonds']}] }]  } } },
    { $sort: { rank: -1 } },
    { $limit: 3 }
]);