# Expense Manager

This application keeps a record of your daily expenditure on various category of items, and
displays it in the form of an organised data. It also provides the statistical and graphical
representation of your daily and monthly expense for an easy analysis.

### Structure
The application is mostly based on HTML, CSS and JavaScript, but I’ve used a bit of PHP to store the
data from a local browser-based (IndexedDB) database to permanent server-based (phpMyadmin)
database. The HTML pages are add.html (Update List) which contains two collapsible buttons to open
the forms for adding categories and elements other data to a particular category, Index.html
(Dashboard) where all the data is displayed in the tabular form and stats.html (Stats) where the data
is plotted in the graphical and statistical form. There are is an image folder which contains the
favicon/logo of the application. There are two CSS files namely bootstrap.min.css which contains the
code for responsiveness of the pages, and offcanvas.css which has the code for styling of elements on
these pages. And there are three JavaScript files namely bootstrap.min.js, feather.js which has the
code for functionality of some CSS elements and main.js which has the code for the whole
functionality of the application. There are two PHP files as well, config.php which has the code for
connection with SQL database on phpmyadmin and sync.php which has the code for synchronizing all
the data to the permanent SQL database. And lastly there’s a database.sql file for creating entries in
the PHP database.

### Functionality


Basically, app starts with the Dashboard which displays all the data in tabular form. There’s a
navigation sidebar on the screen which links to visit Update List (index.html), stats (stats.html). The
other button in the navigation bar is Clear Category it is used to delete all the categories and delete
all the entries corresponding to them. It is only used whenever you need to empty the table
completely. On the top right corner of the page is a home button, which is further present on every
page.

The Update List Page (add.html) has two forms namely Add Category and Add Expense. If the
database is completely empty, you need to add a category first which will then appear in the
dropdown list seen in the second form. You can add all the fields in this form and then click at the add
button which will redirect you to the Dashboard again where all the data is displayed.


Then it’s the stats page which contains a dropdown input menu where all the categories are listed,
and a display button. Select a category then click on display button, and the graph of daily/monthly
expense is displayed on the page. At the bottom it displays all the data of that category in the tabular
form. There are two buttons on the top-right of the page namely, Sync and Export. The sync button
stores all the data into a permanent SQL database made on phpMyadmin, and the Export button
exports all the data in a csv file with name expense and downloads it in your computer.

### Accessibility
You can find all the files here:  Link

This is a GitHub repository link with name Assignment_Innovaccer, this repo contains all the
application files. The IndexedDB database can be created by just running the application, but the
phpMyadmin database needs a local server, I prefer WAMP SERVER for building a local area network
LAN- server.

### Steps: 
1. Install Wamp server in your computer 
2. Go to the wamp folder in the windows local disk of your computer (mostly Local Disk C:) 
3. Replace all the content of ‘www’ folder in the wamp folder, with the content of the Assignment_Innovaccer repo 
4. Run the wamp server and open the app 
5. Create a database and sync it to the permanent database 
6. Goto localhost/phpMyadmin in your address bar and then you can access the phpMyadmin database.


