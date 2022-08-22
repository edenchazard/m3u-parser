const fs = require('fs').promises;
const path = require('path');

const parseExtendedDirective = require("./directives");

class m3u {
    constructor(entries){
        this.entries = entries;
    }

    // It's already an object so just return the entries
    toJSON(){
        return this.entries;
    }

    toString(){
        return this.entries.toString();
    }

    // Provides a utility for exporting this as an IPTV
    toIPTVPlaylist(){
        return {
            header:{

            },
            playlist: "",
            channels: this.entries.map(entry => {
                const props = Object.fromEntries(entry.extinf.properties);

                // todo implement EXTGRP
                return  {
                    name: entry.extinf?.displayTitle ?? null,
                    runtime: entry.extinf?.runtime ?? null,
                    source: entry.resource,
                    group:{
                        id: props["group-id"] ?? null,
                        title: props["group-title"] ?? null
                    },
                    tvg: {
                        id: props["tvg-id"] ?? null,
                        name: props["tvg-name"] ?? null,
                        logo: props["tvg-logo"] ?? null
                    }
                }
            })
        }
    }
}

class M3UExtendedReader {
    async parseFile(location){
        // find file, use parsestring
        try {
            const str = (await fs.readFile(path.normalize(location), { encoding: "utf8" })).trim();
            return this.parse(str);
        }
        catch(e){
            throw new Error(e);
        }
    }

    hasEXTM3UHeader(str){
        return str.startsWith("#EXTM3U");
    }

    hasEXTENCHeader(str){
        
    }

    parseM3UHeader(lines){
        /*  find where the 'header block' ends
            the header block begins at line 0 and ands when it encounters
            the first #*/
        //
    }

    parseChunk(lines, start){
        const entry = {
            resource: null
        }

        let lineNumber = start;

        while(true){
            const line = lines[lineNumber];

            // pre-advance pointer to next line
            lineNumber++;

            // Parse the directive
            const [directive, value] = parseExtendedDirective(line);
            entry[directive] = value;

            // If we come across the resource, end this chunk and finish
            // the entry
            if(directive === "resource"){
                return [entry, lineNumber];
            }
        }
    }

    parse(string){
        const entries = [];

        // parse each line of the m3u string, finding directives, parsing them,
        // and eventually getting the url
        const lines = string
            // split every new line
            .split("\n")
            // remove leading and trailing whitespace
            .map(line => line.trim())
            // filter out empty lines
            .filter(line => line !== "");

        // Check header in first line
        if(!this.hasEXTM3UHeader(string))
            throw new Error("MISSING #EXTM3U HEADER");

        /*
            We parse in "chunks". This means, a chunk ends when it runs into
            the next #EXTINF directive. This allows us to grab additional
            directives and not just extinfo
        */
        let lineIndex = 1;
        while (lineIndex < lines.length){
            // Parsing headers
            const [ entry, finish ] = this.parseChunk(lines, lineIndex)
           
            entries.push(entry);
            lineIndex = finish;
        }

        return new m3u(entries);
    }
}

module.exports = M3UExtendedReader;