var tress = require('tress');
let accounts = require('./config/accounts').accs;
var needle = require('needle');
var cheerio = require('cheerio');
var URL = 'https://www.fl.ru';

var options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36',
    'Cookie': 'PHPSESSID=92pchk5hnpr9rhtikk0h2f7gf2'
  }
};
var convToAdd=[];
let messToAdd;
//console.log(accounts);

var q = tress(function (data, callback) {
  options.headers.Cookie = data.cookie;
  needle.get(data.URL, options, function (err, res, body) {

    if (err) throw err;
    if (res.statusCode == 302) return;
    let $ = cheerio.load(body);
    let $prjBox = $("[id ^='prjoffer_box']");
    $prjBox.each(function (i, block) {
      let link = $(block).find('.b-post__title .b-post__link').eq(0).attr('href');
      if (link == 'javascript:void(0);') return;
      let name = $(block).find('.b-post__title .b-post__link').eq(0).html();
      let prjId = link.split('/').pop().split('?')[0];
      let author = $(block).find('[href^="/users"]').html();
      //console.log(convToAdd);
      let itemData ={};
      itemData.user = data.name;
      itemData.Cookie = data.cookie;
      itemData.item ={
        projectId: prjId,
        profile: data.name,
        author: author,
        projectName: name
      };

      convToAdd.push(itemData);
    });
    callback();
  });

});


q.drain = function () {
  convToAdd.map(function (conv, i) {
   // console.log(conv.item);
    needle.post('127.0.0.1:3000/api/conv', conv.item, function (err, resp,body) {
      function getLastMessage(url,opt){
        //console.log(url);

        needle.get(url, opt, function (err, res, body) {
          console.log(URL+res.headers.location);
          needle.get(URL+res.headers.location,opt,function(err, res, body){
            let $ = cheerio.load(body);
            let $comments = $('[id ^="po_dialogue_talk"]');
            if ($comments && $comments.length >0){
             // if (empname11) {
                let lastMs = $comments.find('>div').last();
                if (lastMs.find('>span').eq(0).hasClass('empname11')) {
                  console.log('found',id);
                  needle.put('127.0.0.1:3000/api/conv/'+id, {lastAnswer: true}, function (err, resp,body) {
                    console.log(body);
                  })
                }
              //}
            }

          });

         // let $comments = $('[id ^="po_dialogue_talk"]');
          //console.log($('.b-page__title').html());
        })
      }
      let id = body._id;
      let prId = body.projectId;
      options.headers.Cookie = conv.Cookie;
      //if (i==1)
      setTimeout(getLastMessage.bind(this,URL+'/projects/'+prId+'/',options),100*i);
    })
  })
};
accounts.map(function(acc){
  q.push({URL:'https://www.fl.ru/proj/?p=list',name: acc.name, cookie: acc.cookie});
});

