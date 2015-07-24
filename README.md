# Theme Logwatch

I grew tired of the lack of finese in Logwatch's default HTML template so I put together this little Node.js tool to assist with creating, previewing and installing new themes.

## Features

Theme Logwatch provides two main functions.

1. Install themes to Logwatch
2. Create & preview your own themes

## Installation

The application requires Node.js and npm to be installed, instructions can be found at [nodejs.org](http://nodejs.org/).

With node installed run the following to install node-logwatch globally.

```
npm install -g https://github.com/StudioLE/Logwatch.git
```

## Configuration

The application uses [node-config](https://github.com/lorenwest/node-config) so it's highly configurable. I recommend copying the `config/default.json` file to `config/local.json` and editing that so that your changes are not overwritten by future updates.

```
cd /usr/lib/node_modules/logwatch
cp config/default.json config/local.json
nano config/local.json
```

## Usage

### Install a theme

The install a theme function will copy the header and footer files from the named sub-directory within `./themes` to the Logwatch theme location defined in the config file.

```
node-logwatch install [THEME_NAME]
```

### Create a theme

Creating a theme will simply copy the default theme files into a new sub-directory of themes for you to edit and then preview.

```
node-logwatch create THEME_NAME
```

### Preview a theme

Previewing a theme will load a theme with some sample data in your browser.

```
node-logwatch preview [THEME_NAME]
```

## References

Here are a few links, I came across during my research, that provide more indepth configuration of Logwatch:

- [Adding additional header information](http://jviz.research.iat.sfu.ca/wiki/index.php?title=Customizing_Logwatch)
