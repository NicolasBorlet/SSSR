export interface Product {
    ProductID: any;
    ProductName: string;
    ProductCartDesc: string;
    ProductShortDesc: string;
    ProductLongDesc: string;
    ProductThumb: string;
    // ProductUpdateTime?: string;
    BrandID: string;
    ProductStock: number;
    type: string;
    // VinylArtist?: string | null;
    // VinylLabel?: string | null;
    // VinylDuration?: number | null;
    // VinylAlbum?: string | null;
    // VinylPrice?: number | null;
    ShoesSize?: number | null;
    ShoesSizePrice?: number | null;
    ShoesSizeQuantity?: number | null;
}
