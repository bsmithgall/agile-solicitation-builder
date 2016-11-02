import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
var jsdom = require('jsdom').jsdom;
var $ = require('jquery');

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.sinon = sinon;
global.expect = chai.expect

global.document = jsdom('<html></html>');
global.navigator = { userAgent: 'node.js' };
global.window = document.defaultView;
global.$ = $(window);
