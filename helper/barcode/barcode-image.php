<?php
/**
 * Barcode Image Template
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

ddwcpos_generate_barcode_image( $_GET[ 'code' ], ! empty( $_GET[ 'orientation' ] ) ? $_GET[ 'orientation' ] : 'horizontal', ! empty( $_GET[ 'size' ] ) ? intval( $_GET[ 'size' ] ) : 20 );

/**
 * Generate barcode image function
 *
 * @param string $code_string
 * @return void
 */
function ddwcpos_generate_barcode_image( $code_string, $orientation = 'horizontal', $size = 20 ) {
    $code_type     = 'code128';
    $print         = false;
    $size_factor   = 1;
    $size          = $size;
    $barcode_width = '';
    $filepath      = '';

    // Pad the edges of the barcode
    $code_length = 20;
    if ( $print ) {
        $text_height = 30;
    } else {
        $text_height = 0;
    }

    for ( $i = 1; $i <= strlen( $code_string ); ++$i ) {
        $code_length = $code_length + intval( substr( $code_string, $i - 1, 1 ) );
    }

    if ( 'horizontal' === strtolower( $orientation ) ) {
        if ( empty( $barcode_width ) ) {
            $barcode_width = $code_length * $size_factor;
        }
        $img_width  = $barcode_width;
        $img_height = $size;
    } else {
        if ( empty( $barcode_width ) ) {
            $barcode_width = $size;
        }
        $img_width  = $barcode_width;
        $img_height = $code_length * $size_factor;
    }

    $image = imagecreate( $img_width, $img_height + $text_height );
    $black = imagecolorallocate( $image, 0, 0, 0 );
    $white = imagecolorallocate( $image, 255, 255, 255 );

    imagefill( $image, 0, 0, $white );
    if ( $print ) {
        imagestring( $image, 5, 31, $img_height, $text, $black );
    }

    $location = 10;
    for ( $position = 1; $position <= strlen( $code_string ); ++$position ) {
        $cur_size = $location + intval( substr( $code_string, $position - 1, 1 ) );
        if ( 'horizontal' === strtolower( $orientation ) ) {
            imagefilledrectangle( $image, $location * $size_factor, 0, $cur_size * $size_factor, $img_height, ( $position % 2 == 0 ? $white : $black ) );
        } else {
            imagefilledrectangle( $image, 0, $location * $size_factor, $img_width, $cur_size * $size_factor, ( $position % 2 == 0 ? $white : $black ) );
        }
        $location = $cur_size;
    }

    // Draw barcode to the screen or save in a file
    if ( '' === $filepath ) {
        header( 'Content-type: image/png' );
        imagepng( $image );
        imagedestroy( $image );
    } else {
        imagepng( $image, $filepath );
        imagedestroy( $image );
    }
}