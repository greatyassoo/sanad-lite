export class AggregateFeatures {
	constructor(aggregate, queryString) {
		this.aggregate = aggregate;
		this.queryString = queryString;
	}
	paginate() {
		let page = this.queryString.page * 1 || 1;
		if (page < 1) page = 1;
		this.page = page;
		const limit = this.queryString.limit * 1 || 10;
		const skip = (page - 1) * limit;
		let metadataFilter;
		let dataFilter = [];
		// limit == -1 means no pagination only add totalDocs in metadata
		if (this.queryString.limit == -1)
			metadataFilter = [{ $count: 'totalDocs' }];
		else {
			dataFilter = [{ $skip: skip }, { $limit: limit }];
			metadataFilter = [
				{ $count: 'totalDocs' },
				{
					$addFields: {
						totalPages: { $ceil: { $divide: ['$totalDocs', limit] } },
					},
				},
				{
					$addFields: {
						page: page,
					},
				},
				{
					$addFields: {
						nextPage: {
							$cond: {
								if: { $lt: [{ $add: [page, 1] }, '$totalPages'] },
								then: { $add: [page, 1] },
								else: null,
							},
						},
					},
				},
				{
					$addFields: {
						prevPage: {
							$cond: { if: { $gt: [page, 1] }, then: page - 1, else: null },
						},
					},
				},
			];
		}
		this.aggregate.push({
			$facet: {
				metadata: metadataFilter,
				data: dataFilter,
			},
		});
		return this;
	}
	filter() {
		if (this.queryString.dayOfWeek)
			this.queryString.dayOfWeek = parseInt(this.queryString.dayOfWeek);
		let queryObj = { ...this.queryString };
		let excludedFields = ['page', 'sort', 'search', 'limit', 'fields'];
		excludedFields.forEach((elm) => {
			delete queryObj[elm];
		});
		queryObj = JSON.stringify(queryObj);
		queryObj = queryObj.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		queryObj = JSON.parse(queryObj);
		if (queryObj['type']) {
			const splitted = queryObj.type.split(',').map((t) => {
				return { ['type']: t };
			});
			delete queryObj['type'];
			queryObj['$or'] = splitted;
		}
		if (queryObj['createdAt']) {
			if (typeof queryObj['createdAt'] === 'object') {
				for (const key in queryObj['createdAt']) {
					queryObj['createdAt'][key] = new Date(queryObj['createdAt'][key]);
				}
			} else queryObj['createdAt'] = new Date(queryObj['createdAt']);
		}
		this.aggregate.unshift({ $match: queryObj });
		return this;
	}
	sort() {
		if (this.queryString.sort) {
			const sortBy = {};
			this.queryString.sort.split(',').map((field) => {
				if (field.startsWith('-')) sortBy[field.slice(1)] = -1;
				else sortBy[field] = 1;
			});
			this.aggregate.push({ $sort: sortBy });
		} else this.aggregate.push({ $sort: { createdAt: -1 } });
		return this;
	}
	limitFields() {
		const { fields } = this.queryString;
		if (fields) {
			const selectedFields = fields.split(',');
			let includedFields = {};
			let excludedFields = {};
			selectedFields.map((field) => {
				if (field.startsWith('-')) excludedFields[field.split('-')[1]] = 0;
				else includedFields[field] = 1;
			});
			Object.keys(includedFields).length != 0 &&
				this.aggregate.push({ $project: includedFields });
			Object.keys(excludedFields).length != 0 &&
				this.aggregate.push({ $project: excludedFields });
		}
		return this;
	}
	search(searchWords) {
		const { search } = this.queryString;
		if (search && searchWords && searchWords.length > 0) {
			const orArr = searchWords.map((word) => {
				return { [word]: { $regex: search, $options: 'i' } };
			});
			this.aggregate.unshift({ $match: { $or: orArr } });
		}
		return this;
	}
}
