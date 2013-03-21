/*
 * A discourse in code on what Zombie Events are, how they are created and how to avoid them.
 */
require.config( {
    paths : {
        'underscore' : 'libs/underscore'
    },
    shim  : {
        'underscore' : {
            exports : '_'
        }
    }
} );

require( ['jquery', 'underscore'], function ( $, _ ) {

        'use strict';

        var app = {},                                          // name spaced object
            $myel = $( '#pagecontainer' ),                      // outer static container (defined in page markup)
            $container = $( '<div id="viewcontainer"></div>' );  // inner dynamically created container

        app.views = {};                                         // a map for the views

        app.views.page = {
            // compiled template
            template : _.template( $( '#view' ).html() ),
            render   : function () {
                /*
                 * Important Note On jQuery's .html() Method:
                 * ==========================================
                 * As per jQuery's documentation for the htm() method:
                 * When .html() is used to set an element's content,
                 * any content that was in that element is completely
                 * replaced by the new content.
                 * Additionally, jQuery removes other constructs such
                 * as data and event handlers from child elements before
                 * replacing those elements with the new content.
                 *
                 * Pay particular attention to the 2nd paragraph above!
                 * ====================================================
                 * See: http://api.jquery.com/html/
                 */
                // set $container's content to the content of the template
                $container.html( this.template( {title : this.title} ) );
                // $myel is the DOM node where we are attaching our dynamic content to the DOM
                $myel.html( $container );
            }
        };

        app.views.homePage = _.extend( {
            title   : 'Home Page',
            init    : function () {
                var that = this;
                this.render();
                // delegate event handling to $('#viewcontainer') - THIS FIXES THE ZOMBIE EVENTS ISSUE because when
                // $myel.html( $container ) in render() (see above) is called, jQuery will recursively remove all the
                // event handlers from the children of $myel, which $('#viewcontainer') is.
                $( '#viewcontainer' ).on( 'click', function ( event ) {
                    // we only are interested in the event if it was raised by a button element with an id of 'viewbtn'
                    if ( event.target.nodeName === 'BUTTON' && $( event.target ).attr( 'id' ) === 'viewbtn' ) {
                        that.onClick( event );
                    }
                } );
            },
            onClick : function ( e ) {
                e.preventDefault();
                window.alert( 'I am the Home Page' );
                app.views.aboutPage.init();
            }
        }, app.views.page );

        app.views.aboutPage = _.extend( {
            title   : 'About Page',
            init    : function () {
                var that = this;
                this.render();
                // delegate event handling to $('#viewcontainer') - THIS FIXES THE ZOMBIE EVENTS ISSUE because when
                // $myel.html( $container ) in render() (see above) is called, jQuery will recursively remove all the
                // event handlers from the children of $myel, which $('#viewcontainer') is.
                $( '#viewcontainer' ).on( 'click', function ( event ) {
                    // we only are interested in the event if it was raised by a button element with an id of 'viewbtn'
                    if ( event.target.nodeName === 'BUTTON' && $( event.target ).attr( 'id' ) === 'viewbtn' ) {
                        that.onClick( event );
                    }
                } );
            },
            onClick : function ( e ) {
                e.preventDefault();
                window.alert( 'I am the About Page' );
                app.views.homePage.init();
            }
        }, app.views.page );

        app.views.homePage.init();

    }

);

