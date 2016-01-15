Pi-hole Admin Dashboard
============
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif "AdminLTE Presentation")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3J2L3Z4DHW9UY "Donate")

Using **[AdminLTE](https://almsaeedstudio.com)**, this project will create a Web interface for the ad-blocking Pi-hole: **a black hole for Internet advertisements**.

From this interface, you will be able to see stats on how well your Pi-hole is performing.  You will also be able to update the lists used to block ads.

![Pi-hole Web interface](http://i.imgur.com/x2iMfoc.png)
![Fully responsive](http://i.imgur.com/NyAIXm8.png)

## API
A basic read-only API can be accessed at `/admin/api.php`. It returns the following JSON:
```JSON
{
	"domains_being_blocked": "136708",
	"dns_queries_today": "18108",
	"ads_blocked_today": "14648",
	"ads_percentage_today": 80.892423238348
}
```
