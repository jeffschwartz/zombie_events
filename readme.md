Notes:
1. All the example scripts mentioned in this tutorial can be found on this Githum repo.
2. Furthermore, all the example scripts in this tutorial use jQuery. While jQuery isn't the cause of Zombie events, jQuery does make the code simpler to unserstand and demonstrate. In addition, all the views in the examples are rendered using UnderscoreJS templates.
3. Finally, to keep the concepts generic and simpler to understand, I created a little 'micro' View ('V' like in 'MVC') framework of my own using jQuery and UnderscoreJS.

What Are Zombie Events?
=======================
Zombie events are events that are raised for elements that have been removed from the DOM and they are the result of using event delegation for event handlers.

What Is Event Delegation?
-------------------------
Simply put, event delegation is the practice of attaching event handlers to DOM elements that are parents to the actual DOM elements raising the events (the event targets) as opposed to the practice of attaching event handlers directly onto the DOM elements that actually raise the events (the event targets).

#### Event Delegation Example

As an example, suppose we have a list of links. Instead of attaching a click event handler to each li element we instead attach all of the click event handlers to a parent tag of the li elements, the ul tag, or to a div element serving as a container, or even to the body element itself. That is, in a nutshell, what event delegation is.

First, the markup

    <div id="page_container">
        <ul>
            <li><a href='#'><span class='somelist'>some text</span></a></li>
            <li><a href='#'><span class='somelist'>some text</span></a></li>
            <li><a href='#'><span class='somelist'>some text</span></a></li>
        </ul>
    </div>

and then the JavaScript

    (function ( window, $ ) {
        'use strict';
        $( function () {
            $( '#page_container' ).on( 'click', function ( event ) {
                // we only are interested in the event if it was raised by a span element with a class of 'somelist'
                var $eventTarget = $( event.target );
                if ( $eventTarget.attr( 'class' ) === 'somelist' ) {
                    window.alert( $eventTarget.attr( 'class' ) );
                }
            } );
        } );
    }( window, jQuery ));

In the example markup above, a list is created consisting of 3 anchor tages, each of which has a span tag with a class of 'sometext' and in the JavaScript example code above, all click events are delegated to the div whose id is 'page_container'. When the click event is raised, it will bubble up the DOM and when it reaches the parent container with an id of 'page_container' the event callback function will be called. In the event callback function, since we are only concerned with click events that were raised by span elements with a class of 'sometext', we filter for only those related events and ignore those that aren't.

### The Advantage Of Using Event Delegation
Delegated events have the advantage that they can process events from descendant elements that are added to the document at a later time which would be a commaon need in dynamic pages, specifically single page applications, where dom elements are added to and removed in response to the user's interaction with the page.

### The Disadvantage Of Using Event Delegation Are Zombie Events
While the benefits of using event delegation far outweigh its disadvantages, you do have to insure that when elements are removed from the page that any delegated events associated with those elements are removed as well. If these aren't removed then the result will be Zombie events.

What You Will Find In This Repo
-------------------------------
I've writen two scripts (see below for each script's name along with its descriptions and the name of the html file that you can use to load and run it), one that I purposely coded to demonstrate how Zombie events are created and another script which is identical to the first script but for one small, simple change to the code that effectively eliminates the Zombie events. My goal was to present a common use case that many front-end developers encounter when creating dynamic pages which is replacing some elements of the DOM with other elements in response to some user action with the page, such as a mouse click on a button.

Each of the JavasScript files (see below for details) are well documented with lots of comments. I highly suggest that you not only clone this repo and run the 2 scripts but that you also review each JavaScript file (see below for details) and read through their code and their comments.

### Files And Their Descriptions
1. zombieevents.js - uses event delegation and creates Zombie events. You can execute this script by launching zombieevents.html in your browser. When you run zombieevents.html in your browser, the first view it renders is the homePage view. It has a button with a label 'click me!'. When you click on the button an alert will pop up telling you that you clicked on the Home Page view and when you click the OK button in the alert box the second view, the About Page view, is rendered. It, too, has a 'click me!' button and when it is clicked an alert will pop up telling you that you clicked on the About Page view. Well, that's what should happen but it doesn't. It actually pops up an alert box that says it is the Home Page view and when you dismiss that popup by clicking its OK button another alert pops up informing you that it is the About Page view. That first popup, the one telling you that it is the Home Page view, that one is a result of a Zombie event. And if you think that was bad, keep pressing the 'click me!' buttons and changing views. Doing so only compounds the problem, creating more Zombie events and causing more erroneous alerts to appear.
2. zombieeventseliminated.js - uses event delegation but eliminates Zombie events. You can execute this script by launching zombieeventseliminated.html in your browser. Interact with this page just as you did with zombieevent.html and notice that there are no longer any Zombie events generated.

## The Bottom Line
Zombie events can be easily avoided by removing the parent container acting as the event delegate.
