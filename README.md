# Webdesign Preview

Enables quick mockups of websites from static .jpg .png files. Useful e.g. to see how a layout looks while scrolling, with fixed menu.

## Usage

1. Create a folder in the `layouts` folder with your layouts name (there is are two test layouts called `layout-1` and `layout-2` in the folder already).

2. Create at least a background file in that folder called `back.jpg` or `back.png`. This image will be set fit the viewports width, and you will be able to scroll its full length.

  Optionally you can also add a foreground image called `front.png` (should be a png with transparency), that will be overlayed over the background image and set to be fixed (it won't scroll). This allows for the creation of a fixed menu.

3. Open the index.html file in your browser (I recommend to use the latest Chrome or Safari for performance reasons)

4. Add the name of the layout you want as a hashtag. For example, for the layout from the folder `layout-1` it would become:

  `PATH TO THE FOLDER/index.html#layout-1`

5. Add desired options (see below) as a query, starting with `?` and seperated by `&`. Propertyname and value are seperated by `=`. For example to set `horziontal` to `true` and to set `back` to `b`:

  `PATH TO THE FOLDER/index.html#layout-1?horizontal=true&back=b`

## Options

### `horizontal`

- Type: `boolean`
- Default: `false`

If set to `true` you get a horizontally scrolling website. Background and Foreground will be set to match the viewports height, insteadt of width.

### `back`

- Type: `string`
- Default: none

The given string will be appended to the desired file name for the background image (seperated with a `-`). By default the script would look for a file called `back.jpg` or `back.png`. When `back` is set to `alternative` the desired filename would become `back-alternative.jpg` or `back-alternative.png`.

### `front`

- Type: `string`
- Default: none

Works like the option `back`, but for the foreground image.
