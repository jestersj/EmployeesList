import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'
    return [
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                        },
                    },
                },
                "sass-loader",
            ],
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ]
}