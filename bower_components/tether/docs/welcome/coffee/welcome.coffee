_Drop = Drop.createContext classPrefix: 'tether'

isMobile = $(window).width() < 567

init = ->
    setupHero()
    setupBrowserDemo()

setupHero = ->
    $target = $('.tether-target-demo')

    positions = [
        'top left'
        'left top'
        'left middle'
        'left bottom'
        'bottom left'
        'bottom center'
        'bottom right'
        'right bottom'
        'right middle'
        'right top'
        'top right'
        'top center'
    ]

    if isMobile
        positions = [
            'top left'
            'bottom left'
            'bottom right'
            'top right'
        ]

    window.drops = {}

    for position in positions
        drops[position] = new _Drop
            target: $target[0]
            classes: 'tether-theme-arrows-dark'
            position: position
            constrainToWindow: false
            openOn: ''
            content: '<div style="height: 50px; width: 50px"></div>'

    openIndex = 0
    frames = 0
    frameLengthMS = 10

    openAllDrops = ->
        for position, drop of drops
            drop.open()

    openNextDrop = ->
        for position, drop of drops
            drop.close()

        drops[positions[openIndex]].open()
        drops[positions[(openIndex + 6) % positions.length]].open()

        openIndex = (openIndex + 1) % positions.length

        if frames > 5
            finalDropState()
            return

        frames += 1

        setTimeout openNextDrop, frameLengthMS * frames

    finalDropState = ->
        $(drops['top left'].dropContent).html('Marrying DOM elements for life.')
        $(drops['bottom right'].dropContent).html('<a class="button" href="http://github.com/HubSpot/tether">★ On Github</a>')
        drops['top left'].open()
        drops['bottom right'].open()

    if true or isMobile
        drops['top left'].open()
        drops['top left'].tether.position()
        drops['bottom right'].open()
        drops['bottom right'].tether.position()
        finalDropState()

    else
        openNextDrop()

setupBrowserDemo = ->
    $browserDemo = $('.browser-demo.showcase')

    $startPoint = $('.browser-demo-start-point')
    $stopPoint = $('.browser-demo-stop-point')

    $iframe = $('.browser-window iframe')
    $browserContents = $('.browser-content .browser-demo-inner')

    $sections = $('.browser-demo-section')

    $('body').append """
        <style>
            table.showcase.browser-demo.fixed-bottom {
                top: #{ $sections.length }00%
            }
        </style>
    """

    $(window).scroll ->
        scrollTop = $(window).scrollTop()

        if $startPoint.position().top < scrollTop and scrollTop + window.innerHeight < $stopPoint.position().top
            $browserDemo.removeClass('fixed-bottom')
            $browserDemo.addClass('fixed')

            $sections.each ->
                $section = $ @

                if $section.position().top < scrollTop < $section.position().top + $section.outerHeight()
                    setSection $section.data('section')

                return true

        else
            $browserDemo.removeAttr('data-section')
            $browserDemo.removeClass('fixed')

            if scrollTop + window.innerHeight > $stopPoint.position().top
                $browserDemo.addClass('fixed-bottom')
            else
                $browserDemo.removeClass('fixed-bottom')

    $iframe.load ->
        iframeWindow = $iframe[0].contentWindow

        $items = $iframe.contents().find('.item')

        $items.each (i) ->
            $item = $(@)

            _iframeWindowDrop = iframeWindow.Drop.createContext classPrefix: 'tether'

            drop = new _iframeWindowDrop
                target: $item[0]
                classes: 'tether-theme-arrows-dark'
                position: 'right top'
                constrainToWindow: true
                openOn: 'click'
                content: '''
                    <ul>
                        <li>Action&nbsp;1</li>
                        <li>Action&nbsp;2</li>
                        <li>Action&nbsp;3</li>
                    </ul>
                '''

            $item.data('drop', drop)

    scrollInterval = undefined
    scrollTop = 0
    scrollTopDirection = 1

    setSection = (section) ->
        $browserDemo.attr('data-section', section)

        $('.section-copy').removeClass('active')
        $(""".section-copy[data-section="#{ section }"]""").addClass('active')

        openExampleItem = ->
            if isMobile
                $iframe.contents().find('.item:first').data().drop.open()
            else
                $iframe.contents().find('.item:eq(2)').data().drop.open()

        closeAllItems = ->
            $iframe.contents().find('.item').each -> $(@).data().drop.close() or true

        scrollLeftSection = ->
            scrollInterval = setInterval ->
                $iframe.contents().find('.left').scrollTop scrollTop
                scrollTop += scrollTopDirection
                if scrollTop > 50
                    scrollTopDirection = -1
                if scrollTop < 0
                    scrollTopDirection = 1
            , 30

        stopScrollingLeftSection = ->
            clearInterval scrollInterval

        switch section

            when 'what'
                closeAllItems()
                openExampleItem()
                stopScrollingLeftSection()

            when 'how'
                closeAllItems()
                openExampleItem()
                stopScrollingLeftSection()
                scrollLeftSection()

            when 'why'
                closeAllItems()
                openExampleItem()
                stopScrollingLeftSection()
                scrollLeftSection()

            when 'outro'
                closeAllItems()
                openExampleItem()
                stopScrollingLeftSection()

init()