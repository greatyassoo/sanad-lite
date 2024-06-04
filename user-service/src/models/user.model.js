import { model, Schema } from 'mongoose';
const userSchema = Schema({
	role: {
		type: String,
		enum: ['admin', 'instructor', 'student'],
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	affiliation: {
		type: String,
	},
	yearsOfExperience: {
		type: Number,
	},
    bio:{
        type: String,
    },
});

export default model('user', userSchema);
