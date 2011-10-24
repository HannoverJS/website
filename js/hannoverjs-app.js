var App = {};

(function () {
   
    var root = this,
        __app = root.App;
    
    __app.router = Backbone.Router.extend({
        routes: {
            "*actions": "handleAction"
        },
        handleAction: function (action) {
            __app.templateName = action + "_template";
            var view = new __app.dynamicView({
                el: $("section.content")
            }); 
        }
    });

    __app.dynamicView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            var template = _.template(
                $("#" + __app.templateName).html(), {}
            );
            this.el.html(template);
        }
    });

    var router = new __app.router(); 

    Backbone.history.start();

}).call(this);
