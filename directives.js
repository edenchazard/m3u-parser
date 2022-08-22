/*
    Utilities
*/
function splitAfter(input, index) {
    return [ input.substring(0, index), input.substring(index + 1) ];
}

const regexp = {
    // also accounts for a leading -
    trackTime: /^\#EXTINF:[\s]*([\-]{0,1}[0-9]+)/,
    // key value pairs e.g. tvg-logo="example.jpg"
    attributes: /([0-9a-z\-]{1,})="([^"]{1,})"/gis
}

function directiveEXTGRP(line){
    return splitAfter(line, line.lastIndexOf(':'))[1];
}

function directiveEXTINF(line){
    const [ information, displayTitle ] = splitAfter(line, line.lastIndexOf(','));

    const info = {
        displayTitle: null,
        runtime: null,
        properties: []
    }

    if(displayTitle)
        info.displayTitle = displayTitle;
    else
        throw new Error("ERROR: MISSING DISPLAY TITLE VALUE line "+line);

    // parse track time
    const runtime = information.match(regexp.trackTime);
    if(runtime)
        info.runtime = parseInt(runtime[1]);
    else
        throw new Error("ERROR: MISSING RUNTIME VALUE line "+line);

    // parse additional attributes as key-value pairs
    const attributes = information.matchAll(regexp.attributes);

    if(attributes){
        info.properties = Array.from(attributes).map(match => ([ match[1].toLowerCase(), match[2] ]));
    }

    return info;
}

function parseExtendedDirective(line){
    if(line.startsWith("#EXTINF:"))
        return ['extinf', directiveEXTINF(line)];
    else if(line.startsWith("#EXTGRP:"))
        return ['extgrp', directiveEXTGRP(line)]
    else{
        // todo
        // if is path/url
            return ['resource', line];
        // else
        // throw new ERROR "UNRECOGNISED DIRECTIVE ON LINE "+line;
    }
}

module.exports = parseExtendedDirective;