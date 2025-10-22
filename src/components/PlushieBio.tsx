import { IPlushie } from 'controllers';
import { ImageUsage } from 'enums';
import { Image } from 'framework';
import { useMemo } from 'react';
import { generateClassName } from 'utils';

export default function PlushieBio({ plushie, position }: IPlushieBio) {
  const { fileName, name, bio, birthday } = plushie;
  const isEven = position % 2 === 0;

  const className = useMemo(() => {
    return generateClassName(['plushie-bio', isEven ? 'plushie-bio--align-right' : 'plushie-bio--align-left']);
  }, [isEven]);

  return (
    <div className={className}>
      <div className="plushie-bio__image-container">
        <Image alt={name} fileName={fileName} usage={ImageUsage.BIO} />
      </div>
      <div className="plushie-bio__text-container">
        <h3>{name}</h3>
        <p>{bio}</p>
        <p>{birthday}</p>
      </div>
    </div>
  );
}

interface IPlushieBio {
  plushie: IPlushie;
  position: number;
}
