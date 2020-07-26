// import 'babel-polyfill';
// based on axios-async-test.js node-scraping.js

/*
var debug = require("debug");
var error = debug("app:error");
// by default stderr is used
error("goes to stderr!");
var log = debug("app:log");
// set this namespace to log via console.log
log.log = console.log.bind(console);
// SET DEBUG=app:*
debug.enable("app:*");
// debug.disable();
*/

//var logger = require('tracer').colorConsole({
import tracer from 'tracer';
// const tracer = require('tracer');

// eslint-disable-next-line

//*
const logger = tracer.colorConsole({
 format : "{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}",
    dateformat : "HH:MM:ss.L",
    level: 'debug',  // default info
});
// eslint-disable-next-line
let debug = logger.debug
// eslint-disable-next-line
let log = logger.log
// eslint-disable-next-line
let info = logger.info
// eslint-disable-next-line
let error = logger.error
// */

const axios = require("axios");
// import axios from "axios";

// import axios from "axios";
//debug(axios)
//let baseUrl = "http://207.180.194.18:9200/_search";

const jsonPath = require("JSONPath")
// import jsonPath from "JSONPath"

//let baseURL = "http://207.180.194.18:9200/_search/"
//let baseURL = "http://127.0.0.1:1337/207.180.194.18:9200/_search/"
// let baseURL = "http://173.82.212.65:1337/207.180.194.18:9200/_search/"

//let baseURL = "http://173.82.212.65:1337/207.180.194.18:9200/dictcor/_search/";

// need to set tunnel to oracle ssh -N ubuntu@oracle -L 9200:127.0.0.1:9200
// let baseURL = "http://127.0.0.1:1337/127.0.0.1:9200/dictcor/_search/";
// let baseURL = "http://173.82.212.65:1337/173.82.212.65:9200/dictcor/_search/";
// let baseURL = "http://173.82.240.230:1337/173.82.240.230:9200/dictcor/_search/";
let baseURL = "http://216.24.255.63:1337/127.0.0.1:9200/dictcor/_search/";

// baseURL = "http://127.0.0.1:1337/127.0.0.1:9200/_search/"
//baseURL = "http://127.0.0.1:9200/_search/"

let config = {
	//"method": "POST",
	//"baseURL": baseURL,
	"timeout": 10000,
	"headers": {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true,
		"Access-Control-Allow-Methods": "POST",
		"Access-Control-Allow-Headers": "Content-Type, Authorization"
	}
}

/*
let options = {
  //method: "get",
  //method: "post",
  baseURL: baseURL,
  timeout: 10000,
}; */

/* log('optons:', options);

const instance = axios.create(
  options
); */

async function axios_es(query = '') {
  try {
    log('query: [%s]', query)
    if (typeof(query) === 'string'){
        query = query.trim();
    }
    // let query = query.trim()

    if (!query){
        return {text: ['']}
    }

    let data = ''
    let resp = ''
    let res = ''

    data = {"query":{"query_string":{"default_field": "text","default_operator":"AND","query":query}},"highlight": {"order" : "score", "type" : "unified",  "number_of_fragments" : 3,"fields": {"text":{}}}}

    // let resp = await instance(data=data)
    resp = await axios.post(
      baseURL,
      data, config
    );

    // debug(JSON.stringify(resp.data['hits']['hits']))
    // debug(resp.data['hits']["highlight"])

    // res = jsonPath.eval(resp.data, '$..highlight')
    res = jsonPath.eval(resp.data, '$.._source')

    // hightlight keywords
    let epart = ''
    let cpart = ''
    let ecpart = ''
    let regexp = ''

    epart = query.replace(/([\u4e00-\u9fa5]+)/ig, ' ').trim()
    epart = epart ? epart.split(/\s+/) : epart.split('') // return [] if '', else: .split(/\s+/)
    cpart = query.replace(/([^\u4e00-\u9fa5]+)/ig, '').split('')
    ecpart = epart.concat(cpart)
    regexp = new RegExp('('+ ecpart.join('|') +')', 'ig')

    res = res.map(elm => {return{text: elm.text.replace(regexp, '<em>$1</em>')}})

    if (res.length) {
        // info(jsonPath.eval(resp.data, '$.'))
        // res.push({text: [`(Search term(s): ${query}, took ${resp.data.took} ms)`]})
        res.push({text: `(Search term(s): ${query}, took ${resp.data.took} ms)`})
        return res
    }

    // ##### try with OR if AND return empty
    data = {"query":{"query_string":{"default_field": "text","default_operator":"OR","query":query}},"highlight": {"order" : "score", "type" : "unified",  "number_of_fragments" : 3,"fields": {"text":{}}}}

    // let resp = await instance(data=data)
    resp = await axios.post(
      baseURL,
      data, config
    );

    // debug(JSON.stringify(resp.data['hits']['hits']))
    // debug(resp.data['hits']["highlight"])

    // res = jsonPath.eval(resp.data, '$..highlight')
    res = jsonPath.eval(resp.data, '$.._source')

    // hightlight keywords
    epart = query.replace(/([\u4e00-\u9fa5]+)/ig, ' ').trim()
    epart = epart ? epart.split(/\s+/) : epart.split('') // return [] if '', else: .split(/\s+/)
    cpart = query.replace(/([^\u4e00-\u9fa5]+)/ig, '').split('')
    ecpart = epart.concat(cpart)
    regexp = new RegExp('('+ ecpart.join('|') +')', 'ig')

    res = res.map(elm => {return{text: elm.text.replace(regexp, '<em>$1</em>')}})

    if (res.length) {
        // info(jsonPath.eval(resp.data, '$.'))
        res.push({text: [`(Search term(s): ${query}, took ${resp.data.took} ms)`]})
        return res
    }
    return [{text: ['Nothing found']}]

    }
  catch (e) {
    // error(e.message);
    return [{text: [e.message]}]
  }
}

//testrun axios_es();

/*
(async ()=>{
try{
    let query = 'test positive'
    let res = await axios_es(query)

    log('query: [%s]', query)
    log('res:', res)
    //info('res[\'hits\']:', res['hits'])

    res.forEach( el => { log( el, '++') })

    return res
}
catch (e){
    error(e.message)
}
})() */

// module.exports = axios_es; // for npm run test
export default axios_es;

// need? npm i babel-jest -D
// .babelrc {"presets": ["env"]}
// export default axios_es; // for npm run serve, ok

// **You can mix require and export. You can‘t mix import and module.exports.**

// https://github.com/facebook/jest/issues/3881
// export { axios_es } // for npm run serve, may need to tweak import

// module.exports.axios_es = axios_es;  // dose not work
