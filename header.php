<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package blondblackblonde
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri().'/bbb.png'; ?>">
<!-- TypeKit Font Javascript, must be in <head> tag  -->
<script type="text/javascript" src="//use.typekit.net/ois5gbi.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">

	<header id="masthead" class="site-header" role="banner">
		<?php if ( !wp_is_mobile() ): ?>
			<!-- Notice: canvas drawing
				<div id="header-canvas" class="wrap-canvas"></div> 
			-->
		<?php endif ?>
		<div class="site-branding">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<!-- <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2> -->
		</div>

		<nav id="site-navigation" class="main-navigation" role="navigation">
			<h1 class="menu-toggle"><?php _e( 'Menu', 'blondblackblonde' ); ?></h1>
			<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'blondblackblonde' ); ?></a>

			<?php 
				$menu_arg = array(
						'theme_location'  => 'primary',
						'before'          => '',
						'after'           => '',
						'link_before'     => '<div id="shape" class="wrap-canvas"></div><span class="nav-menu-text">',
						'link_after'      => '</span>',
						'items_wrap' 	  => '<ul>%3$s</ul>'
				);
				wp_nav_menu($menu_arg);
			?>
			
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
