import { useState } from 'react';
import type { Machine } from '../../../entities/machine';
import { getMachinePhotos } from '../model/machine-photos';
import './MachineGallery.scss';


export function MachineGallery({ machine }: { machine: Machine }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const photos = getMachinePhotos(machine);
  const selected = photos[selectedIndex];

  return <section className="machine-gallery" aria-labelledby="gallery-title">
    <div className="machine-page__container">
      <p className="machine-page__label"><span>03</span><span lang="ja">記録</span> — Visual archive<i aria-hidden="true" /></p>
      <div className="machine-gallery__heading">
        <h2 id="gallery-title">Details in motion.</h2>
        <p className="machine-gallery__counter" aria-live="polite" aria-atomic="true">{String(selectedIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</p>
      </div>
      <div className="machine-gallery__stage" id="machine-gallery-photo">
        <img key={selected.src} className="machine-gallery__image" src={selected.src} alt={selected.alt} loading="lazy" decoding="async" />
        <span className="machine-gallery__japanese" lang="ja">{machine.japanese}</span>
      </div>
      <div className="machine-gallery__thumbnails" role="group" aria-label="Choose an archive photograph">
        {photos.map((photo, index) => <button className={`machine-gallery__thumbnail${selectedIndex === index ? ' machine-gallery__thumbnail--active' : ''}`} type="button" key={photo.src} onClick={() => setSelectedIndex(index)} aria-pressed={selectedIndex === index} aria-controls="machine-gallery-photo" aria-label={`Photo ${index + 1}: ${photo.alt}`}>
          <img src={photo.src} alt="" loading="lazy" decoding="async" />
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </button>)}
      </div>
      <p className="machine-gallery__credit">Photo: <a href={selected.source} target="_blank" rel="noreferrer">{selected.author}</a> · <a href={selected.licenseUrl} target="_blank" rel="noreferrer">{selected.license}</a></p>
    </div>
  </section>;
}
