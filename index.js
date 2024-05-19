// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//
/* Sample
  {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
 */
app.get("/api/:date?", function(req, res) {
  // utc or unix?
  // if empty -> return unix
  // if number/1451001600000 -> convert to utc
  // if string/2015-12-25 -> convert to unix

  const inputDate = req.params.date;

  if (inputDate == undefined) {
    const currentDate = Date.parse(new Date());
    return res.json({ unix: currentDate });
  }

  // 1451001600000
  // 2015-12-25
  if (isNaN(inputDate)) {
    // 2015-12-25
    const dateObj = new Date(inputDate);
    console.log('dateObj ', dateObj);
    console.log('dateObj.getTime() ', dateObj.getTime())

    if (dateObj instanceof Date) {
      return res.json({
        unix: dateObj.getTime() / 1000,
        utc: dateObj.toUTCString()
      });
    }

    return res.json({ error : "Invalid Date" });
  }


  const unixTime = new Date(parseInt(inputDate));
  return res.json({
    unix: unixTime,
    utc: unixTime.toUTCString()
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
