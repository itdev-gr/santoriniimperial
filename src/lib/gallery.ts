// Descriptive alt text for each gallery image (improves accessibility + SEO).
export const GALLERY_ALT: Record<string, string> = {
  '01.jpg': 'Black Mercedes-Benz E-Class and Vito van parked on a cobbled clifftop road in Santorini',
  '02.jpg': 'Mercedes-Benz E-Class and Vito transfer van on a Santorini cobblestone drive beside a whitewashed villa',
  '03.jpg': 'Mercedes-Benz E-Class and V-Class parked outside a whitewashed Santorini villa',
  '04.jpg': 'Mercedes-Benz E-Class with headlights on and a Vito van parked by a Santorini villa',
  '05.jpg': 'Mercedes-Benz Vito van and E-Class on a clifftop overlooking the Santorini caldera at dusk',
  '06.jpg': 'Mercedes-Benz Vito van and E-Class facing the Santorini caldera during a sea sunset',
  '07.jpg': 'Illuminated dashboard and steering wheel of a Mercedes-Benz E-Class with a Santorini chapel beyond',
  '08.jpg': 'Chauffeur in a suit opening the rear door of a black Mercedes-Benz luxury sedan',
  '09.jpg': 'Black Mercedes-Benz E-Class at a Santorini clifftop viewpoint as the sun sets over the sea',
  '10.jpg': 'Three Mercedes-Benz transfer vehicles parked at a Santorini viewpoint during golden-hour sunset',
  '11.jpg': 'Mercedes-Benz V-Class van and E-Class sedan framing the sun setting over the Santorini hills',
  '12.jpg': 'Row of black Mercedes-Benz vehicles parked on a Santorini clifftop at twilight',
  '13.jpg': 'Mercedes-Benz fleet parked above the caldera with a Santorini village glowing at sunset',
  '14.jpg': 'Mercedes-Benz V-Class, E-Class and Vito parked on a cobbled clifftop at sunset in Santorini',
  '15.jpg': 'Close-up of three black Mercedes-Benz vehicles parked side by side at sunset in Santorini',
  '16.jpg': 'View of the Santorini caldera through a Mercedes-Benz interior with a Vito van parked ahead',
  '17.jpg': 'Black leather rear seats of a Mercedes-Benz V-Class van with warm sunset light through the windows',
  '18.jpg': "Driver's view from a Mercedes-Benz cockpit overlooking the Santorini coastline at dusk",
  '19.jpg': 'Mercedes-Benz V-Class interior with ambient lighting and views over the Santorini caldera',
  '20.jpg': 'Steering wheel and digital dashboard of a Mercedes-Benz van facing the Santorini sea at dusk',
  '21.jpg': 'Open door of a Mercedes-Benz revealing ambient-lit leather seats at twilight in Santorini',
};

export function galleryImages(): Array<{ src: string; alt: string }> {
  const files = import.meta.glob('/public/images/gallery/*.{jpg,jpeg,png,webp}', { eager: false });
  return Object.keys(files)
    .sort()
    .map((p) => {
      const name = p.split('/').pop()!;
      return {
        src: p.replace('/public', ''),
        alt: GALLERY_ALT[name] ?? 'Santorini Imperial Mercedes-Benz fleet and private tours in Santorini',
      };
    });
}
