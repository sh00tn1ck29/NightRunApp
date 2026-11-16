import { ResponsiveImage } from '../../../shared/ui/ResponsiveImage';
import { responsiveProps } from '../../../shared/lib/responsive-image';
import { useEffect, useRef, useState } from 'react';
import type { Machine } from '../../../entities/machine';
import { getMachinePhotos } from '../model/machine-photos';
import './MachineGallery.scss';


export function MachineGallery({ machine }: { machine: Machine }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revision, setRevision] = useState(0);
  const request = useRef(0);
  const pendingImage = useRef<HTMLImageElement | null>(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  useEffect(() => () => {
    request.current++;
    if (pendingImage.current) pendingImage.current.onload = pendingImage.current.onerror = null;
  }, []);
  const photos = getMachinePhotos(machine);
  const selected = photos[selectedIndex];

  const selectPhoto = (index: number) => {
    const token = ++request.current;
    if (pendingImage.current) pendingImage.current.onload = pendingImage.current.onerror = null;
    setErrorIndex(null);
    setPendingIndex(index);
    const image = new Image();
    pendingImage.current = image;
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
        if (token !== request.current) return;
        setSelectedIndex(index);
        setRevision(value => value + 1);
        setPendingIndex(null);
      } catch { image.onerror?.(new Event('error')); }
    };
    image.onerror = () => {
      if (token !== request.current) return;
      setErrorIndex(index);
      setPendingIndex(null);
    };
    const responsive = responsiveProps(photos[index].src);
    if (responsive.srcSet) {
      image.sizes = responsive.sizes!;
      image.srcset = responsive.srcSet;
    }
    image.src = photos[index].src;
  };

  return <section className="machine-gallery" aria-labelledby="gallery-title">
    <div className="machine-page__container">
      <p className="machine-page__label"><span>03</span><span lang="ja">記録</span> — Visual archive<i aria-hidden="true" /></p>
      <div className="machine-gallery__heading">
        <h2 id="gallery-title">Details in motion.</h2>
        <p className="machine-gallery__counter" aria-live="polite" aria-atomic="true">{String(selectedIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</p>
      </div>
      <div className="machine-gallery__stage" id="machine-gallery-photo" aria-busy={pendingIndex !== null}>
        <ResponsiveImage key={`${selected.src}-${revision}`} className="machine-gallery__image" src={selected.src} alt={selected.alt} loading="lazy" decoding="async" onError={() => setErrorIndex(selectedIndex)} />
        <span className="machine-gallery__japanese" lang="ja">{machine.japanese}</span>
      </div>
      <fieldset className="machine-gallery__thumbnails" aria-label="Choose an archive photograph">
        {photos.map((photo, index) => <button className={`machine-gallery__thumbnail${selectedIndex === index ? ' machine-gallery__thumbnail--active' : ''}`} type="button" key={photo.src} onClick={() => selectPhoto(index)} aria-pressed={selectedIndex === index} aria-controls="machine-gallery-photo" aria-label={`Photo ${index + 1}: ${photo.alt}`}>
          <ResponsiveImage src={photo.src} sizes="(max-width: 767px) 24vw, 22vw" alt="" loading="lazy" decoding="async" />
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </button>)}
      </fieldset>
      <output className="machine-gallery__status">{pendingIndex !== null ? 'Loading photograph...' : ''}</output>
      {errorIndex !== null && <p className="machine-gallery__error" role="alert">Unable to load this photograph. <button type="button" onClick={() => selectPhoto(errorIndex)}>Try again</button></p>}
      <p className="machine-gallery__credit">Photo: <a href={selected.source} target="_blank" rel="noreferrer">{selected.author}</a> · <a href={selected.licenseUrl} target="_blank" rel="noreferrer">{selected.license}</a></p>
    </div>
  </section>;
}
