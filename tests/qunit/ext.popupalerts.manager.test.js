( function ( $, mw ) {

	let manager;

	/**
	 * Generates short random string
	 *
	 * @return {string}
	 */
	function getRandomString() {
		return Math.random().toString( 36 ).slice( 7 );
	}

	/**
	 * Generates random int
	 *
	 * @param {number} max
	 * @return {number}
	 */
	function getRandomInt( max ) {
		return Math.floor( Math.random() * max );
	}

	/**
	 * Generates random mocked PopupAlert object
	 *
	 * @return {{expire: number, tryDisplay: PopupAlert.tryDisplay, isVisible: boolean, hash: string, content: string}}
	 */
	function getMockPopup() {
		return {
			tryDisplay: function () {
				this.isVisible = true;
			},
			isVisible: false,
			hash: getRandomString(),
			content: getRandomString(),
			expire: getRandomInt( 100 )
		};
	}

	/**
	 * Forges mock source jQuery object
	 *
	 * @return {*|jQuery}
	 */
	function getMockSource() {
		return $( '<div/>' )
			.prop( 'data-hash', getRandomString() )
			.prop( 'data-expire', getRandomInt( 100 ) )
			.html( getRandomString() );
	}

	QUnit.module( 'ext.popupalerts.manager', {
		beforeEach: function () {
			manager = new mw.PopupAlertsManager();
		}
	} );

	QUnit.test( 'maybeDisplay with empty set', ( assert ) => {
		manager.maybeDisplay();
		assert.strictEqual( manager.activePopup, null );
	} );

	QUnit.test( 'maybeDisplay with single popup', ( assert ) => {
		manager.popupSources.push( getMockPopup() );
		manager.maybeDisplay();
		assert.strictEqual( manager.activePopup.isVisible, true );
	} );

	QUnit.test( 'maybeDisplay with multiple popups', ( assert ) => {
		const popups = [ getMockPopup(), getMockPopup(), getMockPopup() ];
		manager.popupSources = popups;
		manager.maybeDisplay();
		assert.strictEqual( popups[ 0 ].isVisible, true );
	} );

	QUnit.test( 'maybeDisplay with multiple popups negative', ( assert ) => {
		const popups = [ getMockPopup(), getMockPopup(), getMockPopup() ];
		manager.popupSources = popups;
		manager.maybeDisplay();
		assert.strictEqual( popups[ 1 ].isVisible, false );
	} );

	QUnit.test( 'forgePopupAlert', ( assert ) => {
		const $source = getMockSource(),
			popup = manager.forgePopupAlert( $source );
		assert.strictEqual( 'object', typeof popup );
	} );

}( jQuery, mediaWiki ) );
