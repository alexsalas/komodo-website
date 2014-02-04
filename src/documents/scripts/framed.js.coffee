jQuery ->
    jq = jQuery
    return unless jq("body").hasClass "framed"

    iframe = jq("iframe")

    unless iframe.attr "src"
        iframe.attr("src", window.location.hash.substr(1))

    jq("a.button:not(.primary)").click ->
        window.location = iframe.attr "src"

    jq("a.button.primary").click (e) ->
        return unless history.length
        return unless document.referrer.indexOf(window.location.protocol + "//" + window.location.host) is 0

        history.back()
        e.preventDefault()