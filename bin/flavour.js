#! /usr/bin/env node
var fs = require('fs'),
	readline = require('readline'),
	meow = require('meow'),
	flavourMap = require('./flavourMap.json')

var last_nativeID = flavourMap.last_nativeID,
	nativeMap = flavourMap.nativeMap,
	userMap = flavourMap.userMap,
	colorMap = flavourMap.colorMap

const cli = meow({
	help: `
Usage
	> flavour add <hexColor> [-n <name> ]
		Register a flavour
			NOTE: generating a nameless color will 
			set it with a default numeral name
	> flavour list|ls  
		List all registered flavours
	> flavour del|delete <name> 
		Delete a color 
	> flavour myself [ -o <directory> ]
		Create a .SCSS file locally (css/flavours.scss)
		to handle flavours yourself ;)

Options
	-n, Set the color's name
	-o, The directory to output local flavours

Examples
	> flavour add FF0000 -n red
		Red : #FF0000 Added
	> flavour del red
		Red : #FF0000 Deleted
	> flavour myself -o build
		Flavour cloned to "build/flavours.scss"
`,
	alias: {}
})

factory(cli.input[0], cli.input[1], cli.flags)

function factory(command, input, flags) {
	switch(command) {
		case 'add':
			addColor(input, flags); break;
		case 'list': case 'ls':
			listColors(input, flags); break;
		case 'delete': case 'del':
			deleteColor(input, flags); break;
		case 'myself':
			flavourLocally(input, flags); break;
		default:
			cli.showHelp()
	}
}

/*** ADD COLOR ***/

function addColor(hex, name) {
	if(!hex) cli.showHelp()
	else {
		var id = name.n || '', sass = ""
		if(id.length == 0) { sass=genUnnamedColor(hex) }
		else { sass=genColor(hex, id) }

		fs.appendFile(__dirname+'/../dist/css/flavour.scss', sass, err=>{
			if(err) console.log('[FLAVOUR] Err : '+err)
			console.log('[FLAVOUR] Flavour added !')
		})
		fs.writeFile(__dirname+'/flavourMap.json', JSON.stringify({
			"last_nativeID":last_nativeID, 
			"nativeMap":nativeMap, 
			"userMap":userMap,
			"colorMap":colorMap
		}))
	}
}

/*private functions*/
function genColor(hex, id) {
	var sass=""
	if(!!nativeMap[id] || !!userMap[id]) console.log('[FLAVOUR] Err: the flavour "'+id+'" already exists')
	else {
		console.log('[FLAVOUR] Flavouring #'+hex+' with name "'+id+'"')
		userMap[id] = id
		colorMap[id] = hex
		sass = `${getColorPattern(hex,id)}
${getColorFlavour(id)}
${getTextFlavour(id)}
`
	}
	return sass
}

function genUnnamedColor(hex) {
	var id = ++last_nativeID
	console.log('[FLAVOUR] Flavouring #'+hex+' with name "'+id+'"')
	userMap[last_nativeID] = ''+last_nativeID
	colorMap[id] = hex
	return `${getColorPattern(hex,id)}
${getColorFlavour(id)}
${getTextFlavour(id)}
`
}

function getColorPattern(hex, id) { return '$color'+id+': #'+hex+';' }
function getColorFlavour(id) { return '[flavour="'+id+'"] { background-color: $color'+id+' !important; }' }
function getTextFlavour(id) { return '[flavour-text="'+id+'"]:not(.flavour-setup) { color: $color'+id+' !important; }' }

/*** LIST COLORS ***/

function listColors(input, flags) {
	console.log(`List of registered flavours :
		`)
	for(var native in nativeMap) console.log('- color'+nativeMap[native]+' :  #'+colorMap[nativeMap[native]])
	for(var native in userMap) console.log('- color'+userMap[native]+' : #'+colorMap[userMap[native]])
	console.log('')
}

/*** DELETE COLOR ***/

function deleteColor(input, flags) {
	if(!!userMap[input]) {
		delete userMap[input]
		delete colorMap[input]
		fs.writeFile(__dirname+'/flavourMap.json', JSON.stringify({
			"last_nativeID":last_nativeID, 
			"nativeMap":nativeMap, 
			"userMap":userMap,
			"colorMap":colorMap
		}))
		deleteSassLine(input)
		console.log('[FLAVOUR] Flavour '+input+' deleted !')
	} else console.log('[FLAVOUR] Flavour '+input+' does not exists')
}

function deleteSassLine(id) {
	const rl = readline.createInterface({
		input: fs.createReadStream(__dirname+'/../dist/css/flavour.scss')
	})
	var self = this
	this.id = id
	this.stream = ``
	rl.on('line', line=>{
		if(line.indexOf('$color'+self.id)==-1) {
			self.stream += `${line}
`
		}
	})
	rl.on('close', _=>{
		fs.writeFile(__dirname+'/../dist/css/flavour.scss', self.stream, err=>{
			if(err) console.log('[FLAVOUR] Err : '+err)
		})
	})

}

/*** MYSELF ***/

function flavourLocally(input, flags) {
	var out = flags.o || 'css'
	fs.mkdir(out, err=>{})
	fs.readFile(__dirname+'/../dist/css/cheatsheet.scss', (err,data)=>{
		if(err) console.log('[FLAVOUR] Err : '+err)
		fs.writeFile(out+'\\flavours.scss', data, err=>{ if(err) console.log('[FLAVOUR] Err : '+err) })
	})
	console.log('[FLAVOUR] SASS file cloned to '+out)
}