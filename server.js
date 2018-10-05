const express = require('express');
const app = express();
const osmosis = require('osmosis');

app.set('view engine', 'pug');
app.use(express.static('public'));

let pageResult = [];


osmosis
  .get('https://www.kayak.ru/flights/KRR-MOW/2018-10-11/2018-10-11?sort=bestflight_a')
  .find('.Base-Results-HorizonResult')
  .set({
    'from': {
      'departTime': '.flight[1] .depart-time.base-time',
      'arrivalTime': '.flight[1] .arrival-time.base-time',
      'company': '.flight[1] .times .bottom'
    },
    'to': {
      'departTime': '.flight[2] .depart-time.base-time',
      'arrivalTime': '.flight[2] .arrival-time.base-time',
      'company': '.flight[2] .times .bottom'
    }
  })
  .data(data => {
    // console.log(data)
    pageResult.push(data);
  })
  .error(console.log)


app.get('/', function (req, res) {
  res.send(pageResult);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});