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
	<?php edit_post_link( __( 'Edit', 'blondblackblonde' ), '<footer class="entry-meta"><span class="edit-link">', '</span></footer>' ); ?>
</article><!-- #post-## -->
