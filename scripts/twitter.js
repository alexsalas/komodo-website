(function() {
  var TwitterFeed;

  TwitterFeed = (function() {
    var jq, url;

    function TwitterFeed() {}

    jq = jQuery;

    url = "https://script.google.com/macros/s/AKfycbyWQU77RVvMKLQt2PWLrt4tJO_fSoPYcLMtGoiS1HGizqazzvU/exec";

    TwitterFeed.prototype.getWidgetData = function(callback) {
      var cache, cacheTimestamp, self, timestamp;
      self = this;
      timestamp = new Date().getTime();
      if (window.localStorage != null) {
        cacheTimestamp = window.localStorage.getItem("twitterFeedCacheAge");
        cache = window.localStorage.getItem("twitterFeedCache");
        if (cache && cacheTimestamp && (timestamp - cacheTimestamp) < 300) {
          return this.processWidgetData(cache, callback);
        }
      }
      return jq.ajax({
        url: url,
        dataType: "text"
      }).done(function(responseText) {
        window.localStorage.setItem("twitterFeedCache", responseText);
        window.localStorage.setItem("twitterFeedCacheAge", timestamp);
        return self.processWidgetData(responseText, callback);
      });
    };

    TwitterFeed.prototype.processWidgetData = function(responseText, callback) {
      var data, self;
      self = this;
      data = [];
      jq(responseText).find("ol.h-feed > li").each(function() {
        var entry, entryFormatted, media, profile, retweet;
        entry = jq(this);
        entryFormatted = {
          author: entry.find(".p-author .full-name .p-name").text(),
          author_link: entry.find(".p-author .u-url.profile").attr("href"),
          nick: entry.find(".p-author .p-nickname").text(),
          avatar: entry.find(".p-author .u-photo.avatar").attr("src"),
          tweet: self.sanitize(entry.find(".e-entry-content .e-entry-title").html()),
          link: entry.find(".header a.u-url.permalink").attr("href"),
          media: false,
          retweet: false,
          retweet_count: entry.find(".stats-narrow .stats-retweets strong").text(),
          favorite_count: entry.find(".stats-narrow .stats-favorites strong").text(),
          reply_link: entry.find(".tweet-actions .reply-action").attr("href"),
          retweet_link: entry.find(".tweet-actions .retweet-action").attr("href"),
          favorite_link: entry.find(".tweet-actions .favorite-action").attr("href")
        };
        media = entry.find(".e-entry-content .inline-media");
        if (media.length) {
          entryFormatted.media = self.sanitize(media.html());
        }
        retweet = entry.find(".e-entry-content .retweet-credit");
        if (retweet.length) {
          profile = retweet.find(".profile");
          entryFormatted.retweet = {
            author: profile.text(),
            nick: profile.attr("href").split('/').slice(-1)[0],
            link: profile.attr("href")
          };
        }
        return data.push(entryFormatted);
      });
      return callback(data);
    };

    TwitterFeed.prototype.renderWidget = function(templateSrc, max, callback) {
      var template;
      if (max == null) {
        max = 10;
      }
      if (callback == null) {
        callback = null;
      }
      template = Handlebars.compile(templateSrc.html());
      return this.getWidgetData(function(tweets) {
        var n;
        n = 0;
        while (n < max && n < tweets.length) {
          templateSrc.parent().append(template(tweets[n]));
          n++;
        }
        if (callback) {
          return callback();
        }
      });
    };

    TwitterFeed.prototype.sanitize = function(html) {
      var elem, self;
      self = this;
      elem = jq("<div>" + html + "</div>");
      elem.find("*").filter(function() {
        var attrs, i;
        attrs = this.attributes;
        i = 0;
        while (i < attrs.length) {
          if (attrs[i].nodeName.indexOf('data-') === 0) {
            return true;
          }
          i++;
        }
        return false;
      }).each(function() {
        return self.removeDataFromElem(jq(this));
      });
      elem.find("a").each(function() {
        return jq(this).attr("target", "_blank");
      });
      return elem.html();
    };

    TwitterFeed.prototype.removeDataFromElem = function(elem) {
      var key, keys, _i, _len, _results;
      keys = jq.map(elem.data(), function(value, key) {
        return key;
      });
      _results = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        _results.push(elem.removeAttr("data-" + key.replace(/([A-Z])/g, "-$1").toLowerCase()));
      }
      return _results;
    };

    return TwitterFeed;

  })();

  window.TwitterFeed = TwitterFeed;

}).call(this);
