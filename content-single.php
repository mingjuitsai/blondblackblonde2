<?php
/**
 * @package blondblackblonde
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>

		<div class="entry-meta">
			<?php blondblackblonde_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<!-- Flexible Content -->
		<?php while(the_flexible_field("flex_content")): ?>
 		
			<?php if(get_row_layout() == "header"):
				// vars
				$image = get_sub_field('img');
				$title = get_sub_field('title');
				$sub_title = get_sub_field('sub_title');
			?>
		 
				<section class="entry-subheader clear">
					<img class="entry-img" src="<?php echo $image; ?>" alt="">
					<h1 class="entry-title">
						<?php echo $title; ?>
					</h1>
					<h2 class="entry-subtitle">
						<?php echo $sub_title; ?>
					</h2>
				</section>
					
			<?php elseif(get_row_layout() == "medias"): // layout: File ?>
 
					<?php if( have_rows('files') ): ?>
						<ol class="playlist">
						<audio preload></audio>
						<!-- generating tracks -->
						 	<?php while( have_rows('files') ): the_row(); 
								// vars
						 		$attachment_id = get_sub_field('file');
								$url = wp_get_attachment_url( $attachment_id );
								$name = get_the_title( $attachment_id );
							?>
						    <li><a href="#" data-src="<?php echo $url; ?>"><span> <?php echo $name; ?></span></a></li>  

							<?php endwhile; ?>
				 		</ol>
					<?php else: ?>
				 	missing files
				<?php endif; ?>

			<?php elseif(get_row_layout() == "content"): ?>
		 
				<?php the_sub_field("content"); ?>
		 
			<?php endif; ?>
	 
		<?php endwhile; ?>
		<!-- Flexible Content END -->

		
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'blondblackblonde' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-meta">
		<?php
			/* translators: used between list items, there is a space after the comma */
			$category_list = get_the_category_list( __( ', ', 'blondblackblonde' ) );

			/* translators: used between list items, there is a space after the comma */
			$tag_list = get_the_tag_list( '', __( ', ', 'blondblackblonde' ) );

			if ( ! blondblackblonde_categorized_blog() ) {
				// This blog only has 1 category so we just need to worry about tags in the meta text
				if ( '' != $tag_list ) {
					$meta_text = __( 'This entry was tagged %2$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', 'blondblackblonde' );
				} else {
					$meta_text = __( 'Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', 'blondblackblonde' );
				}

			} else {
				// But this blog has loads of categories so we should probably display them here
				if ( '' != $tag_list ) {
					$meta_text = __( 'This entry was posted in %1$s and tagged %2$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', 'blondblackblonde' );
				} else {
					$meta_text = __( 'This entry was posted in %1$s. Bookmark the <a href="%3$s" rel="bookmark">permalink</a>.', 'blondblackblonde' );
				}

			} // end check for categories on this blog

			printf(
				$meta_text,
				$category_list,
				$tag_list,
				get_permalink()
			);
		?>

		<?php edit_post_link( __( 'Edit', 'blondblackblonde' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-meta -->
</article><!-- #post-## -->
