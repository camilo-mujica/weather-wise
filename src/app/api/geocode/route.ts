export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  const res = await fetch(
    `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address!)}&benchmark=4&format=json`
  );
  const data = await res.json();

  return Response.json(data);
}
