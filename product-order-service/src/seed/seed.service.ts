import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';

const products = [
  {
    name: 'USB-C Charger 65W',
    description: 'Fast charging USB-C adapter for laptops and phones',
    price: '1799.00',
    stock: 50,
  },
  {
    name: '27-inch Monitor',
    description: 'Full HD IPS monitor for work and gaming',
    price: '12999.00',
    stock: 12,
  },
  {
    name: 'External SSD 1TB',
    description: 'Portable high-speed USB-C SSD 1TB',
    price: '7499.00',
    stock: 18,
  },
  {
    name: 'Laptop Stand',
    description: 'Aluminium adjustable laptop stand',
    price: '1499.00',
    stock: 35,
  },
  {
    name: 'Webcam 1080p',
    description: 'Full HD webcam with built-in microphone',
    price: '1999.00',
    stock: 20,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with deep bass',
    price: '2299.00',
    stock: 28,
  },
  {
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: '8999.00',
    stock: 7,
  },
  {
    name: 'Smartwatch',
    description: 'Water-resistant smartwatch with heart-rate monitor',
    price: '5999.00',
    stock: 22,
  },
  {
    name: 'Power Bank 20000mAh',
    description: 'Fast-charging power bank with dual output',
    price: '1999.00',
    stock: 45,
  },
  {
    name: 'Noise Cancelling Earbuds',
    description: 'True wireless earbuds with ANC',
    price: '3999.00',
    stock: 25,
  },
  {
    name: 'Portable Hard Disk 2TB',
    description: '2TB external hard disk USB 3.0',
    price: '5499.00',
    stock: 16,
  },
  {
    name: 'Mechanical Gaming Mousepad',
    description: 'Large RGB gaming mousepad',
    price: '1299.00',
    stock: 30,
  },
  {
    name: '4K Smart TV 43-inch',
    description: 'Android-powered 4K UHD Smart TV',
    price: '25999.00',
    stock: 6,
  },
  {
    name: 'Router Dual Band',
    description: 'Dual band Wi-Fi router with high coverage',
    price: '2499.00',
    stock: 20,
  },
  {
    name: 'RGB PC Cabinet',
    description: 'ATX mid-tower PC case with RGB fans',
    price: '4599.00',
    stock: 10,
  },
  {
    name: 'Graphic Tablet',
    description: 'Drawing tablet for designers and artists',
    price: '6999.00',
    stock: 9,
  },
  {
    name: 'Tripod Stand',
    description: 'Adjustable tripod stand for mobile and camera',
    price: '999.00',
    stock: 27,
  },
  {
    name: 'Ring Light 18-inch',
    description: 'LED ring light with adjustable brightness',
    price: '1799.00',
    stock: 15,
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack up to 15.6-inch',
    price: '1999.00',
    stock: 32,
  },
  {
    name: 'Wireless Keyboard',
    description: 'Slim wireless keyboard with low-profile keys',
    price: '1799.00',
    stock: 26,
  },
  {
    name: 'HDMI Cable 2m',
    description: 'High-speed HDMI 2.1 cable 2 meters',
    price: '599.00',
    stock: 60,
  },
  {
    name: 'Portable Projector',
    description: 'Mini portable LED projector with HDMI input',
    price: '10999.00',
    stock: 8,
  },
  {
    name: 'Noise Filter Mic',
    description: 'USB condenser microphone with noise reduction',
    price: '3499.00',
    stock: 14,
  },
  {
    name: 'Smart Table Lamp',
    description: 'Dimmable LED smart lamp with app control',
    price: '2499.00',
    stock: 19,
  },
  {
    name: 'USB Hub 7-Port',
    description: 'USB 3.0 powered hub with 7 ports',
    price: '1599.00',
    stock: 40,
  },
  {
    name: 'Wi-Fi Range Extender',
    description: 'Dual band Wi-Fi range extender with WPS',
    price: '2799.00',
    stock: 18,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: '4599.00',
    stock: 15,
  },
  {
    name: 'Gaming Chair',
    description: 'High-back reclining gaming chair with headrest',
    price: '12999.00',
    stock: 5,
  },
  {
    name: 'Smartphone Gimbal',
    description: '3-axis handheld gimbal stabilizer',
    price: '6999.00',
    stock: 11,
  },
  {
    name: 'VR Headset',
    description: 'Virtual reality headset compatible with PC',
    price: '8999.00',
    stock: 9,
  },
  {
    name: 'USB Desk Fan',
    description: 'Portable USB-powered desk fan',
    price: '799.00',
    stock: 34,
  },
  {
    name: 'Cable Organizer Kit',
    description: 'Cable management kit with clips and sleeves',
    price: '499.00',
    stock: 70,
  },
  {
    name: 'Portable Monitor 15.6-inch',
    description: 'Full HD portable USB-C monitor',
    price: '11999.00',
    stock: 10,
  },
  {
    name: 'Smart Plug',
    description: 'Wi-Fi smart plug with voice assistant support',
    price: '999.00',
    stock: 38,
  },
  {
    name: 'Wireless Presenter',
    description: '2.4GHz wireless presenter with laser pointer',
    price: '1299.00',
    stock: 21,
  },
  {
    name: 'Streaming Webcam 4K',
    description: '4K UHD webcam for streaming and conferencing',
    price: '6499.00',
    stock: 13,
  },
  {
    name: 'Mechanical Pencil Stylus',
    description: '2-in-1 stylus and mechanical pencil for tablets',
    price: '899.00',
    stock: 29,
  },
  {
    name: 'Desk Mat XL',
    description: 'Extended non-slip desk mat for keyboard and mouse',
    price: '1299.00',
    stock: 33,
  },
];

@Injectable()
export class SeedService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async seed() {
    const existing = await this.db.select().from(schema.products).limit(1);

    if (existing.length > 0) {
      console.log('Seed skipped: products already exist');
      return;
    }

    await this.db
      .insert(schema.products)
      .values(products)
      .onConflictDoNothing();

    console.log('Uploaded');
  }
}
