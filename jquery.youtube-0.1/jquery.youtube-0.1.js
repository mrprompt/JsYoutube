var Youtube = {
    user:       'mrprompt',
    host:       'http://gdata.youtube.com/feeds/api/users/',
    container:  '#youtube',
    playerAltura: 390,
    playerLargura: 640,

    listaVideos: function() {
        $(Youtube.container).html('carregando...');

        var url = Youtube.host + Youtube.user + '/uploads?orderby=published'
                + '&alt=json&callback=?';

        $.getJSON(url, function(data) {
            $(Youtube.container).html('');

            var yt = data.feed.entry;

            for (var i = 0; i < yt.length; i++) {
                $('<a/>').attr('href', yt[i].link[0].href)
                      .attr('title', yt[i].title.$t)
                      .attr('id', 'video_' + i)
                      .attr('rel', yt[i].media$group.media$content[0].url)
                      .addClass('video')
                      .appendTo(Youtube.container);

                $("<img/>").attr("src", yt[i].media$group.media$thumbnail[1].url)
                           .attr('alt', yt[i].title.$t)
                           .appendTo('#video_' + i);

                $('<b/>').html(yt[i].title.$t)
                         .appendTo('#video_' + i);
            }

            $(Youtube.container + ' a').click(function(e) {
                e.preventDefault();

                if ($('#player')[0]) {
                    $('#player').remove();
                }

                // crio o player
                $('<object/>').attr('width', Youtube.playerLargura)
                              .attr('height', Youtube.playerAltura)
                              .attr('id', 'player')
                              .appendTo(Youtube.container);

                $('<param/>').attr('name', 'movie')
                             .attr('value', $(this).attr('rel'))
                             .appendTo('#player');

                $('<param/>').attr('allowFullScreen', 'true')
                             .appendTo('#objectVideo');

                $('<param/>').attr('allowscriptaccess', 'always')
                             .appendTo('#player');

                $('<embed/>').attr('src', $(this).attr('rel'))
                              .attr('type', 'application/x-shockwave-flash')
                              .attr('allowscriptaccess', 'always')
                              .attr('allowfullscreen', 'true')
                              .attr('width', Youtube.playerLargura)
                              .attr('height', Youtube.playerAltura)
                              .appendTo('#player');
            })
        });
    }
}