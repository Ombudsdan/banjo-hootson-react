import { IPlushie } from 'controllers';
import { ImageUsage } from 'enums';
import { Image } from 'framework';

export default function PlushieBio({ plushie, position }: IPlushieBio) {
  const isEven = position % 2 === 0;
  return (
    <div className={`plushie-bio plushie-bio--align-${isEven ? 'right' : 'left'}`}>
      <div className="plushie-bio__image-container">
        <Image alt={plushie.name} fileName={plushie.fileName} usage={ImageUsage.BIO} />
      </div>
      <div className="plushie-bio__text-container">
        <h3>{plushie.name}</h3>
        <p>{plushie.bio}</p>
        <p>{plushie.birthday}</p>
      </div>
    </div>
  );
}

interface IPlushieBio {
  plushie: IPlushie;
  position: number;
}
