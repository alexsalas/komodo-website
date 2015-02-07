(function() {
  jQuery(function() {
    var animateElements, bindAnalytics, bindCheckboxEnablers, bindLightbox, bindPageShare, bindPaneSelector, bindTooltips, disableLinks, forceOpenExternal, hideFooterOverlap, highlightCode, init, jq, loadDialogs, loadDownloadButtons, loadFancySelector, loadGithubCommits, loadNavmenu, loadSidebarCollapser, loadSplashScreenshots, loadTabs, loadTags, loadTestimonials, loadTwitterFeed, main, makeSplashResponsive, onPageShare, rejectOldBrowsers;
    jq = jQuery;
    main = jq("section[role=main]");
    init = function() {
      var fn, fns, _i, _len, _results;
      fns = [rejectOldBrowsers, highlightCode, loadSplashScreenshots, loadTestimonials, bindAnalytics, bindTooltips, bindLightbox, loadGithubCommits, loadTabs, loadDownloadButtons, loadNavmenu, loadSidebarCollapser, loadDialogs, loadTwitterFeed, forceOpenExternal, loadTags, animateElements, hideFooterOverlap, disableLinks, bindCheckboxEnablers, bindPaneSelector, loadFancySelector, bindPageShare];
      _results = [];
      for (_i = 0, _len = fns.length; _i < _len; _i++) {
        fn = fns[_i];
        _results.push(setTimeout(fn, 0));
      }
      return _results;
    };
    rejectOldBrowsers = function() {
      var reject;
      reject = ["msie5", "msie6", "msie7", "msie8", "firefox1", "firefox2", "firefox3", "konqueror", "safari2", "safari3"];
      reject = _.reduce(reject, function(o, v) {
        o[v] = true;
        return o;
      }, {});
      return jq.reject({
        reject: reject,
        display: _.shuffle(['chrome', 'firefox', 'safari', 'msie']),
        imagePath: "/images/browsers/",
        browserInfo: {
          msie: {
            text: 'Internet Explorer'
          },
          safari: {
            text: 'Safari'
          }
        }
      });
    };
    highlightCode = function() {
      return jq('pre code.hljs').each(function(i, e) {
        return hljs.highlightBlock(e);
      });
    };
    loadSplashScreenshots = function() {
      var elem, elemClass, oldPrimary, platform, ss;
      ss = jq("#splash-screenshots");
      if (!ss.length) {
        return;
      }
      platform = window.navigator.platform.toLowerCase();
      if (platform.indexOf("linux") !== -1) {
        platform = "linux";
      } else if (platform.indexOf("win") !== -1) {
        platform = "windows";
      } else if (platform.indexOf("mac") !== -1) {
        platform = "osx";
      }
      elem = ss.find(".splash-" + platform);
      oldPrimary = ss.find(".primary");
      if (elem && !elem.hasClass("primary")) {
        if (elem.hasClass("secondary")) {
          elemClass = "secondary";
        } else {
          elemClass = "tertiary";
        }
        elem.removeClass(elemClass);
        elem.addClass("primary");
        oldPrimary.removeClass("primary");
        oldPrimary.addClass(elemClass);
      }
      ss.find(".promotion").appendTo(ss.find(".primary"));
      ss.find(".twitter-follow-button").appendTo(ss.find(".primary"));
      return ss.find(".github-fork-ribbon-wrapper").appendTo(ss.find(".primary"));
    };
    loadTestimonials = function() {
      if (!jq(".testimonial blockquote").length) {
        return;
      }
      textFit(jq(".testimonial blockquote"));
      return jq.getJSON("/json/testimonials.json").done(function(data) {
        var pos, template;
        pos = 0;
        data = _.shuffle(data);
        template = jq("#splash-news-testimonials .testimonial").clone();
        return setInterval((function() {
          var currentEntry, entry, newEntry;
          if (pos === data.length) {
            pos = 0;
          }
          entry = _.clone(data[pos]);
          currentEntry = jq("#splash-news-testimonials .testimonial");
          newEntry = template.clone();
          if (entry.source_name) {
            if (entry.source) {
              entry.source = '<a href="' + entry.source + '" target="_blank">' + entry.source_name + '</a>';
            } else {
              entry.source = entry.source_name;
            }
          }
          if (entry.source_name === "Twitter") {
            entry.name = '<a href="https://twitter.com/activestate' + entry.name + '" target="_blank">' + entry.name + '</a>';
          }
          newEntry.find("*[data-field]").each(function() {
            var elem;
            elem = jq(this);
            elem.show();
            if (!entry[elem.data("field")]) {
              elem.hide();
            }
            return elem.html(entry[elem.data("field")]);
          });
          newEntry.hide().appendTo(currentEntry.parent());
          currentEntry.fadeOut(function() {
            newEntry.fadeIn();
            textFit(newEntry.find("blockquote"), {
              alignVert: true
            });
            currentEntry.remove();
            return currentEntry = newEntry;
          });
          return pos++;
        }), 10000);
      });
    };
    bindAnalytics = function() {
      var href, path, prefix;
      if (typeof _gak !== "undefined" && _gak !== null) {
        href = window.location.href;
        if (href.indexOf("framed/?") !== -1) {
          href = href.substr(href.indexOf("?") + 1);
          prefix = window.location.pathname;
          if (prefix.substr(-1) !== "/") {
            prefix += "/";
          }
          path = prefix + href.replace(/^https?:\/\//, '');
        }
        if (path != null) {
          _gak('send', 'pageview', path);
        } else {
          _gak('send', 'pageview');
        }
      }
      if ((typeof _gaq !== "undefined" && _gaq !== null) || (typeof _gak !== "undefined" && _gak !== null) || (typeof clicky !== "undefined" && clicky !== null)) {
        return jq("a[data-analytics]").click(function() {
          var action, category, elem, label, _ref;
          elem = jq(this);
          _ref = elem.data("analytics").split(":"), category = _ref[0], action = _ref[1], label = _ref[2];
          if (typeof _gak !== "undefined" && _gak !== null) {
            _gak("send", "event", category, action, label);
          }
          if (typeof _gaq !== "undefined" && _gaq !== null) {
            _gaq.push(['_trackEvent', category, action, label]);
          }
          if (typeof clicky !== "undefined" && clicky !== null) {
            return clicky.log(window.location.href, [category, action, label].join(":"), (category === "download" ? "download" : "outbound"));
          }
        });
      }
    };
    bindTooltips = function() {
      return jq('.tooltip').each(function() {
        var elem;
        elem = jq(this);
        return elem.tooltipster({
          contentAsHTML: true,
          position: elem.data("tooltip-position") || 'right',
          theme: "tooltipster-default " + (elem.data("tooltip-class") || ''),
          maxWidth: 250,
          functionReady: function(origin, tooltip) {
            var arrow;
            arrow = tooltip.find(".tooltipster-arrow");
            if (arrow.hasClass("tooltipster-arrow-right")) {
              arrow.find("span").css("left", "-8px");
            }
            if (arrow.hasClass("tooltipster-arrow-left")) {
              return arrow.find("span").css("right", "-8px");
            }
          }
        });
      });
    };
    bindLightbox = function() {
      jq('a.lightbox').magnificPopup({
        type: 'image',
        removalDelay: 500
      });
      jq('div.lightbox').magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500,
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1]
        }
      });
      jq('div.lightbox-group').each(function() {
        var gallery;
        gallery = jq(this);
        return gallery.magnificPopup({
          delegate: 'a.lightbox-entry',
          type: 'image',
          removalDelay: 500,
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
          },
          image: {
            titleSrc: function(item) {
              if (gallery.data("title")) {
                return item.el.attr('title') + '<small>' + gallery.data("title") + '</small>';
              } else {
                return item.el.attr('title');
              }
            }
          }
        });
      });
      return jq('.slideshow').each(function() {
        var elem;
        elem = jq(this);
        return elem.slideshow({
          caption: elem.data("caption") === "true",
          width: elem.data("width"),
          height: elem.data("height"),
          pauseSeconds: elem.data("pause") || 6
        });
      });
    };
    loadGithubCommits = function() {
      return jq(".github-commits").each(function() {
        var el;
        el = jq(this);
        return el.githubInfoWidget({
          user: el.data("gh-user") || "Komodo",
          repo: el.data("gh-repo") || "KomodoEdit",
          branch: el.data("gh-branch") || "trunk",
          last: el.data("gh-amount") || 5,
          avatarSize: el.data("gh-avatarSize") || 16
        });
      });
    };
    loadTabs = function() {
      return jq(".tabs").tabs();
    };
    loadDownloadButtons = function() {
      var platform;
      if (!jq(".document-download").length) {
        return;
      }
      platform = window.navigator.platform.toLowerCase();
      if (platform.indexOf("linux") !== -1 && platform.indexOf("86_64") !== -1) {
        platform = "linux-64";
      } else if (platform.indexOf("linux") !== -1 || platform.indexOf("x11") !== -1) {
        platform = "linux";
      } else if (platform.indexOf("win") !== -1) {
        platform = "windows";
      } else if (platform.indexOf("mac") !== -1) {
        platform = "mac";
      }
      return jq(".dl-button.dl-" + platform + ":not(.primary)").each(function() {
        var el, oldPrimary;
        el = jq(this);
        oldPrimary = el.closest("div").find(".dl-button.primary");
        oldPrimary.removeClass("big");
        oldPrimary.removeClass("primary");
        el.addClass("big primary");
        return el.parent().insertBefore(oldPrimary);
      });
    };
    loadNavmenu = function() {
      return jq("header .collapser").click(function() {
        return jq("header nav").toggleClass("expanded");
      });
    };
    makeSplashResponsive = function() {
      var splashResizeHandler, ss, ssf;
      ss = jq("#splash-screenshots");
      ssf = jq("#splash-screenshots figure.primary");
      splashResizeHandler = function() {
        var ratio;
        if (jq(document).width() < 1100) {
          ratio = jq(document).width() / 1150;
          ss.css('transform', 'scale(' + ratio + ')');
          ss.height(ssf[0].getBoundingClientRect().height + 25);
        }
        if (jq(document).width() > 1100) {
          jq("#splash-screenshots").css('transform', '');
          return jq("#splash-screenshots").height("");
        }
      };
      if (ss.length) {
        jq(window).resize(splashResizeHandler);
        return splashResizeHandler();
      }
    };
    loadSidebarCollapser = function() {
      var sideCollapse, sideInner;
      sideCollapse = jq("#side-collapse");
      sideInner = jq("aside .inner");
      return sideCollapse.click(function() {
        return sideCollapse.fadeOut("fast", function() {
          sideInner.toggle("slide", {
            direction: 'right'
          }, function() {
            sideCollapse.fadeIn("fast");
            return sideInner.css("display", "");
          });
          return jq("aside").toggleClass("expand");
        });
      });
    };
    loadDialogs = function() {
      var e, elem, openModal;
      jq.ui.dialog.prototype._focusTabbable = function() {
        return {};
      };
      jq("a[data-modal]").click(function(e) {
        var elem, link;
        link = jq(this);
        elem = jq(link.data("modal-elem") || link.attr("href"));
        if (!elem.length) {
          return;
        }
        openModal(elem);
        e.preventDefault();
        return false;
      });
      if (window.location.hash) {
        try {
          elem = jq(window.location.hash);
          if (elem.data("modal") !== void 0) {
            openModal(elem);
          }
        } catch (_error) {
          e = _error;
        }
      }
      return openModal = function(elem) {
        if (openModal._modal) {
          openModal._modal.dialog("close");
        }
        elem.dialog({
          modal: true,
          draggable: false,
          closeOnEscape: true,
          minWidth: jq(window).width() / 3,
          maxHeight: jq(window).height() / 1.25,
          show: {
            effect: "fade",
            duration: 500,
            easing: "easeOutExpo"
          },
          hide: {
            effect: "drop",
            direction: "down",
            distance: 100,
            duration: 500,
            easing: "easeOutExpo"
          },
          open: function() {
            elem.find("[data-enable-after]").each(function() {
              var el;
              el = jq(this);
              el.attr("disabled", true);
              return setTimeout(function() {
                return el.removeAttr("disabled");
              }, parseInt(el.data("enable-after")) * 1000);
            });
            return jq('.ui-widget-overlay').click(function() {
              return elem.dialog("close");
            });
          },
          close: function() {
            return delete openModal._modal;
          }
        });
        return openModal._modal = elem;
      };
    };
    loadTwitterFeed = function() {
      var twitterTemplate;
      twitterTemplate = jq("#tweet-template");
      if (twitterTemplate.length) {
        return new TwitterFeed().renderWidget(twitterTemplate, 4, function() {
          return bindTooltips();
        });
      }
    };
    forceOpenExternal = function() {
      var href;
      href = new RegExp('^' + window.location.protocol + '\\/\\/(?:[a-z]*?\.|)' + window.location.hostname);
      return jq("a[href^='http']").filter(function() {
        return !jq(this).attr("href").match(href);
      }).attr("target", "_blank");
    };
    loadTags = function() {
      var tag, tagTemplate;
      if (!jq("#content").hasClass("document-tagged")) {
        return;
      }
      tag = decodeURI(window.location.search.substr(1));
      tagTemplate = Handlebars.compile(jq("#tag-template").html());
      return jq.getJSON("/json/tags.json").done(function(tags) {
        var html;
        if (tags[tag]) {
          html = tagTemplate({
            tags: tags,
            tag: tag,
            documents: tags[tag].documents
          });
          jq(html).appendTo(jq("#content article"));
          return jq("#content article .loading").remove();
        }
      });
    };
    animateElements = function() {
      return jq(".animateOnLoad").each(function() {
        var elem;
        elem = jq(this);
        elem.addClass("animate");
        return setTimeout(function() {
          elem.removeClass("animate");
          return elem.addClass("animate-over");
        }, elem.data("animation-duration") || 400);
      });
    };
    hideFooterOverlap = function() {
      if (!jq('footer').length) {
        return;
      }
      if (jq(window).scrollTop() + jq(window).height() === jq(document).height()) {
        return jq(".document-pricing .promotion").hide();
      } else {
        return jq(".document-pricing .promotion").show();
      }
    };
    if (jq('footer').length && jq(".document-pricing .promotion").length) {
      jq(window).scroll(hideFooterOverlap);
    }
    disableLinks = function() {
      return jq("a.disabled").click(function() {
        var elem;
        elem = jq(this);
        if (elem.hasClass("disabled")) {
          return false;
        }
      });
    };
    bindCheckboxEnablers = function() {
      return jq("input[type=checkbox][data-enables]").click(function() {
        var elem;
        elem = jq(this);
        if (this.checked) {
          return jq("#" + elem.data("enables")).removeClass("disabled");
        } else {
          return jq("#" + elem.data("enables")).addClass("disabled");
        }
      });
    };
    bindPaneSelector = function() {
      return jq("select.paneSelector").each(function() {
        var el, elem, hash, prefix;
        elem = jq(this);
        prefix = elem.data("pane-prefix") || "";
        elem.change(function() {
          var id;
          id = "#" + prefix + elem.val();
          jq(id).siblings().hide();
          jq(id).fadeIn("fast");
          return window.location.hash = id;
        });
        hash = window.location.hash.substr(1).split("|");
        el = jq("#" + hash[0]);
        if (hash[0] && el.length && hash[0].indexOf(prefix) === 0) {
          el.siblings().hide();
          el.fadeIn("fast");
          if (hash[1]) {
            window.location.hash = "#" + hash[1];
          }
          window.location.hash = "#" + hash.join("|");
          el = jq("[data-pane-prefix=\"" + prefix + "\"]");
          if (el.length && el[0].selectize) {
            return el[0].selectize.setValue(hash[0].substr(prefix.length));
          } else {
            if (el.length) {
              return el.val(hash[0].substr(prefix.length));
            }
          }
        }
      });
    };
    loadFancySelector = function() {
      return jq("select.selectize").each(function() {
        var elem;
        elem = jq(this);
        return elem.selectize({
          onChange: function(value) {
            return setTimeout((function() {
              return elem.trigger("change");
            }), 0);
          }
        });
      });
    };
    bindPageShare = function() {
      return jq(document).on('pageShared', onPageShare);
    };
    onPageShare = function(e) {
      if (_gak) {
        return _gak.push(['_trackSocial', e.network, e.action]);
      }
    };
    return init();
  });

}).call(this);
