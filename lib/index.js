var sass = require('node-sass'),
	fs = require('fs')

sass.render({ file: __dirname+"/../dist/css/flavour.scss", }, (err, res)=>{ 
	if(err != null) console.log('[FLAVOUR-ERR] Sass compilation failed', err.status, err.message)
	else fs.writeFile(__dirname+'/../dist/css/flavour.css', res.css, err=>{  if(err) console.log('[FLAVOUR-ERR] '+err) })
})
console.log('[FLAVOUR-INFO] CSS file compiled')