---
title: "Dungeoneer's Pack — TSLint and Prettier linting on save with VS Code"
date: "2019-07-10"
description: "This is a simple process, yet I had a more difficult time than I'd like trying to find the information not scattered in bits and pieces around the web."
---

> Flavor text: The Dungeoneer's Pack is a kit of useful tools to help you survive the pitfalls of the JavaScript depths. Do not forget your rope.

If you are here, I don't believe I need to explain to you how amazing and liberating it is to have tools like Prettier and ESLint transforming your code into a consistent style on save. If I'm wrong, there are a ton of articles/tweets/love letters talking about that so I am not going to here.

This is a simple process, yet I had a more difficult time than I'd like trying to find the information not scattered in bits and pieces around the web. I have been using ESlint, with AirBnB standards, and Prettier together for a while, so I primarily got stuck trying to figure out how to get those working together. It works a little bit different with TSLint, and I cover that at the end of the article if you are here for that. 

Here is a quick guide to all the steps needed to get linting on save using TSLint and Prettier in VS Code.

### Install the necessary packages with your favorite package manager
`npm i -D tslint tslint-config-prettier`

### Create config files for TSLint
create a `tslint.json` in the root of your project with the following minimum setup.
```json
{
  "extends": ["tslint:latest", "tslint-config-prettier"],
}
```

create a `.prettierrc` file in the root of your project for any overrides you'd like to make to the default config. You can also make this file a `.yaml`, `.js` or even a `.toml` extension if you prefer. [Read the Prettier docs for more info on that](https://prettier.io/docs/en/configuration.html). Here's an example:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "arrowParens": "always"
}
```

Lastly you'll need to have these two plugins installed in VS Code:
1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

*Note: TSLint is a newer version created by Microsoft to replace the deprecated version so make sure you install the one from Microsoft. It has pretty mixed reviews currently, but I've yet to have any serious issues with it. YMMV.*

### Differences between ESLint and TSLint when working with Prettier
The Prettier plugin for ESLint is intended to let ESLint handle all of the linting, **without having the Prettier plugin enabled**. This is so that you don't have two linters fighting over style formatting. That's not the only way to do it, but it's the most common way I've come across. 

This threw me for a loop for a while because when I added the `tslint-config-prettier` plugin to my `tslint.json` file, all of my style formatting stopped working. If I removed it, TSLint would handle basic formatting such as indentation. After some struggle, I realized that the Prettier plugin for TSLint (`tslint-config-pretter`) is actually made to disable style formatting from TSLint and you are supposed to have both plugins running in VS Code. 

So the last step here is to make sure that you have both of those VS Code plugins enabled, and `"editor.formatOnSave": true` in your VS Code `settings.json` if you don't already have that set. You can get to that VS Code settings file by opening the command palette and searching for "Preferences: Open Settings (JSON)".

### Resources for more information
* [TSLint Docs](https://palantir.github.io/tslint/)
* [Prettier Docs](https://prettier.io/docs/en/install.html)
* [tsling-config-prettier Github](https://github.com/prettier/tslint-config-prettier)