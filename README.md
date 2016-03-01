Pi-hole Admin Dashboard
============
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif "AdminLTE Presentation")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3J2L3Z4DHW9UY "Donate")

Using **[AdminLTE](https://almsaeedstudio.com)**, this project will create a Web interface for the ad-blocking Pi-hole: **a black hole for Internet advertisements**.

From this interface, you will be able to see stats on how well your Pi-hole is performing.  You will also be able to update the lists used to block ads.

![Pi-hole Web interface](http://i.imgur.com/FweAo36.png)
![Fully responsive](http://i.imgur.com/fHuWR6E.png)

## API
An API can be accessed at `/admin/api.php`. With either no parameters or `api.php?summary` it returns the following JSON:
```JSON
{
	"domains_being_blocked": "136,708",
	"dns_queries_today": "18,108",
	"ads_blocked_today": "14,648",
	"ads_percentage_today": "80.9"
}
```

There are many more paramters, such as `summaryRaw`, `overTimeData`, `topItems`, `recentItems`, `getQueryTypes`, `getForwardDestinations`, `getQuerySources`, and finally `getAllQueries`.
