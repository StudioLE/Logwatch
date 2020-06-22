# Theme Logwatch

I grew tired of the lack of finese in Logwatch's default HTML template so I put together this little Node.js tool to assist with creating, previewing and installing new themes.

## Features

Theme Logwatch provides two main functions.

1. Install themes to Logwatch
2. Create & preview your own themes

## Installation

The application requires Node.js and npm to be installed, instructions can be found at [nodejs.org](http://nodejs.org/).

With node installed run the following to install Theme Logwatch globally.

```
npm install https://github.com/StudioLE/Logwatch.git theme-logwatch
```

## Configuration

The application uses [dotenv](https://www.npmjs.com/package/dotenv) for configuration. Simply make a copy of `.env.example` named `.env` and change the settings.

```
cd theme-logwatch
cp .env.example .env
nano .env
```

## Usage

### Install a theme

The install a theme function will copy the header and footer files from the named sub-directory within `./themes` to the Logwatch theme location defined in the config file.

```
node logwatch install [THEME_NAME]
```

### Create a theme

Creating a theme will simply copy the default theme files into a new sub-directory of themes for you to edit and then preview.

```
node logwatch create [THEME_NAME]
```

### Preview a theme

Preview a theme with sample data in your browser.

```
node logwatch preview
```

## References

Here are a few links, I came across during my research, that provide more indepth configuration of Logwatch:

- [Adding additional header information](http://jviz.research.iat.sfu.ca/wiki/index.php?title=Customizing_Logwatch)
