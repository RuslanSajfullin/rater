const createCollection = async (db) => {
		await db.createCollection('girlTypes', {
				validator: {
						$jsonSchema: {
								bsonType: "object",
								required: [
										"name",
										"price",
										"updatePrice",
										"incomeInHour",
										"recoupment"],
								properties: {
										name: {
												bsonType: "string",
												description: "must be a string and is required"
										},
										price: {
												bsonType: "number",
												description: "must be a number and is required"
										},
										updatePrice: {
												bsonType: "number",
												description: "must be a number and is required"
										},
										incomeInHour: {
												bsonType: "number",
												description: "must be a number and is required"
										},
										recoupment: {
												bsonType: "number",
												description: "must be a number and is required"
										}
								}
						}
				},
				validationAction: 'error',
				validationLevel: 'strict',
		})
};

const insertCollection = async (db) => {
	await db.collection('girlTypes').insertMany([{ name: "Shere", price: 10, updatePrice: 5, incomeInHour: 0.00231, recoupment: 180},
		{ name: "Asuna", price: 50, updatePrice: 10, incomeInHour: 0.01255, recoupment: 166},
		{ name: "Main", price: 100, updatePrice: 12, incomeInHour: 0.02588, recoupment: 161},
		{ name: "Reone", price: 250, updatePrice: 25, incomeInHour: 0.06944, recoupment: 150},
		{ name: "Asakawa", price: 500, updatePrice: 50, incomeInHour: 0.14881, recoupment: 140}],function (error, types) {
		if (error) {
			throw new Error(error);
		}
	})
};

module.exports = {
	async up(db) {
			const col = await db.listCollections({ name: 'girlTypes' }).toArray();
			if(col.length > 0) {
				throw new Error('Collection girlTypes already exists in MongoDb. Exited...');
			} else {
				await createCollection(db);
				await insertCollection(db);
			}
	},

	async down(db) {
		try {
			await db.dropCollection('girlTypes')
		} catch(err) {
			throw err
		}
	},
};