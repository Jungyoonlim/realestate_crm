export interface Property {
    id: number;
    title: string;
    property_type: string;
    transaction_type: string;
    address: string;
    dong: string;
    district: string;
    city: string;
    price_in_won: number;
    deposit_in_won: number | null;
    monthly_rent_in_won: number | null;
    maintenance_fee: number | null;
    size_m2: number;
    size_pyeong: number;
    rooms: number;
    bathrooms: number;
    floor: number;
    total_floors: number;
    building_name: string;
    building_year: number;
    description: string;
    status: string;
}