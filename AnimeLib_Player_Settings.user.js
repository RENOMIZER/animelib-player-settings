// ==UserScript==
// @name         AnimeLib Player Settings
// @namespace    mailto:implaninyl1977@rambler.ru
// @version      1.0
// @description  Settings for video player
// @author       RENOMIZER
// @match        https://animelib.me/anime/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.3.js
// @require      file://D:\VSCode\AnimeLib_Player_Settings\AnimeLib_Player_Settings.user.js
// ==/UserScript==

var $ = window.jQuery
var def_hght = 600
var hght = GM_getValue("hght")

/* Set max values */
$('.collapse__body').css('max-height', '900px');

(function () {
    'use strict'

    console.log('111')

    /* Add style */
    $('body').css('href', './settings_styles.css')

    /* Add button */
    $('<div class="reader-header-action reader-header-action_icon player-height"> </div>').insertBefore($('#add-chapter-bookmark'))
    $('.player-height').append('<span class="reader-header__icon"> </span>')
    $('.player-height span.reader-header__icon').append('<i class="fa fa-solid fa-gear"></i>')

    /* Add panel */
    $('body').append('<div id="player-settings-modal" class="modal" data-type="slide" tabindex="-1"> </div>')
    $('#episodes-list-modal .popup__content').clone().appendTo($('#player-settings-modal'))
    $('#player-settings-modal div.modal__body').remove()
    $('#player-settings-modal h4').text("Настройки плеера")
    $('#player-settings-modal div.modal__content').append('<div id="settings" class="modal__body"> </div>')
    $('#player-settings-modal div.modal__content').attr('style', 'overflow-y: auto; left: 80%; width: 20%')

    /* Add content */
    $('#settings').append('<div class="slidecontainer"> </div>')
    $('.slidecontainer').append('<h1 class="slideheader"> Высота плеера </h1>')
    $('.slidecontainer').append('<input type="range" min="60" max="80" class="slider" id="player-height_var" name="player-height_var">')
    $('.slidecontainer').append('<h2 class="slidemin"> 0 </h2>')
    $('.slidecontainer').append('<h3 class="slidemax"> 100 </h3>')
    $('.slider').attr('value', hght)

    /* Add animation */
    $('.player-height').attr('data-open-modal', '#player-settings-modal');
    $('.player-height').attr('data-media-up', 'md');

    /* Apply settings (init) */
    $('.player-frame').css('height', hght + 'px');
    $('.player-frame').css('max-height', hght + 'px');
    $('.collapse__body').css('height', hght + 'px');

    /* Apply settings */
    $('#player-height_var.slider').on('click', function () {
        hght = $('#player-height_var.slider').val() * 10
        $('.player-frame').css('height', hght + 'px');
        $('.player-frame').css('max-height', hght + 'px');
        $('.collapse__body').css('height', hght + 'px');
        GM_setValue("hght", hght);
    })
}
)();