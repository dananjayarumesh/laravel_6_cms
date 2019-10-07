<?php

namespace Modules\Menu\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SeedMenuIconsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $items = array('fa-adjust',
            'fa-anchor',
            'fa-archive',
            'fa-area-chart',
            'fa-arrows',
            'fa-arrows-h',
            'fa-arrows-v',
            'fa-asterisk',
            'fa-at',
            'fa-automobile',
            'fa-balance-scale',
            'fa-ban',
            'fa-bank',
            'fa-bar-chart',
            'fa-bar-chart-o',
            'fa-barcode',
            'fa-bars',
            'fa-battery-0',
            'fa-battery-1',
            'fa-battery-2',
            'fa-battery-3',
            'fa-battery-4',
            'fa-battery-empty',
            'fa-battery-full',
            'fa-battery-half',
            'fa-battery-quarter',
            'fa-battery-three-quarters',
            'fa-bed',
            'fa-beer',
            'fa-bell',
            'fa-bell-o',
            'fa-bell-slash',
            'fa-bell-slash-o',
            'fa-bicycle',
            'fa-binoculars',
            'fa-birthday-cake',
            'fa-bolt',
            'fa-bomb',
            'fa-book',
            'fa-bookmark',
            'fa-bookmark-o',
            'fa-briefcase',
            'fa-bug',
            'fa-building',
            'fa-building-o',
            'fa-bullhorn',
            'fa-bullseye',
            'fa-bus',
            'fa-cab',
            'fa-calculator',
            'fa-calendar',
            'fa-calendar-check-o',
            'fa-calendar-minus-o',
            'fa-calendar-o',
            'fa-calendar-plus-o',
            'fa-calendar-times-o',
            'fa-camera',
            'fa-camera-retro',
            'fa-car',
            'caret-square-o-down',
            'caret-square-o-left',
            'caret-square-o-right',
            'caret-square-o-up',
            'fa-cart-arrow-down',
            'fa-cart-plus',
            'fa-cc',
            'fa-certificate',
            'fa-check',
            'fa-check-circle',
            'fa-check-circle-o',
            'fa-check-square',
            'fa-check-square-o',
            'fa-child',
            'fa-circle',
            'fa-circle-o',
            'fa-circle-o-notch',
            'fa-circle-thin',
            'fa-clock-o',
            'fa-clone',
            'fa-close',
            'fa-cloud',
            'fa-cloud-download',
            'fa-cloud-upload',
            'fa-code',
            'fa-code-fork',
            'fa-coffee',
            'fa-cog',
            'fa-cogs',
            'fa-comment',
            'fa-comment-o',
            'fa-commenting',
            'fa-commenting-o',
            'fa-comments',
            'fa-comments-o',
            'fa-compass',
            'fa-copyright',
            'fa-creative-commons',
            'fa-credit-card',
            'fa-crop',
            'fa-crosshairs',
            'fa-cube',
            'fa-cubes',
            'fa-cutlery',
            'fa-dashboard',
            'fa-database',
            'fa-desktop',
            'fa-diamond',
            'fa-dot-circle-o',
            'fa-download',
            'fa-edit',
            'fa-ellipsis-h',
            'fa-ellipsis-v',
            'fa-envelope',
            'fa-envelope-o',
            'fa-envelope-square',
            'fa-eraser',
            'fa-exchange',
            'fa-exclamation',
            'fa-exclamation-circle',
            'fa-exclamation-triangle',
            'fa-external-link',
            'fa-external-link-square',
            'fa-eye',
            'fa-eye-slash',
            'fa-eyedropper',
            'fa-fax',
            'fa-feed',
            'fa-female',
            'fa-fighter-jet',
            'fa-file-archive-o',
            'fa-file-audio-o',
            'fa-file-code-o',
            'fa-file-excel-o',
            'fa-file-image-o',
            'fa-file-movie-o',
            'fa-file-pdf-o',
            'fa-file-photo-o',
            'fa-file-picture-o',
            'fa-file-powerpoint-o',
            'fa-file-sound-o',
            'fa-file-video-o',
            'fa-file-word-o',
            'fa-file-zip-o',
            'fa-film',
            'fa-filter',
            'fa-fire',
            'fa-fire-extinguisher',
            'fa-flag',
            'fa-flag-checkered',
            'fa-flag-o',
            'fa-flash',
            'fa-flask',
            'fa-folder',
            'fa-folder-o',
            'fa-folder-open',
            'fa-folder-open-o',
            'fa-frown-o',
            'fa-futbol-o',
            'fa-gamepad',
            'fa-gavel',
            'fa-gear',
            'fa-gears',
            'fa-gift',
            'fa-glass',
            'fa-globe',
            'fa-graduation-cap',
            'fa-group',
            'fa-hand-grab-o',
            'fa-hand-lizard-o',
            'fa-hand-paper-o',
            'fa-hand-peace-o',
            'fa-hand-pointer-o',
            'fa-hand-rock-o',
            'fa-hand-scissors-o',
            'fa-hand-spock-o',
            'fa-hand-stop-o',
            'fa-hdd-o',
            'fa-headphones',
            'fa-heart',
            'fa-heart-o',
            'fa-heartbeat',
            'fa-history',
            'fa-home',
            'fa-hotel',
            'fa-hourglass',
            'fa-hourglass-1',
            'fa-hourglass-2',
            'fa-hourglass-3',
            'fa-hourglass-end',
            'fa-hourglass-half',
            'fa-hourglass-o',
            'fa-hourglass-start',
            'fa-i-cursor',
            'fa-image',
            'fa-inbox',
            'fa-industry',
            'fa-info',
            'fa-info-circle',
            'fa-institution',
            'fa-key',
            'fa-keyboard-o',
            'fa-language',
            'fa-laptop',
            'fa-leaf',
            'fa-legal',
            'fa-lemon-o',
            'fa-level-down',
            'fa-level-up',
            'fa-life-bouy',
            'fa-life-buoy',
            'fa-life-ring',
            'fa-life-saver',
            'fa-lightbulb-o',
            'fa-line-chart',
            'fa-location-arrow',
            'fa-lock',
            'fa-magic',
            'fa-magnet',
            'fa-mail-forward',
            'fa-mail-reply',
            'fa-mail-reply-all',
            'fa-male',
            'fa-map',
            'fa-map-marker',
            'fa-map-o',
            'fa-map-pin',
            'fa-map-signs',
            'fa-meh-o',
            'fa-microphone',
            'fa-microphone-slash',
            'fa-minus',
            'fa-minus-circle',
            'fa-minus-square',
            'fa-minus-square-o',
            'fa-mobile',
            'fa-mobile-phone',
            'fa-money',
            'fa-moon-o',
            'fa-mortar-board',
            'fa-motorcycle',
            'fa-mouse-pointer',
            'fa-music',
            'fa-navicon',
            'fa-newspaper-o',
            'fa-object-group',
            'fa-object-ungroup',
            'fa-paint-brush',
            'fa-paper-plane',
            'fa-paper-plane-o',
            'fa-paw',
            'fa-pencil',
            'fa-pencil-square',
            'fa-pencil-square-o',
            'fa-phone',
            'fa-phone-square',
            'fa-photo',
            'fa-picture-o',
            'fa-pie-chart',
            'fa-plane',
            'fa-plug',
            'fa-plus',
            'fa-plus-circle',
            'fa-plus-square',
            'fa-plus-square-o',
            'fa-power-off',
            'fa-print',
            'fa-puzzle-piece',
            'fa-qrcode',
            'fa-question',
            'fa-question-circle',
            'fa-quote-left',
            'fa-quote-right',
            'fa-random',
            'fa-recycle',
            'fa-refresh',
            'fa-registered',
            'fa-remove',
            'fa-reorder',
            'fa-reply',
            'fa-reply-all',
            'fa-retweet',
            'fa-road',
            'fa-rocket',
            'fa-rss',
            'fa-rss-square',
            'fa-search',
            'fa-search-minus',
            'fa-search-plus',
            'fa-send',
            'fa-send-o',
            'fa-server',
            'fa-share',
            'fa-share-alt',
            'fa-share-alt-square',
            'fa-share-square',
            'fa-share-square-o',
            'fa-shield',
            'fa-ship',
            'fa-shopping-cart',
            'fa-sign-in',
            'fa-sign-out',
            'fa-signal',
            'fa-sitemap',
            'fa-sliders',
            'fa-smile-o',
            'fa-soccer-ball-o',
            'fa-sort',
            'fa-sort-alpha-asc',
            'fa-sort-alpha-desc',
            'fa-sort-amount-asc',
            'fa-sort-amount-desc',
            'fa-sort-asc',
            'fa-sort-desc',
            'fa-sort-down',
            'fa-sort-numeric-asc',
            'fa-sort-numeric-desc',
            'fa-sort-up',
            'fa-space-shuttle',
            'fa-spinner',
            'fa-spoon',
            'fa-square',
            'fa-square-o',
            'fa-star',
            'fa-star-half',
            'fa-star-half-empty',
            'fa-star-half-full',
            'fa-star-half-o',
            'fa-star-o',
            'fa-sticky-note',
            'fa-sticky-note-o',
            'fa-street-view',
            'fa-suitcase',
            'fa-sun-o',
            'fa-support',
            'fa-tablet',
            'fa-tachometer',
            'fa-tag',
            'fa-tags',
            'fa-tasks',
            'fa-taxi',
            'fa-television',
            'fa-terminal',
            'fa-thumb-tack',
            'fa-thumbs-down',
            'fa-thumbs-o-down',
            'fa-thumbs-o-up',
            'fa-thumbs-up',
            'fa-ticket',
            'fa-times',
            'fa-times-circle',
            'fa-times-circle-o',
            'fa-tint',
            'fa-toggle-down',
            'fa-toggle-left',
            'fa-toggle-off',
            'fa-toggle-on',
            'fa-toggle-right',
            'fa-toggle-up',
            'fa-trademark',
            'fa-trash',
            'fa-trash-o',
            'fa-tree',
            'fa-trophy',
            'fa-truck',
            'fa-tty',
            'fa-tv',
            'fa-umbrella',
            'fa-university',
            'fa-unlock',
            'fa-unlock-alt',
            'fa-unsorted',
            'fa-upload',
            'fa-user',
            'fa-user-plus',
            'fa-user-secret',
            'fa-user-times',
            'fa-users',
            'fa-video-camera',
            'fa-volume-down',
            'fa-volume-off',
            'fa-volume-up',
            'fa-warning',
            'fa-wheelchair',
            'fa-wifi',
            'fa-wrench',
            'fa-angle-double-left',
            'fa-angle-double-right',
            'fa-angle-double-up',
            'fa-angle-down',
            'fa-angle-left',
            'fa-angle-right',
            'fa-angle-up',
            'fa-arrow-circle-down',
            'fa-arrow-circle-left',
            'fa-arrow-circle-o-down',
            'fa-arrow-circle-o-left',
            'fa-arrow-circle-o-right',
            'fa-arrow-circle-o-up',
            'fa-arrow-circle-right',
            'fa-arrow-circle-up',
            'fa-arrow-down',
            'fa-arrow-left',
            'fa-arrow-right',
            'fa-arrow-up',
            'fa-arrows-alt',
            'fa-caret-down',
            'fa-caret-left',
            'fa-caret-right',
            'fa-caret-square-o-down',
            'fa-caret-square-o-left',
            'fa-caret-square-o-right',
            'fa-caret-square-o-up',
            'fa-caret-up',
            'fa-chevron-circle-down',
            'fa-chevron-circle-left',
            'fa-chevron-circle-right',
            'fa-chevron-circle-up',
            'fa-chevron-down',
            'fa-chevron-left',
            'fa-chevron-right',
            'fa-chevron-up',
            'fa-hand-o-down',
            'fa-hand-o-left',
            'fa-hand-o-right',
            'fa-hand-o-up',
            'fa-long-arrow-down',
            'fa-long-arrow-left',
            'fa-long-arrow-right',
            'fa-long-arrow-up',
            'fa-angle-double-down');


foreach ($items as $key => $item) {
    DB::table('menu_icons')->insert([
        'icon_class' => $item,
    ]);
}




        // $this->call("OthersTableSeeder");
}
}