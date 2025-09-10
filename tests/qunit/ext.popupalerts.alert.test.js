( function ( $, mw ) {
	QUnit.module( 'ext.popupalerts.alert' );

	QUnit.test( 'getDaysLeft', ( assert ) => {

		const days = 10,
			expire = days * 60 * 24, // 10 days
			result = mw.PopupAlert.getDaysLeft( expire );

		assert.strictEqual( result, days );
	} );

}( jQuery, mediaWiki ) );
