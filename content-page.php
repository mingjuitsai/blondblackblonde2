<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package blondblackblonde
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<!-- notice: hidding page title on home page atm using is_front_page -->
		<?php if(!is_front_page()): ?>
			<!-- <h1 class="entry-title"><?php the_title(); ?></h1> -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'blondblackblonde' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
	<?php edit_post_link( __( 'Edit', 'blondblackblonde' ), '<footer class="entry-meta"><span class="edit-link">', '</span></footer>' ); ?>
</article><!-- #post-## -->
