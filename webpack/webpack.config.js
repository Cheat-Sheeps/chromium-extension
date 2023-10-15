const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
	mode: "production",
	watch: true,
	entry: {
		main: path.resolve(__dirname, "..", "src", "scripts", "main.ts"),
	},
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "./src/popup.html", to: ".", context: "." },
				{ from: "./src/popup.css", to: ".", context: "." },
				{ from: "./src/assets", to: ".", context: "." },
				{ from: ".", to: ".", context: "public" },
			],
		}),
	],
};