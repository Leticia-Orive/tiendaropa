export interface IProduct {
    _id?: string;
    name: string;
    price: number;
    img?: string;
    extras: IProductExtra[];
}

export interface IProductExtra {
    label?: string;
    blocks: IProductExtraBlock[];
}

export interface IProductExtraBlock {
    name: string;
    img: string;
    options: IProductExtraOption[];

}
export interface IProductExtraOption {
    name?: string;
    price: number;
    activate: boolean;
}
