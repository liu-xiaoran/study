var t = '<div style="padding:0;"><p style="margin:0;">你是谁啊<br>是话代表你按浪费那块能否那</p><>';

var tt = []
tt = t.replace(/(<br>)|(<br >)|(<br \/>)/gi,'</p><p>').match(/(?!<p([^<>]*)>)([^<>]*\S)(?=<\/p>)/gi);

console.log(tt);
