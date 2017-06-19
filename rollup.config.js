import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includepaths from 'rollup-plugin-includepaths';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import sourcemaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';
import css from 'rollup-plugin-css-only';

export default {
	entry: 'app/src/app.module.js',
	format: 'cjs',
	dest: 'app/dist/bundle.js',
	sourceMap: true,
	plugins: [
		css({ output: 'app/dist/bundle.css' }),
		replace({
			ENVIRONMENT: JSON.stringify('dev'),
			API_ENDPOINT_VAR: 'http://localhost:8080/api/'
		}),
		resolve({
			module: true,
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		includepaths({
			paths: ['app/src']
		}),
		babel({
			exclude: 'node_modules/**'
		}),
		sourcemaps(),
		copy({
			'node_modules/angular-material/angular-material.min.css': 'app/dist/vendor/angular-material.min.css',
			verbose: true
		}),
		serve('app'),
		livereload({
			watch: 'app'
		})
	]
};