import { CheckInEvent } from "@/models/check-in-event";

const API_URL = 'http://localhost:4000';

export async function checkIn(name: string, site_id: string): Promise<void> {
  const response = await fetch(`${API_URL}/check-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, site_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to check in');
  }
}

export async function checkOut(name: string, site_id: string): Promise<void> {
  const response = await fetch(`${API_URL}/check-out`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, site_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to check out');
  }
}

export async function getOnSiteWorkers(): Promise<CheckInEvent[]> {
  const response = await fetch(`${API_URL}/on-site`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch on-site workers');
  }

  return response.json();
}