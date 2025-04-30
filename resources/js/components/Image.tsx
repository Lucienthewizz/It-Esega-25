import React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    sizes?: string;
    priority?: boolean;
}

export function Image({ src, alt, className = '', sizes = '100vw', priority = false }: ImageProps) {
    // Generate WebP version path
    const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
    
    // Generate srcset for responsive images
    const generateSrcSet = (imagePath: string) => {
        const widths = [640, 750, 828, 1080, 1200, 1920];
        return widths
            .map((width) => {
                const path = imagePath.replace(/\.(png|jpg|jpeg|webp)$/, `_${width}.$1`);
                return `${path} ${width}w`;
            })
            .join(', ');
    };

    return (
        <picture>
            {/* WebP Format */}
            <source
                type="image/webp"
                srcSet={generateSrcSet(webpSrc)}
                sizes={sizes}
            />
            {/* Fallback Format */}
            <img
                src={src}
                srcSet={generateSrcSet(src)}
                sizes={sizes}
                alt={alt}
                className={className}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
            />
        </picture>
    );
} 