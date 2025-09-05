'use client';
import { House, Transport, Consumption, Eating } from '@/features/guestions';
export const Questions = () => {
  return (
    <div>
      <House />
      <Eating />
      <Transport />
      <Consumption />
    </div>
  );
};
