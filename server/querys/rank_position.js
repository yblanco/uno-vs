db.getCollection('users').aggregate([
    { $match: { status: true }},
    { $addFields: { rank: { $multiply: ['$level', { $sum: [{$multiply: ['$money', 4]}, { $multiply: [2, '$diamonds']}] }]  } } },
    { $match: { rank: { $gt: 0 }} },
    { $count: "ranks" },
    { $project: { position: {$sum: ['$ranks', 1]} } }
]);