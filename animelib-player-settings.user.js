// ==UserScript==
// @name         AnimeLib Player Settings
// @namespace    mailto:implaninyl1977@rambler.ru
// @version      1.1
// @description  Settings for video player
// @author       RENOMIZER
// @match        https://animelib.me/anime/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @require https://code.jquery.com/jquery-3.6.3.js
// @license GNU GPLv3
// ==/UserScript==

var $ = window.jQuery;
var hght = GM_getValue("hght");

(function () {
    'use strict'

    /* Add button */
    $('<div class="reader-header-action reader-header-action_icon player-height"> </div>').insertBefore($('#add-chapter-bookmark'));
    $('.player-height').append('<span class="reader-header__icon"> </span>');
    $('.player-height span.reader-header__icon').append('<i class="fa fa-solid fa-gear"></i>');

    /* Add panel */
    $('body').append('<div id="player-settings-modal" class="modal" data-type="slide" tabindex="-1"> </div>');
    $('#episodes-list-modal .popup__content').clone().appendTo($('#player-settings-modal'));
    $('#player-settings-modal div.modal__body').remove();
    $('#player-settings-modal h4').text("Настройки плеера");
    $('#player-settings-modal div.modal__content').append('<div id="settings" class="modal__body"> </div>');
    $('#player-settings-modal div.modal__content').attr('style', 'overflow-y: auto; left: 80%; width: 20%');

    /* Add content */
    $('#settings').append('<div class="slidecontainer"> </div>');
    $('.slidecontainer').append('<h1 class="slideheader"> Высота плеера </h1>');
    $('.slidecontainer').append('<input type="range" min="60" max="80" class="slider" id="player-height_var" name="player-height_var">');
    $('.slidecontainer').append('<h2 class="slidemin"> 0 </h2>');
    $('.slidecontainer').append('<h3 class="slidemax"> 100 </h3>');
    $('.slider').attr('value', hght / 10);

    /* Add animation */
    $('.player-height').attr('data-open-modal', '#player-settings-modal');
    $('.player-height').attr('data-media-up', 'md');

    /* Apply settings (init) */
    window.onload = function () {
        $('.player-frame').css('height', hght + 'px');
        $('.player-frame').css('max-height', hght + 'px');
        $('.plyr').css('height', 'inherit');
        $('.collapse__body').css('height', hght + 'px');
        $('.collapse__body').css('max-height', hght + 'px');
    }

    /* Apply settings */
    $('#player-height_var.slider').on('click', function () {
        hght = $('#player-height_var.slider').val() * 10;
        $('.player-frame').css('height', hght + 'px');
        $('.player-frame').css('max-height', hght + 'px');
        $('.plyr').css('height', 'inherit');
        $('.collapse__body').css('height', hght + 'px');
        $('.collapse__body').css('max-height', hght + 'px');
        GM_setValue("hght", hght);
    })

    GM_addStyle(`
    .slidecontainer
    {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
    }

    .slideheader
    {
        font-size: 16px;
        align-self: baseline;
    }

    .slidemin
    {
        font-size: 16px;
    }

    .slidemax
    {
        font-size: 16px;
        margin-left: auto;
    }

    /* The slider itself */
    .slider
    {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        width: 100%; /* Full-width */
        height: 10px; /* Specified height */
        background: #1f2123; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* Mouse-over effects */
    .slider:hover
    {
        opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */

    .slider::-webkit-slider-thumb
    {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #572599; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }

    .slider::-moz-range-thumb
    {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #572599; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }
    `)
}
)();
