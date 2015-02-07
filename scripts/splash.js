(function() {
  jQuery(function() {
    var jq, onTop, primary, splash;
    return;
    jq = jQuery;
    splash = jq("#splash-screenshots");
    primary = splash.find(".primary");
    onTop = primary.clone();
    onTop.addClass("on-top");
    primary.after(onTop);
    splash.find("figure").mouseover(function() {
      var elem;
      elem = jq(this);
      elem.stop(true, true);
      if (elem.hasClass("primary")) {
        return;
      }
      return onTop.animate({
        opacity: 0
      }, 200);
    });
    return splash.find("figure").mouseout(function() {
      var elem;
      elem = jq(this);
      if (elem.hasClass("primary")) {
        return;
      }
      return onTop.animate({
        opacity: 1
      }, 200);
    });
  });

}).call(this);
