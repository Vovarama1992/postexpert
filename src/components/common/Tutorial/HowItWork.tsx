import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';

// Функция для преобразования URL в формат embed
const getYoutubeEmbedUrl = (url: string): string => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const HowItWork = ({
                       show,
                       close,
                       source,
                   }: {
    show: boolean;
    source?: string;
    close: () => void;
}) => {
    const videoUrl = source ? getYoutubeEmbedUrl(source) : 'https://www.youtube.com/embed/29wI7vC5y3g';

    return (
        <Lightbox
            open={show}
            close={close}
            plugins={[Video]}
            render={{
                slide: ({slide, rect}) => {


                    // @ts-ignore
                    return slide.type === 'custom-slide' ? <iframe
                        // @ts-ignore
                        width={Math.min(slide.width, rect.width, (slide.width * rect.height) / slide.height)}
                        // @ts-ignore
                        height={Math.min(slide.height, rect.height, (slide.height * rect.width) / slide.width)}

                        // @ts-ignore
                        src={slide.src}
                        // @ts-ignore
                        title={slide.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    /> : null
                }
            }}
            slides={[
                {
                    // @ts-ignore
                    type: 'custom-slide',
                    width: 1280,
                    height: 720, src: videoUrl,
                },
            ]}
        />
    );
};

export default HowItWork;