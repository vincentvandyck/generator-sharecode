module.exports = {
    coreOptionsDist: {
        siteUrl: '<%= url %>',
        folder: '<%= folder %>/<%= project %>/dist',
        notification: true,
        checkin: true,
        checkinType: 2
    },
    coreOptionsDev: {
        siteUrl: '<%= url %>',
        folder: '<%= folder %>/<%= project %>/dev',
        notification: true,
        checkin: true,
        checkinType: 2
    },
    credentials: {
        username: '<%= username %>',
        password: '<%= password %>'
    }
};
