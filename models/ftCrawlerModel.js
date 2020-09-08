const { sequelize, DataTypes, Op, _updateV2, _update, _bulkCreate, getFindOneQuery, getFindAllQuery, _delete } = require('../config/db');
const ftCrawlerModel = require('./db/ft_crawler')(sequelize, DataTypes);
const to = require('await-to-js').default;

create = async (value, query = false, isUpdate = false) => {
	let book = false;
	let err = false;
	if (query) {
		[err, book] = await to(getFindOneQuery(query, ftCrawlerModel));
	}
	if (!book) {
		return await _bulkCreate(value, ftCrawlerModel);
	} else {
		if (isUpdate === true) {
			return await _updateV2(value[0], { where: { id: book.id } }, ftCrawlerModel);
		} else {
			return true;
		}
	}
};

getListBook = async (type = 2, limit = 20, offset = 0) => {
	let query = {
		where: {
			status: 1,
			type: type,
		},
		limit: limit,
		offset: offset,
	};
	return await getFindAllQuery(query, ftCrawlerModel);
};
deleteItem = async (where) => {
	return await _delete(where, ftCrawlerModel);
};
module.exports = {
	create, getListBook, deleteItem,
};

