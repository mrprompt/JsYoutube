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
            var detalhes = new Array();

            for (var i = 0; i < yt.length; i++) {
                detalhes[i]    = new Array();
                detalhes[i][0] = yt[i].title.$t;
                detalhes[i][1] = yt[i].content.$t;
                detalhes[i][2] = yt[i].media$group.media$content[0].url;

                $('<a/>').attr('href', yt[i].link[0].href)
                         .attr('title', yt[i].title.$t)
                         .attr('id', 'video_' + i)
                         .addClass('video')
                         .appendTo(Youtube.container);

                $("<img/>").attr("src", yt[i].media$group.media$thumbnail[1].url)
                           .attr('alt', yt[i].title.$t)
                           .appendTo('#video_' + i);

                $('<b/>').html(yt[i].title.$t)
                         .appendTo('#video_' + i);
            }

            // capturando o click dos thumbs
            $(Youtube.container + ' a').click(function(e) {
                e.preventDefault();

                var indice    = $(this).attr('id').replace('video_', '');
                var descricao = detalhes[indice][1];
                var titulo    = detalhes[indice][0];
                var endereco  = detalhes[indice][2];

                if ($('#player')[0]) {
                    $('#player').remove();
                }

                // crio o player
                $('<object/>').attr('width', Youtube.playerLargura)
                              .attr('height', Youtube.playerAltura)
                              .attr('id', 'player')
                              .appendTo(Youtube.container);

                $('<param/>').attr('name', 'movie')
                             .attr('value', endereco)
                             .appendTo('#player');

                $('<param/>').attr('allowFullScreen', 'true')
                             .appendTo('#objectVideo');

                $('<param/>').attr('allowscriptaccess', 'always')
                             .appendTo('#player');

                $('<embed/>').attr('src', endereco)
                              .attr('type', 'application/x-shockwave-flash')
                              .attr('allowscriptaccess', 'always')
                              .attr('allowfullscreen', 'true')
                              .attr('width', Youtube.playerLargura)
                              .attr('height', Youtube.playerAltura)
                              .appendTo('#player');

                $('<p/>').html('<b>' + titulo + '</b><br />' + descricao)
                         .appendTo('#player');
            })
        });
    }
}