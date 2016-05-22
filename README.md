# Flavour

![](https://media.giphy.com/media/Cx7yNo5TsPQru/giphy.gif)

Pre-made SASS stylesheet & JQuery event handler for live recoloration

See it live [**here**](http://nicolasthebaud.github.io/Flavour/)

# Install
```
$ npm install flavour
```

# Features
Flavour has 5 colors set up by default

![](http://image.noelshack.com/fichiers/2016/20/1463918531-flavs.png)

# Usage
Once installed, open you HTML file (or React component or whatever) :
```
<div flavour=1>
  <button class="flavour-setup" flavour=1>
  <p flavour-text=1>Lorem ipsum</p>
</div>
```
As simple as that !

• Every element that has a **flavour** attribute will have its **background-color** flavoured

• Every element that has a **flavour-text** attribute will have its **color** flavoured

**NOTE**: Element with the **flavour-setup** class are **triggers**, they dynamically set the page's flavour

## For dummies
If you (still) don't get it, read this:

**Flavour** is just a pretty name I came up with to describe Colors

The point of this module is to allow you to add instant recoloration tools to your page,

like the night mode on twitch, for example


This is done by throwing a bunch of custom attributes in your HTML and handling them for you.

All you have to do is nothing, except maybe...


# Configuration
(talk about transitions...)

Flavour offers you two ways of configuring your app

## The Sass way
Flavour works with Sass files


If you know Sass stylesheets and are capable of writing some yourself, this is a good alternative
```
$ flavour myself [ -o <directory> ]
```
"woah it even comes with a CLI"

That's right


This command will clone an example file in "css/flavours.scss" by default, or in the directory specified by the **-o** option

this file contains a little tutorial on how to setup a new flavour, along with an exmaple (that you can delete if you wish)


## The command-line way
If you are lazy, or just don't know Sass, you can still use commands to configure Flavour
```
$ flavour add <hexColor> [-n <name> ]
```
Basically self-explanatory. Adds a new flavour to the registry

**hexColor** a String, representing the color to be added

  - I trust you to add a valid Hex code (ex: **fff** or **aa0031**, not **xx32ml**). If you don't, it will still be added to the registry, but it won't work (duh)
  
  - **-n** to name the color. If not specified, the color's name will be an integer, starting from 6 (because 5 native flavours), and incrementing. You can't add a color if the specified name already exists in the registry, otherwise it would mess up the Sass...
  

By the way, Registry ? what is this ?
```
$ flavour ls|list
```
Once again, this one speaks for itself. This will list the colors in the registry, like so
```
$color1: #fff;
$color2: #eee;
...
```

And finally,
```
$ flavour del|delete <name>
```
Delete a color. **Your** color. you can't remove mine, the 5 firsts

