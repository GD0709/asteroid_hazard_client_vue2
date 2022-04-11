import MathExt from "../lib/MathExt";

export default class GoogleMapController{
    //center: {latitude: number, longitude: number} = {latitude: 42.6967704, longitude: 23.3237933};
    center: {latitude: number, longitude: number} = {latitude: 42.6967704, longitude: 23.3237933};
    zoom: number = 7;
    api_key = "AIzaSyD0se2bN79YRtK_Cs8o0eq0_MQdRadqR94";
    language: string = "en";
    url: string = "";
    get_url(): string 
    {
        return "https://maps.googleapis.com/maps/api/staticmap?center=" + MathExt.round_by_digits_to_string(this.center.latitude,6) + "," 
        + MathExt.round_by_digits_to_string(this.center.longitude,6) + "&zoom=" + this.zoom + "&size=500x500&maptype=hybrid&language=" + this.language + "&scale=2&key=" + this.api_key;
    }
    update_url()
    {
        this.url = this.get_url();
    }
    
    static tile_size = 256;// Tile size of base tile.
    private static circumference  = 40075016;// Circumference at the equator in meters.
    
    get_max_zoom(size_km: number): number 
    {
        let km_per_pixel = size_km/1000;
        return Math.log2(Math.cos(this.center.latitude * Math.PI / 180)*GoogleMapController.circumference / (2*1000*256* km_per_pixel));
    }



    get km_per_pixel(): number {
        //let scale = 1 << this.zoom;   // Bitshifting is easy shorthand for Math.pow(2, zoomLevel)
        //let metersPerPixel = GoogleMapController.circumference / (GoogleMapController.tile_size * scale);
        //console.log('scale: ', scale, 'metersPerPixel:', metersPerPixel)
        //return metersPerPixel / 1000.;


        return GoogleMapController.circumference/(2*1000*256 * 2**this.zoom)* Math.cos(this.center.latitude * Math.PI / 180);
    }
    get size_km(): number 
    {
        return this.km_per_pixel*1000;
    }
}
