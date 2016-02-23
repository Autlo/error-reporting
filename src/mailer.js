'use strict';

var fs = require('fs');
var handlebars = require('handlebars');
var mailer = require('nodemailer');

var template = null;
var transporter = null;
var from = null;
var to = null;
var cc = [];
var subject = 'Errors';

/**
 * @param {Object} config
 */
exports.init = function (config)
{
    transporter = mailer.createTransport(config.transport);

    from = config.from;
    to = config.to;
    cc = config.cc;
    subject = config.subject;

    var contents = fs.readFileSync('./templates/error-mail.handlebars', {
        encoding: 'utf8'
    });

    template = handlebars.compile(contents);
};

/**
 * @param {String} html
 * @param {Function} callback(err)
 */
exports.send = function (html, callback)
{
    var retryCount = 0;
    var options = {
        from: from,
        to: to,
        cc: cc,
        subject: subject,
        html: html
    };

    send(options, responseHandler);

    function send(options, callback)
    {
        transporter.send(options, callback)
    }

    function responseHandler(err)
    {
        if (err && retryCount < 5) {
            retryCount++;

            setTimeout(function () {
                send(options, responseHandler);
            }, 500);
        } else {
            callback(err);
        }
    }
};

/**
 * @param {Object} params
 * @param {Function} callback
 */
exports.sendTemplate = function (params, callback)
{
    exports.send(createHtml(params), callback);
};

function createHtml(variables)
{
    return template(variables);
}
