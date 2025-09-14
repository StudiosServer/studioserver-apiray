const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();




// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve home.html at root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to get only the "api" value from data/data.json
app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
        } else {
            const jsonData = JSON.parse(data);
            const apiValue = jsonData.Studio_Server.use.api;
            res.json({ api: apiValue });
        }
    });
});

// Funciones auxiliares para manejar API keys
function generateApiKey() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];
    const apiKey = Array.from({ length: 3 }, () => getRandomChar(letters)).join('') +
                   Array.from({ length: 3 }, () => getRandomChar(numbers)).join('');
    return apiKey;
}

function saveApiKey(apiKey) {
    const dataPath = path.join(__dirname, 'data', 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.Studio_Server.apiKey = apiKey;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}


// rutas system 
const systemRoutes = require('./routes/system/system');
const activatorRoutes = require('./routes/system/activator');

// rutas archivos
const filesRoutes = require('./routes/tools/files');

// Rutas search
const searchgeniusRoute = require('./routes/search/genius');
const searchgeniusletraRoute = require('./routes/search/geniusletra');
const searchletraRoute = require('./routes/search/letra');
const searchtiktokRoute = require('./routes/search/tiktok');
const searchsouthparkRoute = require('./routes/search/southpark');
const searchyoutubeRoute = require('./routes/search/youtube');
const searchspotifyRoute = require('./routes/search/spotify');
const searchspotifylistRoute = require('./routes/search/spotifylist');
const searchspotifyalbumRoute = require('./routes/search/spotifyalbum');
const searchyoutubemusicRoute = require('./routes/search/youtubemusic');
const searchyoutubealbumRoute = require('./routes/search/youtubemusicalbum');
const searchpokecardRoute = require('./routes/search/pokercard');
const searchpinterestRoute = require('./routes/search/pinterest');
const searchapplemusicRoute = require('./routes/search/applemusic');
const searchrule34Route = require('./routes/search/rule34');
const searchgelbooruRoute = require('./routes/search/gelbooru');
const searchxnxxRoute = require('./routes/search/xnxx');
const searchgoogleimageRoute = require('./routes/search/googleimage');
const searchgoogleRoute = require('./routes/search/google');
const searchgoogleacademicRoute = require('./routes/search/googleacademic');
const searchwikipediaRoute = require('./routes/search/wikipedia');
const searchyahooRoute = require('./routes/search/yahoo');
const searchmovieRoute = require('./routes/search/movie');
const searchbingRoute = require('./routes/search/bing');
const searchbingimageRoute = require('./routes/search/bingimage');
const searchbingvideoRoute = require('./routes/search/bingvideo');
const searchmovieytsRoute = require('./routes/search/movieyts');
const searchsoundcloudRoute = require('./routes/search/soundcloud');
const searchdeezerRoute = require('./routes/search/deezer');
const searchtenorRoute = require('./routes/search/tenor');
const searchnpmRoute = require('./routes/search/npm');
const searchappstoreRoute = require('./routes/search/appstore');
const searchplaystoreRoute = require('./routes/search/playstore');
const searchwikiRoute = require('./routes/search/wiki');
const searchcuevanaRoute = require('./routes/search/cuevana');
const searchanilistRoute = require('./routes/search/anilist');
const searchanimeRoute = require('./routes/search/anime');
const searchmangaRoute = require('./routes/search/manga');
const searchzerochanRoute = require('./routes/search/zerochan');
const searchkonachanRoute = require('./routes/search/konachan');
const searchwallpapersRoute = require('./routes/search/wallpapers');
const searchwallhavenRoute = require('./routes/search/wallhaven');
const searchunplashRoute = require('./routes/search/unplash');
const searchpixabayRoute = require('./routes/search/pixabay');
const searchwattpadRoute = require('./routes/search/wattpad');
const searchsteamRoute = require('./routes/search/steam');
const searchani1Route = require('./routes/search/ani1');

// Rutas download
const DownloadtiktokRoute = require('./routes/download/tiktok');
const DownloadpinterestRoute = require('./routes/download/pinterest');
const DownloadxRoute = require('./routes/download/x');
const DownloadinstagramRoute = require('./routes/download/instagram');
const DownloadredditRoute = require('./routes/download/reddit');
const DownloadspotifyRoute = require('./routes/download/spotify');
const DownloadimgurRoute = require('./routes/download/imgur');
const DownloadmediafireRoute = require('./routes/download/mediafire');
const DownloadyoutubeRoute = require('./routes/download/youtube');
const DownloadspotifylistRoute = require('./routes/download/spotifylist');
const DownloadspotifyalbumRoute = require('./routes/download/spotifyalbum');
const DownloadthreadsRoute = require('./routes/download/threads');
const DownloadfacebookRoute = require('./routes/download/facebook');
const DownloadsoundcloudRoute = require('./routes/download/soundcloud');
const DownloadapplemusicRoute = require('./routes/download/applemusic');
const DownloadapkRoute = require('./routes/download/apk');
const DownloadgithubRoute = require('./routes/download/github');
const DownloadstickerlyRoute = require('./routes/download/stickerly');
const DownloadxnxxRoute = require('./routes/download/xnxx');
const DownloadpastebinRoute = require('./routes/download/pastebin');
const DownloadcapcutRoute = require('./routes/download/capcut');

const DownloadspotifydbRoute = require('./routes/download/spotifydb');

// valor ia
const iagptRoute = require('./routes/ia/gpt');
const iabingRoute = require('./routes/ia/bing');
const iametaRoute = require('./routes/ia/meta');
const iagptwebRoute = require('./routes/ia/gptweb');
const iageminiRoute = require('./routes/ia/gemini');
const iablackboxRoute = require('./routes/ia/blackbox');
const iagptpromptRoute = require('./routes/ia/gptprompt');
const iakanapromptRoute = require('./routes/ia/kana');
const iabocchiRoute = require('./routes/ia/bocchi');
const iaageRoute = require('./routes/ia/age');
const iacheckaestheticRoute = require('./routes/ia/checkaesthetic')
const iacelebrityRoute = require('./routes/ia/celebrity');
const iaalenaRoute = require('./routes/ia/alena');

// valor ia image
const iaimageaniRoute = require('./routes/iaimage/imageani');
const iaimagevretRoute = require('./routes/iaimage/imagevret');

//valor tools
const toolsiaimageRoute = require('./routes/tools/iaimage');
const toolsnumberRoute = require('./routes/tools/number');
const toolsemojiRoute = require('./routes/tools/emoji');
const toolschannelstalkRoute = require('./routes/tools/channelstalk');
const toolsmixedRoute = require('./routes/tools/mixed');
const toolsflaginfoRoute = require('./routes/tools/flaginfo');
const toolstiktokstalkRoute = require('./routes/tools/tiktokstalk');
const toolsinstagramstalkRoute = require('./routes/tools/instagramstalk');
const toolsrobloxstalkRoute = require('./routes/tools/robloxstalk');
const toolstelegramstalkRoute = require('./routes/tools/telegramstalk');//
const toolsnpmstalkRoute = require('./routes/tools/npmstalk');
const toolswhatsappstalkRoute = require('./routes/tools/whatsappstalk');
const toolspokemonRoute = require('./routes/tools/pokemon');
const toolsgooglenewsRoute = require('./routes/tools/googlenews');
const toolstranslateRoute = require('./routes/tools/translate');
const toolsttsRoute = require('./routes/tools/tts');
const toolssimiRoute = require('./routes/tools/simi');
const toolsmojitoRoute = require('./routes/tools/mojito');
const toolswabetainfoRoute = require('./routes/tools/wabetainfo');
const toolsstickerpackRoute = require('./routes/tools/stickerpack');
const toolsapplenewsroomRoute = require('./routes/tools/applenewsroom');
const toolsmovistarRoute = require('./routes/tools/movistar');
const toolshtmlextractRoute = require('./routes/tools/htmlextract');
const toolscheckurlRoute = require('./routes/tools/checkurl');
const toolscdnRoute = require('./routes/tools/cdn');
const toolstelegramorgRoute = require('./routes/tools/telegramorg');
const toolsibbRoute = require('./routes/tools/ibb');
const toolspostimageRoute = require('./routes/tools/postimage');
const toolsemojidcRoute = require('./routes/tools/emojidc');
const toolsredditRoute = require('./routes/tools/reddit');
const toolsipinfoRoute = require('./routes/tools/ipinfo');
const toolsstackoverflowdetailsRoute = require('./routes/tools/stackoverflowdetails');
const toolstableRoute = require('./routes/tools/table');
const toolsboostrapRoute = require('./routes/tools/boostrap');
const toolselcomercioRoute = require('./routes/tools/elcomercio');
const tooldeepimageRoute = require('./routes/tools/deepimage');
const tooltosketchRoute = require('./routes/tools/tosketch');
const tooltoghibliRoute = require('./routes/tools/toghibli');

// valor canvas
const canvasttpRoute = require('./routes/canvas/ttp');
const canvasgayRoute = require('./routes/canvas/gay');
const canvasgaycardRoute = require('./routes/canvas/gaycard');
const canvasbookRoute = require('./routes/canvas/book');
const canvasfriendshipRoute = require('./routes/canvas/friendship');
const canvasshipRoute = require('./routes/canvas/ship');
const canvasbalcardRoute = require('./routes/canvas/balcard');
const canvasphubRoute = require('./routes/canvas/phub');
const canvasxnxxcardRoute = require('./routes/canvas/xnxxcard');
const canvasquoteRoute = require('./routes/canvas/quote');
const canvastweetRoute = require('./routes/canvas/tweet');
const canvaspokeviewRoute = require('./routes/canvas/pokeview');
const canvasjokeoverheadRoute = require('./routes/canvas/jokeoverhead');
const canvasslapRoute = require('./routes/canvas/slap');
const canvaspatrickRoute = require('./routes/canvas/patrick');
const canvashitlerRoute = require('./routes/canvas/hitler');
const canvasdeleteRoute = require('./routes/canvas/delete');
const canvasripRoute = require('./routes/canvas/rip');
const canvasinvertRoute = require('./routes/canvas/invert');
const canvascreateqrRoute = require('./routes/canvas/createqr');
const canvasbofetadaRoute = require('./routes/canvas/bofetada');
const canvasbedRoute = require('./routes/canvas/bed');
const canvasaffectRoute = require('./routes/canvas/affect');
const canvasfacepalmRoute = require('./routes/canvas/facepalm');
const canvasshitRoute = require('./routes/canvas/shit');
const canvastrashRoute = require('./routes/canvas/trash');
const canvassimpRoute = require('./routes/canvas/simp');
const canvasautorizoRoute = require('./routes/canvas/autorizo');
const canvasnoautorizoRoute = require('./routes/canvas/noautorizo');
const canvasphlogoRoute = require('./routes/canvas/phlogo');

// valor nsfw
const nsfwcoreanRoute = require('./routes/nsfw/corean');
const nsfwboobsRoute = require('./routes/nsfw/boobs');
const nsfwgrilsRoute = require('./routes/nsfw/grils');
const nsfwtiktokRoute = require('./routes/nsfw/tiktok');

// valor anime
const animeloliRoute = require('./routes/anime/lolis');
const animeavatarRoute = require('./routes/anime/avatar');
const animelolipcRoute = require('./routes/anime/lolipc');
const animefoxgrilRoute = require('./routes/anime/foxgril');
const animenekoRoute = require('./routes/anime/neko');
const animevideohentaiRoute = require('./routes/anime/videohentai');
const animeeroRoute = require('./routes/anime/ero');
const animewaifuRoute = require('./routes/anime/waifu');
const animemaidRoute = require('./routes/anime/maid');
const animeselfieRoute = require('./routes/anime/selfie');
const animeoppaiRoute = require('./routes/anime/oppai');
const animemoricalliopeRoute = require('./routes/anime/moricalliope');
const animemarinkitagawaRoute = require('./routes/anime/marinkitagawa');
const animeuniformRoute = require('./routes/anime/uniform');
const animenewsanimeRoute = require('./routes/anime/newsanime');
const animeanimeRoute = require('./routes/anime/anime');
const animeanimeinfoRoute = require('./routes/anime/animeinfo');
const animeanimeinfourlRoute = require('./routes/anime/animeinfourl');
const animenhentaiRoute = require('./routes/anime/nhentai');
const animeallnhentaiRoute = require('./routes/anime/allnhentai');
const animehentaitvRoute = require('./routes/anime/hentaitv');
const animefandomRoute = require('./routes/anime/fandom');
const animeanimedlRouter = require('./routes/anime/animedl');
const animesearchRouter = require('./routes/anime/search');
const animecategoryRouter = require('./routes/anime/category');
const animebluearchiveRouter = require('./routes/anime/blue-archive');



// valor random
const randomduckRoute = require('./routes/random/duck');
const randomcoffeeRoute = require('./routes/random/coffee');
const randomasiaticasRoute = require('./routes/random/asiaticas');


// Rutas adicionales
const searchRoute = require('./web/search');
const downloadRoute = require('./web/download');
const iaRoute = require('./web/ia');
const iaimageRoute = require('./web/iaimage');
const toolRoute = require('./web/tool');
const canvasRoute = require('./web/canvas');
const nsfwRoute = require('./web/nsfw');
const shortenRoute = require('./web/shorten');
const animeRoute = require('./web/anime');
const randomRoute = require('./web/random');
const premiumRoute = require('./web/premium');
const informationRoute = require('./web/information');
const logsRoute = require('./web/logs');


//app use archivos
app.use('/', filesRoutes);

// app use search
app.use('/', searchgeniusRoute);
app.use('/', searchgeniusletraRoute);
app.use('/', searchletraRoute);
app.use('/', searchtiktokRoute);
app.use('/', searchsouthparkRoute);
app.use('/', searchyoutubeRoute);
app.use('/', searchspotifyRoute);
app.use('/', searchspotifylistRoute);
app.use('/', searchspotifyalbumRoute);
app.use('/', searchyoutubemusicRoute);
app.use('/', searchyoutubealbumRoute);
app.use('/', searchpokecardRoute);
app.use('/', searchpinterestRoute);
app.use('/', searchapplemusicRoute);
app.use('/', searchrule34Route);
app.use('/', searchgelbooruRoute);
app.use('/', searchxnxxRoute);
app.use('/', searchgoogleimageRoute);
app.use('/', searchgoogleRoute);
app.use('/', searchgoogleacademicRoute);
app.use('/', searchwikipediaRoute);
app.use('/', searchyahooRoute);
app.use('/', searchmovieRoute);
app.use('/', searchbingRoute);
app.use('/', searchbingvideoRoute);
app.use('/', searchmovieytsRoute);
app.use('/', searchsoundcloudRoute);
app.use('/', searchdeezerRoute);
app.use('/', searchtenorRoute);
app.use('/', searchnpmRoute);
app.use('/', searchappstoreRoute);
app.use('/', searchplaystoreRoute);
app.use('/', searchwikiRoute);
app.use('/', searchcuevanaRoute);
app.use('/', searchanilistRoute);
app.use('/', searchanimeRoute);
app.use('/', searchmangaRoute);
app.use('/', searchzerochanRoute);
app.use('/', searchkonachanRoute);
app.use('/', searchwallpapersRoute);
app.use('/', searchwallhavenRoute);
app.use('/', searchunplashRoute);
app.use('/', searchpixabayRoute);
app.use('/', searchwattpadRoute);
app.use('/', searchsteamRoute);
app.use('/', searchani1Route);


// app use download
app.use('/', DownloadtiktokRoute);
app.use('/', DownloadpinterestRoute);
app.use('/', DownloadxRoute);
app.use('/', DownloadinstagramRoute);
app.use('/', DownloadredditRoute);
app.use('/', DownloadspotifyRoute);
app.use('/', DownloadimgurRoute);
app.use('/', DownloadmediafireRoute);
app.use('/', DownloadyoutubeRoute);
app.use('/', DownloadspotifylistRoute);
app.use('/', DownloadspotifyalbumRoute);
app.use('/', DownloadthreadsRoute);
app.use('/', DownloadfacebookRoute);
app.use('/', DownloadsoundcloudRoute);
app.use('/', DownloadapplemusicRoute);
app.use('/', DownloadapkRoute);
app.use('/', DownloadgithubRoute);
app.use('/', DownloadstickerlyRoute);
app.use('/', DownloadxnxxRoute);
app.use('/', DownloadpastebinRoute);
app.use('/', DownloadcapcutRoute);

app.use('/', DownloadspotifydbRoute);

// app use ia
app.use('/', iagptRoute);
app.use('/', iabingRoute);
app.use('/', iametaRoute);
app.use('/', iagptwebRoute);
app.use('/', iageminiRoute);
app.use('/', iablackboxRoute);
app.use('/', iagptpromptRoute);
app.use('/', iakanapromptRoute);
app.use('/', iabocchiRoute);
app.use('/', iaageRoute);
app.use('/', iacheckaestheticRoute);
app.use('/', iacelebrityRoute);
app.use('/', iaalenaRoute);

//app use ia image
app.use('/', iaimageaniRoute);
app.use('/', iaimagevretRoute);

// app use tools
app.use('/', toolsiaimageRoute);
app.use('/', toolsnumberRoute);
app.use('/', toolsemojiRoute);
app.use('/', toolschannelstalkRoute);
app.use('/', toolsmixedRoute);
app.use('/', toolsflaginfoRoute);
app.use('/', toolstiktokstalkRoute);
app.use('/', toolsinstagramstalkRoute);
app.use('/', toolsrobloxstalkRoute);
app.use('/', toolstelegramstalkRoute);
app.use('/', toolsnpmstalkRoute);
app.use('/', toolswhatsappstalkRoute);
app.use('/', toolspokemonRoute);
app.use('/', toolsgooglenewsRoute);
app.use('/', toolstranslateRoute);
app.use('/', toolsttsRoute);
app.use('/', toolssimiRoute);
app.use('/', toolsmojitoRoute);
app.use('/', toolswabetainfoRoute);
app.use('/', toolsstickerpackRoute);
app.use('/', toolsapplenewsroomRoute);
app.use('/', toolsmovistarRoute);
app.use('/', toolshtmlextractRoute);
app.use('/', toolscheckurlRoute);
app.use('/', toolscdnRoute);
app.use('/', toolstelegramorgRoute);
app.use('/', toolsibbRoute);
app.use('/', toolspostimageRoute);
app.use('/', toolsemojidcRoute);
app.use('/', toolsredditRoute);
app.use('/', toolsipinfoRoute);
app.use('/', toolsstackoverflowdetailsRoute);
app.use('/', toolstableRoute);
app.use('/', toolsboostrapRoute);
app.use('/', toolselcomercioRoute);
app.use('/', tooldeepimageRoute);
app.use('/', tooltosketchRoute);
app.use('/', tooltoghibliRoute);

// app use canvas
app.use('/', canvasttpRoute);
app.use('/', canvasgayRoute);
app.use('/', canvasgaycardRoute);
app.use('/', canvasbookRoute);
app.use('/', canvasfriendshipRoute);
app.use('/', canvasshipRoute);
app.use('/', canvasbalcardRoute);
app.use('/', canvasphubRoute);
app.use('/', canvasxnxxcardRoute);
app.use('/', canvasquoteRoute);
app.use('/', canvastweetRoute);
app.use('/', canvaspokeviewRoute);
app.use('/', canvasjokeoverheadRoute);
app.use('/', canvasslapRoute);
app.use('/', canvaspatrickRoute);
app.use('/', canvashitlerRoute);
app.use('/', canvasdeleteRoute);
app.use('/', canvasripRoute);
app.use('/', canvasinvertRoute);
app.use('/', canvascreateqrRoute);
app.use('/', canvasbofetadaRoute);
app.use('/', canvasbedRoute);
app.use('/', canvasaffectRoute);
app.use('/', canvasfacepalmRoute);
app.use('/', canvasshitRoute);
app.use('/', canvastrashRoute);
app.use('/', canvassimpRoute);
app.use('/', canvasautorizoRoute);
app.use('/', canvasnoautorizoRoute);
app.use('/', canvasphlogoRoute);

// app use nsfw
app.use('/', nsfwcoreanRoute);
app.use('/', nsfwboobsRoute);
app.use('/', nsfwgrilsRoute);
app.use('/', nsfwtiktokRoute);


// app use anime
app.use('/', animeloliRoute);
app.use('/', animeavatarRoute);
app.use('/', animelolipcRoute);
app.use('/', animefoxgrilRoute);
app.use('/', animenekoRoute);
app.use('/', animevideohentaiRoute);
app.use('/', animeeroRoute);
app.use('/', animewaifuRoute);
app.use('/', animemaidRoute);
app.use('/', animeselfieRoute);
app.use('/', animeoppaiRoute);
app.use('/', animemoricalliopeRoute);
app.use('/', animemarinkitagawaRoute);
app.use('/', animeuniformRoute);
app.use('/', animenewsanimeRoute);
app.use('/', animeanimeRoute);
app.use('/', animeanimeinfoRoute);
app.use('/', animeanimeinfourlRoute);
app.use('/', animenhentaiRoute);
app.use('/', animeallnhentaiRoute);
app.use('/', animehentaitvRoute);
app.use('/', animefandomRoute);
app.use('/', animeanimedlRouter);
app.use('/', animesearchRouter);
app.use('/', animecategoryRouter);
app.use('/', animebluearchiveRouter);


// app use random
app.use('/', randomduckRoute);
app.use('/', randomcoffeeRoute);
app.use('/', randomasiaticasRoute);

// app use web adicionales
app.use(searchRoute); //web search
app.use(downloadRoute); //web download
app.use(iaRoute); //web ia
app.use(iaimageRoute); //web iaimage
app.use(toolRoute); //web tools
app.use(canvasRoute); //web canvas
app.use(nsfwRoute); //web nsfw
app.use(shortenRoute); //web shorten
app.use(animeRoute); //web anime
app.use(randomRoute); //web random
app.use(premiumRoute); //web premium
app.use(informationRoute); //web information
app.use(logsRoute); //web logs


// app use system
app.use(systemRoutes);
app.use(activatorRoutes);


app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','res', 'favicon.png'));
});

app.get('/message', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'message.html'));
});


// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


app.listen(5000, '0.0.0.0', () => {
    console.log(`Servidor activo en puerto 5000`);
});