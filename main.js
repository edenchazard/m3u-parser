const util = require('util');
const M3UExtendedReader = require('./reader');

(async function main(){
    //try{
        const options = { showHidden: false, depth: null, colors: true };
        const reader = new M3UExtendedReader();
        let str = "";
        
        /*str = `#EXTM3U
        #EXTGRP:Group1
        #EXTINF: 0 tvg-logo = "amc.png" tvg-name ="AMC" group-title = "CINE", AMC
        http://200.76.77.237/LIVE/H01/CANAL444/PROFILE03.m3u8?supertvlat=%2F.ts
        #EXTINF: -1 tvg-logo = "http://foto.com/Az-Cinema.png" tvg -name = "AZ Cinema" group-title = "CINE", AZ Cinema
        http://200.76.77.237/LIVE/H01/CANAL444/PROFILE03.m3u8?supertvlat=%2F.ts`;*/


        str = `#EXTM3U
        #EXTINF:-1 tvg-ID="bbc1.uk" tvg-name="UK: BBC ONE FHD" tvg-logo="https://techlinks.club:2096/images/53bc58371b44cfc0ce79f8e69d8aa769.png" group-title="UK: Entertainment",UK: BBC ONE FHD
        https://techlinks.club:2096/neon.fortytwo@gmail.com/BVUdH2DqQkZU/8015
        #EXTINF:-1 tvg-ID="bbc1.uk" tvg-name="UK: BBC ONE HD" tvg-logo="https://techlinks.club:2096/images/53bc58371b44cfc0ce79f8e69d8aa769.png" group-title="UK: Entertainment",UK: BBC ONE HD
        https://techlinks.club:2096/neon.fortytwo@gmail.com/BVUdH2DqQkZU/308
        #EXTGRP:Group1
        #EXTINF:-1 tvg-ID="bbc1.uk" tvg-name="UK: BBC ONE SD" tvg-logo="https://techlinks.club:2096/images/53bc58371b44cfc0ce79f8e69d8aa769.png" group-title="UK: Entertainment",UK: BBC ONE SD
        https://techlinks.club:2096/neon.fortytwo@gmail.com/BVUdH2DqQkZU/394
        #EXTINF:-1 tvg-ID="bbc2.uk" tvg-name="UK: BBC TWO FHD" tvg-logo="https://techlinks.club:2096/images/7cd8badf083c8c2189138b7a348cc197.png" group-title="UK: Entertainment",UK: BBC TWO FHD
        https://techlinks.club:2096/neon.fortytwo@gmail.com/BVUdH2DqQkZU/8016`;
        
        let m3u = reader.parse(str);
        //let m3u = await reader.parseFile("../tv_channels_neon.fortytwo@gmail.com_plus.m3u");

        console.log(util.inspect(m3u.toIPTVPlaylist(), options));
    /*}
    catch(e){
        console.log(e)
    }*/
}
)();
