Why we don't support IE 8
-------------------------

We've been living in 2007 for a while now, pretending that new browser features don't
exist because they aren't in IE8.  You might not even know about some of these features,
or think they are only enabled by jQuery or underscore, simply because it hasn't
been an option to rely upon them.

Here is the list of features you don't have if you choose to support IE 8:

- HTML5 audio and video
- SVG
- Canvas
- TrueType fonts
- Media Queries
- CSS Transforms
- Multiple Backgrounds
- CSS3 Units (vh, vw, rem)
- Custom DOM events
- Hardware accelerated graphics
- The DOMContentLoaded event
- addEventListener
- Object.create, .seal, .freeze, .defineProperty
- Array.isArray, .indexOf, .every, .some, .forEach, .map, .filter, .reduce
- A modern JavaScript engine
- A real developer tools
- A consistent box model
- jQuery 2
- Google Apps
- Tether

It's true that IE 8 still holds a big chunk of the browsing population, but the reasons
why they can't update are dwindling.  There are two big reasons for continuing IE 8 support.

#### Enterprises

  Microsoft is dropping support for XP in April, organizations who want security updates will have to upgrade.

#### China uses XP

  Chrome, Firefox and Opera all support XP.  Nothing prevents users from upgrading, except the inertia of
  organizations who still support IE 8.

#### The Future

We are skating towards where the puck will be, and we hope that as you decide to drop IE 8 support,
you choose to add Tether to the list of awesome things you can do.
