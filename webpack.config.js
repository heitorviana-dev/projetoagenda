const path = require("path"); // CommonJS como sistema de módulos !== ES6 modules

module.exports = {
    mode: "production", //Modo
    entry: "./frontend/main.js", //Arquivo de entrada
    output: {
        path: path.resolve(__dirname, "public", "assets", "js"), //Caminho do output
        filename: "bundle.js" //Nome do arquivo
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"]
                }
            }
        }]
    },
    devtool: "source-map"
}