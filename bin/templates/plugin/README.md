# %%name%%

*%%description%%*

## Link plugin
`./node_modules/.bin/actionhero link --%%dirname%%` in project root

## To finish setup
`cd plugins/%%dirname%%` 
`npm init` in the plugin root, if this plugin is to have its own npm package.json file
`git init` in the plugin root, if this plugin is to have its own git repo

## Make sure that the plugin root is an option in api.config.general.paths in config/api.js:
`'plugin':      [ 
  __dirname + '/../plugins'  ,
  __dirname + '/../node_modules', 
]`

