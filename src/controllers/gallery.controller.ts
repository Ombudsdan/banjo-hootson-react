export default class GalleryController {
  static get homeItems(): GalleryItem[] {
    return HOME_GALLERY_ITEMS;
  }
}

const HOME_GALLERY_ITEMS: GalleryItem[] = [
  {
    fileName: "home-connect-1",
    alt: "Gallery image 1 for the connect section showing Banjo wearing his grey Mickey Mouse jumper eating a pizza in Pizza Hut.",
  },
  {
    fileName: "home-connect-2",
    alt: "Gallery image 2 for the connect section showing Banjo wearing a blue and white stripey jumper standing on the Shambles in York.",
  },
  {
    fileName: "home-connect-3",
    alt: 'Gallery image 3 for the connect section showing Banjo wearing his grey Mickey Mouse jumper standing infront of "Camden Lock" writing on the side of a bridge in London.',
  },
  {
    fileName: "home-connect-4",
    alt: "Gallery image 4 for the connect section showing Banjo wearing his yellow raincoat standing in front of Clifford's Tower in York.",
  },
];
export interface GalleryItem {
  fileName: string;
  alt: string;
}
