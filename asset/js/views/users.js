/**
 * users view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'api/user',

    'text!/asset/templates/users.html'
], function($, _, backbone, d3, UserApi, userTemplate) {

    var usersView = backbone.View.extend({
        hideFilters: true,

        template: _.template(userTemplate),

        events: {
            'click .user-filter span': 'handleFilterClick',
            'click .user-sort span': 'handleSortClick'
        },

        render: function(wrapper) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);

            this.filter = 'comments';
            this.key = 'num_comments';
            this.sort = 'desc';
            this.getUsers();
        },

        handleFilterClick: function(e) {
            $('.user-filter span').removeClass('selected');

            var clicked = $(e.target);
            this.filter = clicked.text();
            this.key = clicked.data('key');
            this.getUsers();

            clicked.addClass('selected');
        },

        handleSortClick: function(e) {
            $('.user-sort span').removeClass('selected');

            var clicked = $(e.target);
            this.sort = clicked.text();
            this.getUsers();

            clicked.addClass('selected');
        },

        getUsers: function() {
            UserApi.getTopUsers(this.filter, this.sort).done(this.renderUsers.bind(this));
        },

        renderUsers: function(users) {
            var wrapper = $('.user-list');
            wrapper.html('');
            var userKey = this.key;

            _.each(users['data'], function(user) {
                var nick = user['username'];
                var val = user[userKey];

                var html = '<li>';
                html += '<a href="#users/' + nick + '">' + nick + '</a>';
                html += ': ' + val;
                html += '</li>';

                wrapper.append($(html));
            });
        }
    });

    return usersView;
});
