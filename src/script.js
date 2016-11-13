( function () {
	"use strict";

	var args,
		layoutName,
		errorCollector = [],
		imageFeedback = 0;

	function getQueryString() {
		var search = getLocationSearch();

		if ( typeof search === "string" && search.length > 0 ) {
			return JSON.parse( "{\"" + decodeURI( search )
				.replace( /\"/g, "\\\"" )
				.replace( /&/g, "\",\"" )
				.replace( /=/g, "\":\"" ) + "\"}" );
		} else {
			return {};
		}
	}

	function getLocationSearch() {
		return window.location.search.substring( 1 );
	}

	function checkFeedback() {
		if ( imageFeedback >= 2 ) {
			alertErrors();
		}
	}

	function alertErrors() {
		if ( errorCollector.length > 0 ) {
			alert( errorCollector.join( "\n\n" ) );
		}
	}

	function LayoutImage( name ) {
		var that = this;

		this.fileName = name;
		this.image = new Image();

		if ( args.hasOwnProperty( name ) ) {
			this.fileName = this.fileName + "-" + args[ name ];
		}

		this.fileType = "jpg";
		this.image.className = name;
		this.setSrc();

		document.body.appendChild( this.image );

		this.image.onload = function () {
			imageFeedback += 1;
			checkFeedback();
		}

		this.image.onerror = function () {
			if ( that.fileType === "jpg" ) {
				that.fileType = "png";
				that.setSrc();
			} else {
				errorCollector.push( name.toUpperCase() + "-image is missing. Can’t be found in: \n" + this.src );
				imageFeedback += 1;
				checkFeedback();
			}
		}
	}

	LayoutImage.prototype.setSrc = function ( fileType ) {
		this.src = "layouts/" + layoutName + "/" + this.fileName + "." + this.fileType;
		this.image.src = this.src;
	}

	args = getQueryString();

	if ( args.hasOwnProperty( "layout" ) ) {
		layoutName = args[ "layout" ];
	} else {
		errorCollector.push( "No query for 'layout' was given. Can’t load images without. \nAdd a 'layout' value to the URL, like this: \n\nPATH-TO-THE-FOLDER/index.html?layout=layoutname" );
		alertErrors();
		return;
	}

	if ( args.hasOwnProperty( "horizontal" ) ) {
		if ( args[ "horizontal" ] === "TRUE" || args[ "horizontal" ] === "true" || args[ "horizontal" ] === "1" ) {
			document.body.className = "horizontal";
		};
	}

	if ( layoutName !== undefined ) {
		document.title = layoutName;
	}

	new LayoutImage( "back" );
	if ( args[ "nofront" ] != "TRUE" && args[ "nofront" ] != "true" && args[ "nofront" ] != "1" ) {
		new LayoutImage( "front" );
	}

	alertErrors();

} )();
