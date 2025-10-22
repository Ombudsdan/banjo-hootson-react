import { IPlushie } from "@/controllers/plushie-bio.controller";
import { Image } from "@/framework/Image";

export function PlushieBio({
  plushie,
  position,
}: {
  plushie: IPlushie;
  position: number;
}) {
  const isEven = position % 2 === 0;
  return (
    <div
      className={`plushie-bio plushie-bio--align-${isEven ? "right" : "left"}`}
    >
      <div className="plushie-bio__image-container">
        <Image alt={plushie.name} fileName={plushie.fileName} usage="bio" />
      </div>
      <div className="plushie-bio__text-container">
        <h3>{plushie.name}</h3>
        <p>{plushie.bio}</p>
        <p>{plushie.birthday}</p>
      </div>
    </div>
  );
}
