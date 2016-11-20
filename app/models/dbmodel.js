// load mongoose since we need it to define a model

var mongoose = require('mongoose');
//-----------------------------------------------------------------------------------------------
//Hemo Schema
//-----------------------------------------------------------------------------------------------
var heroSchema = mongoose.Schema(
    {
        image: { type: String, required: true },
        text: { type: String, required: true }
    },
    {
	    timestamps: true
	},
    {
    	collection: 'heroSection'
    }
);

var hero = mongoose.model('heroSection', heroSchema);
//-----------------------------------------------------------------------------------------------
//Services Schema
//-----------------------------------------------------------------------------------------------
var serviceSchema = mongoose.Schema(
	{
		title : { type: String, required: true},
		image : { type: String, required: true},
		link : String
	},
	{
		timestamps: true
	},
	{
		collection: 'serviceSection'
	}
);
var service = mongoose.model('serviceSection', serviceSchema);
//-----------------------------------------------------------------------------------------------
//Portfolio Schema
//-----------------------------------------------------------------------------------------------
var projectMainSchema = mongoose.Schema(
	{
		name : { type: String, required: true },
		overview : { type: String, required: true },
		technology : { type: [String], required: true },
		url : String,
		category : { type: String, required: true },
		client : String,
		role : { type: String, required: true },
		complete : { type: Boolean, required: true },
		image : { type: String, required: true }
	},
	{
	    timestamps: true
	},
	{
    	collection: 'projectMain'
    }	
);
var projectSubSchema = mongoose.Schema(
	{
		image : { type: String, required: true },
		key : {type: String, required: true},
		name : {type: String, required: true},
		description : { type: String, required: true }
	},
	{
	    timestamps: true
	},
	{
    	collection: 'projectSub'
    }	
);
var portfolioMain = mongoose.model('projectMain', projectMainSchema);
var portfolioSub = mongoose.model('projectSub', projectSubSchema);
//-----------------------------------------------------------------------------------------------
//About Schema
//-----------------------------------------------------------------------------------------------
var aboutSchema = mongoose.Schema(
	{
		name : { type: String, required: true},
		description : { type: String, required: true},
		aboutImage : { type: String, required: true},
		dob : { type: String, required: true},
		nationality : { type: String, required: true},
		languages : { type: [String], required: true},
		interestImage : { type: String, required: true},
		interests : [String],
		hobbyImage : { type: String, required: true},
		hobbies : [String]
	},
	{
		timestamps: true
	},
	{
		collection: 'aboutSection'
	}
);
var about = mongoose.model('aboutSection', aboutSchema);
//-----------------------------------------------------------------------------------------------
//Skills Schema
//-----------------------------------------------------------------------------------------------
var skillSchema = mongoose.Schema(
	{
		category : { type: String, required: true},
		name : { type: String, required: true},
		percentage : { type: Number, required: true}
	},
	{
		timestamps : true
	},
	{
		collection : 'skillSection'
	}
);
var skill = mongoose.model('skillSection', skillSchema);
//-----------------------------------------------------------------------------------------------
//Experience Schema
//-----------------------------------------------------------------------------------------------
var experienceSchema = mongoose.Schema(
	{
		work : { type : Boolean, required: true, default: true},
		image : { type : String, required: true },
		title : { type: String, required: true },
		organization : { type: String, required: true },
		designation : String,
		description : String,
		start : { type : Date, required: true },
		end : Date
	},
	{
		timestamps : true
	},
	{
		collection : 'timelineSection'
	}
);
var experience = mongoose.model('timelineSection', experienceSchema);
//-----------------------------------------------------------------------------------------------
//Exports
//-----------------------------------------------------------------------------------------------
module.exports = {
	hero : hero,
	portfolioMain : portfolioMain,
	portfolioSub : portfolioSub,
	service : service,
	about : about,
	skill : skill,
	experience : experience
};