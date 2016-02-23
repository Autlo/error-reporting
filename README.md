# error-reporting
Reporting errors to email.

## Usage

## Configuration options

* transporter - Transporter for Nodemailer, see more about [SMTP transporter](https://nodemailer.com/2-0-0-beta/setup-smtp/) or [other transporters](https://nodemailer.com/2-0-0-beta/setup-transporter/). If transporter is not provided, then all errors are printed out to console with stacktrace.
* from - Any address format accepted by [Nodemailer](http://nodemailer.com/address-formatting/)
* to - Any address format accepted by [Nodemailer](http://nodemailer.com/address-formatting/)
* cc - Array of addresses, format must be accepted by [Nodemailer](http://nodemailer.com/address-formatting/)
* subject - Subject of email, default is 'Error'
* interval - Interval in seconds for sending messages to email, defaults to 30. If set to 0 or null all errors are sent immediately. Please beware, as this might flood your email server.
