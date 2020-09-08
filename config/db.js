const Sequelize = require('sequelize');
const sequelize = new Sequelize('webtruyen', 'root', '', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	pool: {
		max: 100,
		min: 0,
		idle: 1000,
	},
	define: {
		timestamps: false,
		charset: 'utf8',
		collate: 'utf8_general_ci',
	},
	// SQLite only
	// storage: 'path/to/database.sqlite'
});


const DataTypes = require('sequelize/lib/data-types');
const Op = sequelize.Op; // goi ca bieu thuc dieu kien: <>


getFindAllQuery = (query, model, func = '') => {
	return new Promise(function (resolve, reject) {
		query.raw = true;
		model.findAll(query).then(function (obj) {
			resolve(obj);
		}).catch(function (err) {
			// logger.info(err);
			resolve(null);
		});
	});
};
getFindOneQuery = (query, model, func = '') => {
	return new Promise(function (resolve, reject) {
		query.raw = true;
		model.findOne(query).then(function (obj) {
			if (obj != null) {
				resolve(obj);
			} else {
				resolve(null);
			}
		}).catch(function (err) {
			// logger.info(err);
			resolve(null);
		});
	});
};


_update = (value, where, model) => {
	return new Promise((resolve, reject) => {

		model.update(value, { where: where }).then((obj) => {
			if (obj) {
				resolve(obj);
			} else {
				reject(false);
			}
		}).catch((err) => {
			reject(false);
		});
	});
};
_updateV2 = (value, where, model) => {
	return new Promise((resolve, reject) => {
		model.update(value, where).then((obj) => {
			if (obj) {
				resolve(obj);
			} else {
				reject(false);
			}
		}).catch((err) => {
			// logger.info(err);
			console.log(`err`, err);
			reject(false);
		});
	});
};
_bulkCreate = (value, model) => {
	// console.log(`_bulkCreate: ${value[0].link}`);
	return new Promise((resolve, reject) => {
		model.bulkCreate(value, { returning: true }).then((obj) => {
			if (obj) {
				resolve(obj);
			} else {
				reject(false);
			}
		}).catch((err) => {
			reject(false);
		});
	});
};
_create = (value, model) => {
	// console.log(`_bulkCreate: ${value[0].link}`);
	return new Promise((resolve, reject) => {
		model.create(value, { returning: true }).then((obj) => {
			if (obj) {
				resolve(obj);
			} else {
				reject(false);
			}
		}).catch((err) => {
			reject(false);
		});
	});
};
_delete = (where, model) => {
	return new Promise((resolve, reject) => {
		model.destroy(where, { returning: true }).then((obj) => {
			if (obj) {
				resolve(obj);
			} else {
				reject(false);
			}
		}).catch((err) => {
			reject(false);
		});
	});
};

module.exports = {
	sequelize,
	DataTypes,
	Op,
	getFindAllQuery,
	getFindOneQuery,
	_update,
	_updateV2,
	_bulkCreate,
	_create,
	_delete,
};
