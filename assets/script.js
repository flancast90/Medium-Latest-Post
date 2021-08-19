// Global variable declarations
var title = document.getElementById('title');
var release_date = document.getElementById('release');
var blog_body = document.getElementById('blog_content');

// here we will bypass CORS to get to medium.com without 
// a server, as well as change the RSS output to JSON.
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@flancast90')
   .then((res) => res.json())
   .then((data) => {

//store the JSON output in a variable for ease-of-access
                      medium_code = data;
                      var title_from_medium = (medium_code.items[0].title);
                      title.innerHTML = JSON.stringify(title_from_medium).replace(/^"|"$/g, '');
                      var release_date_from_medium = (medium_code.items[0].pubDate);
                      release_date.innerHTML = JSON.stringify(release_date_from_medium).replace(/^"|"$/g, '');
                      var content_from_medium = (medium_code.items[0].content).replace(/^"|"$/g, '');
                      blog_body.innerHTML = JSON.stringify(content_from_medium).replaceAll('\\n','<br>');
                      var fix_image = blog_body.getElementsByTagName('figure')[0].getElementsByTagName('img')[0];
                      var changed = (fix_image.src).split("%22")[1];
                      changed = changed.substring(0, changed.length - 1);
                      fix_image.src = (changed);
                      fix_image.style.position = "relative";
                      fix_image.style.width = "100%";
                      var children_img_in_post = parseInt(blog_body.getElementsByTagName('img').length);
     
// medium embeds a counter for post views, which we don't need.
// We will discard of it, since we know it is the last
// image in the post
blog_body.getElementsByTagName('img')[children_img_in_post-1].remove();
                  });
