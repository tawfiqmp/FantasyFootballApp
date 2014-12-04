(function(window, undefined) {
    "use strict";

var cbs = Backbone.Model.extend({
	defaults: {
	},
	validate: function(attrs){
		var checks = {
			usename: "You forgot to enter a username!"
			password: "You forgot to enter a password!"
		}

	}
})


// The view for cbs application
var AppView = Backbone.View.extend({
  el: $('#todoapp'),
  initialize: function() {
    this.list = this.$("#todo-list"); // the list to append to

    // by listening to when the collection changes we
    // can add new items in realtime
    this.listenTo(this.collection, 'add', this.addOne);
  },
  addOne: function(todo) {
    var view = new TodoView({model: todo});
    this.list.append(view.render().el);
  }
});






})(window, undefined);