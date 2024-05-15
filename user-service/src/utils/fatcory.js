import { StatusCodes } from 'http-status-codes';
import { AggregateFeatures } from './AggregateFeatures.js';

export const findAllAggregate = async (
	MODEL,
	initialAggregate,
	queryString,
	searchWords,
	res
) => {
	const AggregatePipeline = new AggregateFeatures(initialAggregate, queryString)
		.limitFields()
		.filter()
		.sort()
		.search(searchWords)
		.paginate();
	let response = await MODEL.aggregate(AggregatePipeline.aggregate);
	let data = response[0].data;
	return res.status(StatusCodes.OK).json({
		status: 'success',
		data,
		metadata: response[0].metadata[0],
	});
};
