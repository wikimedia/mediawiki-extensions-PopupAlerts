( function ( $, mw ) {
	QUnit.module( 'ext.popupalerts.alert' );

	QUnit.test( 'getDaysLeft', function ( assert ) {

		var days = 10;
		var expire = days * 60 * 24; // 10 days
		var result = mw.PopupAlert.getDaysLeft( expire );

		assert.strictEqual( result, days );
	} );

}( jQuery, mediaWiki ) );
