

Template.popularVideos.helpers({
	spotlight: function(param1){

		var popularVids = Session.get('popularVids');
		if (popularVids && popularVids.length > 0){
			return popularVids
		} else {
			return Videos.find({server: serverSelected.get()}, {sort: {viewCount: -1}, limit: 4})
		}
		
	},
	viewCount:function(){
		var viewCount = this.viewCount;
		if (!viewCount){
			return '0'
		} else {
			return viewCount
		}
	},
	likes:function(){
		var likeCount = this.likeCount;
		if (!likeCount){
			return '0'
		} else {
			return likeCount
		}
	},
	name:function(){
		var name = this.name;
		if (!!name && name.length > 30){
			return name.substr(0, 30) + '...'
		} else {
			return name
		}
	},
	commentCount:function(){
		var videoId = this._id;
		var comments = Comments.find({videoId: videoId}).fetch();
		if (!comments || comments.length < 1){
			return 0
		} else {
			return comments.length
		}
		
	},
	authorHelper:function(){
		var value = this.author;
		if (!!value){
			var userProfile = Profiles.findOne({userId: value});
			var username = userProfile && userProfile.username;
			return username
		} else {
			return 'anonymous'
		}
	},
	classHelper:function(param1){
		if (param1 == 0){
			return 'col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-4 col-md-offset-0 col-lg-3 col-lg-offset-0';
		} else if (param1 == 1){

			return 'col-xs-10 col-sm-6 col-md-4 col-lg-3 hidden-xs';
		} else if (param1 == 2){

			return 'col-xs-10 col-sm-6 col-md-4 col-lg-3 hidden-xs hidden-sm';
		} else if (param1 == 3){

			return 'col-xs-10 col-sm-6 col-md-4 col-lg-3 hidden-sm hidden-xs hidden-md';
		}
	}
});


Template.popularVideos.onCreated(function(){
	let template = Template.instance();
		
	template.autorun( ()=> {
		var server = serverSelected.get();
		this.subscribe('videos', server);
	});
	
	this.subscribe('profiles');
	this.subscribe('comments');
});

Template.popularVideos.onRendered(function(){

});