<?php

require_once __DIR__.'/vendor/autoload.php';

$timber = new Timber\Timber();
$timmy = new Timmy\Timmy();

if (!class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="'.esc_url(admin_url('plugins.php#timber')).'">'.esc_url(admin_url('plugins.php')).'</a></p></div>';
    });
    add_filter('template_include', function ($template) {
        return '<h1>No Timber</h1>';
    });

    return;
}
/*
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');
/*
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;
/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php").
 */
class BoilerplateClass extends Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'theme_supports'));
        add_filter('timber_context', array($this, 'add_to_context'));
        add_filter('timmy/sizes', array($this, 'timmy_sizes'));
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_advanced_custom_fields'));
        add_action('init', array($this, 'register_taxonomies'));
        add_action('admin_enqueue_scripts', array( $this, 'load_admin_scripts' ));
        add_action('wp_enqueue_scripts', array( $this, 'load_scripts' ));
        add_filter('get_twig', array($this, 'add_to_twig'));
        add_filter( 'jpeg_quality', function() { return 95; } );
        add_filter( 'big_image_size_threshold', '__return_false' );

        add_filter('the_generator', function() { return ''; } );
        remove_action('wp_head', 'rest_output_link_wp_head', 10);
        remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
        remove_action('template_redirect', 'rest_output_link_header', 11, 0);
        remove_action ('wp_head', 'rsd_link');
        remove_action( 'wp_head', 'wlwmanifest_link');
        remove_action( 'wp_head', 'wp_shortlink_wp_head');
        remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
        remove_action( 'wp_print_styles', 'print_emoji_styles' );
        remove_action( 'wp_head', 'feed_links', 2 );

        parent::__construct();
    }

    public function theme_supports()
    {
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');
        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');
        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );
        /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
        add_theme_support(
            'post-formats',
            array(
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            )
        );
        add_theme_support('menus');
    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}
     */
    public function add_to_context($context)
    {
        $context['value'] = 'I am a value set in your functions.php file';
        $context['menu'] = new Timber\Menu();
        $context['site'] = $this;

        return $context;
    }

    public function timmy_sizes($sizes)
    {
        return array(
            'thumbnail' => array(
                'resize' => array(200, 200),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'lazy' => array(
                'resize' => array(800),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'lazy-landscape' => array(
                'resize' => array(800, 533),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'lazy-portrait' => array(
                'resize' => array(533, 800),
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'landscape-cropped' => array(
                'resize' => array(2500, 1666),
                'srcset' => array(0.5),
                'sizes' => '100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'landscape' => array(
                'resize' => array(2500),
                'srcset' => array(0.5),
                'sizes' => '100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'portrait-cropped' => array(
                'resize' => array(1250, 1875),
                'srcset' => array(0.5),
                'sizes' => '(min-width: 640px) 50vw, 100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'portrait' => array(
                'resize' => array(1250),
                'srcset' => array(0.5),
                'sizes' => '(min-width: 640px) 50vw, 100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
            'square' => array(
                'resize' => array(2500, 2500),
                'srcset' => array(0.5),
                'sizes' => '100vw',
                'oversize' => array(
                    'allow' => false,
                    'style_attr' => false,
                ),
            ),
        );
    }

    /** This is where you can register custom post types. */
    public function register_post_types()
    {
        require get_template_directory() . '/import/post-types.php';
    }

    public function register_advanced_custom_fields()
    {
        require get_template_directory() . '/import/advanced-custom-fields.php';
    }

    /** This is where you can register custom taxonomies. */
    public function register_taxonomies()
    {
    }

    public function load_scripts()
    {
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );

        // $manifest = file_get_contents(__DIR__ . '/manifest.json');
        // $json = json_decode($manifest,true);
        
        // $mainJs = $json["main.js"];
        // $headJs = $json["head.js"];
       
        // wp_enqueue_script('main', $mainJs, array(), time(), true);
        // wp_enqueue_script('head', $headJs, array(), time(), false);
    }

    public function load_admin_scripts()
    {
        wp_enqueue_style('admin', get_template_directory_uri() .'/css/admin.css', array(), false, 'all');
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension
     */
    public function add_to_twig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addFilter(new Twig_SimpleFilter('my_filter', array($this, 'my_filter')));
        $twig->addFilter(new Twig_SimpleFilter('inlineCriticalCSS', array($this, 'inlineCriticalCSS')));
        $twig->addFilter(new Twig_SimpleFilter('includeCSS', array($this, 'includeCSS')));
        $twig->addFilter(new Twig_SimpleFilter('includeJS', array($this, 'includeJS')));
        $twig->addFilter(new Twig_SimpleFilter('getDataSrcsetContents', array($this, 'getDataSrcsetContents')));
        $twig->addFilter(new Twig_SimpleFilter('getDataSrcContents', array($this, 'getDataSrcContents')));
        $twig->addFilter(new Twig_SimpleFilter('getSizesContents', array($this, 'getSizesContents')));
        
        return $twig;
    }

    /** This Would return 'foo bar!'.
     *
     * @param string $text being 'foo', then returned 'foo bar!'
     */
    public function my_filter($text)
    {
        $text .= ' bar!';

        return $text;
    }

    public function inlineCriticalCSS($file)
    {
        $css = file_get_contents(__DIR__ . '/css/' . $file);
        
        $module = '<style type="text/css">'. $css .'</style>';
        
        return $module;
    }

    public function includeCSS($file)
    {
        $manifest = file_get_contents(__DIR__ . '/manifest.json');
        $json = json_decode($manifest,true);
        

        $module = '<link rel="stylesheet" href="' . $json[$file] . '" media="print" onload="this.media=\'all\'" />'.
            '<noscript><link rel="stylesheet" href="' . $json[$file] . '"></noscript>';
        
        
        return $module;
    }

    public function includeJS($file)
    {
        $manifest = file_get_contents(__DIR__ . '/manifest.json');
        $json = json_decode($manifest,true);
        

        $module = '<script type="text/javascript" src="' . $json[$file] . '"></script>';
        
        
        return $module;
    }

    public function getDataSrcContents($text)
    {
        preg_match('/(?<=\bdata-src=")[^"]*/', $text, $matches);
        $contents = $matches[0];
        return $contents;
    }

    public function getDataSrcsetContents($text)
    {
        preg_match('/(?<=\bdata-srcset=")[^"]*/', $text, $matches);
        $contents = $matches[0];
        return $contents;
    }

    public function getSizesContents($text)
    {
        preg_match('/(?<=\bsizes=")[^"]*/', $text, $matches);
        $contents = $matches[0];
        return $contents;
    }
}
new BoilerplateClass();
