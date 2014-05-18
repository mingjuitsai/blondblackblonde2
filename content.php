<?php
/**
 * @package blondblackblonde
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<h1 class="entry-title extend-section"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta extend-section">
			<?php blondblackblonde_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->
	
	<?php if ( is_search() ) : // Only display Excerpts for Search ?>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	<?php else : ?>
	<div class="entry-content">
		<?php the_content(); ?>
		<!-- 
			Flexible Content 
		-->
		<?php while(the_flexible_field("flex_content")): ?>
 		
			<?php if(get_row_layout() == "header"):
				// vars
				$image = get_sub_field('img');
				$title = get_sub_field('title');
				$sub_title = get_sub_field('sub_title');
			?>
				<section class="entry-subheader clear">
					<img class="entry-img" src="<?php echo $image; ?>" alt="">
					<h1 class="entry-title extend-section">
						<?php echo $title; ?>
					</h1>
					<h2 class="entry-subtitle extend-section">
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
		<!-- 
		Flexible Content END 
		-->
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'blondblackblonde' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
	<?php endif; ?>

	<footer class="entry-meta">
		<?php if ( 'post' == get_post_type() ) : // Hide category and tag text for pages on Search ?>
			<?php
				/* translators: used between list items, there is a space after the comma */
				$categories_list = get_the_category_list( __( ', ', 'blondblackblonde' ) );
				if ( $categories_list && blondblackblonde_categorized_blog() ) :
			?>
			<span class="cat-links">
				<?php printf( __( 'Posted in %1$s', 'blondblackblonde' ), $categories_list ); ?>
			</span>
			<?php endif; // End if categories ?>

			<?php
				/* translators: used between list items, there is a space after the comma */
				$tags_list = get_the_tag_list( '', __( ', ', 'blondblackblonde' ) );
				if ( $tags_list ) :
			?>
			<span class="tags-links">
				<?php printf( __( 'Tagged %1$s', 'blondblackblonde' ), $tags_list ); ?>
			</span>
			<?php endif; // End if $tags_list ?>
		<?php endif; // End if 'post' == get_post_type() ?>

		<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
		<span class="comments-link"><?php comments_popup_link( __( 'Leave a comment', 'blondblackblonde' ), __( '1 Comment', 'blondblackblonde' ), __( '% Comments', 'blondblackblonde' ) ); ?></span>
		<?php endif; ?>

		<?php edit_post_link( __( 'Edit', 'blondblackblonde' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-meta -->
</article><!-- #post-## -->
