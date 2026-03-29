export type VehicleStatus = 'active' | 'idle' | 'maintenance';
export type ShipmentStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

export interface Vehicle {
  id: string;
  name: string;
  driver: string;
  type: 'truck' | 'bus' | 'motorcycle' | 'van';
  status: VehicleStatus;
  origin: string;
  destination: string;
  totalCapacity: number;
  usedCapacity: number;
  lat: number;
  lng: number;
  destLat: number;
  destLng: number;
  departureTime: string;
  estimatedArrival: string;
  pricePerKg: number;
  distance: number;
  co2Saved: number;
  company: string;
}

export interface Shipment {
  id: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  weight: number;
  status: ShipmentStatus;
  vehicleId: string;
  createdAt: string;
  deliveredAt?: string;
  contents: string;
  value: number;
}

export interface AdminStats {
  totalUsers: number;
  totalCompanies: number;
  totalVehicles: number;
  totalShipments: number;
  activeRoutes: number;
  co2SavedTons: number;
  revenueThisMonth: number;
  avgDeliveryTime: number;
}

export const vehicles: Vehicle[] = [
  {
    id: 'V001',
    name: 'Kigali Hauler 01',
    driver: 'Emmanuel Nkurunziza',
    type: 'truck',
    status: 'active',
    origin: 'Kigali',
    destination: 'Kampala',
    totalCapacity: 5000,
    usedCapacity: 2800,
    lat: -1.9441,
    lng: 30.0619,
    destLat: 0.3476,
    destLng: 32.5825,
    departureTime: '06:30',
    estimatedArrival: '14:00',
    pricePerKg: 0.12,
    distance: 512,
    co2Saved: 142,
    company: 'RwandaLogix Ltd',
  },
  {
    id: 'V002',
    name: 'East Africa Express',
    driver: 'Amina Osei',
    type: 'van',
    status: 'active',
    origin: 'Nairobi',
    destination: 'Kigali',
    totalCapacity: 1200,
    usedCapacity: 400,
    lat: -1.2921,
    lng: 36.8219,
    destLat: -1.9441,
    destLng: 30.0619,
    departureTime: '07:00',
    estimatedArrival: '19:30',
    pricePerKg: 0.18,
    distance: 1048,
    co2Saved: 87,
    company: 'EAX Freight',
  },
  {
    id: 'V003',
    name: 'Dar Cross-Border',
    driver: 'Juma Makundi',
    type: 'truck',
    status: 'active',
    origin: 'Dar es Salaam',
    destination: 'Kigali',
    totalCapacity: 8000,
    usedCapacity: 6500,
    lat: -6.7924,
    lng: 39.2083,
    destLat: -1.9441,
    destLng: 30.0619,
    departureTime: '05:00',
    estimatedArrival: '22:00',
    pricePerKg: 0.09,
    distance: 1398,
    co2Saved: 311,
    company: 'TanzaFreight Co.',
  },
  {
    id: 'V004',
    name: 'Moto Delivery KGL',
    driver: 'Claude Habimana',
    type: 'motorcycle',
    status: 'active',
    origin: 'Kigali',
    destination: 'Musanze',
    totalCapacity: 80,
    usedCapacity: 20,
    lat: -1.9541,
    lng: 30.0944,
    destLat: -1.4993,
    destLng: 29.6342,
    departureTime: '08:15',
    estimatedArrival: '10:30',
    pricePerKg: 0.35,
    distance: 117,
    co2Saved: 8,
    company: 'QuickMoto RW',
  },
  {
    id: 'V005',
    name: 'Kampala Bus Line 4',
    driver: 'Patrick Ssemakula',
    type: 'bus',
    status: 'idle',
    origin: 'Kampala',
    destination: 'Mombasa',
    totalCapacity: 600,
    usedCapacity: 0,
    lat: 0.3476,
    lng: 32.5825,
    destLat: -4.0435,
    destLng: 39.6682,
    departureTime: '09:00',
    estimatedArrival: '23:00',
    pricePerKg: 0.14,
    distance: 1180,
    co2Saved: 0,
    company: 'Link Bus Uganda',
  },
  {
    id: 'V006',
    name: 'Bujumbura Connector',
    driver: 'Diane Ntirampeba',
    type: 'van',
    status: 'active',
    origin: 'Bujumbura',
    destination: 'Kigali',
    totalCapacity: 900,
    usedCapacity: 550,
    lat: -3.3869,
    lng: 29.3622,
    destLat: -1.9441,
    destLng: 30.0619,
    departureTime: '07:45',
    estimatedArrival: '12:00',
    pricePerKg: 0.22,
    distance: 302,
    co2Saved: 54,
    company: 'Burundi Express',
  },
  {
    id: 'V007',
    name: 'Mombasa Port Runner',
    driver: 'Ali Hassan Mwangi',
    type: 'truck',
    status: 'maintenance',
    origin: 'Mombasa',
    destination: 'Nairobi',
    totalCapacity: 12000,
    usedCapacity: 0,
    lat: -4.0435,
    lng: 39.6682,
    destLat: -1.2921,
    destLng: 36.8219,
    departureTime: '—',
    estimatedArrival: '—',
    pricePerKg: 0.07,
    distance: 480,
    co2Saved: 0,
    company: 'PortLink Kenya',
  },
  {
    id: 'V008',
    name: 'Goma Fast Freight',
    driver: 'Serge Lukombo',
    type: 'van',
    status: 'active',
    origin: 'Goma',
    destination: 'Kigali',
    totalCapacity: 1100,
    usedCapacity: 300,
    lat: -1.6796,
    lng: 29.2289,
    destLat: -1.9441,
    destLng: 30.0619,
    departureTime: '09:30',
    estimatedArrival: '12:45',
    pricePerKg: 0.27,
    distance: 163,
    co2Saved: 29,
    company: 'Congo Swift',
  },
];

