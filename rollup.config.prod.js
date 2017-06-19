import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includepaths from 'rollup-plugin-includepaths';
import eslint from 'rollup-plugin-eslint';
import sourcemaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
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
		eslint(),
		replace({
			ENVIRONMENT: JSON.stringify('production'),
			API_ENDPOINT_VAR: 'https://pizza-place-api.herokuapp.com/api/'
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
		uglify(),
		copy({
			'node_modules/angular-material/angular-material.min.css': 'app/dist/vendor/angular-material.min.css'
		})
	]
};