export const shipments: Shipment[] = [
  {
    id: 'SH-2401',
    sender: 'Akagera Coffee Coop',
    recipient: 'Nairobi Bean Hub',
    origin: 'Kigali',
    destination: 'Nairobi',
    weight: 480,
    status: 'in-transit',
    vehicleId: 'V001',
    createdAt: '2024-03-14',
    contents: 'Green Coffee Beans',
    value: 2880,
  },
  {
    id: 'SH-2402',
    sender: 'TechHub Rwanda',
    recipient: 'Kampala Devices Ltd',
    origin: 'Kigali',
    destination: 'Kampala',
    weight: 85,
    status: 'in-transit',
    vehicleId: 'V001',
    createdAt: '2024-03-14',
    contents: 'Electronics & Accessories',
    value: 12400,
  },
  {
    id: 'SH-2403',
    sender: 'Dar Port Authority',
    recipient: 'Rwanda Farmers Union',
    origin: 'Dar es Salaam',
    destination: 'Kigali',
    weight: 3200,
    status: 'in-transit',
    vehicleId: 'V003',
    createdAt: '2024-03-13',
    contents: 'Agricultural Machinery Parts',
    value: 45000,
  },
  {
    id: 'SH-2404',
    sender: 'Kigali Pharma',
    recipient: 'Musanze Health Center',
    origin: 'Kigali',
    destination: 'Musanze',
    weight: 12,
    status: 'in-transit',
    vehicleId: 'V004',
    createdAt: '2024-03-14',
    contents: 'Medical Supplies',
    value: 780,
  },
  {
    id: 'SH-2405',
    sender: 'Lake Kivu Fisheries',
    recipient: 'Kigali Fresh Market',
    origin: 'Goma',
    destination: 'Kigali',
    weight: 290,
    status: 'in-transit',
    vehicleId: 'V008',
    createdAt: '2024-03-14',
    contents: 'Fresh Fish (refrigerated)',
    value: 1850,
  },
  {
    id: 'SH-2406',
    sender: 'Nairobi Fashion Co.',
    recipient: 'Kigali Retail Group',
    origin: 'Nairobi',
    destination: 'Kigali',
    weight: 145,
    status: 'pending',
    vehicleId: 'V002',
    createdAt: '2024-03-14',
    contents: 'Apparel & Textiles',
    value: 6200,
  },
  {
    id: 'SH-2407',
    sender: 'Solar East Africa',
    recipient: 'Bujumbura Energy',
    origin: 'Kigali',
    destination: 'Bujumbura',
    weight: 380,
    status: 'delivered',
    vehicleId: 'V006',
    createdAt: '2024-03-12',
    deliveredAt: '2024-03-13',
    contents: 'Solar Panels & Inverters',
    value: 22000,
  },
  {
    id: 'SH-2408',
    sender: 'Musanze Pyrethrum Ltd',
    recipient: 'Nairobi Agro Export',
    origin: 'Musanze',
    destination: 'Nairobi',
    weight: 620,
    status: 'delivered',
    vehicleId: 'V002',
    createdAt: '2024-03-11',
    deliveredAt: '2024-03-12',
    contents: 'Pyrethrum Extract',
    value: 8900,
  },
];

export const adminStats: AdminStats = {
  totalUsers: 2847,
  totalCompanies: 341,
  totalVehicles: 892,
  totalShipments: 14623,
  activeRoutes: 127,
  co2SavedTons: 1842,
  revenueThisMonth: 284700,
  avgDeliveryTime: 8.4,
};

export const weeklyShipments = [
  { day: 'Mon', count: 42, co2: 18 },
  { day: 'Tue', count: 58, co2: 24 },
  { day: 'Wed', count: 51, co2: 21 },
  { day: 'Thu', count: 74, co2: 31 },
  { day: 'Fri', count: 89, co2: 37 },
  { day: 'Sat', count: 63, co2: 26 },
  { day: 'Sun', count: 38, co2: 16 },
];

export const monthlyRevenue = [
  { month: 'Sep', value: 189000 },
  { month: 'Oct', value: 214000 },
  { month: 'Nov', value: 198000 },
  { month: 'Dec', value: 241000 },
  { month: 'Jan', value: 267000 },
  { month: 'Feb', value: 255000 },
  { month: 'Mar', value: 284700 },
];
